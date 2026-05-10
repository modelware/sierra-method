---
template:
  id: https://www.modelware.io/sierra/operational-analysis/capabilities
  name: "Capabilities"
  rank: 0
  expose:
    - kind: compose
  params:
    - id: ontology
      type: iri
      defaultValue: ${context.ontology}
      required: true
---
# Capabilities

Define the operational capabilities and trace each ones back to the mission objectives it supports.

```table-editor
---
columns: { focus: { label: "Capability" } }
---
@prefix sh: <http://www.w3.org/ns/shacl#> .
@prefix dash: <http://datashapes.org/dash#> .
@prefix base: <https://www.modelware.io/sierra/base#> .
@prefix mission: <https://www.modelware.io/sierra/mission#> .

mission:CapabilityShape
    a sh:NodeShape ;
    sh:targetClass mission:Capability ;
    sh:property [
        sh:path mission:isRequiredBy ;
        sh:name "Objectives" ;
        sh:class mission:Objective ;        
        sh:minCount 1 ;
    ] ;
    sh:property [
        sh:path base:description ;
        sh:name "Description" ;
        dash:editor dash:TextAreaEditor ;
        sh:maxCount 1 ;
    ] ;
    .
```
