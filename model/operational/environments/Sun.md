---
tags:
  - operational/Environment
isCharacterizedBy:
---
#### Tags:
```dataviewjs
const tags = dv.current().tags.map(i => "#"+i+" [[metadata/docs/"+i+" Documentation|💬]]");
dv.list(tags);
```
#### Description:

TBD

---
#### Is Characterized By (State Variables) :
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


