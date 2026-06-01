---
ontology: https://fireforce6.github.io/mission-control/bundle
---

# Entities (Python)

```python
async def increment_mass(event=None):
    result = await query("""
        PREFIX oml: <http://opencaesar.io/oml#>
        PREFIX component: <https://www.modelware.io/sierra/component#>
        PREFIX components: <https://fireforce6.github.io/mission-control/system-analysis/components#>
        SELECT ?value ?unit
        WHERE {
            components:PrimaryLens component:mass ?qty .
            ?qty oml:value ?value .
            OPTIONAL { ?qty oml:unit ?unit }
        }
    """)
    row = result['rows'][0]
    current = float(row['value'])
    unit_iri = row.get('unit') or 'http://opencaesar.io/si/kg'
    await update({
        'kind': 'updateAssertion',
        'descriptionIri': 'https://fireforce6.github.io/mission-control/system-analysis/masses',
        'subjectIri': 'https://fireforce6.github.io/mission-control/system-analysis/components#PrimaryLens',
        'predicateIri': 'https://www.modelware.io/sierra/component#mass',
        'object': { 'value': round(current + 0.1, 10), 'unitIri': unit_iri }
    })

display(interactive('<button>Click</button> to increment mass of Primary Lens by 0.1', increment_mass))
```

```python
include('src/method/py/utils.py')
import micropip
await micropip.install(['matplotlib', 'pandas'])
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import pandas as pd

result = await query("""
  PREFIX oml: <http://opencaesar.io/oml#>
  PREFIX entity: <https://www.modelware.io/sierra/entity#>
  SELECT ?entity ?entityLabel ?capability ?capabilityLabel
  WHERE {
    ?entity a entity:Entity ;
            entity:hasCapability ?capability .
    OPTIONAL { ?entity     oml:label ?entityLabel     }
    OPTIONAL { ?capability oml:label ?capabilityLabel }
  }
  ORDER BY ?entityLabel ?capabilityLabel
""")

rows = result['rows']
entities     = sorted({display_label(r.get('entityLabel'),     r.get('entity',''))     for r in rows})
capabilities = sorted({display_label(r.get('capabilityLabel'), r.get('capability','')) for r in rows})

matrix = pd.DataFrame(0, index=entities, columns=capabilities)
for r in rows:
    e = display_label(r.get('entityLabel'),     r.get('entity',''))
    c = display_label(r.get('capabilityLabel'), r.get('capability',''))
    matrix.loc[e, c] = 1

fig, ax = plt.subplots(figsize=(max(6, len(capabilities) * 0.7), max(3, len(entities) * 0.6)))
ax.imshow(matrix.values, cmap='Blues', vmin=0, vmax=1, aspect='auto')

ax.set_xticks(range(len(capabilities)))
ax.set_xticklabels(capabilities, rotation=45, ha='right', fontsize=9)
ax.set_yticks(range(len(entities)))
ax.set_yticklabels(entities, fontsize=9)

for i in range(len(entities)):
    for j in range(len(capabilities)):
        if matrix.values[i, j]:
            ax.text(j, i, '●', ha='center', va='center', fontsize=12, color='#1a5276')

ax.set_xticks([x - 0.5 for x in range(1, len(capabilities))], minor=True)
ax.set_yticks([y - 0.5 for y in range(1, len(entities))], minor=True)
ax.grid(which='minor', color='white', linewidth=1.5)
ax.tick_params(which='minor', length=0)
ax.set_title('Entity × Capability Matrix', fontsize=11, pad=12)
plt.tight_layout()
display(image_html(fig))
```

```python
def say_hello(event=None):
  print("Hello from Python")
  x = 1+2
  print(x)

display(interactive('<button>Say hello</button>', say_hello))
```

# Activities (R)

```r
# R runs in a worker and can't read live at click time, so read at render and let the
# callback capture the value; each update re-renders the block, refreshing it for the next click.
result <- query("
    PREFIX oml: <http://opencaesar.io/oml#>
    PREFIX component: <https://www.modelware.io/sierra/component#>
    PREFIX components: <https://fireforce6.github.io/mission-control/system-analysis/components#>
    SELECT ?value ?unit
    WHERE {
        components:PrimaryLens component:mass ?qty .
        ?qty oml:value ?value .
        OPTIONAL { ?qty oml:unit ?unit }
    }
")
current <- as.numeric(result[["value"]][[1]])
unit_iri <- if (length(result[["unit"]]) > 0) result[["unit"]][[1]] else 'http://opencaesar.io/si/kg'

increment_mass <- function(event = NULL) {
    update(list(
        kind = 'updateAssertion',
        descriptionIri = 'https://fireforce6.github.io/mission-control/system-analysis/masses',
        subjectIri = 'https://fireforce6.github.io/mission-control/system-analysis/components#PrimaryLens',
        predicateIri = 'https://www.modelware.io/sierra/component#mass',
        object = list(value = round(current + 0.1, 10), unitIri = unit_iri)
    ))
}

display(interactive('<button>Click</button> to increment mass of Primary Lens by 0.1', increment_mass))
```

