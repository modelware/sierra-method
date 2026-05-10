---
name: oml-text
description: 'Use when working with OML source text, syntax, and repository structure, especially if OML MCP is unavailable or the task depends on authoring details that MCP does not expose.'
---

# OML Text Skill

Use this skill when the answer depends on the OML source files themselves rather than the model surface exposed by OML MCP.

## When to use
- OML MCP is unavailable.
- The task is about textual authoring details such as aliases, annotations, comments, file layout, or instruction files.
- You need to compare source declarations across files or inspect syntax that is easier to answer from text.

## Workflow
1. Start from the smallest relevant OML file.
- Prefer the active file, the referenced ontology IRI, or a nearby import.
- Search narrowly before widening scope.

2. Use repository text tools deliberately.
- Use file search and targeted reads to find ontology IRIs, declarations, and property assignments.
- Prefer nearby reads over broad scans.

3. Preserve OML semantics.
- Distinguish vocabulary definitions from description instances.
- Track whether a file is defining terms or assigning instance data.
- Follow `extends`, `uses`, and containment relationships carefully.

4. Escalate to MCP when it becomes the better tool.
If the question turns into model navigation, validation, or structured querying and MCP is available, switch to the `oml-mcp` skill.

## Repository heuristics
- Source OML files are typically under `src/model/oml/`.
- Built artifacts are under `build/` and should not be the default source for answers.
- In this repository, structural containment often lives in system-analysis descriptions such as `components.oml`, while physical-property values may live in neighboring descriptions such as `masses.oml`.

