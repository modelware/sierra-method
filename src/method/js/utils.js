// Extract the local name (fragment) from an IRI.
const frag = iri => (iri || '').split(/[#\/]/).filter(Boolean).pop() ?? '';

// Convert an IRI fragment to a safe identifier (replaces non-word chars with _).
const toId = iri => frag(iri).replace(/\W/g, '_');

// Return a display label: prefer explicit label, fall back to IRI fragment.
const displayLabel = (label, iri) => label || frag(iri);

const omlPalette = ["#4a90d9", "#e67e22", "#27ae60", "#8e44ad", "#c0392b", "#16a085", "#d35400", "#2980b9"];

async function renderMermaid(code) {
    mermaid.initialize({ startOnLoad: false, theme: 'default' });
    const { svg } = await mermaid.render('mmd' + Date.now(), code);
    display(svg);
}

// Build xstate machines from the OML state model using a single CONSTRUCT query.
// Mirrors the structure of the statemachine.oml codegen template.
// Pass ontologyIri to scope queries to a specific named graph.
// Returns a map of machineName → xstate machine, e.g. { MissionControlDashboard: <machine> }
async function createMachinesFromModel(ontologyIri) {
    const { createMachine } = await import("https://esm.sh/xstate");

    const result = await query(`
        PREFIX oml:   <http://opencaesar.io/oml#>
        PREFIX base:  <https://www.modelware.io/sierra/base#>
        PREFIX state: <https://www.modelware.io/sierra/state#>
        PREFIX xst:   <urn:xstate:#>

        CONSTRUCT {
            ?machine xst:id      ?machineName ;
                     xst:initial ?initialName .

            ?state   xst:machine ?machine ;
                     xst:name    ?stateName .

            ?transition xst:state  ?state ;
                        xst:target ?targetName ;
                        xst:event  ?eventName .

            ?finalState xst:machineF ?machine ;
                        xst:name     ?finalStateName .
        }
        WHERE {
            GRAPH <{{g}}> {
                ?machine a state:StateMachine .
                BIND(REPLACE(STR(?machine), "^.*[/#]", "") AS ?machineName)

                OPTIONAL {
                    ?initial a state:Initial ; base:isContainedBy ?machine .
                    ?initTrans a state:Transition ;
                        oml:hasSource ?initial ; oml:hasTarget ?firstState .
                    BIND(REPLACE(STR(?firstState), "^.*[/#]", "") AS ?initialName)
                }

                OPTIONAL {
                    ?state a state:State ; base:isContainedBy ?machine .
                    FILTER NOT EXISTS { ?state a state:Initial }
                    FILTER NOT EXISTS { ?state a state:Final }
                    BIND(REPLACE(STR(?state), "^.*[/#]", "") AS ?stateName)

                    OPTIONAL {
                        ?transition a state:Transition ;
                            oml:hasSource ?state ; oml:hasTarget ?target .
                        BIND(REPLACE(STR(?target), "^.*[/#]", "") AS ?targetName)
                        OPTIONAL {
                            ?transition state:isTriggeredBy ?event .
                            BIND(REPLACE(STR(?event), "^.*[/#]", "") AS ?eventName)
                        }
                    }
                }

                OPTIONAL {
                    ?finalState a state:Final ; base:isContainedBy ?machine .
                    BIND(REPLACE(STR(?finalState), "^.*[/#]", "") AS ?finalStateName)
                }
            }
        }
    `, { g: ontologyIri });

    const XST = 'urn:xstate:#';
    const quads = result.quads ?? [];
    const all  = (subj, pred) => quads.filter(q => q.subject === subj && q.predicate === XST + pred).map(q => q.object);
    const one  = (subj, pred) => all(subj, pred)[0];

    const machineIris = [...new Set(quads.filter(q => q.predicate === XST + 'id').map(q => q.subject))];

    const machines = {};
    for (const machineIri of machineIris) {
        const machineName = one(machineIri, 'id');
        const initialName = one(machineIri, 'initial');
        const states = {};

        const stateIris = quads.filter(q => q.predicate === XST + 'machine' && q.object === machineIri).map(q => q.subject);
        for (const stateIri of stateIris) {
            const stateName = one(stateIri, 'name');
            if (!stateName) continue;
            const on = {};
            const transIris = quads.filter(q => q.predicate === XST + 'state' && q.object === stateIri).map(q => q.subject);
            for (const transIri of transIris) {
                const target = one(transIri, 'target');
                const event  = one(transIri, 'event') ?? 'unknown';
                if (target) on[event] = { target };
            }
            states[stateName] = { on };
        }

        const finalIris = quads.filter(q => q.predicate === XST + 'machineF' && q.object === machineIri).map(q => q.subject);
        for (const finalIri of finalIris) {
            const finalName = one(finalIri, 'name');
            if (finalName) states[finalName] = { type: 'final' };
        }

        machines[machineName] = createMachine({ id: machineName, initial: initialName, states });
    }
    return machines;
}