---
contextUri: workspace:/src/oml/fireforce6.github.io/mission-control/bundle.oml
---
# Context Analysis

## Stakeholder Concerns

Check that all stakeholders have concerns and all concerns are traced to stakeholders.

```graph
---
layout:
  mode: force
  running: true
  fit: true
  padding: 24
  force:
    repulsion: 4200
    linkDistance: 130
    springStrength: 0.006
    gravity: 0.0012
    damping: 0.90
    maxSpeed: 4
    group:
      intraAttraction: 0.0025
      interRepulsionFactor: 3.0
stylesheet:
  - selector: node [value.includes("Concern") || outgoing.some(e => e.target.value.includes('Concern'))]
    group: concern
    style:
      fill: cyan
      stroke: grey
      stroke-width: 1
  - selector: node [value.includes("Stakeholder") || outgoing.some(e => e.target.value.includes('Stakeholder'))]
    group: stakeholder
    style:
      fill: yellow
      stroke: grey
      stroke-width: 1
---
PREFIX stakeholder: <https://www.modelware.io/sierra/stakeholder#>

CONSTRUCT {
  ?concern a stakeholder:Concern .
  ?stakeholder a stakeholder:Stakeholder .
  ?stakeholder stakeholder:expresses ?concern .
}
WHERE {
  { ?concern a stakeholder:Concern }
  UNION
  { ?stakeholder a stakeholder:Stakeholder }
  UNION
  { 
    ?stakeholder a stakeholder:Stakeholder .
    ?concern a stakeholder:Concern .
    ?stakeholder stakeholder:expresses ?concern .
  }
}
```

## Missions vs Stakeholders

The number of ways a mission satisfies a stakeholder.

```matrix
---
rowColumnLabel: Mission / Stakeholder
stylesheet:
  - selector: cell [Number(value) > 1]
    style:
      background-color: lightgreen
---
PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
PREFIX mission: <https://www.modelware.io/sierra/mission#>
PREFIX stakeholder: <https://www.modelware.io/sierra/stakeholder#>

SELECT ?row ?column (COALESCE(?n, 0) AS ?value)
WHERE {
  ?row a mission:Mission .
  ?column a stakeholder:Stakeholder .

  OPTIONAL {
    SELECT ?row ?column (COUNT(*) AS ?n)
    WHERE {
      ?row a mission:Mission .
      ?row mission:pursues ?o .
      ?o mission:isDerivedFrom ?c .
      ?c stakeholder:isExpressedBy ?column .
    }
    GROUP BY ?row ?column
  }
}
ORDER BY ?row ?column
```