---
ontology: https://fireforce6.github.io/mission-control/bundle
---

# Entities (Python)

```python
import micropip
await micropip.install(['matplotlib', 'pandas'])
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import pandas as pd
import io, base64

frag = lambda iri: (iri or '').split('#')[-1].split('/')[-1]

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
entities     = sorted({r.get('entityLabel')     or frag(r.get('entity',''))     for r in rows})
capabilities = sorted({r.get('capabilityLabel') or frag(r.get('capability','')) for r in rows})

matrix = pd.DataFrame(0, index=entities, columns=capabilities)
for r in rows:
    e = r.get('entityLabel')     or frag(r.get('entity',''))
    c = r.get('capabilityLabel') or frag(r.get('capability',''))
    matrix.loc[e, c] = 1

fig, ax = plt.subplots(figsize=(max(6, len(capabilities) * 0.7), max(3, len(entities) * 0.6)))
im = ax.imshow(matrix.values, cmap='Blues', vmin=0, vmax=1, aspect='auto')

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

buf = io.BytesIO()
plt.savefig(buf, format='png', dpi=130, bbox_inches='tight')
plt.close()
buf.seek(0)
b64 = base64.b64encode(buf.read()).decode()
display(f'<img src="data:image/png;base64,{b64}" style="max-width:100%;border-radius:4px">')
```

# Activities (R)

```r
frag <- function(iri) { parts <- strsplit(iri, "[#/]")[[1]]; tail(parts[nchar(parts) > 0], 1) }

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

entity_label <- if (!is.null(result$entityLabel)) result$entityLabel else rep("", nrow(result))
labels <- ifelse(
  !is.na(entity_label) & nchar(entity_label) > 0,
  entity_label,
  sapply(result$entity, frag)
)

counts <- sort(base::table(labels), decreasing = TRUE)
maxval <- if (length(counts) > 0) max(counts) else 1
palette <- c("#4a90d9","#e67e22","#27ae60","#8e44ad","#c0392b","#16a085","#d35400","#2980b9")

bars <- sapply(seq_along(counts), function(i) {
  pct <- max(4, round(as.integer(counts[i]) / maxval * 70))
  col <- palette[(i - 1L) %% length(palette) + 1L]
  paste0(
    '<div style="display:flex;align-items:center;margin:4px 0">',
    '<div style="width:140px;text-align:right;padding-right:10px;font-size:13px;color:#333;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">', names(counts)[i], '</div>',
    '<div style="background:', col, ';width:', pct, '%;height:20px;border-radius:3px;min-width:4px"></div>',
    '<div style="padding-left:8px;font-size:13px;color:#555">', as.integer(counts[i]), '</div>',
    '</div>'
  )
})

display(paste0(
  '<div style="padding:12px 4px">',
  '<div style="font-weight:600;font-size:14px;margin-bottom:8px;color:#222">Activities Allocated per Entity</div>',
  paste(bars, collapse=""),
  '</div>'
))
```

# Flows (Javascript)

```javascript
await load('https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.min.js');

const frag = iri => iri.split(/[#\/]/).pop();
const toId = iri => frag(iri).replace(/\W/g, '_');

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

mermaid.initialize({ startOnLoad: false, theme: 'default' });
const { svg } = await mermaid.render('mmd' + Date.now(), def);
display(svg);
```
