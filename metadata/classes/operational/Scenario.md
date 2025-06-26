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
    dvQueryString: "dv.pages('#operational/Constraint or #process/Constraint and !\"metadata\"')"
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
---
