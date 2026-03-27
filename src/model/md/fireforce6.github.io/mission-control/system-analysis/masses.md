---
contextUri: workspace:/src/model/oml/fireforce6.github.io/mission-control/system-analysis/masses.oml
---
# Physical Parts

Identify which components are physical parts and specify their leaf mass.

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
    sh:targetClass component:PhysicalPart;
    sh:property [
        sh:path component:mass ;
        sh:name "Mass" ;
        sh:maxCount 1 ;
    ] ;
    .
```