---
contextUri: workspace:/src/model/oml/fireforce6.github.io/mission-control/operational-analysis/processes.oml
---
# Activities

Identify the activities performed by entities in operations.

```table-editor
---
columns: { focus: { label: "Activity" } }
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
