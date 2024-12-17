export const USER_FETCH_ROUTES = {
	group: 'user',
	getOne: {
		url: `${process.env.REACT_APP_API_URL}/user/:id`,
		fetch_name: 'getOne',
		async_thunk_route: 'getOne',
	},
	self: {
		url: `${process.env.REACT_APP_API_URL}/user/self`,
		fetch_name: 'self',
		async_thunk_route: 'self',
	},
};
