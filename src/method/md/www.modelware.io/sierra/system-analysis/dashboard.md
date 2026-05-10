---
template:
  id: https://www.modelware.io/sierra/system-analysis/dashboard
  name: "System Dashboard"
  rank: 0
  expose:
    - kind: compose
  params:
    - id: ontology
      type: iri
      defaultValue: ${context.ontology}
      required: true
---
# System Analysis

## Mass Rollup

The rollup of the physical system's masses.

```tree
---
columns: { focus: { label: "Component" }, mass: { label: "Total Mass" } }
containment: [ base:contains ]
---
PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
PREFIX base: <https://www.modelware.io/sierra/base#>
PREFIX component: <https://www.modelware.io/sierra/component#>

CONSTRUCT {
    ?parent base:contains ?child .
    ?parent component:mass ?totalMass .
}
WHERE {
    {
      SELECT ?parent (SUM(xsd:decimal(?mass)) AS ?totalMass)
      WHERE {
        ?parent a component:PhysicalPart .
        OPTIONAL {
          ?parent base:contains* ?child .
          ?child component:mass ?mass .
        }
      }
      GROUP BY ?parent
    }
    OPTIONAL {
      ?parent base:contains ?child .
    }
}
```