## Response expectations
- State whether the answer comes from source text or model inference.
- Call out assumptions when combining facts across multiple OML files.
  
  @rdfs:comment "A leaf component has no subcomponents"
  concept LeafComponent = mission:Component [
    restricts hasSubcomponent to exactly 0
  ]
  
  // ========== CONCEPTS WITH MULTIPLE EQUIVALENCES ==========
  concept HeavyComponent = 
    mission:Component [restricts hasMass to min 1],
    mission:Component [restricts hasMass to minInclusive 100.0]
  
  // ========== SPECIALIZED CONCEPTS ==========
  concept FunctionalRequirement < mission:Function
  concept HighPriorityFunction < mission:Function
  
  // ========== SCALAR PROPERTY RESTRICTIONS ==========
  concept TestableComponent < mission:Component [
    restricts hasId to mission:TenCharString
    restricts hasMass to exactly 1
    restricts hasPowerConsumption to max 1
  ]
  
  // ========== VALUE RESTRICTIONS ==========
  concept StandardAssembly < mission:Assembly & TestableComponent [
    restricts hasSubcomponent to mission:Component
  ]
}
```

### 3. Description - System Instances

```oml
@dc:title "Spacecraft System Components"
@dc:creator "Mission Design Team"
description <http://com.xyz/missions/europa/components#> as components {
  uses <http://com.xyz/methodology/mission#> as mission
  
  // ========== CONCEPT INSTANCES ==========
  @rdfs:comment "Main spacecraft bus"
  instance Spacecraft : mission:Assembly [
    mission:hasId "SC-001"
    mission:hasMass 1500.0
    mission:hasPowerConsumption 500.0
    mission:hasSubcomponent PowerSubsystem
    mission:hasSubcomponent PropulsionSubsystem
    mission:hasSubcomponent PayloadSubsystem
    mission:performs Communications
    mission:performs Navigation
    mission:performs ScienceDataCollection
  ]
  
  @rdfs:comment "Power generation and distribution"
  instance PowerSubsystem : mission:Component [
    mission:hasId "PWR-001"
    mission:hasMass 200.0
    mission:hasPowerConsumption 50.0
    mission:presents PowerOutput
    mission:performs PowerGeneration
    mission:performs PowerDistribution
  ]
  
  @rdfs:comment "Propulsion system"
  instance PropulsionSubsystem : mission:MechanicalComponent [
    mission:hasId "PROP-001"
    mission:hasMass 300.0
    mission:hasPowerConsumption 150.0
    mission:performs Thrust
    mission:performs AttitudeControl
  ]
  
  instance PayloadSubsystem : mission:Component [
    mission:hasId "PLD-001"
    mission:hasMass 100.0
    mission:presents DataOutput
  ]
  
  // ========== FUNCTION INSTANCES ==========
  instance Communications : mission:Function [
    mission:hasId "FN-COM"
    mission:hasName "Communications"
    mission:isAbstract false
    mission:invokes DataProcessing
  ]
  
  instance Navigation : mission:Function [
    mission:hasId "FN-NAV"
    mission:hasName "Navigation"
    mission:isAbstract false
  ]
  
  instance ScienceDataCollection : mission:Function [
    mission:hasId "FN-SCI"
    mission:hasName "Science Data Collection"
    mission:invokes DataProcessing
    mission:invokes DataStorage
  ]
  
  instance PowerGeneration : mission:Power [
    mission:hasId "FN-PWR-GEN"
    mission:hasName "Power Generation"
  ]
  
  instance PowerDistribution : mission:Power [
    mission:hasId "FN-PWR-DST"
    mission:hasName "Power Distribution"
  ]
  
  instance Thrust : mission:Function [
    mission:hasId "FN-THR"
    mission:hasName "Thrust"
  ]
  
  instance AttitudeControl : mission:Function [
    mission:hasId "FN-ATT"
    mission:hasName "Attitude Control"
  ]
  
  instance DataProcessing : mission:Function [
    mission:hasId "FN-DAT-PRC"
    mission:hasName "Data Processing"
  ]
  
  instance DataStorage : mission:Function [
    mission:hasId "FN-DAT-STO"
    mission:hasName "Data Storage"
  ]
  
  // ========== INTERFACE INSTANCES ==========
  instance PowerOutput : mission:OutputInterface [
    mission:hasId "IF-PWR-OUT"
  ]
  
  instance DataOutput : mission:OutputInterface [
    mission:hasId "IF-DAT-OUT"
  ]
  
  // ========== RELATION INSTANCES ==========
  @rdfs:comment "PowerSubsystem provides PowerGeneration function"
  relation instance RelationInstanceName : RelationEntityName [
    from SourceEntityIri
    to TargetEntityIri
    mission:hasPriority 10
  ]
  
  @rdfs:comment "Spacecraft performs Communications with priority"
  relation instance Performs1 : mission:Performs [
    from Spacecraft
    to Communications
    mission:hasPriority 8
  ]
}
```

### 4. Description with Anonymous Instances

```oml
description <http://com.xyz/missions/europa/detailed#> as detailed {
  uses <http://com.xyz/methodology/mission#> as mission
  extends <http://com.xyz/missions/europa/components#> as components
  
  // Anonymous concept instances
  instance DetailedPowerSubsystem : mission:Component [
    mission:hasId "PWR-002"
    // Anonymous instance as property value
    mission:hasSubcomponent : mission:Component [
      mission:hasId "BAT-001"
      mission:hasMass 25.0
    ]
    mission:hasSubcomponent : mission:Component [
      mission:hasId "SOL-001"  
      mission:hasMass 50.0
    ]
  ]
  
  // Anonymous relation instances  
  instance ComplexComponent : mission:Component [
    mission:hasId "CMP-001"
    // Anonymous relation instance with properties
    mission:performs components:Communications [
      mission:hasPriority 5
    ]
  ]
}
```

### 5. Vocabulary Bundle

```oml
@dc:title "Foundation Methodology Bundle"
@dc:description "Closed-world bundle of foundational vocabularies"
vocabulary bundle <http://com.xyz/methodology/foundation#> as foundation {
  includes <http://com.xyz/methodology/mission#>
  includes <http://com.xyz/methodology/project#>
  includes <http://com.xyz/methodology/requirements#>
}

