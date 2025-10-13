const FEATURES = {
	"DASHBOARD": ["dbd", "dash", "dashboard"],
	"WORK": ["wk", "work", "prj", "project"],
	"DRAFT": ["dft", "drft", "draft"],
	"OUTLINE": ["otln", "outline"],
	"JOURNAL": ["jrl", "jrnl", "journal"],
	"HISTORY": ["hst", "hsty", "history"],
	"TIMELINE": ["tmln", "timeline"],
	"PROFILE": ["prf", "prfl", "profile", "char", "character", "ppl", "people", "plc", "place"],
	// consider: person's language: slang | dialect
	"LANGUAGE": ["lng", "lang", "language"],
	"LEXICON": ["lxc", "lexi", "lexicon", "vcb", "vocab", "dct", "dict", "diction"],
	"GLOSSARY": ["gls", "glos", "glossary", "idx", "index"],
	"GRAMMAR": ["grm", "gram", "grammar", "stx", "sntx", "syntax"],
	"SETTING": ["env", "environment", "wrld", "world", "setting"],
	"MAP": ["mp", "map", "geo", "geography"],
	"DISTANCE": ["dst", "dist", "distance"]
}

const get_feature = (input) => {
	const fts = Object.keys(FEATURES)
	const feature = fts.filter(ft => FEATURES[ft].includes(input))
	return feature.length ? feature[0] : false
}

export default {}
