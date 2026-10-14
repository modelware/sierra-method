---
ontology: https://fireforce6.github.io/mission-control/bundle
---

# Fire Force VI: Analysis Dashboard

This page puts an analysis layer over the Fire Force VI Mission Control model. It runs five queries, each asking a different kind of question about the Sierra Method trace chain:

> **Stakeholder → Concern → Objective → Capability → Entity / Process → Activity**

| # | Query | Kind | View |
|---|-------|------|------|
| Q1 | Every stakeholder expresses a concern | Conformance | `table` |
| Q2 | Capabilities one link short of fully realized | Near miss | `chart` + `table` |
| Q3 | Concerns no objective is derived from | Orphan (`FILTER NOT EXISTS`, `!BOUND`) | `table` (Question → Evidence → Interpretation) |
| Q4 | Stakeholder × Objective coverage | Coverage (explicit 0s) | `matrix` |
| Q5 | Trace graph with gaps flagged | View graph (`CONSTRUCT`) | `diagram` |
| — | Trace health score | Scripted query → compute → render | `javascript` |
| — | Concern → Objective coverage | Reusable compose template | `compose` |

The [Allocation Review](Allocation%20Review.md) page calls the same compose template on different classes.

---

## Q1: Conformance (does every stakeholder express a concern?)

**Method rule (Context Analysis, step 2: *Elicit Stakeholder Concerns*):** each identified stakeholder must express at least one concern. A stakeholder with no concern adds nothing to the trace, so either the stakeholder or a concern is missing.

```table
---
orderBy: "Verdict asc"
stylesheet:
  - selector: cell[col === "Verdict"]
    target: value
    style:
      padding: 4px 12px
      border-radius: 999px
      font-size: 12px
      font-weight: 600
      color: "#ffffff"
  - selector: cell[col === "Verdict" && value === "PASS"]
    target: value
    style:
      background-color: "#10B981"
  - selector: cell[col === "Verdict" && value === "FAIL"]
    target: value
    style:
      background-color: "#DC2626"
---
PREFIX stakeholder: <https://www.modelware.io/sierra/stakeholder#>

SELECT ?Stakeholder (COUNT(DISTINCT ?concern) AS ?Concerns)
       (IF(COUNT(DISTINCT ?concern) > 0, "PASS", "FAIL") AS ?Verdict)
WHERE {
  ?s a stakeholder:Stakeholder .
  OPTIONAL { ?s stakeholder:expresses ?concern }
  BIND(REPLACE(STR(?s), "^.*[#/]", "") AS ?Stakeholder)
}
GROUP BY ?Stakeholder
ORDER BY ?Verdict ?Stakeholder
```

**Result:** 7 of 8 stakeholders pass. **ForestryDepartment fails:** it is in the model but expresses no concern, so nothing downstream can trace back to it.

---

## Q2: Near miss (which capabilities are one link short?)

**Condition:** a capability is *fully realized* when it has all three links:
- **required by** an objective (why it exists)
- **assigned to** an entity (who provides it)
- **described by** a process (how it works)

The score counts how many of the three links are present. A score of 2/3 is a near miss: one modeling step from complete.

```chart
---
type: bar
data:
  labels: Capability
  datasets:
    - label: Links present (of 3)
      data: Score
      backgroundColor: "#4a90d9"
options:
  plugins:
    title:
      display: true
      text: Capability Realization Score
    legend:
      display: false
  scales:
    y:
      beginAtZero: true
      max: 3
      ticks:
        stepSize: 1
---
PREFIX mission: <https://www.modelware.io/sierra/mission#>
PREFIX entity: <https://www.modelware.io/sierra/entity#>
PREFIX process: <https://www.modelware.io/sierra/process#>

SELECT ?Capability ?Score
WHERE {
  ?c a mission:Capability .
  BIND(IF(EXISTS { ?c mission:isRequiredBy ?o }, 1, 0) AS ?hasObjective)
  BIND(IF(EXISTS { ?c entity:isAssignedTo ?e }, 1, 0) AS ?hasEntity)
  BIND(IF(EXISTS { ?c process:isDescribedBy ?p }, 1, 0) AS ?hasProcess)
  BIND(?hasObjective + ?hasEntity + ?hasProcess AS ?Score)
  BIND(REPLACE(STR(?c), "^.*[#/]", "") AS ?Capability)
}
ORDER BY ?Capability
```

