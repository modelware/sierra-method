```dataviewjs
const basePath = "metadata/classes";
const classes = new Map();
const associations = new Map();

function extractTags(queryString) {
    const tagPattern = /#([\w\/-]+)/g;
    const tags = [];
    let match;
    while ((match = tagPattern.exec(queryString)) !== null) {
        tags.push(match[1]);
    }
    return tags;
}

function makeKey(a, b) {
    return [a, b].sort().join("->");
}

for (const page of dv.pages(`"${basePath}"`)) {
    const fullPath = page.file.path;
    const className = fullPath.replace(basePath + '/', "").replace(/\.md$/, "");
    const attributes = [];

    if (Array.isArray(page.fields)) {
        for (const field of page.fields) {
            const type = field.type?.toLowerCase();
            const name = field.name;
            const inverse = field.options?.inverse;
            if (!name || !type || !["file", "multifile"].includes(type)) continue;

            const tags = extractTags(field.options?.dvQueryString ?? "");
            for (const tag of tags) {
                const key = makeKey(className, tag);
                if (!associations.has(key)) {
                    associations.set(key, {
                        a: className,
                        b: tag,
                        aLabels: new Set(),
                        bLabels: new Set()
                    });
                }
                const assoc = associations.get(key);
                const isSelf = className === tag;

                if (isSelf) {
                    // Assign label to forward side (a), inverse to reverse (b)
                    if (!assoc.aLabels.has(name) && !assoc.bLabels.has(name))
                        assoc.aLabels.add(name);
                    if (inverse && !assoc.aLabels.has(inverse) && !assoc.bLabels.has(inverse))
                        assoc.bLabels.add(inverse);
                } else {
                    if (className === assoc.a) {
                        assoc.aLabels.add(name);
                        if (inverse) assoc.bLabels.add(inverse);
                    } else {
                        assoc.bLabels.add(name);
                        if (inverse) assoc.aLabels.add(inverse);
                    }
                }
            }
        }
    }

    // Collect regular attributes
    const pageAttributes = [];
    if (Array.isArray(page.fields)) {
        for (const field of page.fields) {
            const type = field.type?.toLowerCase();
            const name = field.name;
            if (!name || !type) continue;
            if (!["file", "multifile"].includes(type)) {
                pageAttributes.push({ name, type });
            }
        }
    }

    pageAttributes.sort((a, b) => a.name.localeCompare(b.name));
    classes.set(className, { name: className, path: fullPath, attributes: pageAttributes });
}

// Render PlantUML
let plantUml = "```plantuml-svg\n";
plantUml += "skinparam classAttributeIconSize 0\n";

for (const cls of classes.values()) {
    plantUml += `class "${cls.name}" [[[${cls.path}]]]\n{\n`;
    for (const attr of cls.attributes) {
        plantUml += `  + ${attr.name} : ${attr.type}\n`;
    }
    plantUml += "}\n";
}

for (const assoc of associations.values()) {
    if (!classes.has(assoc.a) || !classes.has(assoc.b)) continue;

    const left = [...assoc.aLabels].sort().join(", ");
    const right = [...assoc.bLabels].sort().join(", ");
    const label = (left && right) ? `${left} / ${right}` :
				  (left) ? `${left}`  : "";

    plantUml += `"${assoc.a}" --> "${assoc.b}" : ${label}\n`;
}

plantUml += "```";
dv.paragraph(plantUml);
```
