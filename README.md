# Creative Writing Browser editor

## Description

Creative Writing Browser editor (CWBe) is a web app for creative writing and management in the browser, mainly offline. Works are marked by draft, chapters, paragraphs, and sentences, as well as notes, characters, maps, the outline and timelines. In explorative writing, there's no knowing what will come out, so even when something is deleted, one might want to retain it for later, whether to add it or refer it. Every piece should be able to connect with entities in other aspects of the work, such as writing several paragraphs on a character's backstory, only to remove the text for now.

### Features List

**Writing mode**
- load content of work's draft
- start new draft (from existing content)
- add, insert, delete, edit, and move text around
- remove content (not connection)

**Planning mode**
- dashboard of work: drafts, management features
- character profiles: person, people, places
- maps: geographic, demographic, distance calculation
- world: rules
- language: lexicon, glossary, guide
- outline: scenes (and segments)
- timelines: person, people, places

**Editing mode**
- markup
- comment
- view

### Commands
**entity**: a singular piece of information in a management feature, ie. profile, map, rule, lang, event or timeline, segment or outline
**segment**: a piece of writing at varying scopes (sentence, paragraph, section, chapter)

|  cmd | cmd name   | cmd action                                 |
------------------------------------------------------------------
|  sel |     select | select info to be joined or moved together |
| msel |    mselect | multiple select: select info in arrays     |
| find |       find | search active window for keyword(s)        |
| fall |    findall | multiple find: search for all instances    |
| goto |    go/open | change focus to another feature or segment |
|  mov |       move | move a segment (create new draft)          |
|   cp | copy-paste | copy-paste segment                         |
|  add | add-insert | create new entity, or write                |
|   jn |       join | connect two entities

## License

[Creative Writing Browser editor](https://github.com/SmKou/creative-writing-browser-editor) © 2025 by [Sm Kou](https://github.com/SmKou) is licensed under [CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/) ![CC](https://mirrors.creativecommons.org/presskit/icons/cc.svg) ![BY](https://mirrors.creativecommons.org/presskit/icons/by.svg) ![NC](https://mirrors.creativecommons.org/presskit/icons/nc.svg) ![SA](https://mirrors.creativecommons.org/presskit/icons/sa.svg)
