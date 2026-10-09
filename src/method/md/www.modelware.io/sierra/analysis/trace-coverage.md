---
template:
  id: https://www.modelware.io/sierra/analysis/trace-coverage
  name: "Trace Coverage"
  rank: 0
  expose:
    - kind: compose
  params:
    - id: ontology
      type: iri
      defaultValue: ${context.ontology}
      required: true
    - id: title
      type: string
      required: true
      description: Heading shown for this coverage section
    - id: rowClass
      type: iri
      required: true
      description: Class whose instances are the source (rows) of the trace
    - id: relation
      type: iri
      required: true
      description: Relation that traces a row instance to a column instance
    - id: columnClass
      type: iri
      required: true
      description: Class whose instances are the target (columns) of the trace
    - id: rowLabel
      type: string
      defaultValue: "Source"
    - id: columnLabel
      type: string
      defaultValue: "Target"
---
### ${title}

Coverage of `${rowLabel} → ${columnLabel}` through `<${relation}>`. Each cell counts the links between a row element and a column element. Every row × column pair is listed, so a **0 is a link that is not there**, not a blank. A row with all zeros is an untraced ${rowLabel}. A column with all zeros is a ${columnLabel} that nothing traces to.

```matrix
---
rowColumnLabel: "${rowLabel} / ${columnLabel}"
stylesheet:
  - selector: cell[Number(value) === 0]
    style:
      color: "#9CA3AF"
  - selector: cell[Number(value) > 0]
    style:
      background-color: "#D1FAE5"
      font-weight: 600
  - selector: row[cells.every(c => Number(c) === 0)]
    style:
      background-color: "#FEE2E2"
  - selector: column[cells.every(c => Number(c) === 0)]
    style:
      background-color: "#FEF3C7"
---
SELECT ?row ?column (COALESCE(?n, 0) AS ?value)
WHERE {
  ?r a <${rowClass}> .
  ?c a <${columnClass}> .
  BIND(REPLACE(STR(?r), "^.*[#/]", "") AS ?row)
  BIND(REPLACE(STR(?c), "^.*[#/]", "") AS ?column)
  OPTIONAL {
    SELECT ?r ?c (COUNT(*) AS ?n)
    WHERE { ?r <${relation}> ?c . }
    GROUP BY ?r ?c
  }
}
ORDER BY ?row ?column
```

**Untraced ${rowLabel} elements** (`FILTER NOT EXISTS`). If this table is empty, every ${rowLabel} has at least one link.

```table
---
stylesheet:
  - selector: cell[col === "Status"]
    target: value
    style:
      padding: 4px 12px
      border-radius: 999px
      font-size: 12px
      font-weight: 600
      color: "#ffffff"
      background-color: "#DC2626"
---
PREFIX base: <https://www.modelware.io/sierra/base#>

SELECT ?Element ?Description ("UNTRACED" AS ?Status)
WHERE {
  ?r a <${rowClass}> .
  FILTER NOT EXISTS { ?r <${relation}> ?c . ?c a <${columnClass}> . }
  OPTIONAL { ?r base:description ?Description }
  BIND(REPLACE(STR(?r), "^.*[#/]", "") AS ?Element)
}
ORDER BY ?Element
```
