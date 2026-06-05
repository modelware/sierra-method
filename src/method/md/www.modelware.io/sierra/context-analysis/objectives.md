---
template:
  id: https://www.modelware.io/sierra/context-analysis/objectives
  name: "Objectives"
  rank: 0
  expose:
    - kind: compose
  params:
    - id: ontology
      type: iri
      defaultValue: ${context.ontology}
      required: true
---
# Mission Objectives

Define structured, measurable objectives for each mission.

```table-editor
---
columns: { this: { label: "Objective" } }
---
@prefix sh: <http://www.w3.org/ns/shacl#> .
@prefix dash: <http://datashapes.org/dash#> .
@prefix base: <https://www.modelware.io/sierra/base#> .
@prefix stakeholder: <https://www.modelware.io/sierra/stakeholder#> .
@prefix mission: <https://www.modelware.io/sierra/mission#> .

mission:ObjectiveShape
    a sh:NodeShape ;
    sh:targetClass mission:Objective ;
    sh:property [
        sh:path mission:isPursuedBy ;
        sh:name "Mission" ;
        sh:class mission:Mission ;        
        sh:maxCount 1 ;
    ] ;
    sh:property [
        sh:path mission:isDerivedFrom ;
        sh:name "Stakeholder Concerns" ;
        sh:class stakeholder:Concern ;        
    ] ;
    sh:property [
        sh:path base:description ;
        sh:name "Description" ;
        dash:editor dash:TextAreaEditor ;
        sh:maxCount 1 ;
    ] ;
    .
```