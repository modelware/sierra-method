---
pagination_no-id: 0
sort_no-id: file.link
sort_direction_no-id: desc
show_search_no-id: false
view_no-id: table
---
Add environments involved by the mission.

```dataviewjs

// Select and filter pages as you normally do with dataviewjs

let pages = dv.pages('#operational/Environment and !"metadata"')

// General view settings

const settings = {
    "entries on page": 10,
    "full width": true,
    "add new note button": true,
	"new note name": "Environment",
	"new note folder": "model/operational/environments",
	"new note template": "metadata/templates/operational/Environment Template.md",
}

// Properties settings

const props = [
  {
    name: "Environment",
    prop: "file.link", 
    filter: true,
    column: true
  }
] 

const { dvIT } = await cJS();
await dvIT.renderView(settings, props, pages, dv)
```

