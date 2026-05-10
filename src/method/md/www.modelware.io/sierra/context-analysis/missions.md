---
template:
  id: https://www.modelware.io/sierra/context-analysis/missions
  name: "Missions"
  rank: 0
  expose:
    - kind: compose
  params:
    - id: ontology
      type: iri
      defaultValue: ${context.ontology}
      required: true
---
# Missions

Define the mission(s) that will address stakeholder concerns

```table-editor
---
columns: { focus: { label: "Mission" } }
---
@prefix sh: <http://www.w3.org/ns/shacl#> .
@prefix dash: <http://datashapes.org/dash#> .
@prefix base: <https://www.modelware.io/sierra/base#> .
@prefix mission: <https://www.modelware.io/sierra/mission#> .

mission:MissionShape
    a sh:NodeShape ;
    sh:targetClass mission:Mission ;
    sh:property [
        sh:path base:description ;
        sh:name "Description" ;
        dash:editor dash:TextAreaEditor ;
        sh:maxCount 1 ;
    ] ;
    .
```