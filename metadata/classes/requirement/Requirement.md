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
- name: status
  type: Select
  options:
    sourceType: ValuesList
    valuesList:
      "1": "Draft"
      "2": "Proposed"
      "3": "Deferred"
      "4": "Rejected"
      "5": "Clarification Needed"
      "6": "Accepted"
  path: ""
  id: f-892481550
- name: specification
  type: Input
  path: ""
  id: f1307197699
- name: requires
  type: MultiFile
  options:
    dvQueryString: "dv.pages('#requirement/Requirement and !\"metadata\"')"
  path: ""
  id: f-393139282
- name: refines
  type: MultiFile
  options:
    dvQueryString: "dv.pages('#requirement/Requirement and !\"metadata\"')"
  path: ""
  id: f1085184934
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
- name: keyword
  type: Input
  path: ""
  id: f-814408215
- name: isExplainedBy
  type: MultiFile
  options:
    dvQueryString: "dv.pages('#stakeholder/Need and !\"metadata\"')"
    inverse: explains
  path: ""
  id: f1647474499
- name: isDerivedBy
  type: MultiFile
  options:
    dvQueryString: "dv.pages('#operational/Activity and !\"metadata\"')"
    inverse: derives
  path: ""
  id: f1966132554
- name: isContainedBy
  type: File
  options:
    dvQueryString: "dv.pages('#requirement/Requirement or #structural/Component and !\"metadata\"')"
    inverse: contains
  path: ""
  id: f-1202413408
- name: isAllocatedTo
  type: File
  options:
    dvQueryString: "dv.pages('#structural/Component and !\"metadata\"')"
    inverse: satisfies
  path: ""
  id: f-566597096
- name: drives
  type: MultiFile
  options:
    dvQueryString: "dv.pages('#operational/Activity and !\"metadata\"')"
    inverse: isDrivenBy
  path: ""
  id: f-1323526103
- name: description
  type: Input
  path: ""
  id: f-1724546052
- name: contains
  type: MultiFile
  options:
    dvQueryString: "dv.pages('#requirement/Requirement and !\"metadata\"')"
    inverse: isContainedBy
  path: ""
  id: f-567445985
- name: category
  type: Input
  path: ""
  id: f50511102
---