@dc:title "Cyber-Physical Systems Bundle"
vocabulary bundle <http://com.xyz/methodology/cyber-physical#> as cyber-physical {
  extends <http://com.xyz/methodology/foundation#>
  includes <http://com.xyz/methodology/electrical#>
  includes <http://com.xyz/methodology/mechanical#>
  includes <http://com.xyz/methodology/software#>
}
```

### 6. Description Bundle

```oml
@dc:title "Europa Mission Dataset"
@dc:description "Complete dataset for Europa mission analysis"
description bundle <http://com.xyz/missions/europa#> as europa {
  uses <http://com.xyz/methodology/foundation#>
  includes <http://com.xyz/missions/europa/components#>
  includes <http://com.xyz/missions/europa/functions#>
  includes <http://com.xyz/missions/europa/requirements#>
}

@dc:title "Europa Mission Design 1"
description bundle <http://com.xyz/missions/europa/design1#> as design1 {
  extends <http://com.xyz/missions/europa#>
  uses <http://com.xyz/methodology/cyber-physical#>
  includes <http://com.xyz/missions/europa/design1/electrical#>
  includes <http://com.xyz/missions/europa/design1/mechanical#>
}
```

### 7. Using References (ref) to Extend Imported Members

```oml
vocabulary <http://com.xyz/methodology/extended-mission#> as extended {
  extends <http://com.xyz/methodology/mission#> as mission
  extends <http://www.w3.org/2001/XMLSchema#> as xsd
  
  // ========== REFERENCING IMPORTED CONCEPTS ==========
  // Add additional axioms to an imported concept
  @rdfs:comment "Adding restrictions to imported Component concept"
  ref concept mission:Component [
    // Add a new key axiom to the imported concept
    key hasSerialNumber
    // Add a new restriction
    restricts hasCost to min 1
  ]
  
  // Add specialization to an imported aspect
  @rdfs:comment "Component now also specializes Container"
  ref aspect mission:Container < mission:IdentifiedElement
  
  // ========== REFERENCING IMPORTED SCALARS ==========
  // Add equivalence axiom to an imported scalar
  ref scalar mission:TenCharString [
    pattern "^[A-Z]{10}$"  // Further restrict to uppercase letters
  ]
  
  // ========== REFERENCING IMPORTED PROPERTIES ==========
  // Add domain/range or other axioms to imported properties
  @rdfs:comment "Extending hasId property with additional domain"
  ref scalar property mission:hasId [
    domain ExtendedComponent
  ]
  
  // Add equivalence to imported property
  ref scalar property mission:hasMass = hasWeight
  
  // ========== REFERENCING IMPORTED RELATIONS ==========
  // Add restrictions to imported relation
  @rdfs:comment "Adding symmetric flag to imported relation"
  ref relation mission:hasSubcomponent [
    from ExtendedComponent
    transitive  // Make it transitive in this context
  ]
  
  // ========== REFERENCING IMPORTED RELATION ENTITIES ==========
  // Add properties or restrictions to imported relation entity
  @rdfs:comment "Extending Performs relation entity"
  ref relation entity mission:Performs [
    key hasPriority, hasTimestamp
  ]
  
  // ========== REFERENCING IMPORTED RULES ==========
  // Cannot add axioms to rules, but can reference them in documentation
  @rdfs:comment "This vocabulary extends mission:TransitivePerformance rule"
  ref rule mission:TransitivePerformance
  
  // new concept
  concept Example

  // more axioms about local concepets
  ref concept Example < SuperTerm

  // ========== NEW DEFINITIONS IN THIS VOCABULARY ==========
  concept ExtendedComponent < mission:Component
  
  scalar property hasSerialNumber [
    domain mission:Component
    range xsd:string
    functional
  ]
  
  scalar property hasCost [
    domain mission:Component
    range xsd:decimal
    functional
  ]
  
  scalar property hasWeight [
    domain mission:Component
    range xsd:decimal
    functional
  ]
  
  scalar property hasTimestamp [
    domain mission:Performs
    range xsd:dateTime
    functional
  ]
}
```

### 8. References in Descriptions

```oml
description <http://com.xyz/missions/europa/extended-components#> as extended-comp {
  uses <http://com.xyz/methodology/mission#> as mission
  extends <http://com.xyz/missions/europa/components#> as components
  
  // ========== REFERENCING IMPORTED INSTANCES ==========
  // Add additional property assertions to imported instance
  @rdfs:comment "Adding more details to the imported Spacecraft instance"
  ref instance components:Spacecraft [
    // Add new property values
    mission:hasSerialNumber "SC-001-EXT"
    // Add new relations
    mission:hasSubcomponent AdditionalSensor
  ]
  
  // Add type assertions to imported instance
  @rdfs:comment "Spacecraft is also a TestableComponent"
  ref instance components:PowerSubsystem : mission:Component, analysis:TestableComponent [
    // Add additional properties
    mission:hasCost 1500000.0
  ]
  
  // ========== REFERENCING RELATION INSTANCES ==========
  // Add properties to imported relation instance
  @rdfs:comment "Adding timestamp to existing relation"
  ref relation instance components:Performs1 [
    mission:hasTimestamp "2024-11-18T10:00:00Z"^^xsd:dateTime
  ]
  
  // ========== NEW INSTANCES ==========
  instance AdditionalSensor : mission:Component [
    mission:hasId "SENS-001"
    mission:hasMass 5.0
  ]
}
```

### 9. Advanced Features

```oml
vocabulary <http://com.xyz/methodology/advanced#> as advanced {
  extends <http://www.w3.org/2001/XMLSchema#> as xsd
  extends <http://www.w3.org/2003/11/swrlb#> as swrlb
  
  // ========== INSTANCE ENUMERATION ==========
  concept PrimaryColor [
    oneOf RGB_Red, RGB_Green, RGB_Blue
  ]
  
  // ========== PROPERTY EQUIVALENCE ==========
  scalar property mass [
    domain Component
    range xsd:decimal
  ]
  
  scalar property weight = mass
  
  // ========== PROPERTY SPECIALIZATION ==========
  relation parentOf [
    from Person
    to Person
  ]
  
  relation motherOf < parentOf [
    from Woman
    to Person
  ]
  
  // ========== SELF RESTRICTION ==========
  concept SelfReliantSystem [
    restricts dependsOn to self
  ]
  
  // ========== COMPLEX RULES WITH BUILTINS ==========
  
  rule VolumeCalculation [
    Component(c) & 
    hasLength(c, l) & 
    hasWidth(c, w) & 
    hasHeight(c, h) &
    builtIn(swrlb:multiply, temp, l, w) &
    builtIn(swrlb:multiply, vol, temp, h)
    -> hasVolume(c, vol)
  ]
  
  rule StringStartsWith [
    hasId(x, id) & 
    builtIn(swrlb:startsWith, id, "TEST")
    -> TestComponent(x)
  ]
}
```

### 10. Complex Reference Pattern - Multiple Extensions

```oml
vocabulary <http://com.xyz/methodology/base#> as base {
  extends <http://www.w3.org/2001/XMLSchema#> as xsd
  
  // Base definitions
  aspect IdentifiedElement
  
  concept Element
  
  scalar property hasId [
    domain IdentifiedElement
    range xsd:string
    functional
  ]
}

