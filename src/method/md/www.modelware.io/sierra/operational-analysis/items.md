---
template:
  id: https://www.modelware.io/sierra/operational-analysis/items
  name: "Items"
  rank: 0
  expose:
    - kind: compose
  params:
    - id: ontology
      type: iri
      defaultValue: ${context.ontology}
      required: true
---
# Items

Identify data, material, and energy items that flow in operations.

```table-editor
---
columns: { focus: { label: "Item" } }
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

base:ItemShape
    a sh:NodeShape ;
    sh:targetClass base:Item ;
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
