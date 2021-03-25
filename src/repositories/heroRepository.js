import { readFile, writeFile } from 'fs/promises';

export default class HeroRepository {
	constructor({ file }) {
		this.file = file;
	}
	async #currentFileContent() {
		return JSON.parse(await readFile(this.file));
	}

	async create(data) {
		const currentFile = await this.#currentFileContent();

		currentFile.push(data);

		await writeFile(this.file, JSON.stringify(currentFile));

		return data.id;
	}

	async find(itemId) {
		const all = await this.#currentFileContent();

		if (!itemId) return all;

		return all.find(({ id }) => itemId === id);
	}
}

/* const heroRepository = new HeroRepository({
	file: 'database/data.json',
});
	 heroRepository
	.create({ id: 2, name: 'Chapolin', age: 100, power: 'Strength' })
	.then(console.log)
	.catch((error) => console.error(error.toString()));

heroRepository
	.find()
	.then(console.log)
	.catch((error) => console.error(error.toString()));
 */
