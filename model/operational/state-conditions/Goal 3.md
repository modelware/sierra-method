---
tags:
  - state/Condition
specification:
---
#### Tags:
```dataviewjs
const tags = dv.current().tags.map(i => "#"+i+" [[metadata/docs/"+i+" Documentation|💬]]");
dv.list(tags);
```
#### Description:

TBD

#### Specification: `INPUT[textArea:specification]`

<%*
title = await tp.system.prompt("Enter name", tp.file.title, false);  
if (title) await tp.file.rename(title);
%>
