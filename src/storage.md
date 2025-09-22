# Storage

Discarded:
```js
pre_section() {
	if (current.section)
		return false
	const draft = db.drafts.get(current.draft)
	const chapter = draft.chapters.get(current.chapter)
	if (!chapter.order.length)
		return false
	const { id, title } = create.section("")
	const section = draft.sections.get(id)
	while (chapter.order.length)
		section.order.push(chapter.order.shift())
	chapter.order.push(id)
	return { id, title }
}
```

Note: Used for creating a presection when, prior, initial creation of a chapter did not include a section, enabling chapters to consist solely of paragraphs.
-> out of scope