The near misses (score = 2), with the one link each is missing:

```table
---
stylesheet:
  - selector: cell[col === "Missing"]
    target: value
    style:
      padding: 4px 12px
      border-radius: 999px
      font-size: 12px
      font-weight: 600
      color: "#92400E"
      background-color: "#FEF3C7"
---
PREFIX base: <https://www.modelware.io/sierra/base#>
PREFIX mission: <https://www.modelware.io/sierra/mission#>
PREFIX entity: <https://www.modelware.io/sierra/entity#>
PREFIX process: <https://www.modelware.io/sierra/process#>

SELECT ?Capability ?Description ?Missing
WHERE {
  ?c a mission:Capability .
  OPTIONAL { ?c base:description ?Description }
  BIND(EXISTS { ?c mission:isRequiredBy ?o } AS ?hasObjective)
  BIND(EXISTS { ?c entity:isAssignedTo ?e } AS ?hasEntity)
  BIND(EXISTS { ?c process:isDescribedBy ?p } AS ?hasProcess)
  BIND(IF(?hasObjective, 1, 0) + IF(?hasEntity, 1, 0) + IF(?hasProcess, 1, 0) AS ?score)
  FILTER(?score = 2)
  BIND(IF(!?hasObjective, "objective", IF(!?hasEntity, "entity", "process")) AS ?Missing)
  BIND(REPLACE(STR(?c), "^.*[#/]", "") AS ?Capability)
}
ORDER BY ?Capability
```

**Result:** only C2 and C5 are fully realized (they are the only capabilities with processes, P1 and P2). Six capabilities (C1, C3, C4, C6, C7, C8) are near misses. Each has an objective and an entity, but no process says how the capability is carried out. Adding one process to each closes the gap.

---

## Q3: Orphans (Question → Evidence → Interpretation)

### Question

> *Is every stakeholder concern carried forward into at least one mission objective? If not, which stakeholders' needs drop out of the design?*

A concern that no objective is derived from is an **orphan**. The stakeholder expressed it, but no objective, capability or entity responds to it.

### Evidence

Concerns with no `mission:derives` link (`FILTER NOT EXISTS`). The table also lists the stakeholder who raised each one and the requirements that stakeholder stated:

```table
---
stylesheet:
  - selector: cell[col === "Priority" && value === "High"]
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
PREFIX mission: <https://www.modelware.io/sierra/mission#>
PREFIX stakeholder: <https://www.modelware.io/sierra/stakeholder#>

SELECT ?Concern ?Priority ?Stakeholder
       (GROUP_CONCAT(DISTINCT REPLACE(STR(?req), "^.*[#/]", ""); separator=", ") AS ?StatedRequirements)
WHERE {
  ?c a stakeholder:Concern .
  FILTER NOT EXISTS { ?c mission:derives ?objective }
  OPTIONAL { ?c base:priority ?Priority }
  OPTIONAL {
    ?c stakeholder:isExpressedBy ?s .
    OPTIONAL { ?s stakeholder:states ?req }
  }
  BIND(REPLACE(STR(?c), "^.*[#/]", "") AS ?Concern)
  BIND(REPLACE(STR(?s), "^.*[#/]", "") AS ?Stakeholder)
}
GROUP BY ?Concern ?Priority ?Stakeholder
ORDER BY ?Concern
```

The same pattern one level down, written with `OPTIONAL` + `!BOUND`: entities that are responsible for no activity.

