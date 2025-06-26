---
pagination_no-id: 0
sort_no-id: file.link
sort_direction_no-id: desc
show_search_no-id: false
view_no-id: table
---
Add components specified by the mission.  Click [[Component Diagram]] to visualize their relations.

```dataviewjs

// Select and filter pages as you normally do with dataviewjs

let pages = dv.pages('#structural/Component and !"metadata"')

// General view settings

const settings = {
    "entries on page": 10,
    "full width": true,
    "add new note button": true,
	"new note name": "Component",
	"new note folder": "model/operational/components",
	"new note template": "metadata/templates/structural/Component Template.md",
}

// Properties settings

const props = [
  {
    name: "Component",
    prop: "file.link", 
    filter: true,
    column: true
  }
] 

const { dvIT } = await cJS();
await dvIT.renderView(settings, props, pages, dv)
```

