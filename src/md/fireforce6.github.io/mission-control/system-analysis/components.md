---
contextUri: workspace:/src/oml/fireforce6.github.io/mission-control/system-analysis/components.oml
---
# Components

Define the components and their physical decomposition (containers).

```table-editor
---
columns: { focus: { label: "Component" } }
---
@prefix sh: <http://www.w3.org/ns/shacl#> .
@prefix dash: <http://datashapes.org/dash#> .
@prefix base: <https://www.modelware.io/sierra/base#> .
@prefix component: <https://www.modelware.io/sierra/component#> .

component:ComponentShape
    a sh:NodeShape ;
    sh:targetClass component:Component ;
    sh:property [
        sh:path base:isContainedBy ;
        sh:name "Container" ;
        sh:class component:Component ;
        sh:maxCount 1 ;
    ] ;
    sh:property [
        sh:path base:description ;
        sh:name "Description" ;
        dash:editor dash:TextAreaEditor ;
        sh:maxCount 1 ;
    ] ;
    .
```