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
- name: priority
  type: Select
  options:
    sourceType: ValuesList
    valuesList:
      "1": "Low"
      "2": "Medium"
      "3": "High"
  path: ""
  id: f-1165461084
- name: isExpressedBy
  type: MultiFile
  options:
    dvQueryString: "dv.pages('#stakeholder/Stakeholder and !\"metadata\"')"
    inverse: expresses
  path: ""
  id: f-1234608836
- name: explains
  type: MultiFile
  options:
    dvQueryString: "dv.pages('#requirement/Requirement and !\"metadata\"')"
    inverse: isExplainedBy
  path: ""
  id: f-1929323940
- name: description
  type: Input
  path: ""
  id: f-1724546052
- name: category
  type: Input
  path: ""
  id: f50511102
---