```table
PREFIX base: <https://www.modelware.io/sierra/base#>
PREFIX entity: <https://www.modelware.io/sierra/entity#>
PREFIX process: <https://www.modelware.io/sierra/process#>

SELECT ?Entity ?Description
WHERE {
  ?e a entity:Entity .
  OPTIONAL { ?activity process:isAllocatedTo ?e }
  FILTER(!BOUND(?activity))
  OPTIONAL { ?e base:description ?Description }
  BIND(REPLACE(STR(?e), "^.*[#/]", "") AS ?Entity)
}
ORDER BY ?Entity
```

### Interpretation

- **GovernorNeeds and PublicNeeds are orphans, and both are High priority.** No objective is derived from either, so the mission does not pursue them. The gap reaches into requirements: R8 (*Public Information Portal*) and R9 (*Resource Allocation Dashboard*) are stated by these two stakeholders and are both High priority, yet they have no objective, capability or entity behind them. The model commits to requirements it has no operational plan for.
- **Fix:** add an objective such as "Provide public and executive situational reporting", derived from GovernorNeeds and PublicNeeds, then trace it to a capability (a public portal or resource view) and allocate that capability to an entity.
- **Entity orphans:** FireCloud, SafetyOfficer and SystemsEngineer hold capabilities but carry out no activity. FireCloud is the most notable, since it provides telemetry (C2, C3, C8), yet activity A1 sends its request to NetworkInterface and nothing models FireCloud answering it. This is the same gap Q2 found: the processes for C3, C7 and C8 are not modeled.
- **If the queries came back empty**, every concern would drive at least one objective and every entity would do some activity. Both checks stay on this page, so a later edit that breaks either link shows up here.

---

## Q4: Coverage matrix (stakeholder × objective)

Each cell counts the concerns through which a stakeholder drives an objective (*stakeholder expresses concern, concern derives objective*). `COALESCE(?n, 0)` puts a 0 in every pair with no link, so missing coverage shows as 0 rather than as a blank cell. **Rows that are entirely 0 (red)** are stakeholders the mission objectives do not serve at all.

```matrix
---
rowColumnLabel: Stakeholder / Objective
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
---
PREFIX mission: <https://www.modelware.io/sierra/mission#>
PREFIX stakeholder: <https://www.modelware.io/sierra/stakeholder#>

SELECT ?row ?column (COALESCE(?n, 0) AS ?value)
WHERE {
  ?s a stakeholder:Stakeholder .
  ?o a mission:Objective .
  BIND(REPLACE(STR(?s), "^.*[#/]", "") AS ?row)
  BIND(REPLACE(STR(?o), "^.*[#/]", "") AS ?column)
  OPTIONAL {
    SELECT ?s ?o (COUNT(DISTINCT ?c) AS ?n)
    WHERE {
      ?s stakeholder:expresses ?c .
      ?c mission:derives ?o .
    }
    GROUP BY ?s ?o
  }
}
ORDER BY ?row ?column
```

**Result:** three rows are all 0:
- **ForestryDepartment:** it has no concern at all (the Q1 failure).
- **Governor** and **Public:** their concerns are orphans (the Q3 finding).

Every objective column has at least one non-zero cell, so each objective traces to a stakeholder. The gaps are all on the stakeholder side.

---

## Q5: View graph (trace graph with gaps flagged, via CONSTRUCT)

This `CONSTRUCT` turns the model into a graph built for gap analysis:
- It includes every stakeholder and concern, including unlinked ones, which a join-based view would drop.
- It adds a computed `gap` class to any node that breaks the chain.

