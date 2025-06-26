---
tags:
  - state/Variable
characterizes:
---
#### Tags:
```dataviewjs
const tags = dv.current().tags.map(i => "#"+i+" [[metadata/docs/"+i+" Documentation|💬]]");
dv.list(tags);
```
#### Description:

TBD

---
#### Characterizes (Components or Environments):
```dataview
LIST
FROM #structural/Component or #operational/Environment 
WHERE contains(isCharacterizedBy, [[]])
```


