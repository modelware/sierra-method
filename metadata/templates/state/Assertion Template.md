---
tags:
  - state/Assertion
specification:
hasParameter:
hasTimeConstraint:
---
#### Tags:
```dataviewjs
const tags = dv.current().tags.map(i => "#"+i+" [[metadata/docs/"+i+" Documentation|💬]]");
dv.list(tags);
```
#### Description:

TBD

#### Specification: `INPUT[textArea:specification]`
---
#### Has Parameters:
```dataview
LIST
FROM #state/Parameter  
WHERE contains(this.hasParameter, file.link)
```
```dataviewjs
const {fieldModifier: f} = this.app.plugins.plugins["metadata-menu"].api;
const { buttons } = await cJS();
buttons.createAllButtons(dv, f, dv.current(),
	'hasParameter',
	'model/operational/state-assertions/parameters/Parameter',
	'metadata/templates/state/Parameter Template', 
	true);
```
---
#### Has Time Dependencies:
```dataview
LIST
FROM #time/Constraint   
WHERE contains(this.hasTimeConstraint, file.link)
```
```dataviewjs
const {fieldModifier: f} = this.app.plugins.plugins["metadata-menu"].api;
const { buttons } = await cJS();
buttons.createAddButton(dv, f, dv.current(),
	'hasTimeConstraint',
	'model/operational/state-assertions/constraints/Constraint',
	'metadata/templates/time/Constraint Template', 
	true);
```

<%*
title = await tp.system.prompt("Enter name", tp.file.title, false);  
if (title) await tp.file.rename(title);
%>
