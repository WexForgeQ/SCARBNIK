export const USER_FETCH_ROUTES = {
	group: 'auth',
	google: {
		url: `${process.env.REACT_APP_API_URL}/auth/google`,
		fetch_name: 'google',
		async_thunk_route: 'auth/google',
	},
	yandex: {
		url: `${process.env.REACT_APP_API_URL}/auth/yandex`,
		fetch_name: 'yandex',
		async_thunk_route: 'auth/yandex',
	},
	login: {
		url: `${process.env.REACT_APP_API_URL}/auth/login`,
		fetch_name: 'login',
		async_thunk_route: 'auth/login',
	},
	registration: {
		url: `${process.env.REACT_APP_API_URL}/auth/registration`,
		fetch_name: 'registration',
		async_thunk_route: 'auth/registration',
	},
	refresh: {
		url: `${process.env.REACT_APP_API_URL}/auth/refresh`,
		fetch_name: 'refresh',
		async_thunk_route: 'auth/refresh',
	},
	sms: {
		url: `${process.env.REACT_APP_API_URL}/sms`,
		fetch_name: 'smscode',
		async_thunk_route: 'smsRequest',
	},
	smsApprove: {
		url: `${process.env.REACT_APP_API_URL}/sms/approve`,
		fetch_name: 'codeapprove',
		async_thunk_route: 'code/approve',
	},
	fileUpload: {
		url: `${process.env.REACT_APP_API_URL}/File`,
		fetch_name: 'fileupload',
		async_thunk_route: 'fileupload',
	},
	logout: {
		url: `${process.env.REACT_APP_API_URL}/logout`,
		fetch_name: 'logout',
		async_thunk_route: 'logout',
	},
};
