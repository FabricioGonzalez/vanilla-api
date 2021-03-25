import HeroRepository from '../repositories/heroRepository.js';
import HeroService from '../services/heroService.js';

const fileName = 'database/data.json';

export const generateInstance = () => {
	const heroRepository = new HeroRepository({
		file: fileName,
	});

	const heroService = new HeroService({
		heroRepository,
	});

	return heroService;
};


