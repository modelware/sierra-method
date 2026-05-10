---
template:
  id: https://www.modelware.io/sierra/operational-analysis/entities
  name: "Entities"
  rank: 0
  expose:
    - kind: compose
  params:
    - id: ontology
      type: iri
      defaultValue: ${context.ontology}
      required: true
---
# Entities

Identify the actors, organizations, and external systems in the operational world, then allocate capabilities to them. Each entity should be responsible for delivering one or more capabilities.

```table-editor
---
columns: { focus: { label: "Entity" } }
---
@prefix sh: <http://www.w3.org/ns/shacl#> .
@prefix dash: <http://datashapes.org/dash#> .
@prefix base: <https://www.modelware.io/sierra/base#> .
@prefix entity: <https://www.modelware.io/sierra/entity#> .
@prefix mission: <https://www.modelware.io/sierra/mission#> .

entity:EntityShape
    a sh:NodeShape ;
    sh:targetClass entity:Entity ;
    sh:targetClass entity:Actor ;
    sh:property [
        sh:path entity:hasCapability ;
        sh:name "Has Capabilities" ;
        sh:class mission:Capability ;
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
