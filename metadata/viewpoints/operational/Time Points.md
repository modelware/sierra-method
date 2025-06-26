---
pagination_no-id: 0
sort_no-id: file.link
sort_direction_no-id: desc
show_search_no-id: false
view_no-id: table
---
Add notable time points in the mission.

```dataviewjs

// Select and filter pages as you normally do with dataviewjs

let pages = dv.pages('#time/Point and !"metadata"')

// General view settings

const settings = {
    "entries on page": 10,
    "full width": true,
    "add new note button": true,
	"new note name": "Point",
	"new note folder": "model/operational/time-points",
	"new note template": "metadata/templates/time/Point Template.md",
}

// Properties settings

const props = [
  {
    name: "Point",
    prop: "file.link", 
    filter: true,
    column: true
  },
 {
    name: "Value",
    prop: "value", 
    column: true
  }  
] 

const { dvIT } = await cJS();
await dvIT.renderView(settings, props, pages, dv)
```

