---
type: <http://www.w3.org/2002/07/owl#Datatype>
priority: 0
---
# [[${contextIri}]]

## Description

```text
PREFIX base: <https://www.modelware.io/sierra/base#>

SELECT ?description
WHERE {
    GRAPH ?g {
        <${contextIri}> base:description ?description .
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
        <${contextIri}> ?Property ?Value .
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
stylesheet:
  - selector: node[value === "${contextIri}"]
    style:
      fill: white
  - selector: node[outgoing.some(e => e.target.value.endsWith("__entailments"))]
    style:
      stroke: pink
      fill: pink
  - selector: node[incoming.some(e => e.value.endsWith("#graph"))]
    style:
      radius: 0
      opacity: 0
      color: none
  - selector: edge[value.endsWith("#graph")]
    style:
      stroke-width: 0
      opacity: 0
      color: none
---
PREFIX owl: <http://www.w3.org/2002/07/owl#>
PREFIX oml: <http://opencaesar.io/oml#>

CONSTRUCT {
    <${contextIri}> ?Property ?Value .
    ?Value oml:graph ?g .
}
WHERE {
    GRAPH ?g {
        <${contextIri}> ?Property ?Value .
        FILTER (!isLiteral(?Value))
        FILTER(?Value != owl:NamedIndividual)
        FILTER(?Property != oml:type)
    }
}
```