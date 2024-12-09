const generateApi = require('swagger-typescript-api').generateApi;
require('dotenv').config();

const apiUrl = `${process.env.REACT_APP_API_URL}/swagger.json`;
// const apiUrl = 'http://192.168.10.23:5001/swagger/v1/swagger.json';
if (!apiUrl) {
	console.error('API URL is not defined in .env file');
	// eslint-disable-next-line no-undef
	process.exit(1);
}

/* eslint-disable */
generateApi({
	name: 'api.ts',
	output: '../../../src/api-gen',
	url: apiUrl,
	httpClientType: 'axios',
})
	.then(() => {
		console.log('API generation completed successfully.');
	})
	.catch((error) => {
		console.error('Error during API generation:', error.message);
	});
/* eslint-enable */
