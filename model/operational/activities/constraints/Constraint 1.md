---
tags:
  - time/Constraint
kind: 
maximum: 2
minimum: 1
isRelativeTo: "[[Origin]]"
priority: Duration
---
#### Tags:
```dataviewjs
const tags = dv.current().tags.map(i => "#"+i+" [[metadata/docs/"+i+" Documentation|💬]]");
dv.list(tags);
```
#### Description:

TBD
#### Kind: `INPUT[inlineSelect(option(Duration), option(OffsetFromStartPoint), option(OffsetFromEndPoint)):priority]`
#### Minimum: `INPUT[number:minimum]`
#### Maximum: `INPUT[number:maximum]`
---
#### Is Relative To (Time Point):
```dataview
LIST
FROM #time/Point
WHERE contains(this.isRelativeTo, file.link)
```
```dataviewjs
const {fieldModifier: f} = this.app.plugins.plugins["metadata-menu"].api;
const { buttons } = await cJS();
buttons.createAllButtons(dv, f, dv.current(),
	'isRelativeTo',
	'model/operational/time-points/Point',
	'metadata/templates/time/Point Template', 
	false);
```	

