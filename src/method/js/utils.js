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


// Convert a value between two units that measure the same quantity. `from_unit`/`to_unit`
// are descriptors { multiplier, quantity } the caller looks up from the model
// (oml:multiplier and oml:measures on the unit). Checking the quantity IRI (not just the
// dimension) correctly rejects conversions between distinct quantities that share a
// dimension, e.g. frequency (Hz) vs activity (Bq). Works for any quantity. e.g.
//   convertUnit(90, { multiplier: 60, quantity: 'http://opencaesar.io/isq/Time' },
//                   { multiplier: 3600, quantity: 'http://opencaesar.io/isq/Time' }) -> 1.5
function convertUnit(value, from_unit, to_unit) {
    if (from_unit.quantity !== to_unit.quantity)
        throw new Error(`Incompatible quantities: ${from_unit.quantity} vs ${to_unit.quantity}`);
    return value * from_unit.multiplier / to_unit.multiplier;
}