```diagram
---
stylesheet:
  - selector: diagram
    style:
      layout:
        type: dagre
        rankdir: LR
        ranksep: 70
        nodesep: 12
  - selector: node
    style:
      width: 150
      height: 34
      fill: "#F3F4F6"
      stroke: "#6B7280"
      stroke-width: 1
  - selector: node.stakeholder
    style:
      fill: "#FEF9C3"
  - selector: node.concern
    style:
      fill: "#CFFAFE"
  - selector: node.objective
    style:
      fill: "#E0E7FF"
  - selector: node.capability
    style:
      fill: "#DCFCE7"
  - selector: node.gap
    style:
      fill: "#FEE2E2"
      stroke: "#DC2626"
      stroke-width: 3
---
PREFIX mission: <https://www.modelware.io/sierra/mission#>
PREFIX stakeholder: <https://www.modelware.io/sierra/stakeholder#>
PREFIX : <http://opencaesar.io/diagram#>

CONSTRUCT {
  ?n a :Node ;
    :text ?label ;
    :class ?kind ;
    :class ?flag .

  ?edge a :Edge ;
    :source ?from ;
    :target ?to .
}
WHERE {
  {
    ?n a stakeholder:Stakeholder .
    BIND("stakeholder" AS ?kind)
    BIND(IF(EXISTS { ?n stakeholder:expresses ?x }, "ok", "gap") AS ?flag)
  } UNION {
    ?n a stakeholder:Concern .
    BIND("concern" AS ?kind)
    BIND(IF(EXISTS { ?n mission:derives ?x }, "ok", "gap") AS ?flag)
  } UNION {
    ?n a mission:Objective .
    BIND("objective" AS ?kind)
    BIND(IF(EXISTS { ?n mission:requires ?x }, "ok", "gap") AS ?flag)
  } UNION {
    ?n a mission:Capability .
    BIND("capability" AS ?kind)
    BIND("ok" AS ?flag)
  } UNION {
    ?from stakeholder:expresses ?to .
    BIND(IRI(CONCAT("/expresses/", MD5(CONCAT(STR(?from), STR(?to))))) AS ?edge)
  } UNION {
    ?from mission:derives ?to .
    BIND(IRI(CONCAT("/derives/", MD5(CONCAT(STR(?from), STR(?to))))) AS ?edge)
  } UNION {
    ?from mission:requires ?to .
    BIND(IRI(CONCAT("/requires/", MD5(CONCAT(STR(?from), STR(?to))))) AS ?edge)
  }
  BIND(REPLACE(STR(?n), "^.*[#/]", "") AS ?label)
}
```

**Result:** the red nodes are the gaps found above:
- **ForestryDepartment:** a stakeholder with no outgoing edge.
- **GovernorNeeds** and **PublicNeeds:** concerns that end without reaching an objective.

Every other path continues to a capability.

---

## Trace health score (scripted: query → compute → render)

This block runs one query that checks every link stage of the chain, element by element. It then works out the completeness percentage for each stage and an overall trace health score, and renders the results as an HTML scorecard.

```javascript
await include('src/method/js/utils.js')

// 1. QUERY: one row per (stage, element) with covered = 1 / 0
const result = await query(`
  PREFIX mission: <https://www.modelware.io/sierra/mission#>
  PREFIX stakeholder: <https://www.modelware.io/sierra/stakeholder#>
  PREFIX entity: <https://www.modelware.io/sierra/entity#>
  PREFIX process: <https://www.modelware.io/sierra/process#>
  SELECT ?stage ?element ?covered WHERE {
    {
      ?x a stakeholder:Stakeholder . BIND("1. Stakeholder expresses Concern" AS ?stage)
      BIND(IF(EXISTS { ?x stakeholder:expresses ?y }, 1, 0) AS ?covered)
    } UNION {
      ?x a stakeholder:Concern . BIND("2. Concern derives Objective" AS ?stage)
      BIND(IF(EXISTS { ?x mission:derives ?y }, 1, 0) AS ?covered)
    } UNION {
      ?x a mission:Objective . BIND("3. Objective requires Capability" AS ?stage)
      BIND(IF(EXISTS { ?x mission:requires ?y }, 1, 0) AS ?covered)
    } UNION {
      ?x a mission:Capability . BIND("4. Capability assigned to Entity" AS ?stage)
      BIND(IF(EXISTS { ?x entity:isAssignedTo ?y }, 1, 0) AS ?covered)
    } UNION {
      ?x a mission:Capability . BIND("5. Capability described by Process" AS ?stage)
      BIND(IF(EXISTS { ?x process:isDescribedBy ?y }, 1, 0) AS ?covered)
    } UNION {
      ?x a entity:Entity . BIND("6. Entity performs an Activity" AS ?stage)
      BIND(IF(EXISTS { ?x process:isResponsibleFor ?y }, 1, 0) AS ?covered)
    }
    BIND(REPLACE(STR(?x), "^.*[#/]", "") AS ?element)
  } ORDER BY ?stage ?element
