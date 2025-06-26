---
pagination_no-id: 0
sort_no-id: file.link
sort_direction_no-id: desc
show_search_no-id: false
view_no-id: table
---
Add state assertions relevant to the mission scenarios.

```dataviewjs

// Select and filter pages as you normally do with dataviewjs

let pages = dv.pages('#state/Assertion and !"metadata"')

// General view settings

const settings = {
    "entries on page": 10,
    "full width": true,
    "add new note button": true,
	"new note name": "Assertion",
	"new note folder": "model/operational/state-assertions",
	"new note template": "metadata/templates/state/Assertion Template.md",
}

// Properties settings

const props = [
  {
    name: "Assertion",
    prop: "file.link", 
    filter: true,
    column: true
  },
  {
    name: "Constraint",
    prop: "constraint", 
    filter: true,
    column: true
  }
] 

const { dvIT } = await cJS();
await dvIT.renderView(settings, props, pages, dv)
```