vocabulary <http://com.xyz/methodology/layer1#> as layer1 {
  extends <http://com.xyz/methodology/base#> as base
  
  // Reference and extend base definitions
  ref aspect base:IdentifiedElement [
    key base:hasId
  ]
  
  ref concept base:Element < base:IdentifiedElement
  
  // Add new specialization
  concept SpecialElement < base:Element
}

vocabulary <http://com.xyz/methodology/layer2#> as layer2 {
  extends <http://com.xyz/methodology/layer1#> as layer1
  extends <http://com.xyz/methodology/base#> as base
  
  // Further extend through layers
  ref concept layer1:SpecialElement [
    restricts base:hasId to base:TenCharString
  ]
  
  // Can reference base directly too
  ref aspect base:IdentifiedElement < Documentable
  
  aspect Documentable
}
```

## Understanding References (ref)

### What are References?
References allow you to extend or add axioms to members defined in imported ontologies without redefining them. Use `ref` followed by the member type keyword and the member's IRI.

### When to Use References
- **Adding axioms** to imported members (keys, restrictions, equivalences)
- **Extending** imported members with additional specializations
- **Annotating** imported members
- **Cannot** change the fundamental definition (e.g., can't change domains/ranges on definitions, only add to them)

### Reference Limitations
- **Rules and BuiltIns**: Can only be referenced for documentation/annotation purposes, cannot add axioms
- **Cannot remove axioms**: References only add, never remove or modify existing axioms
- **Must import**: The referenced member must be from a directly imported ontology

### Key Differences: Definition vs Reference
```oml
// DEFINITION - Creates new member
concept MyComponent [
  key hasId
]

