---
template:
  id: http://www.w3.org/2002/07/owl/Property
  name: "Property Overview"
  rank: 0
  expose:
    - kind: navigation
      match:
        anyTypeOf:
          - http://www.w3.org/2002/07/owl#ObjectProperty
          - http://www.w3.org/2002/07/owl#DatatypeProperty
          - http://www.w3.org/2002/07/owl#AnnotationProperty
  params:
    - id: member
      type: iri
      defaultValue: ${context.member}
      required: true
    - id: ontology
      type: iri
      defaultValue: ${context.ontology}
      required: true
---
# [[${member}]]

## Description

```text
PREFIX base: <https://www.modelware.io/sierra/base#>

SELECT ?description
WHERE {
    GRAPH ?g {
        <${member}> base:description ?description .
    }
}
```

## Properties

```table
---
stylesheet:
  - selector: header[name === "g"], column[name === "g"]
    style:
      display: "none"
  - selector: cell[col === "Values" && row.get("g").endsWith("__entailments")]
    target: value
    style:
      padding: 4px 12px
      border-radius: 999px
      font-size: 12px
      background-color: pink
---
PREFIX owl: <http://www.w3.org/2002/07/owl#>
PREFIX oml: <http://opencaesar.io/oml#>
PREFIX base: <https://www.modelware.io/sierra/base#>

SELECT ?g ?Property (GROUP_CONCAT(?Value; separator=", ") AS ?Values)
WHERE {
    GRAPH ?g {
        <${member}> ?Property ?Value .
        FILTER(?Value != owl:NamedIndividual)
        FILTER(?Property != oml:type)
        FILTER(?Property != base:description)
    }
}
GROUP BY ?g ?Property
ORDER BY STRAFTER(STR(?Property), "#")
```

## Relations

```graph
---
expandOnClick: true
stylesheet:
  - selector: node[value === "${member}"]
    style:
      fill: white
  - selector: node[outgoing.some(e => e.target.value.endsWith("__entailments"))]
    style:
      stroke: pink
      fill: pink
  - selector: node[incoming.some(e => e.value.endsWith("#graph"))]
    style:
      display: none
  - selector: edge[value.endsWith("#graph")]
    style:
      display: none
---
PREFIX owl: <http://www.w3.org/2002/07/owl#>
PREFIX oml: <http://opencaesar.io/oml#>

CONSTRUCT {
    <${member}> ?Property ?Value .
    ?Value oml:graph ?g .
}
WHERE {
    GRAPH ?g {
        <${member}> ?Property ?Value .
        FILTER (!isLiteral(?Value))
        FILTER(?Value != owl:NamedIndividual)
        FILTER(?Property != oml:type)
    }
}
```