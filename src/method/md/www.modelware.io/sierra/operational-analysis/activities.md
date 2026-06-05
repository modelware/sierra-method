---
template:
  id: https://www.modelware.io/sierra/operational-analysis/activities
  name: "Activities"
  rank: 0
  expose:
    - kind: compose
  params:
    - id: ontology
      type: iri
      defaultValue: ${context.ontology}
      required: true
---
# Activities

Identify the activities performed by entities in operations.

```table-editor
---
columns: { this: { label: "Activity" } }
---
@prefix sh: <http://www.w3.org/ns/shacl#> .
@prefix dash: <http://datashapes.org/dash#> .
@prefix base: <https://www.modelware.io/sierra/base#> .
@prefix entity: <https://www.modelware.io/sierra/entity#> .
@prefix process: <https://www.modelware.io/sierra/process#> .

process:ActivityShape
    a sh:NodeShape ;
    sh:targetClass process:Activity ;
    sh:property [
        sh:path process:isAllocatedTo ;
        sh:name "Entity" ;
        sh:class entity:Entity ;        
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

# Flows

Identify item flows between activities.

```table-editor
---
columns: { this: { label: "Flow" } }
---
@prefix sh: <http://www.w3.org/ns/shacl#> .
@prefix dash: <http://datashapes.org/dash#> .
@prefix oml: <http://opencaesar.io/oml#> .
@prefix base: <https://www.modelware.io/sierra/base#> .
@prefix process: <https://www.modelware.io/sierra/process#> .

process:FlowShape
    a sh:NodeShape ;
    sh:targetClass process:Flow ;
    sh:property [
        sh:path oml:hasSource ;
        sh:name "Source" ;
        sh:class process:Activity ;        
        sh:minCount 1 ;
        sh:maxCount 1 ;
    ] ;
    sh:property [
        sh:path oml:hasTarget ;
        sh:name "Target" ;
        sh:class process:Activity ;        
        sh:minCount 1 ;
        sh:maxCount 1 ;
    ] ;
    sh:property [
        sh:path process:flows ;
        sh:name "Items" ;
        sh:class base:Item ;        
    ] ;
    .
```
