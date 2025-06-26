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
- name: n
  type: Number
  path: ""
  id: f110
- name: kind
  type: Select
  options:
    sourceType: ValuesList
    valuesList:
      "1": "LeastExistence(A, N)"
      "2": "MostExistence(A, N)"
      "3": "ExactExistence(A, N)"
      "4": "Absense(A)"
      "5": "First(A)"
      "6": "Last(A)"
      "7": "Choice(C)"
      "8": "ExclusiveChoice(C)"
      "9": "CoExistence(A, B)"
      "10": "Response(A, B)"
      "11": "Precedence (A, B)"
      "12": "ChainResponse(A, B)"
      "13": "ChainPrecedence(A, B)"
  path: ""
  id: f3292052
- name: description
  type: Input
  path: ""
  id: f-1724546052
- name: c
  type: MultiFile
  options:
    dvQueryString: "dv.pages('#operational/Activity and !\"metadata\"')"
  path: ""
  id: f99
- name: b
  type: File
  options:
    dvQueryString: "dv.pages('#operational/Activity and !\"metadata\"')"
  path: ""
  id: f98
- name: a
  type: File
  options:
    dvQueryString: "dv.pages('#operational/Activity and !\"metadata\"')"
  path: ""
  id: f97
---
