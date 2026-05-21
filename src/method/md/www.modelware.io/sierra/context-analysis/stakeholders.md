---
template:
  id: https://www.modelware.io/sierra/context-analysis/stakeholders
  name: "Stakeholders"
  rank: 0
  expose:
    - kind: compose
  params:
    - id: ontology
      type: iri
      defaultValue: ${context.ontology}
      required: true
    - id: target
      type: iri
      required: true
---
# Stakeholders
Identify individuals, groups, or organizations with interests in the missions:

```table-editor
---
target: ${target}
columns: { focus: { label: "Stakeholder" } }
stylesheet:
  - selector: cell[col === "Categories"  && value]
    target: value
    style:
      padding: 4px 12px
      border-radius: 999px
      font-size: 12px
      font-weight: 600
      color: "#7a6cff"
      background-color: "#ede9ff"
---
@prefix sh: <http://www.w3.org/ns/shacl#> .
@prefix dash: <http://datashapes.org/dash#> .
@prefix base: <https://www.modelware.io/sierra/base#> .
@prefix stakeholder: <https://www.modelware.io/sierra/stakeholder#> .

stakeholder:StakeholderShape
    a sh:NodeShape ;
    sh:targetClass stakeholder:Stakeholder ;
    sh:property [
        sh:path base:category ;
        sh:name "Categories" ;
    ] ;
    sh:property [
        sh:path base:description ;
        sh:name "Description" ;
        dash:editor dash:TextAreaEditor ;
        sh:maxCount 1 ;
    ] ;
    .
```
