---
version: "2.1"
limit: 20
mapWithTag: true
icon:
tagNames:
filesPaths:
bookmarksGroups:
excludes:
extends:
savedViews: []
favoriteView:
fieldsOrder: []
fields:
- name: satisfies
  type: MultiFile
  options:
    dvQueryString: "dv.pages('#requirement/Requirement and !\"metadata\"')"
    inverse: isAllocatedTo
  path: ""
  id: f-1458301887
- name: performs
  type: MultiFile
  options:
    dvQueryString: "dv.pages('#operational/Activity and !\"metadata\"')"
    inverse: isPerformedBy
  path: ""
  id: f431162674
- name: isContainedBy
  type: File
  options:
    dvQueryString: "dv.pages('#structural/Component and !\"metadata\"')"
    inverse: contains
  path: ""
  id: f-1202413408
- name: isCharacterizedBy
  type: MultiFile
  options:
    dvQueryString: "dv.pages('#state/Variable and !\"metadata\"')"
    inverse: characterizes
  path: ""
  id: f-738467866
- name: description
  type: Input
  path: ""
  id: f-1724546052
- name: contains
  type: MultiFile
  options:
    dvQueryString: "dv.pages('#structural/Component and !\"metadata\"')"
    inverse: isContainedBy
  path: ""
  id: f-567445985
---
