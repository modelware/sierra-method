```dataviewjs
var s = ''
s += '```plantuml-svg\n';
s += 'left to right direction\n'
const pattern = /[- ]/g;
// requirements
const requirements = dv.pages('(#requirement/Requirement) and !"metadata"');
requirements.forEach(i => {
	s += 'rectangle "'+i.file.name+'" as '+i.file.name.replace(pattern, "_")+' [[['+i.file.path+']]]\n';
});
// related to
requirements.forEach(req1 => {
	req1.contains?.map(i => dv.page(i.path)).filter(i => i).forEach(req2 => {
		s += req1.file.name.replace(pattern, "_")+' *-- '+req2.file.name.replace(pattern, "_")+'\n';
	});
	req1.refines?.map(i => dv.page(i.path)).filter(i => i).forEach(req2 => {
		s += req1.file.name.replace(pattern, "_")+' ..> '+req2.file.name.replace(pattern, "_")+' : refines\n';
	});
	req1.requires?.map(i => dv.page(i.path)).filter(i => i).forEach(req2 => {
		s += req1.file.name.replace(pattern, "_")+' ..> '+req2.file.name.replace(pattern, "_")+' : requires\n';
	});
});
s += '```'
dv.paragraph(s);
```
