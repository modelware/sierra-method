---
ontology: https://fireforce6.github.io/mission-control/bundle
---

# Fire Force VI: Allocation Review

This page calls the **Trace Coverage** compose template (`https://www.modelware.io/sierra/analysis/trace-coverage`) twice, with different classes and relations. The template is defined once in the method layer. The [Analysis Dashboard](Analysis%20Dashboard.md) calls it a third time, for Concern → Objective. Each call gives the same coverage matrix (explicit 0s) and untraced-element table, without copying any query.

## Who provides each capability?

```compose
template: https://www.modelware.io/sierra/analysis/trace-coverage
title: "Capability → Entity Assignment"
rowClass: https://www.modelware.io/sierra/mission#Capability
relation: https://www.modelware.io/sierra/entity#isAssignedTo
columnClass: https://www.modelware.io/sierra/entity#Entity
rowLabel: Capability
columnLabel: Entity
```

**Interpretation:** every capability is assigned to at least one entity, so the untraced table is empty. That is the clean result. If a capability were added without an owner, it would appear in that table and as a red all-zero row. The matrix also shows a concentration risk: DashboardSystem holds all eight capabilities, and C1 and C4 depend on it alone.

## Who performs each activity?

```compose
template: https://www.modelware.io/sierra/analysis/trace-coverage
title: "Activity → Entity Allocation"
rowClass: https://www.modelware.io/sierra/process#Activity
relation: https://www.modelware.io/sierra/process#isAllocatedTo
columnClass: https://www.modelware.io/sierra/entity#Entity
rowLabel: Activity
columnLabel: Entity
```

**Interpretation:** every activity is allocated, so there are no row gaps. The gaps here are **columns**: FireCloud, SafetyOfficer and SystemsEngineer have all-zero (amber) columns. They hold capabilities but perform no modeled activity. This is the same finding as the `!BOUND` orphan query on the Analysis Dashboard, now shown from the activity side.
