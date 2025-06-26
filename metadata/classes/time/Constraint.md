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
- name: minimum
  type: Number
  path: ""
  id: f1064538126
- name: maximum
  type: Number
  path: ""
  id: f844740128
- name: kind
  type: Select
  options:
    sourceType: ValuesList
    valuesList:
      "1": "Duration"
      "2": "OffsetFromStartPoint"
      "3": "OffsetFromEndPoint"
  path: ""
  id: f3292052
- name: isRelativeTo
  type: File
  options:
    dvQueryString: "dv.pages('#time/Point and !\"metadata\"')"
  path: ""
  id: f1934327601
- name: description
  type: Input
  path: ""
  id: f-1724546052
---
