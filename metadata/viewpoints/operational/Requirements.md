---
pagination_no-id: 0
sort_no-id: file.link
sort_direction_no-id: asc
show_search_no-id: false
view_no-id: table
---
Add requirements in the missions. Click [[Requirement Diagram]] to visualize their relations.

```dataviewjs

// Select and filter pages as you normally do with dataviewjs

let pages = dv.pages('#requirement/Requirement and !"metadata"')

// General view settings

const settings = {
    "entries on page": 10,
    "full width": true,
    "add new note button": true,
	"new note name": "Requirement",
	"new note folder": "model/operational/requirements",
	"new note template": "metadata/templates/requirement/Requirement Template.md",
}

// Properties settings

const props = [
  {
    name: "Requirement",
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
    column: true,
    span: true
  },
  {
    name: "Status",
    prop: "status", 
    filter: true,
    column: true,
    span: true
  },
  {
    name: "Keywords",
    prop: "keywords", 
    filter: true,
    column: true,
  },

  {
    name: "Is Allocated To",
    prop: "isAllocatedTo", 
    filter: true,
    column: true
  }
] 

const { dvIT } = await cJS();
await dvIT.renderView(settings, props, pages, dv)
```

