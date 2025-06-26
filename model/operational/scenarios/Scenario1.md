---
tags:
  - operational/Scenario
hasParameter: 
hasProcessConstraint:
  - "[[model/operational/scenarios/constraints/Constraint.md]]"
hasStateConstraint: 
hasStateGoal: 
hasTimeConstraint: 
---
#### Tags:
```dataviewjs
const tags = dv.current().tags.map(i => "#"+i+" [[metadata/docs/"+i+" Documentation|💬]]");
dv.list(tags);
```
#### Description:

TBD

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
	'model/operational/scenarios/parameters/Parameter',
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
	'model/operational/scenarios/constraints/Constraint',
	'metadata/templates/time/Constraint Template', 
	true);
```
#### Has Process Constraints:
```dataview
LIST
FROM #process/Constraint
WHERE contains(this.hasProcessConstraint, file.link)
```
```dataviewjs
const {fieldModifier: f} = this.app.plugins.plugins["metadata-menu"].api;
const { buttons } = await cJS();
buttons.createAddButton(dv, f, dv.current(),
	'hasProcessConstraint',
	'model/operational/scenarios/constraints/Constraint',
	'metadata/templates/process/Constraint Template', 
	true);
```



