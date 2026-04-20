---
template:
  id: https://www.modelware.io/sierra/system-analysis/test
  name: "Test"
  rank: 0
  expose:
    - kind: call
      selection:
        min: 2
        max: 2
  params:
    - id: ontology
      type: iri
      from: context.ontology
      required: true
    - id: source
      type: iri
      from: context.selection[0]
      required: true
    - id: target
      type: iri
      from: context.selection[1]
      required: true
---
# Selection

* ${ontology}
* [[${source}]]
* [[${target}]]