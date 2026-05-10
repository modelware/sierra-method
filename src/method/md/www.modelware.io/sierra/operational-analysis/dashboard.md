---
template:
  id: https://www.modelware.io/sierra/operational-analysis/dashboard
  name: "Operational Dashboard"
  rank: 0
  expose:
    - kind: compose
  params:
    - id: ontology
      type: iri
      defaultValue: ${context.ontology}
      required: true
---
# Operational Analysis

## Objectives > Capabilities > Entities

View how mission objectives are addressed by operational capabilities allocated to operational entities.

```diagram
---  
stylesheet:
  - selector: diagram
    style:
      layout:
        type: dagre
        rankdir: TB
        ranksep: 50
        nodesep: 20

  - selector: node
    style:
      stroke-width: 0
      icon:
        preserveAspectRatio: xMidYMid meet
      label:
        textVerticalAnchor: top
        refY: "100%"
        textAnchor: middle

  - selector: node.objective
    style:
      width: 48
      height: 48
      icon:
        href: ../../../images/objective.svg

  - selector: node.capability
    style:
      width: 48
      height: 48
      icon:
        href: ../../../images/capability.svg

  - selector: node.actor
    style:
      width: 24
      height: 53
      icon:
        href: ../../../images/actor.svg

  - selector: node.entity
    style:
      width: 64
      height: 64
      icon:
        href: ../../../images/entity.svg
---
PREFIX mission: <https://www.modelware.io/sierra/mission#>
PREFIX entity: <https://www.modelware.io/sierra/entity#>
PREFIX : <http://opencaesar.io/oml/diagram#>

CONSTRUCT {
  ?objective a :Node ;
    :text ?objectiveLabel ;
    :class 'objective' .

  ?capability a :Node ;
    :text ?capabilityLabel ;
    :class 'capability' .
  
  ?entity a :Node ;
    :text ?entityLabel ;
    :class ?entityClass .
  
  ?requires a :Edge ;
    :source ?objective ;
    :target ?capability .
  
  ?assigns a :Edge ;
    :source ?capability ;
    :target ?entity .
}
WHERE {
    ?objective mission:requires ?capability .
    ?capability entity:isAssignedTo ?entity .

    BIND(IRI(CONCAT("/requires/", MD5(CONCAT(STR(?objective), STR(?capability))))) AS ?requires)
    BIND(IRI(CONCAT("/assigns/", MD5(CONCAT(STR(?capability), STR(?entity))))) AS ?assigns)
    BIND(IF (EXISTS { GRAPH ?g4 { ?entity a entity:Actor } }, "actor", "entity") AS ?entityClass)

    BIND(REPLACE(STR(?objective), "^.*[#/]", "") AS ?objectiveLabel)
    BIND(REPLACE(STR(?capability), "^.*[#/]", "") AS ?capabilityLabel)
    BIND(REPLACE(STR(?entity), "^.*[#/]", "") AS ?entityLabel)
}
```

## Requirements

View how requirements are broken down by category and priority.

<div style="display:flex; gap:16px; flex-wrap:wrap;">
  <div style="flex:1; min-width:280px;">

```chart
---
type: bar
data:
  labels: category
  datasets:
    - label: Requirements
      data: count
options:
  indexAxis: y
  plugins:
    title:
      display: true
      text: Requirements by Category
    legend:
      display: false
  scales:
    x:
      beginAtZero: true
      title:
        display: true
        text: Count
---
PREFIX base: <https://www.modelware.io/sierra/base#>
PREFIX stakeholder: <https://www.modelware.io/sierra/stakeholder#>

SELECT ?category (COUNT(?req) AS ?count)
WHERE {
  GRAPH ?g1 {
    ?req a stakeholder:Requirement ;
        base:category ?category .
  }
}
GROUP BY ?category
ORDER BY DESC(?count)
```

  </div>
  <div style="flex:1; min-width:280px;">

```chart
---
type: pie
data:
  labels: priority
  datasets:
    - label: Requirements
      data: count
options:
  plugins:
    title:
      display: true
      text: Requirements by Priority
    legend:
      position: right
---
PREFIX base: <https://www.modelware.io/sierra/base#>
PREFIX stakeholder: <https://www.modelware.io/sierra/stakeholder#>

SELECT ?priority (COUNT(?req) AS ?count)
WHERE {
  GRAPH ?g1 {
    ?req a stakeholder:Requirement ;
        base:priority ?priority .
  }
}
GROUP BY ?priority
ORDER BY DESC(?count)
```

  </div>
</div>

