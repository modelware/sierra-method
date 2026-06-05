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
columns: { this: { label: "Component" } }
---
@prefix sh: <http://www.w3.org/ns/shacl#> .
@prefix dash: <http://datashapes.org/dash#> .
@prefix base: <https://www.modelware.io/sierra/base#> .
@prefix component: <https://www.modelware.io/sierra/component#> .
@prefix oml: <http://opencaesar.io/oml#> .
@prefix si: <http://opencaesar.io/si/> .

component:ComponentShape
    a sh:NodeShape ;
    sh:targetClass component:Component;
    dash:readOnly true ;
    sh:rule [
        sh:order 0 ;
        a sh:SPARQLRule ;
        sh:construct """
            PREFIX base: <https://www.modelware.io/sierra/base#>
            PREFIX component: <https://www.modelware.io/sierra/component#>
            CONSTRUCT {
                $this base:hasDescendant ?child
            } WHERE {
                $this a component:Component .
                $this base:contains* ?child .
            }
        """ ;
    ] ;
    sh:rule [
        sh:order 1 ;
        a sh:SPARQLRule ;
        sh:construct """
            PREFIX base: <https://www.modelware.io/sierra/base#>
            PREFIX component: <https://www.modelware.io/sierra/component#>
            PREFIX oml: <http://opencaesar.io/oml#>
            PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
            CONSTRUCT {
                $this component:totalMass ?formatted
            } WHERE {
                SELECT $this (CONCAT(STR(?total), " kg") AS ?formatted)
                WHERE {
                    {
                        SELECT $this (SUM(?valSi) AS ?total)
                        WHERE {
                            $this a component:Component .
                            OPTIONAL {
                                $this base:hasDescendant ?child .
                                ?child component:mass ?q .
                                ?q oml:value ?v ; oml:unit ?u .
                                ?u oml:multiplier ?m .
                                BIND(xsd:decimal(?v) * xsd:decimal(?m) AS ?valSi)
                            }
                        }
                        GROUP BY $this
                    }
                }
            }
        """ ;
    ] ;
    sh:property [
        sh:path base:isContainedBy ;
        sh:name "Container" ;
        sh:class component:Component ;
        dash:composite true ;
    ] ;
    sh:property [
        sh:path component:totalMass ;
        sh:name "Total Mass" ;
        sh:maxCount 1 ;
        sh:order 2
    ] ;
   .

component:PhysicalPartShape
    a sh:NodeShape ;
    sh:targetClass component:PhysicalPart;
    sh:property [
        sh:path component:mass ;
        sh:name "Mass" ;
        sh:maxCount 1 ;
        sh:order 1
    ] ;
    .
```