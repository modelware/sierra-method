---
tags:
  - stakeholder/Stakeholder
category: L1
expresses: 
---
#### Tags:
```dataviewjs
const tags = dv.current().tags.map(i => "#"+i+" [[metadata/docs/"+i+" Documentation|💬]]");
dv.list(tags);
```
#### Description:

This is stakeholder1.
#### Category: `INPUT[text:category]`
---
#### Expresses (Needs):
```dataview
LIST
FROM #stakeholder/Need
WHERE contains(isExpressedBy, [[]])
```


