---
pagination_no-id: 0
sort_no-id: file.link
sort_direction_no-id: asc
show_search_no-id: false
view_no-id: table
---
Identify the stakeholders of the mission

```dataviewjs

// Select and filter pages as you normally do with dataviewjs

let pages = dv.pages('#stakeholder/Stakeholder and !"metadata"')

// General view settings

const settings = {
    "entries on page": 10,
    "full width": true,
    "add new note button": true,
	"new note name": "Stakeholder",
	"new note folder": "model/stakeholder/stakeholders",
	"new note template": "metadata/templates/stakeholder/Stakeholder Template.md",
}

// Properties settings

const props = [
  {
    name: "Stakeholder",
    prop: "file.link", 
    filter: true,
    column: true
  },
  {
    name: "Category",
    prop: "category", 
    filter: true,
    column: true
  }
] 

const { dvIT } = await cJS();
await dvIT.renderView(settings, props, pages, dv)
```