// REFERENCE - Extends existing imported member  
ref concept imported:Component [
  key hasSerialNumber  // Adds additional key
]
```

## Best Practices

### 1. Naming Conventions
- **UpperCamelCase**: Concepts, Aspects, Relation Entities, Scalars (e.g., `Component`, `IdentifiedElement`)
- **lowerCamelCase**: Properties, relations, instances (e.g., `hasId`, `performs`, `powerSubsystem`)
- **Prefix IDs**: Short, memorable (e.g., `mission`, `xsd`, `base`)

### 2. Namespace Structure
- Use hierarchical IRIs: `http://<domain>/<category>/<subcategory>#`
- Match file paths to IRI structure
- Example: `http://imce.jpl.nasa.gov/foundation/base#` → `imce.jpl.nasa.gov/foundation/base.oml`

### 3. Import Management
- Import only what you need to reference
- Use specific imports over transitive dependencies
- Define clear import hierarchies

### 4. Documentation
- Add `@rdfs:comment` annotations to all major elements
- Use Dublin Core annotations (`@dc:title`, `@dc:creator`, `@dc:date`) on ontologies
- Document design rationale in comments

### 5. Restriction Guidelines
- Use `restricts all` for type safety
- Use `restricts some` for existence requirements
- Use cardinality restrictions for precise counts
- Prefer relation entities when properties need their own properties

### 6. Rule Design
- Keep rules simple and focused
- Document rule purpose with annotations
- Test rules incrementally
- Use builtin predicates for calculations

## Common Patterns

### Pattern 1: Typed Containment
```oml
concept System [
  restricts all contains to Component
  restricts contains to min 1
]

relation contains [
  from System
  to Component
  asymmetric
  irreflexive
]
```

### Pattern 2: Bidirectional Relations
```oml
relation entity Connects [
  from Component
  to Component  
  forward connects
  reverse isConnectedBy
  symmetric
]
```

### Pattern 3: Functional Properties with Keys
```oml
concept Component [
  key hasSerialNumber
]

scalar property hasSerialNumber [
  domain Component
  range xsd:string
  functional
]
```

### Pattern 4: Property Chains via Rules
```oml
rule PropertyChain [
  parentOf(x, y) & parentOf(y, z)
  -> grandparentOf(x, z)
]
```

## Validation Reminders
- All IRIs must be valid
- Referenced members must be imported (direct import required)
- Restriction ranges must be subtypes of property ranges
- Keys must use functional properties
- Relation entities need both `from` and `to` specified
- Standard scalars (xsd:*, owl:*, rdf:*) require project dependencies

## Common Errors to Avoid
1. **Circular dependencies** in imports
2. **Missing imports** for cross-referenced members
3. **Invalid IRI characters** (no whitespace, no path separators in IDs)
4. **Inconsistent separators** (mixing # and / in namespaces)
5. **Non-functional properties in keys**
6. **Restricting to types outside property range**
7. **Using relation entity names instead of forward/reverse names**
8. **Forgetting ^ escape for keyword ID

