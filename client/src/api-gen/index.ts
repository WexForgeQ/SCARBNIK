import { Api } from './api';

export const fetchApi = new Api({
	baseURL: process.env.REACT_APP_API_URL,
	withCredentials: true,
	headers: {
		'Access-Control-Allow-Origin': 'https://localhost:3000',
		'Access-Control-Allow-Credentials': 'true',
	},
});

export * from './api';
