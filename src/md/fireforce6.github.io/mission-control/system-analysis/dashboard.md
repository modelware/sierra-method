---
contextUri: workspace:/src/oml/fireforce6.github.io/mission-control/system-analysis/masses.oml
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
        ?parent a component:Component .
        OPTIONAL {
          ?child base:isContainedBy* ?parent .
          ?child component:mass ?mass .
        }
      }
      GROUP BY ?parent
    }
    OPTIONAL {
      ?child base:isContainedBy ?parent .
    }
}
```
