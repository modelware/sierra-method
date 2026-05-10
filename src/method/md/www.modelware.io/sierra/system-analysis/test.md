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
      defaultValue: ${context.ontology}
      required: true
    - id: source
      type: iri
      defaultValue: ${context.selection[0]}
      required: true
    - id: target
      type: iri
      defaultValue: ${context.selection[1]}
      required: true
---
# Selection

* ${ontology}
* [[${source}]]
* [[${target}]]