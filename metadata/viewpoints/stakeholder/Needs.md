---
pagination_no-id: 0
sort_no-id: file.link
sort_direction_no-id: asc
show_search_no-id: false
view_no-id: table
---
Identify the needs of the mission stakeholder.

```dataviewjs

// Select and filter pages as you normally do with dataviewjs

let pages = dv.pages('#stakeholder/Need and !"metadata"')

// General view settings

const settings = {
    "entries on page": 10,
    "full width": true,
    "add new note button": true,
	"new note name": "Need",
	"new note folder": "model/stakeholder/needs",
	"new note template": "metadata/templates/stakeholder/Need Template.md",
}

// Properties settings

const props = [
  {
    name: "Need",
    prop: "file.link", 
    filter: true,
    column: true
  },
  {
    name: "Category",
    prop: "category", 
    filter: true,
    column: true
  },
  {
    name: "Priority",
    prop: "priority", 
    filter: true,
    column: true
  },
  {
    name: "Expressed By",
    prop: "isExpressedBy", 
    filter: true,
    column: true
  }
] 

const { dvIT } = await cJS();
await dvIT.renderView(settings, props, pages, dv)
```

