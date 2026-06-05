---
template:
  id: https://www.modelware.io/sierra/context-analysis/concerns
  name: "Concerns"
  rank: 0
  expose:
    - kind: compose
  params:
    - id: ontology
      type: iri
      defaultValue: ${context.ontology}
      required: true
---
# Stakeholder Concerns

Elicit, categorize, and prioritize the concerns and trace them to their stakeholders:

```table-editor
---
columns: { this: { label: "Concern" } }
stylesheet:
  - selector: cell[col === "Priority"  && value]
    target: value
    style:
      padding: 4px 12px
      border-radius: 999px
      font-size: 12px
      font-weight: 600
      color: "#ffffff"
  - selector: cell[value === "High"]
    target: value
    style:
      background-color: "#DC2626"
  - selector: cell[value === "Medium"]
    target: value
    style:
      background-color: "#F59E0B"
  - selector: cell[value === "Low"]
    target: value
    style:
      background-color: "#10B981"
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

stakeholder:ConcernShape
    a sh:NodeShape ;
    sh:targetClass stakeholder:Concern ;
    sh:property [
        sh:path base:category ;
        sh:name "Categories" ;
    ] ;
    sh:property [
        sh:path base:priority ;
        sh:name "Priority" ;
        sh:maxCount 1 ;
    ] ;
    sh:property [
        sh:path stakeholder:isExpressedBy ;
        sh:name "Stakeholders" ;
        sh:class stakeholder:Stakeholder ;        
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