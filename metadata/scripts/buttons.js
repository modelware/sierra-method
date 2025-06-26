class buttons {

    createSelectButton(dv, f, page, property) {
        if (!page) return;

        // create a container
        const container = dv.el("div", "", {});
        container.innerHTML = "";
        container.style.paddingTop = 'var(--p-spacing)';

        // add the select button
        const list = f(dv, page, property, {options: {alwaysOn: true, showAddField: false, inFrontmatter: true}});
        let select = list.querySelector("button");
        container.appendChild(select);
        list.remove();

        return container;
    }

    createAddButton(dv, f, page, property, path, template, isArray) {
        // SVG as a string
        const svgMarkup = `
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" 
            viewBox="0 0 24 24" fill="none" stroke="currentColor" 
            stroke-width="2" stroke-linecap="round" stroke-linejoin="round" 
            class="svg-icon create-new">
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="12" y1="8" x2="12" y2="16"></line>
        <line x1="8" y1="12" x2="16" y2="12"></line>
        </svg>`;

        // Create button using dv.el
        let button = dv.el("button", "", { class: "icon-btn" });

        // Set the SVG as the button's innerHTML
        button.innerHTML = svgMarkup;

        button.onclick = async() => {
            var contents = await app.vault.read(app.vault.getAbstractFileByPath(template+'.md'));
            const newFile = await this.createPageAvoidingCollision(path, contents);
            const link = '[['+newFile.path+']]';
            const file = app.vault.getAbstractFileByPath(page.file.path);
            this.updateFrontmatterValue(file, property, link, isArray);
        };

        return button;
    }

    createAllButtons(dv, f, page, property, path, template, isArray) {
        if (!page) return;

        // create a container
        const container = dv.el("div", "", {});
        container.innerHTML = "";
        container.style.paddingTop = 'var(--p-spacing)';
        container.style.display = "flex";
        container.style.flexDirection = "row";
        container.style.gap = "10px";

        // add the select button
        const list = f(dv, page, property, {options: {alwaysOn: true, showAddField: false, inFrontmatter: true}});
        let select = list.querySelector("button");
        container.appendChild(select);
        list.remove();

        // add the add button
        const add = this.createAddButton(dv, f, page, property, path, template, isArray);
        //add.className = 'mod-cta';
        container.appendChild(add);

        return container;
    }

    async updateFrontmatterValue(file, prop, value, isArray) {
        app.fileManager.processFrontMatter(file, frontmatter => {
            if (isArray) {
                if (!frontmatter[prop]) {
                    frontmatter[prop] = [];
                }
                if (!frontmatter[prop].contains(value)) {
                    frontmatter[prop] = [...frontmatter[prop], value ]
                }
            }
            else
                frontmatter[prop] = value;
        })
    }

    async createPageAvoidingCollision(basePath, content) {
        let i = 0;
        let path;
        let file;
        do {
            const suffix = i === 0 ? "" : ` ${i}`;
            path = `${basePath}${suffix}.md`;
            file = app.vault.getAbstractFileByPath(path);
            i++;
        } while (file);
        return await app.vault.create(path, content);
    }
}