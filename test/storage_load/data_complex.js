import { load_sample } from './sample'}

const KEY_SIZE = 24
const v4 = () => {
	const id = []
	for (let i = 0; i < KEY_SIZE; ++i) {
		const lower = String.fromCharCode(97 + Math.floor(Math.random() * 26))
		const upper = String.fromCharCode(65 + Math.floor(Math.random() * 26))
		const num = Math.floor(Math.random() * 10)
		const idx = Math.floor(Math.random() * 3)
		id.push([lower, upper, num][idx])
		if ([8, 16].includes(i))
			id.push("-")
	}
	return id.join("")
}
