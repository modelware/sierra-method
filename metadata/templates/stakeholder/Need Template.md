---
tags:
  - stakeholder/Need
category:
priority: Low
explains:
isExpressedBy:
---
#### Tags:
```dataviewjs
const tags = dv.current().tags.map(i => "#"+i+" [[metadata/docs/"+i+" Documentation|💬]]");
dv.list(tags);
```
#### Description:

TBD
#### Category: `INPUT[text:category]`
#### Priority: `INPUT[inlineSelect(option(Low), option(Medium), option(High)):priority]`
---
#### Is Expressed By (Stakeholders):
```dataview
LIST
FROM #stakeholder/Stakeholder
WHERE contains(this.isExpressedBy, file.link)
```
```dataviewjs
const {fieldModifier: f} = this.app.plugins.plugins["metadata-menu"].api;
const { buttons } = await cJS();
buttons.createSelectButton(dv, f, dv.current(),
	'isExpressedBy');
```
---
#### Explains (Requirements):
```dataview
LIST
FROM #requirement/Requirement 
WHERE contains(isExplainedBy, [[]])
```

<%*
title = await tp.system.prompt("Enter name", tp.file.title, false);  
if (title) await tp.file.rename(title);
%>
