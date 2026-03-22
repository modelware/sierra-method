---
contextUri: workspace:/src/model/oml/fireforce6.github.io/mission-control/operational-analysis/statemachines/sm1.oml
---
# State Machine Diagram

```diagram
---
stylesheet:
  - selector: node.statemachine
    style:
      paddingTop: 45
      layout:
        type: stack
        direction: vertical
        stretch: true
      stroke-width: 1
      fill-opacity: 0
      label:
        refY: 14

  - selector: compartment
    style:
      layout:
        type: dagre
        rankdir: TB
        nodesep: 100
        ranksep: 80
      stroke-width: 1
      fill-opacity: 0
      stroke: none
      label:
        opacity: 0

  - selector: node.state
    style:
      rx: 16
      ry: 16
      fill: yellow
      fill-opacity: 0.2

  - selector: node.initial
    style:
      shape: circle
      width: 10
      height: 10
      fill: var(--vscode-editor-foreground)
      label:
        opacity: 0

  - selector: node.final
    style:
      width: 16
      height: 16
      stroke-width: 0
      icon:
        viewBox: "0 0 12 12"
        paths:
          - d: "M6 0.5 A5.5 5.5 0 1 1 5.9999 0.5"
            fill: none
            stroke: var(--vscode-editor-foreground)
          - d: "M6 2 A4 4 0 1 1 5.9999 2"
            fill: var(--vscode-editor-foreground)
      label:
        opacity: 0
---
PREFIX oml: <http://opencaesar.io/oml#>
PREFIX base: <https://www.modelware.io/sierra/base#>
PREFIX state: <https://www.modelware.io/sierra/state#>
PREFIX : <http://opencaesar.io/oml/diagram#>

CONSTRUCT {
    ?sm a :Node ;
        :text ?smLabel ;
        :class 'statemachine' .
        
    ?compartment a :Compartment ;
        :parent ?sm .

    ?state a :Node ;
        :text ?stateLabel ;
        :class ?class ;
        :parent ?compartment .

    ?transition a :Edge ;
        :source ?source ;
        :target ?target ;
        :text ?label .
}
WHERE {
    GRAPH <${contextIri}> {
        ?sm a state:StateMachine .
        BIND(STRAFTER(STR(?sm), "#") AS ?smLabel)
        ?state a ?type ;
            base:isContainedBy ?sm .
        BIND(STRAFTER(STR(?state), "#") AS ?stateLabel)
        BIND(LCASE(STRAFTER(STR(?type), "#")) AS ?class)
        ?transition a state:Transition ;
            oml:hasSource ?source ;
            oml:hasTarget ?target .
        OPTIONAL { 
            ?transition state:isTriggeredBy ?item .
            BIND(STRAFTER(STR(?item), "#") AS ?label)
        }
        BIND(IRI(CONCAT(STR(?sm), "/compartment")) AS ?compartment)
  }
}
```

## State Machine

Define a state machine representing state-based configurations of an operational entity.

```table-editor
---
columns: { focus: { label: "State Machine" } }
---
@prefix sh: <http://www.w3.org/ns/shacl#> .
@prefix dash: <http://datashapes.org/dash#> .
@prefix base: <https://www.modelware.io/sierra/base#> .
@prefix entity: <https://www.modelware.io/sierra/entity#> .
@prefix process: <https://www.modelware.io/sierra/process#> .
@prefix state: <https://www.modelware.io/sierra/state#> .

state:StateMachineShape
    a sh:NodeShape ;
    sh:targetClass state:StateMachine ;
    sh:property [
        sh:path state:isAllocatedTo ;
        sh:name "Entity" ;
        sh:class entity:Entity ;
        sh:minCount 1 ;
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

## States

Define the states of the state machine.

```table-editor
---
columns: { focus: { label: "State" } }
---
@prefix sh: <http://www.w3.org/ns/shacl#> .
@prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> .
@prefix dash: <http://datashapes.org/dash#> .
@prefix base: <https://www.modelware.io/sierra/base#> .
@prefix entity: <https://www.modelware.io/sierra/entity#> .
@prefix process: <https://www.modelware.io/sierra/process#> .
@prefix state: <https://www.modelware.io/sierra/state#> .

state:StateShape
    a sh:NodeShape ;
    sh:targetClass state:State ;
    sh:targetClass state:Initial ;
    sh:targetClass state:Final ;
    sh:property [
        sh:path rdf:type ;
        sh:name "Type" ;
        dash:readOnly true ;
    ] ;
    sh:property [
        sh:path base:isContainedBy ;
        sh:name "State Machine" ;
        sh:class state:StateMachine ;
        sh:minCount 1 ;
        sh:maxCount 1 ;
    ] ;
    sh:property [
        sh:path state:enables ;
        sh:name "Activities" ;
        sh:class process:Activity ;
    ] ;
    sh:property [
        sh:path base:description ;
        sh:name "Description" ;
        dash:editor dash:TextAreaEditor ;
        sh:maxCount 1 ;
    ] ;
    .
```

## Transitions

Define the transitions of the state machine.

```table-editor
---
columns: { focus: { label: "Transition" } }
---
@prefix sh: <http://www.w3.org/ns/shacl#> .
@prefix oml: <http://opencaesar.io/oml#> .
@prefix dash: <http://datashapes.org/dash#> .
@prefix base: <https://www.modelware.io/sierra/base#> .
@prefix entity: <https://www.modelware.io/sierra/entity#> .
@prefix process: <https://www.modelware.io/sierra/process#> .
@prefix state: <https://www.modelware.io/sierra/state#> .

state:TransitionShape
    a sh:NodeShape ;
    sh:targetClass state:Transition ;
    sh:property [
        sh:path oml:hasSource ;
        sh:name "Source" ;
        sh:class state:State ;
        sh:minCount 1 ;
        sh:maxCount 1 ;
    ] ;
    sh:property [
        sh:path oml:hasTarget ;
        sh:name "Target" ;
        sh:class state:State ;
        sh:minCount 1 ;
        sh:maxCount 1 ;
    ] ;
    sh:property [
        sh:path state:isTriggeredBy ;
        sh:name "Trigger" ;
        sh:class base:Item ;
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
