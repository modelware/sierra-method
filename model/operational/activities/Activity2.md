---
tags:
  - operational/Activity
derives: 
hasParameter: 
hasProcessConstraint:
  - "[[model/operational/activities/constraints/Constraint 4.md]]"
hasStateConstraint: 
hasStateGoal: 
hasTimeConstraint: 
isDrivenBy: 
isPerformedBy: 
---
#### Tags:
```dataviewjs
const tags = dv.current().tags.map(i => "#"+i+" [[metadata/docs/"+i+" Documentation|💬]]");
dv.list(tags);
```
#### Description:

TBD

---
#### Is Performed By (Component):
```dataview
LIST
FROM #structural/Component
WHERE contains(this.isPerformedBy, file.link)
```
```dataviewjs
const {fieldModifier: f} = this.app.plugins.plugins["metadata-menu"].api;
const { buttons } = await cJS();
buttons.createSelectButton(dv, f, dv.current(),
	'isPerformedBy');
```
---
#### Is Driven By (Requirement):
```dataview
LIST
FROM #requirement/Requirement
WHERE contains(this.isDrivenBy, file.link)
```
```dataviewjs
const {fieldModifier: f} = this.app.plugins.plugins["metadata-menu"].api;
const { buttons } = await cJS();
buttons.createSelectButton(dv, f, dv.current(),
	'isDrivenBy');
```
#### Derives (Requirement):
```dataview
LIST
FROM #requirement/Requirement
WHERE contains(this.derives, file.link)
```
```dataviewjs
const {fieldModifier: f} = this.app.plugins.plugins["metadata-menu"].api;
const { buttons } = await cJS();
buttons.createAllButtons(dv, f, dv.current(),
	'derives',
	'model/operational/requirements/Requirement',
	'metadata/templates/requirement/Requirement Template', 
	true);
```
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
buttons.createAddButton(dv, f, dv.current(),
	'hasParameter',
	'model/operational/activities/parameters/Parameter',
	'metadata/templates/state/Parameter Template', 
	true);
```
---
#### Has State Goals:
```dataview
LIST
FROM #state/Condition 
WHERE contains(this.hasStateGoal, file.link)
```
```dataviewjs
const {fieldModifier: f} = this.app.plugins.plugins["metadata-menu"].api;
const { buttons } = await cJS();
buttons.createAllButtons(dv, f, dv.current(),
	'hasStateGoal',
	'model/operational/state-conditions/Goal',
	'metadata/templates/state/Condition Template', 
	true);
```
---
#### Has State Constraints:
```dataview
LIST
FROM #state/Condition 
WHERE contains(this.hasStateConstraint, file.link)
```
```dataviewjs
const {fieldModifier: f} = this.app.plugins.plugins["metadata-menu"].api;
const { buttons } = await cJS();
buttons.createAllButtons(dv, f, dv.current(),
	'hasStateConstraint',
	'model/operational/state-conditions/Constraint',
	'metadata/templates/state/Condition Template', 
	true);
```
#### Has Time Constraints:
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
	'model/operational/activities/constraints/Constraint',
	'metadata/templates/time/Constraint Template', 
	true);
```
#### Has Process Constraints:
```dataview
LIST
FROM #operational/Constraint
WHERE contains(this.hasProcessConstraint, file.link)
```
```dataviewjs
const {fieldModifier: f} = this.app.plugins.plugins["metadata-menu"].api;
const { buttons } = await cJS();
buttons.createAddButton(dv, f, dv.current(),
	'hasProcessConstraint',
	'model/operational/activities/constraints/Constraint',
	'metadata/templates/operational/Constraint Template', 
	true);
```



