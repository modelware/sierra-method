---
contextUri: workspace:/src/model/oml/fireforce6.github.io/mission-control/bundle.oml
---
# Connections


View internal connections between system components.

```diagram
---
stylesheet:
  - selector: node
    style:
      height: 100
      padding: 40
      layout:
        type: dagre
        ranksep: 150
        nodesep: 40
      label:
        refY: 10

  - selector: edge
    style:
      router:
        name: manhattan
        args:
          padding: 10
      label:
        font-size: 10
        fill: var(--vscode-editor-foreground)
        text-anchor: middle
      label-body:
        fill: none
---
PREFIX base: <https://www.modelware.io/sierra/base#>
PREFIX component: <https://www.modelware.io/sierra/component#>
PREFIX oml: <http://opencaesar.io/oml#>
PREFIX : <http://opencaesar.io/oml/diagram#>

CONSTRUCT {
  ?component a :Node ;
             :class "component" .
   
  ?port a :Port ;
            :class "port" ;
            :parent ?component .

  ?subComponent a :Node ;
             :parent ?component .

  ?subPort a :Port ;
            :class "port" ;
            :parent ?subComponent .
 
  ?connection a :Edge ;
            :source ?srcPort ;
            :target ?tgtPort ;
            :text ?itemLabel .
}
WHERE {
  ?component component:hasPort ?port ;
     base:contains ?subComponent .

  ?subComponent component:hasPort ?subPort .

  ?connection a component:Connection ;
     oml:hasSource ?srcPort ;
     oml:hasTarget ?tgtPort ;
     component:transfers ?item .

    BIND(REPLACE(STR(?item), "^.*[#/]", "") AS ?itemLabel)
}
```
