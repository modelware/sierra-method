---
tags:
  - time/Point
value:
---
#### Tags:
```dataviewjs
const tags = dv.current().tags.map(i => "#"+i+" [[metadata/docs/"+i+" Documentation|💬]]");
dv.list(tags);
```
#### Description:

TBD
#### Value: `INPUT[dateTime:category]`

<%*
title = await tp.system.prompt("Enter name", tp.file.title, false);  
if (title) await tp.file.rename(title);
%>
