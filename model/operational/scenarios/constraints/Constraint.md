---
tags:
  - process/Constraint
kind: 
n: 
a: "[[Assertion1]]"
b: 
c: 
priority: First(A)
---
#### Tags:
```dataviewjs
const tags = dv.current().tags.map(i => "#"+i+" [[metadata/docs/"+i+" Documentation|💬]]");
dv.list(tags);
```
#### Description:

TBD
#### Kind: `INPUT[inlineSelect(option('LeastExistence(A, N)'), option('MostExistence(A, N)'), option('ExactExistence(A, N)'), option('Absense(A)'), option('First(A)'), option('Last(A)'), option('Choice(C)'), option('ExclusiveChoice(C)'), option('CoExistence(A, B)'), option('Response(A, B)'), option('Precedence (A, B)'), option('ChainResponse(A, B)'), option('ChainPrecedence(A, B)')):priority]`
#### N: `INPUT[number:n]`
---
#### A (Activity or Assertion):
```dataview
LIST
FROM #operational/Activity or #state/Assertion 
WHERE contains(this.a, file.link)
```
```dataviewjs
const {fieldModifier: f} = this.app.plugins.plugins["metadata-menu"].api;
const { buttons } = await cJS();
buttons.createSelectButton(dv, f, dv.current(),
	'a');
```
#### B (Activity or Assertion):
```dataview
LIST
FROM #operational/Activity
WHERE contains(this.b, file.link)
```
```dataviewjs
const {fieldModifier: f} = this.app.plugins.plugins["metadata-menu"].api;
const { buttons } = await cJS();
buttons.createSelectButton(dv, f, dv.current(),
	'b');
```
### C (Activities or Assertions):
```dataview
LIST
FROM #operational/Activity
WHERE contains(this.c, file.link)
```
```dataviewjs
const {fieldModifier: f} = this.app.plugins.plugins["metadata-menu"].api;
const { buttons } = await cJS();
buttons.createSelectButton(dv, f, dv.current(),
	'c');
```	

