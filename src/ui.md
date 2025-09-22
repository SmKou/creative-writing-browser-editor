# UI Management

loc: d-c-n-p-s (draft-chapter-section-paragraph-sentence)

Locations
- <loc>: individual segment
- alternative <loc:loc>: range of segments

## Case: End trigger
Description: User writes sentence, press end trigger ("| ) after end mark (.|?|!)

Input: sentence ("txt")

Parameters: txt, ipt

Process:
1. Create new sentence
2.	- Identify .current sentence ("last")
	- Append txt to .current sentence
	- Move .current to new sentence
3. Append new sentence after last

## Case: End mark and Enter
Description: User writes sentence, press Enter after end mark (.|?|!)

Input: sentence ("txt")

Parameters: txt, ipt

Process:
1. Create new paragraph (return: "last")
2. Create new sentence
3. (refer: End trigger)
4. Append new sentence to new paragraph
5. Append new paragraph after last

## Case: Enter
Description: User press Enter

Input: none

Parameters: ipt

Process:
1. Create new section
2. Create new paragraph
3. Move .current sentence to new paragraph
4. Check: no sections in chapter &&  paragraphs in chapter
	- Create new section
	- Move paragraphs to new section
	- Add new section to chapter
5. Append new paragraph to new section
6. Append new section after last

## Case: Command and Enter
Description: User writes command and input, press Enter

Parameters: [cmd, ...input] = user_input.split(/[ ]+/)

Process:
1. Check: command contains "#"
	- "#": new work
	- "##": new chapter
	- "###": new section
2. Identify command
3. Execute command

### Case: nm <level> <title>
Action: Rename segment at level with title

Notes
- cannot be used out of context (req. level switch if applicable)
- req. level

Defaults
- title not normalized for matching
- level options: work(w) | chapter(c) | section(n)

### Case: add <loc>
Action: Place ipt after a location

Notes
- cannot be used to transition between drafts

Defaults
- no loc: last sentence of last paragraph (of last section)
- no s[n]: end of current paragraph

Locations
- s[d]: after sentence d in paragraph
- p[c]-s[d]: after sentence d of paragraph c in section|chapter
- n[b]-p[c]-s[d]: after sentence d of paragraph c in section b of chapter
- c[a](-n[b])-p[c]-s[d]: after sentence d of paragraph c (in section b) of chapter a

### Case: ins <loc>
Action: Place ipt before a location

Notes
- cannot be used to transition between drafts

Defaults
- no loc: first sentence of first paragraph (of first section)
- no s[d]: beginning of current paragraph

Locations
- s[d]: before sentence d in paragraph
- p[c]-s[d]: before sentence d of paragraph c in section|chapter
- n[b]-p[c]-s[d]: before sentence d of paragraph c in section b of chapter
- c[a](-n[b])-p[c]-s[d]: before sentence d of paragraph c in section b of chapter a

### Case: mv <loc1> <loc2>
Action: Move location to (before) location

Notes
- cannot be used to transition between drafts
- cannot be used to connect or join content in features
- can be used in place of add and ins commands

Flags
- -a: after location

Defaults
- -i <loc2>: before location
- no <loc1>: move ipt to selected location(s), or add (-a) and ins (-i)

### Case: rm <loc>
Action: Delete, or remove, location from draft

Flags
- -f <feature> <feature-keyword>: connect to feature by feature keyword
- -d: permanent delete
- -a: apply to all

Defaults
- does not remove from draft segments, only orders

### Case: rcd <loc>
Action: Record location => add note or comment to location, or add location to feature (entity)

Notes
- can be used to create a save point and produce a backup for downlaod

Flags
- -m <type>: denotes note is comment, todo|rmdr (appears in outline)
- -f <feature> <feature-keyword>: connect to feature by feature keyword
- -s <[dn]>: create save point (optional: title), dn=download

Defaults
- add note to location
- if comment: type=todo
