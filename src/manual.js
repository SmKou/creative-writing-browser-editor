const manual = {
	load: {},
	create: {},
	move: {},
	undo: {},
	delete: {},
	save: {},
	// metadata commands
	select: {},
	sort: {},
	find: {},
	connect: {},
	disconnect: {}
}

return {
	cmds: Object.keys(manual),
	man: manual
}
