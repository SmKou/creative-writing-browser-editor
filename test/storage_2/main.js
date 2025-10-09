const DB_NAME = "test-cwbe-storage-2"
const DB_VERSION = 1

const ids = [
	"73ad6758-6f15-4183-80f4-58733a76e563",
	"5ad09cab-12c3-4aad-a655-194259eecb49",
	"a41a8680-e319-4ecb-aecb-c81a1be73385",
	"50676d1f-8b7b-4623-8d3e-0ba9aab5f2be",
	"063702b7-5f2b-4652-af82-a6817eff07f8",
	"3443140d-c18f-43a5-8edc-e4b5324e9ef2",
	"f65cf7a8-bd07-447f-883e-e4f10a3437d6",
	"7989e583-28f3-4302-836f-a5ec7d2593c6",
	"4a242409-bbcf-4746-bdb2-4d65ec10750f",
	"735b5a70-0fa2-4c68-bc53-e533b31ea1e4",
	"c6214733-fda9-4194-8818-a267036d75d7",
	"583e3dca-25e1-411e-a1a1-d230b313a6c0",
	"37462856-d9c8-4e52-a616-69b0e6da6418",
	"0be432d2-07ea-47cc-9beb-412f1637e089",
	"06332b19-ebeb-4c0a-bc12-5a9adeb1fdd4",
	"a4932bcf-c722-479a-982e-36fea6bcfdb1",
	"2de43dea-5be4-43a9-911d-47722eeb04a4",
	"aa39f183-3250-45c2-80e4-da8a9411a97f",
	"2fe4f294-e7c4-4618-960b-0aca0295c2ee",
	"47eba64e-f7c5-40fb-83c2-97ea0a28261c",
	"82697d05-1690-44f8-ba83-5bd2ee7f5db8",
	"8f8ab4bd-5686-4653-8a94-16d0e4362990",
	"5a5a34cf-9779-4ace-9775-55597f4d3a04",
	"a0b0f6e5-d5df-415c-8465-64a6045e1129",
	"7c70ab7e-7faa-4480-baeb-ddf77935eebd",
	"10890e9c-5837-496a-a1d4-591af34521a7",
	"e413c3ec-9802-499c-b2ba-d7f4a6b8f741",
	"667883b9-b7ee-4b30-8098-7107e15df8e9",
	"5ce63e3a-e242-4424-a7c2-5422cf7b2c39",
	"0bc941d0-6089-453c-8ad7-72b7b351d10a"
]

const work = [
	{
		id: ids[0],
		title: "Just a Title",
		history: ids[1],
		journal: ids[2],
		drafts: [ids[3]],
		timelines: [ids[4]],
		profiles: [ids[5]],
		languages: [ids[6]]
	}
]
const draft = [
	{
		id: ids[3],
		untitled: 1,
		current: {
			chapter: ids[8],
			section: "",
			paragraph: ids[9],
			sentence: ids[10]
		},
		order: [ids[8]],
		outline: ids[11],
		history: ids[12]
	}
]
const chapter = [
	{
		id: ids[8],
		title: "",
		segment: "paragraph",
		order: [ids[9]],
		type: "prologue"
	}
]
const paragraph = [
	{
		id: ids[9],
		order: [ids[10]]
	}
]
const sentence = [
	{
		id: ids[10],
		txt: `"There's more," she said, "There is more."`
	}
]
const outline = [
	{
		id: ids[11],
		order: [],
		reminders: {
			todo: [],
			datetime: {},
			frequency: {}
		},
		draft: draft.id
	}
]
const segment = [
	{
		id: ids[13],
		title: "",
		description: "",
		level: "",
		content: "",
		todo: "",
		// connections: { id: entity_type }
		// id: entity_type
	}
]
const timeline = [
	{
		id: ids[4],
		order: [ids[14]],
		history: ids[15]
		// connections: { id: entity_type }
		// id: entity_type
	}
]
const point = [
	{
		id: ids[14],
		title: "",
		description: "",
		timelines: [timeline.id],
		content: "",
		// connections: { id: entity_type }
		// id: entity_type
	}
]
const profile = [
	{
		id: ids[5]
	}
]
const language = [
	{
		id: ids[6]
	}
]
const lexicon = {}
const glossary = {}
const grammar = {}
const history = [
	{
		id: ids[1],
		current: ids[7],
		order: [ids[7]],
		entity_type: "work",
		entity: work.id
	},
	{
		id: ids[12]
	},
	{
		id: ids[15]
	}
]
const change = {
	action: "create",
	res: [
		{ id: ids[0], type: "work" },
		{ id: ids[3], type: "draft" },
		{ id: ids[4], type: "timeline"},
		{ id: ids[5], type: "profile" },
		{ id: ids[6], type: "language" },
		{ id: ids[1], type: "history" },
		{ id: ids[2], type: "journal" }
	],
	date: (new Date()).toDateString()
}
const journal = [
	{
		id: ids[2]
	}
]

const STORES = {
	"works": {
		indexes: ["title"],
		data: work
	},
	"drafts": {
		indexes: ["outline", "history"],
		data: draft
	},
	"chapters": {
		indexes: ["title"],
		data: chapter
	},
	"sections": {
		indexes: ["title"],
		data: ""
	},
	"paragraphs": {
		data: paragraph
	},
	"sentences": {
		data: sentence
	},
	"outlines": {
		indexes: ["draft"],
		data: outline
	},
	"segments": {
		indexes: ["title"],
		data: segment
	},
	"timelines": {
		indexes: ["history"],
		data: timeline
	},
	"events": {
		indexes: ["title"],
		data: point
	},
	"profiles": {
		indexes: ["name", "history"],
		data: profile
	},
	"languages": {
		indexes: ["name", "lexicon", "glossary", "grammar", "history"],
		data: language
	},
	"lexicons": {
		data: lexicon
	},
	"glossaries": {
		data: glossary
	},
	"grammars": {
		data: grammar
	},
	"histories": {
		indexes: ["entity"],
		data: history
	},
	"changes": {
		data: change
	},
	"journals": {
		data: journal
	}
}

let db
const req = indexedDB.open(DB_NAME, DB_VERSION)
req.onupgradeneeded = evt => {
	const db = evt.target.result
	STORES.forEach(store_name => {
		if (!db.objectStoreNames.contains(store_name)) {
			const idxs = STORES[store_name].indexes
			const store = db.createObjectStore(store_name, { keyPath: "id" })
			idxs.forEach(index => store.createIndex(index, index, { unique: true }))
		}
	})
}
req.onsuccess = evt => {
	db = evt.target.result
}
req.onerror = evt => console.error(evt.target.errorCode)
