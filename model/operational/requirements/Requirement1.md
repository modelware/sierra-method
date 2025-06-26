---
tags:
  - requirement/Requirement
category:
keyword:
priority: Low
specification:
status: Draft
contains:
drives:
isAllocatedTo: "[[Component1]]"
isContainedBy:
isDerivedBy:
isExplainedBy:
refines: ["[[Requirement2]]"]
requires:
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
#### Status: `INPUT[inlineSelect(option(Draft), option(Proposed), option(Deferred), option(Rejected), option(Clarification Needed), option(Accepted)):status]`
#### Keywords: `INPUT[inlineList:keyword]`
#### Specification: `INPUT[textArea:specification]`
---
#### Is Explained By (Needs):
```dataview
LIST
FROM #stakeholder/Need
WHERE contains(this.isExplainedBy, file.link)
```
```dataviewjs
const {fieldModifier: f} = this.app.plugins.plugins["metadata-menu"].api;
const { buttons } = await cJS();
buttons.createSelectButton(dv, f, dv.current(),
	'isExplainedBy');
```
---
#### Is Allocated  (Component):
```dataview
LIST
FROM #structural/Component
WHERE contains(this.isAllocatedTo, file.link)
```
```dataviewjs
const {fieldModifier: f} = this.app.plugins.plugins["metadata-menu"].api;
const { buttons } = await cJS();
buttons.createSelectButton(dv, f, dv.current(),
	'isAllocatedTo');
```
---
#### Refines (Requirements):
```dataview
LIST
FROM #requirement/Requirement 
WHERE contains(this.refines, file.link)
```
```dataviewjs
const {fieldModifier: f} = this.app.plugins.plugins["metadata-menu"].api;
const { buttons } = await cJS();
buttons.createSelectButton(dv, f, dv.current(),
	'refines');
```
#### Contains (Requirements):
```dataview
LIST
FROM #requirement/Requirement 
WHERE contains(this.contains, file.link)
```
```dataviewjs
const {fieldModifier: f} = this.app.plugins.plugins["metadata-menu"].api;
const { buttons } = await cJS();
buttons.createAllButtons(dv, f, dv.current(),
	'contains',
	'model/operational/requirements/Requirement',
	'metadata/templates/requirement/Requirement Template', 
	true);
```
#### Requires (Requirements):
```dataview
LIST
FROM #requirement/Requirement 
WHERE contains(this.requires, file.link)
```
```dataviewjs
const {fieldModifier: f} = this.app.plugins.plugins["metadata-menu"].api;
const { buttons } = await cJS();
buttons.createSelectButton(dv, f, dv.current(),
	'requires');
```
---
#### Drives (Activities):
```dataview
LIST
FROM #operational/Activity
WHERE contains(isDrivenBy, [[]])
```
#### Is Derived By (Activities):
```dataview
LIST
FROM #operational/Activity
WHERE contains(derives, [[]])
```


