---
tags:
  - stakeholder/Stakeholder
category:
expresses:
---
#### Tags:
```dataviewjs
const tags = dv.current().tags.map(i => "#"+i+" [[metadata/docs/"+i+" Documentation|💬]]");
dv.list(tags);
```
#### Description:

TBD
#### Category: `INPUT[text:category]`
---
#### Expresses (Needs):
```dataview
LIST
FROM #stakeholder/Need
WHERE contains(isExpressedBy, [[]])
```

<%*
title = await tp.system.prompt("Enter name", tp.file.title, false);  
if (title) await tp.file.rename(title);
%>
