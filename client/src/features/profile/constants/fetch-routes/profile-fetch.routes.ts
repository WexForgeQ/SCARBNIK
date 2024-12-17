export const USER_PROFILE_FETCH_ROUTES = {
	group: 'profile',
	get: {
		url: `${process.env.REACT_APP_API_URL}/userprofiles/:id`,
		fetch_name: 'get',
		async_thunk_route: 'get',
	},
	update: {
		url: `${process.env.REACT_APP_API_URL}/userprofiles/:id`,
		fetch_name: 'update',
		async_thunk_route: 'update',
	},
};
