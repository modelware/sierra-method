---
pagination_no-id: 0
sort_no-id: file.link
sort_direction_no-id: desc
show_search_no-id: false
view_no-id: table
---
Add state variables relevant to the mission.

```dataviewjs

// Select and filter pages as you normally do with dataviewjs

let pages = dv.pages('#state/Variable and !"metadata"')

// General view settings

const settings = {
    "entries on page": 10,
    "full width": true,
    "add new note button": true,
	"new note name": "Variable",
	"new note folder": "model/operational/state-variables",
	"new note template": "metadata/templates/state/Variable Template.md",
}

// Properties settings

const props = [
  {
    name: "Variable",
    prop: "file.link", 
    filter: true,
    column: true
  }
] 

const { dvIT } = await cJS();
await dvIT.renderView(settings, props, pages, dv)
```

