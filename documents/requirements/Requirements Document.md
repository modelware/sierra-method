## 1 Introduction

![[1.1 Purpose and Scope]]

![[1.2 Document Organization]]
## 2 Requirements
```dataviewjs
const reqs = dv.pages('#requirement/Requirement and !"metadata"')
    .where(p => p.category && p.file && p.file.name);

// Group requirements by category
const grouped = reqs.groupBy(p => p.category || "Uncategorized");

// Sort categories alphabetically
const sortedGroups = grouped.sort(g => g.key);

let sectionNumber = 0;

// Render each group
for (let group of sortedGroups) {
    const categoryTitle = `2.${++sectionNumber} ${group.key} Requirements`;
    dv.header(3, categoryTitle);

    // Sort lexicographically by file name with null check
    const sortedReqs = group.rows.sort(r => r.file.name);

	let subSectionNumber = 0;

    for (let req of sortedReqs) {
		var description = req.description;
		if (!description) {
			await dv.io.load(req.file.path).then(content => {
				const pattern = /#+\s+Description\s*\[\[.*?\]\]\s*\n\s*(.*(?:\n(?!#+\s).*)*)/i;
				const match = content.match(pattern);
				if (match) {
					description = match[1];
				}
			});
		}

        dv.header(4, `2.${sectionNumber}.${++subSectionNumber}  ${req.file.link}`);
	    dv.paragraph(`**Description:** ${description || ""}`);
        dv.paragraph(`**Specification:** ${req.specification || ""}`);
	    dv.paragraph(`**Status:** ${req.status || "Unknown"} | **Priority:** ${req.priority || "Unspecified"}`);

        const links = (key) => (req[key] && req[key].length > 0)
            ? `\n**${key}:** ` + req[key].join(", ")
            : "";

        ["refines", "requires", "elaborates", "impacts", "conflictsWith", "isDerivedBy", "isSatisfiedBy", "derives", "drives", "contains"].forEach(rel => {
            const section = links(rel);
            if (section) dv.paragraph(section);
        });

        dv.paragraph(`---`);
    }
}
```


