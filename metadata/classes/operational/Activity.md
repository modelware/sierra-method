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
- name: isPerformedBy
  type: File
  options:
    dvQueryString: "dv.pages('#structural/Component and !\"metadata\"')"
    inverse: performs
  path: ""
  id: f1404654765
- name: isDrivenBy
  type: MultiFile
  options:
    dvQueryString: "dv.pages('#requirement/Requirement and !\"metadata\"')"
    inverse: drives
  path: ""
  id: f-1391538459
- name: hasTimeConstraint
  type: MultiFile
  options:
    dvQueryString: "dv.pages('#time/Constraint and !\"metadata\"')"
  path: ""
  id: f-72175164
- name: hasStateGoal
  type: MultiFile
  options:
    dvQueryString: "dv.pages('#state/Condition and !\"metadata\"')"
  path: ""
  id: f1122558410
- name: hasStateConstraint
  type: MultiFile
  options:
    dvQueryString: "dv.pages('#state/Condition and !\"metadata\"')"
  path: ""
  id: f1084379988
- name: hasProcessConstraint
  type: MultiFile
  options:
    dvQueryString: "dv.pages('#operational/Constraint and !\"metadata\"')"
  path: ""
  id: f679282226
- name: hasParameter
  type: MultiFile
  options:
    dvQueryString: "dv.pages('#state/Parameter and !\"metadata\"')"
  path: ""
  id: f868322863
- name: description
  type: Input
  path: ""
  id: f-1724546052
- name: derives
  type: MultiFile
  options:
    dvQueryString: "dv.pages('#requirement/Requirement and !\"metadata\"')"
    inverse: isDerivedBy
  path: ""
  id: f1556125228
---