`);

// 2. COMPUTE: per-stage completeness and the list of gaps
const stages = new Map();
for (const row of result.rows) {
  if (!stages.has(row.stage)) stages.set(row.stage, { total: 0, covered: 0, gaps: [] });
  const s = stages.get(row.stage);
  s.total += 1;
  if (Number(row.covered) === 1) s.covered += 1;
  else s.gaps.push(row.element);
}
let totalAll = 0, coveredAll = 0;
for (const s of stages.values()) {
  s.pct = s.total ? Math.round(100 * s.covered / s.total) : 100;
  totalAll += s.total;
  coveredAll += s.covered;
}
const score = totalAll ? Math.round(100 * coveredAll / totalAll) : 100;
const weakest = [...stages.entries()].sort((a, b) => a[1].pct - b[1].pct)[0];
const color = pct => pct === 100 ? '#10B981' : pct >= 75 ? '#F59E0B' : '#DC2626';

// 3. RENDER: scorecard with a bar per stage
const rowsHtml = [...stages.entries()].map(([stage, s]) => `
  <tr>
    <td style="padding:4px 8px;white-space:nowrap">${stage}</td>
    <td style="padding:4px 8px;width:40%">
      <div style="background:#E5E7EB;border-radius:4px;height:14px">
        <div style="width:${s.pct}%;background:${color(s.pct)};height:14px;border-radius:4px"></div>
      </div>
    </td>
    <td style="padding:4px 8px;text-align:right">${s.covered}/${s.total} (${s.pct}%)</td>
    <td style="padding:4px 8px;color:#DC2626">${s.gaps.join(', ') || '—'}</td>
  </tr>`).join('');

display(`
  <div style="display:flex;gap:16px;align-items:baseline;margin-bottom:8px">
    <span style="font-size:32px;font-weight:700;color:${color(score)}">${score}%</span>
    <span>overall trace health (${coveredAll} of ${totalAll} element links present)</span>
  </div>
  <p>Weakest stage: <b>${weakest[0]}</b> at ${weakest[1].pct}%.</p>
  <table class="oml-md-table">
    <thead><tr><th>Stage</th><th>Completeness</th><th>Covered</th><th>Gaps</th></tr></thead>
    <tbody>${rowsHtml}</tbody>
  </table>
`);
```

The score combines the earlier findings into one number. The weakest stage is *Capability described by Process* (2 of 8). After that come *Entity performs an Activity* and *Concern derives Objective*. Those are the next modeling tasks, in priority order.

---

## Reusable template: Concern → Objective coverage

The section below is not written on this page. It comes from the compose template defined once at [trace-coverage.md](../../../../../method/md/www.modelware.io/sierra/analysis/trace-coverage.md) and is called here with the concern → objective relation. [Allocation Review](Allocation%20Review.md) calls the same template with different arguments.

```compose
template: https://www.modelware.io/sierra/analysis/trace-coverage
title: "Concern → Objective Derivation"
rowClass: https://www.modelware.io/sierra/stakeholder#Concern
relation: https://www.modelware.io/sierra/mission#derives
columnClass: https://www.modelware.io/sierra/mission#Objective
rowLabel: Concern
columnLabel: Objective
```
