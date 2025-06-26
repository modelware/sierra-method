---
tags:
  - structural/Component
contains:
isCharacterizedBy:
isContainedBy:
performs:
satisfies:
---
#### Tags:
```dataviewjs
const tags = dv.current().tags.map(i => "#"+i+" [[metadata/docs/"+i+" Documentation|💬]]");
dv.list(tags);
```
#### Description:

TBD

---
#### Is Characterized By (State Variables):
```dataview
LIST
FROM #state/Variable
WHERE contains(this.isCharacterizedBy, file.link)
```
```dataviewjs
const {fieldModifier: f} = this.app.plugins.plugins["metadata-menu"].api;
const { buttons } = await cJS();
buttons.createAllButtons(dv, f, dv.current(),
	'isCharacterizedBy',
	'model/operational/state-variables/Variable',
	'metadata/templates/state/Variable Template', 
	true);
```
---
#### Performs (Activities):
```dataview
LIST
FROM #operational/Activity
WHERE contains(isPerformedBy, [[]])
```
---
#### Satisfies (Requirements):
```dataview
LIST
FROM #requirement/Requirement
WHERE contains(isAllocatedTo, [[]])
```
---
#### Contains (Components):
```dataview
LIST
FROM #structural/Component
WHERE contains(this.contains, file.link)
```
```dataviewjs
const {fieldModifier: f} = this.app.plugins.plugins["metadata-menu"].api;
const { buttons } = await cJS();
buttons.createAllButtons(dv, f, dv.current(),
	'contains',
	'model/operational/components/Component',
	'metadata/templates/structural/Component Template', 
	true);
```

<%*
title = await tp.system.prompt("Enter name", tp.file.title, false);  
if (title) await tp.file.rename(title);
%>
