```dataviewjs
var s = ''
s += '```plantuml-svg\n';
s += 'left to right direction\n'
const pattern = /[- ]/g;
// activities
const activities = dv.pages('(#operational/Activity) and !"metadata"');
activities.forEach(i => {
	s += 'rectangle "'+i.file.name+'" as '+i.file.name.replace(pattern, "_")+' [[['+i.file.path+']]]\n';
});
// related to
activities.forEach(sup => {
	sup.hasProcessConstraint?.map(i => dv.page(i.path)).filter(i => i).forEach(con => {
		let subactivities = [];
		if (con.a) subactivities.push(con.a);
		if (con.b) subactivities.push(con.b);
		if (con.c) subactivities.push(...con.c);
		subactivities.map(i => dv.page(i.path)).filter(i => i).forEach(sub => {
			s += sup.file.name.replace(pattern, "_")+' --> '+sub.file.name.replace(pattern, "_")+'\n';
		});
	});
});
s += '```'
dv.paragraph(s);
```
