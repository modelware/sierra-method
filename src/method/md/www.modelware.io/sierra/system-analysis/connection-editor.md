---
template:
  id: https://www.modelware.io/sierra/system-analysis/connection-editor
  name: "Connection Editor"
  rank: 0
  expose:
    - kind: compose
  params:
    - id: ontology
      type: iri
      defaultValue: ${context.ontology}
      required: true
---
# Connection Editor

Specify which ports are connected and what each connection transfers.

```table-editor
---
columns: { this: { label: "Connection" } }
---
@prefix sh: <http://www.w3.org/ns/shacl#> .
@prefix dash: <http://datashapes.org/dash#> .
@prefix base: <https://www.modelware.io/sierra/base#> .
@prefix component: <https://www.modelware.io/sierra/component#> .
@prefix oml: <http://opencaesar.io/oml#> .

component:ConnectionShape
    a sh:NodeShape ;
    sh:targetClass component:Connection ;
    sh:sparql [
        sh:message "A connection cannot run from an In port to an Out port." ;
        sh:select """
            PREFIX oml: <http://opencaesar.io/oml#>
            PREFIX component: <https://www.modelware.io/sierra/component#>
            SELECT $this WHERE {
                $this oml:hasSource ?s ; oml:hasTarget ?t .
                ?s component:direction "In" .
                ?t component:direction "Out" .
            }
        """ ;
    ] ;
    sh:property [
        sh:path oml:hasSource ;
        sh:name "Source Port" ;
        sh:class component:Port ;
        sh:minCount 1 ;
        sh:maxCount 1 ;
    ] ;
    sh:property [
        sh:path oml:hasTarget ;
        sh:name "Target Port" ;
        sh:class component:Port ;
        sh:minCount 1 ;
        sh:maxCount 1 ;
    ] ;
    sh:property [
        sh:path component:transfers ;
        sh:name "Transfers" ;
        sh:class base:Item ;
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
