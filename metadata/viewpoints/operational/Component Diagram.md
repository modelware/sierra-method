```dataviewjs
var s = ''
s += '```plantuml-svg\n';
s += 'left to right direction\n'
const pattern = /[- ]/g;
// requirements
const components = dv.pages('(#structural/Component) and !"metadata"');
components.forEach(comp => {
	s += 'class "'+comp.file.name+'" as '+comp.file.name.replace(pattern, "_")+' [[['+comp.file.path+']]] {\n';
	comp.isCharacterizedBy?.map(i => dv.page(i.path)).filter(i => i).forEach(v => {
		s += '\t- '+v.file.name+'\n';
	});
	s += '}\n';
});
// related to
components.forEach(req1 => {
	req1.contains?.map(i => dv.page(i.path)).filter(i => i).forEach(req2 => {
		s += req1.file.name.replace(pattern, "_")+' *-- '+req2.file.name.replace(pattern, "_")+'\n';
	});
});
s += '```'
dv.paragraph(s);
```