```r
include('src/method/r/utils.r')

result <- query("
  PREFIX oml: <http://opencaesar.io/oml#>
  PREFIX process: <https://www.modelware.io/sierra/process#>
  SELECT ?activity ?activityLabel ?entity ?entityLabel
  WHERE {
    ?activity a process:Activity ;
              process:isAllocatedTo ?entity .
    OPTIONAL { ?activity oml:label ?activityLabel }
    OPTIONAL { ?entity   oml:label ?entityLabel   }
  }
  ORDER BY ?entityLabel ?activityLabel
")

labels <- display_label(result$entityLabel, result$entity)
counts <- sort(base::table(labels), decreasing = TRUE)
bar_chart(names(counts), as.integer(counts), "Activities Allocated per Entity")

render_mermaid("graph LR\n  A[Start] --> B[End]")
```

# Flows (Javascript)

```javascript
async function incrementMass() {
  const result = await query(`
    PREFIX oml: <http://opencaesar.io/oml#>
    PREFIX component: <https://www.modelware.io/sierra/component#>
    PREFIX components: <https://fireforce6.github.io/mission-control/system-analysis/components#>
    SELECT ?value ?unit
    WHERE {
      components:PrimaryLens component:mass ?qty .
      ?qty oml:value ?value .
      OPTIONAL { ?qty oml:unit ?unit }
    }
  `);
  const row = result.rows[0];
  const current = Number(row.value);
  const unitIri = row.unit ?? 'http://opencaesar.io/si/kg';
  await update({
    kind: 'updateAssertion',
    descriptionIri: 'https://fireforce6.github.io/mission-control/system-analysis/masses',
    subjectIri: 'https://fireforce6.github.io/mission-control/system-analysis/components#PrimaryLens',
    predicateIri: 'https://www.modelware.io/sierra/component#mass',
    object: { value: Math.round((current + 0.1) * 1e10) / 1e10, unitIri }
  });
}

display(interactive('<button>Click</button> to increment mass of Primary Lens by 0.1', incrementMass));
```


```javascript
await include('src/method/js/utils.js')
await load('https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.min.js');

const result = await query(`
  PREFIX oml: <http://opencaesar.io/oml#>
  PREFIX process: <https://www.modelware.io/sierra/process#>
  SELECT ?source ?sourceLabel ?target ?targetLabel ?item ?itemLabel
  WHERE {
    ?flow a process:Flow ;
          oml:hasSource ?source ;
          oml:hasTarget ?target .
    OPTIONAL { ?source oml:label ?sourceLabel }
    OPTIONAL { ?target oml:label ?targetLabel }
    OPTIONAL {
      ?flow process:flows ?item .
      OPTIONAL { ?item oml:label ?itemLabel }
    }
  }
  ORDER BY ?source ?target ?item
`);

// Group items by (source, target) edge
const edges = new Map();
for (const row of result.rows) {
  const key = `${row.source}|||${row.target}`;
  if (!edges.has(key)) {
    edges.set(key, { srcId: toId(row.source), srcLabel: row.sourceLabel || frag(row.source),
                     tgtId: toId(row.target), tgtLabel: row.targetLabel || frag(row.target), items: [] });
  }
  if (row.item) {
    const label = row.itemLabel || frag(row.item);
    if (!edges.get(key).items.includes(label)) edges.get(key).items.push(label);
  }
}

// Build Mermaid flowchart definition
const declared = new Set();
let def = 'flowchart TD\n';
for (const { srcId, srcLabel, tgtId, tgtLabel, items } of edges.values()) {
  if (!declared.has(srcId)) { def += `  ${srcId}["${srcLabel}"]\n`; declared.add(srcId); }
  if (!declared.has(tgtId)) { def += `  ${tgtId}["${tgtLabel}"]\n`; declared.add(tgtId); }
  const label = items.length ? `|"${items.join(', ')}"| ` : '';
  def += `  ${srcId} -->${label}${tgtId}\n`;
}

renderMermaid(def);
```
