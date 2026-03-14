---
contextUri: workspace:/src/model/oml/fireforce6.github.io/mission-control/operational-analysis/processes.oml
---
# Flows

Identify item flows between activities.

```table-editor
---
columns: { focus: { label: "Flow" } }
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

# Processes

Identify operational processes and allocate flows to them.

```table-editor
---
columns: { focus: { label: "Process" } }
---
@prefix sh: <http://www.w3.org/ns/shacl#> .
@prefix dash: <http://datashapes.org/dash#> .
@prefix oml: <http://opencaesar.io/oml#> .
@prefix base: <https://www.modelware.io/sierra/base#> .
@prefix mission: <https://www.modelware.io/sierra/mission#> .
@prefix process: <https://www.modelware.io/sierra/process#> .

process:ProcessShape
    a sh:NodeShape ;
    sh:targetClass process:Process ;
    sh:property [
        sh:path process:describes ;
        sh:name "Capability" ;
        sh:class mission:Capability ;        
        sh:minCount 1 ;
        sh:maxCount 1 ;
    ] ;
    sh:property [
        sh:path process:includes ;
        sh:name "Flows" ;
        sh:class process:Flow ;        
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
