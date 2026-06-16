---
ontology: https://fireforce6.github.io/mission-control/bundle
---

# Entities (Python)

```r
display("Initializing clicks to 0")
store_set("n", "0")
```

```python
def refresh():
    display(f"<b>{store.get('n')}</b> clicks", id="count")

def bump(v=None):
    store.set("n", str(int(store.get("n","0")) + 1))
    refresh()

display(clientWidget('<button>+1</button>', bump))
display('<div id="count"></div>')
refresh()
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
  PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
  PREFIX entity: <https://www.modelware.io/sierra/entity#>
  SELECT ?entity ?entityLabel ?capability ?capabilityLabel
  WHERE {
    ?entity a entity:Entity ;
            entity:hasCapability ?capability .
    OPTIONAL { ?entity     rdfs:label ?entityLabel     }
    OPTIONAL { ?capability rdfs:label ?capabilityLabel }
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

# Activities (R)

```r
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

display(serverWidget('<button>Click</button> to increment mass of Primary Lens by 0.1', increment_mass))
```

```r
include('src/method/r/utils.r')

result <- query("
  PREFIX oml: <http://opencaesar.io/oml#>
  PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
  PREFIX process: <https://www.modelware.io/sierra/process#>
  SELECT ?activity ?activityLabel ?entity ?entityLabel
  WHERE {
    ?activity a process:Activity ;
              process:isAllocatedTo ?entity .
    OPTIONAL { ?activity rdfs:label ?activityLabel }
    OPTIONAL { ?entity   rdfs:label ?entityLabel   }
  }
  ORDER BY ?entityLabel ?activityLabel
")

labels <- display_label(result$entityLabel, result$entity)
counts <- sort(base::table(labels), decreasing = TRUE)
bar_chart(names(counts), as.integer(counts), "Activities Allocated per Entity")
```

# Flows (Javascript)

```javascript
await include('src/method/js/utils.js')
await load('https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.min.js');

const result = await query(`
  PREFIX oml: <http://opencaesar.io/oml#>
  PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
  PREFIX process: <https://www.modelware.io/sierra/process#>
  SELECT ?source ?sourceLabel ?target ?targetLabel ?item ?itemLabel
  WHERE {
    ?flow a process:Flow ;
          oml:hasSource ?source ;
          oml:hasTarget ?target .
    OPTIONAL { ?source rdfs:label ?sourceLabel }
    OPTIONAL { ?target rdfs:label ?targetLabel }
    OPTIONAL {
      ?flow process:flows ?item .
      OPTIONAL { ?item rdfs:label ?itemLabel }
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

await renderMermaid(def);
```

```python
result = await query("""
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX base: <https://www.modelware.io/sierra/base#>
PREFIX stakeholder: <https://www.modelware.io/sierra/stakeholder#>
SELECT ?label ?category ?description WHERE {
  ?s a stakeholder:Stakeholder ;
     base:category ?category .
  OPTIONAL { ?s rdfs:label ?label }
  OPTIONAL { ?s base:description ?description }
} ORDER BY ?category ?label
""")
rows = result["rows"]
categories = sorted({r.get("category", "") for r in rows if r.get("category")})

def render(sel):
    visible = [r for r in rows if not sel or r.get("category") == sel]
    if not visible:
        display("<p><em>No stakeholders in this category.</em></p>", id="stk-table")
        return
    body = "".join(
        f"<tr><td>{r.get('label','')}</td>"
        f"<td>{r.get('category','')}</td>"
        f"<td>{r.get('description','')}</td></tr>"
        for r in visible
    )
    display(
        '<table class="oml-md-table">'
        '<thead><tr><th>Stakeholder</th><th>Category</th><th>Description</th></tr></thead>'
        f'<tbody>{body}</tbody></table>',
        id="stk-table",
    )

options = '<option value="">All categories</option>' + "".join(
    f"<option>{c}</option>" for c in categories
)
display(clientWidget(f'<label>Category: <select>{options}</select></label>', render))
display('<div id="stk-table"></div>')
render("")
```
