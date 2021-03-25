import http from 'http';
import Hero from './entities/hero.js';
import { generateInstance } from './factories/heroFactory.js';

const heroService = generateInstance();

const port = 3000;

const DEFAULT_HEADER = {
	'Content-Type': 'applicatio/json',
};

const routes = {
	'/heroes:get': async (request, response) => {
		const { id } = request.queryString;
		await Promise.reject('/heroes:get');
		const heroes = await heroService.find(id);
		response.write(JSON.stringify({ results: heroes }));
		return response.end();
	},
	'/heroes:post': async (request, response) => {
		// async iterator
		for await (const data of request) {
			try {
				const item = JSON.parse(data);
				const hero = new Hero(item);
				const { error, valid } = hero.isValid();
				if (!valid) {
					response.writeHead(400, DEFAULT_HEADER);
					response.write(JSON.stringify({ error: error.join(',') }));
					return response.end();
				}

				const id = await heroService.create(hero);

				response.writeHead(201, DEFAULT_HEADER);
				response.write(
					JSON.stringify({ success: 'Hero Created with Success!!', id }),
				);
				return response.end();
			} catch (error) {}
			// So jogamos um return aqui pq é um objeto body por request
			//se fosse um arquivo
		}
	},
	default: (request, response) => {
		response.write('Hello');
		response.end();
	},
};

const handleError = (response) => {
	return (error) => {
		console.error('Deu ruim ', error);

		response.writeHead(500, DEFAULT_HEADER);

		response.write(JSON.stringify({ error: 'Internal Server Error' }));
		return response.end;
	};
};

const handler = (request, response) => {
	const { url, method } = request;

	const [first, route, id] = url.split('/');

	request.queryString = { id: isNaN(id) ? id : Number(id) };

	const key = `/${route}:${method.toLowerCase()}`;

	response.writeHead(200, DEFAULT_HEADER);

	const chosen = routes[key] || routes.default;

	return chosen(request, response).catch(handleError(response));
};

http.createServer(handler).listen(port, () => {
	console.log(`server running at ${port}`);
});
