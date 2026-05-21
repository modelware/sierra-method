---
template:
  id: https://www.modelware.io/sierra/operational-analysis/scenarios
  name: "Scenarios"
  rank: 0
  expose:
    - kind: compose
  params:
    - id: ontology
      type: iri
      defaultValue: ${context.ontology}
      required: true
---
# Scenario

Create scenarios showing lifelines of entities interacting at certain timepoints.

```tree-editor
---
columns: { focus: { label: "Scenario" } }
---
@prefix sh: <http://www.w3.org/ns/shacl#> .
@prefix dash: <http://datashapes.org/dash#> .
@prefix base: <https://www.modelware.io/sierra/base#> .
@prefix entity: <https://www.modelware.io/sierra/entity#> .
@prefix process: <https://www.modelware.io/sierra/process#> .
@prefix scenario: <https://www.modelware.io/sierra/scenario#> .

scenario:ScenarioShape
    a sh:NodeShape ;
    sh:targetClass scenario:Scenario ;
    sh:property [
        sh:path base:description ;
        sh:name "Description" ;
        dash:editor dash:TextAreaEditor ;
        sh:maxCount 1 ;
    ] ;
    .

scenario:LifelineShape
    a sh:NodeShape ;
    sh:targetClass scenario:Lifeline ;
    sh:property [
        sh:path scenario:lifelineOf ;
        sh:name "Container" ;
        sh:class scenario:Scenario ;        
        sh:minCount 1 ;
        sh:maxCount 1 ;
        dash:composite true ;
    ] ;
    sh:property [
        sh:path scenario:represents ;
        sh:name "Entity" ;
        sh:class entity:Entity ;        
        sh:minCount 1 ;
        sh:maxCount 1 ;
        sh:order 1 ;
    ] ;
    sh:property [
        sh:path base:description ;
        sh:name "Description" ;
        dash:editor dash:TextAreaEditor ;
        sh:maxCount 1 ;
    ] ;
    .

scenario:TimePointShape
    a sh:NodeShape ;
    sh:targetClass scenario:TimePoint ;
    sh:property [
        sh:path scenario:occursOn ;
        sh:name "Container" ;
        sh:class scenario:Lifeline ;        
        sh:minCount 1 ;
        sh:maxCount 1 ;
        dash:composite true ;
    ] ;
    sh:property [
        sh:path scenario:after ;
        sh:name "After" ;
        sh:class scenario:TimePoint ;        
        sh:maxCount 1 ;
        sh:order 2 ;        
    ] ;
    .
```

# Messages

Create messages sending items between two time points on lifelines.

```table-editor
---
columns: { focus: { label: "Message" } }
---
@prefix sh: <http://www.w3.org/ns/shacl#> .
@prefix dash: <http://datashapes.org/dash#> .
@prefix base: <https://www.modelware.io/sierra/base#> .
@prefix entity: <https://www.modelware.io/sierra/entity#> .
@prefix process: <https://www.modelware.io/sierra/process#> .
@prefix scenario: <https://www.modelware.io/sierra/scenario#> .

scenario:MessageShape
    a sh:NodeShape ;
    sh:targetClass scenario:Message ;
    sh:property [
        sh:path scenario:startsAt ;
        sh:name "Source" ;
        sh:class scenario:TimePoint ;        
        sh:minCount 1 ;
        sh:maxCount 1 ;
    ] ;
    sh:property [
        sh:path scenario:endsAt ;
        sh:name "Target" ;
        sh:class scenario:TimePoint ;        
        sh:minCount 1 ;
        sh:maxCount 1 ;
    ] ;
    sh:property [
        sh:path scenario:carries ;
        sh:name "Item" ;
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

# Executions

Create executions of activities between two time points on the same lifelines.

```table-editor
---
columns: { focus: { label: "Execution" } }
---
@prefix sh: <http://www.w3.org/ns/shacl#> .
@prefix dash: <http://datashapes.org/dash#> .
@prefix base: <https://www.modelware.io/sierra/base#> .
@prefix entity: <https://www.modelware.io/sierra/entity#> .
@prefix process: <https://www.modelware.io/sierra/process#> .
@prefix scenario: <https://www.modelware.io/sierra/scenario#> .
@prefix state: <https://www.modelware.io/sierra/state#> .

scenario:ExecutionShape
    a sh:NodeShape ;
    sh:targetClass scenario:Execution ;
    sh:property [
        sh:path scenario:startsAt ;
        sh:name "Source" ;
        sh:class scenario:TimePoint ;        
        sh:minCount 1 ;
        sh:maxCount 1 ;
    ] ;
    sh:property [
        sh:path scenario:endsAt ;
        sh:name "Target" ;
        sh:class scenario:TimePoint ;        
        sh:minCount 1 ;
        sh:maxCount 1 ;
    ] ;
    sh:property [
        sh:path scenario:executes ;
        sh:name "Activity" ;
        sh:class process:Activity ;        
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

# State Fragments

Create state fragments checking states at certain timepoints on lifelines.

```table-editor
---
columns: { focus: { label: "State Fragment" } }
---
@prefix sh: <http://www.w3.org/ns/shacl#> .
@prefix dash: <http://datashapes.org/dash#> .
@prefix base: <https://www.modelware.io/sierra/base#> .
@prefix entity: <https://www.modelware.io/sierra/entity#> .
@prefix process: <https://www.modelware.io/sierra/process#> .
@prefix scenario: <https://www.modelware.io/sierra/scenario#> .
@prefix state: <https://www.modelware.io/sierra/state#> .

scenario:StateFragmentShape
    a sh:NodeShape ;
    sh:targetClass scenario:StateFragment ;
    sh:property [
        sh:path scenario:atTime ;
        sh:name "At" ;
        sh:class scenario:TimePoint ;        
        sh:minCount 1 ;
        sh:maxCount 1 ;
    ] ;
    sh:property [
        sh:path scenario:checks ;
        sh:name "State" ;
        sh:class state:State ;        
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
