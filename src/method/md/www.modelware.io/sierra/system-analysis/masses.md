---
template:
  id: https://www.modelware.io/sierra/system-analysis/masses
  name: "Masses"
  rank: 0
  expose:
    - kind: compose
  params:
    - id: ontology
      type: iri
      defaultValue: ${context.ontology}
      required: true
---
# Mass Management

Identify which components are physical parts and specify their leaf mass to watch the mass rolling up.

```tree-editor
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
    sh:rule [
        a sh:SPARQLRule ;
        sh:construct """
            PREFIX base: <https://www.modelware.io/sierra/base#>
            PREFIX component: <https://www.modelware.io/sierra/component#>
            PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
            CONSTRUCT { 
                $this component:totalMass ?total 
            } WHERE {
                SELECT $this (SUM(xsd:decimal(?m)) AS ?total)
                WHERE {
                    $this a component:PhysicalPart .
                    OPTIONAL {
                        $this base:contains* ?child .
                        ?child component:mass ?m .
                    }
                }
                GROUP BY $this
            }
        """ ;
    ] ;
    sh:property [
        sh:path base:isContainedBy ;
        sh:name "Container" ;
        sh:class component:Component ;
        dash:readOnly true ;
        dash:composite true ;
    ] ;
    sh:property [
        sh:path component:mass ;
        sh:name "Mass" ;
        sh:maxCount 1 ;
    ] ;
    sh:property [ 
        sh:path component:totalMass ; 
        sh:name "Total Mass" ; 
        dash:readOnly true ;
    ] ;
    .
```