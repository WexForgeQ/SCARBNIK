/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface Category {
	/** Category ID (UUID) */
	id?: string;
	/** Название категории */
	name: string;
	/** Title of the category */
	title?: string;
}

export interface CollectionItem {
	/** CollectionItem ID (UUID) */
	id?: string;
	/** Collection ID (UUID) */
	collection_id: string;
	/** Item ID (UUID) */
	item_id: string;
}

export interface Item {
	/** Item ID (UUID) */
	id?: string;
	/** Название предмета */
	name: string;
	/** User ID (UUID) of the item owner */
	owner_id: string;
	/** Public ID for the item */
	public_id?: number;
	/** Title of the item */
	title?: string;
	/** Description of the item */
	item_description?: string;
	/** URL of the item's photo */
	photo?: string;
}

export interface Collection {
	/** Collection ID (UUID) */
	id?: string;
	/** Title of the collection */
	title: string;
	/** Category ID (UUID) of the collection */
	category_id: string;
	/** Public ID for the collection */
	public_id?: number;
	/** User ID (UUID) of the collection owner */
	owner_id?: string;
	/** Number of views for the collection */
	views_count?: number;
	/**
	 * Whether the collection is public or not
	 * @default false
	 */
	isPublic?: boolean;
}

export interface ItemAdvertisement {
	/** ItemAdvertisement ID (UUID) */
	id?: string;
	/** Item ID (UUID) */
	item_id: string;
	/** User ID (UUID) */
	user_id: string;
	/** Description of the advertisement */
	advertisement_description: string;
	/** Category ID (UUID) of the item advertisement */
	category_id: string;
	/** Public ID for the item advertisement */
	public_id?: number;
}

export interface ItemRequest {
	/** ItemRequest ID (UUID) */
	id?: string;
	/** Title of the item request */
	item_title: string;
	/** Description of the item request */
	request_description: string;
	/** URL of the request photo */
	item_photo: File;
	/** Category ID (UUID) of the item request */
	category_id: string;
	/** Public ID for the item request */
	public_id?: number;
	user_id?: string;
}

export interface TokenRefresh {
	/** Токен обновления */
	refresh_token: string;
}

export interface Tokens {
	/** Токен доступа */
	accessToken?: string;
	/** Токен обновления */
	refreshToken?: string;
}

export interface UserFavorite {
	/** UserFavorite ID (UUID) */
	id?: string;
	/** ID of the user who favorited */
	user_id: string;
	/** Favoritable ID */
	favoritable_id: string;
	/** Type of the favoritable (item or collection) */
	favoritable_type: 'item' | 'collection';
}

export interface UserProfile {
	/** UserProfile ID (UUID) */
	id?: string;
	/** User ID (UUID) */
	user_id: string;
	/** Full name of the user */
	fio: string;
	/** Phone number of the user */
	phone?: string;
	/**
	 * Registration date of the user
	 * @format date-time
	 */
	registration_date?: string;
	/** URL of the user's photo */
	photo?: string;
}

export interface UserReport {
	/** UserReport ID (UUID) */
	id?: string;
	/** User ID (UUID) */
	user_id: string;
	/** ID of the report type */
	report_type_id: string;
	/**
	 * Date of the report
	 * @format date-time
	 */
	report_date: string;
	/** Описание жалобы */
	description: string;
	/** Public ID for the report */
	public_id?: number;
	/** Reporter ID (UUID) */
	reporter_id?: string;
	/** Text of the report */
	report_text?: string;
}

export interface UserReportType {
	/** UserReportType ID (UUID) */
	id?: string;
	/** Title of the report type */
	title: string;
}

export interface User {
	/** User ID (UUID) */
	id?: string;
	/** User email address */
	email: string;
	/** User login name */
	login: string;
	/** User role (0 - admin, 1 - user, etc.) */
	role: number;
	/**
	 * Дата регистрации
	 * @format date-time
	 */
	registration_date?: string;
	/**
	 * Whether the user is approved or not
	 * @default false
	 */
	isApproved?: boolean;
	/**
	 * Whether the user is banned or not
	 * @default false
	 */
	isBanned?: boolean;
	/** Статус OAuth профиля пользователя */
	isOauthProfile?: boolean;
	/** Public ID for the user */
	public_id?: number;
	/** User password (hashed) */
	password?: string;
	/** Refresh token for the user */
	refresh_token?: string;
	/** Access token for the user */
	access_token?: string;
}

export interface CollectionRating {
	/** CollectionRating ID (UUID) */
	id?: string;
	/** Collection ID (UUID) */
	collection_id?: string;
	/** User ID (UUID) */
	user_id?: string;
	/** Text of the rating */
	rate_text?: string;
	/** Rating score */
	rate?: number;
}

import type {
	AxiosInstance,
	AxiosRequestConfig,
	AxiosResponse,
	HeadersDefaults,
	ResponseType,
} from 'axios';
import axios from 'axios';

export type QueryParamsType = Record<string | number, any>;

export interface FullRequestParams
	extends Omit<AxiosRequestConfig, 'data' | 'params' | 'url' | 'responseType'> {
	/** set parameter to `true` for call `securityWorker` for this request */
	secure?: boolean;
	/** request path */
	path: string;
	/** content type of request body */
	type?: ContentType;
	/** query params */
	query?: QueryParamsType;
	/** format of response (i.e. response.json() -> format: "json") */
	format?: ResponseType;
	/** request body */
	body?: unknown;
}

export type RequestParams = Omit<FullRequestParams, 'body' | 'method' | 'query' | 'path'>;

export interface ApiConfig<SecurityDataType = unknown>
	extends Omit<AxiosRequestConfig, 'data' | 'cancelToken'> {
	securityWorker?: (
		securityData: SecurityDataType | null,
	) => Promise<AxiosRequestConfig | void> | AxiosRequestConfig | void;
	secure?: boolean;
	format?: ResponseType;
}

export enum ContentType {
	Json = 'application/json',
	FormData = 'multipart/form-data',
	UrlEncoded = 'application/x-www-form-urlencoded',
	Text = 'text/plain',
}

export class HttpClient<SecurityDataType = unknown> {
	public instance: AxiosInstance;
	private securityData: SecurityDataType | null = null;
	private securityWorker?: ApiConfig<SecurityDataType>['securityWorker'];
	private secure?: boolean;
	private format?: ResponseType;

	constructor({
		securityWorker,
		secure,
		format,
		...axiosConfig
	}: ApiConfig<SecurityDataType> = {}) {
		this.instance = axios.create({
			...axiosConfig,
			baseURL: axiosConfig.baseURL || 'https://localhost:5000',
		});
		this.secure = secure;
		this.format = format;
		this.securityWorker = securityWorker;

		this.instance.interceptors.response.use(
			(response) => response,
			async (error) => {
				const originalRequest = error.config;
				if (error.response.status === 401 && !originalRequest._retry) {
					originalRequest._retry = true;
					try {
						await this.instance.post('/api/refresh', {});
						return this.instance(originalRequest);
					} catch (e) {
						console.error('Ошибка обновления токена', e);
					}
				}
				if (error.response.status === 404) {
					window.location.href = 'auth/login';
				}
				return Promise.reject(error);
			},
		);
	}

	public setSecurityData = (data: SecurityDataType | null) => {
		this.securityData = data;
	};

	protected mergeRequestParams(
		params1: AxiosRequestConfig,
		params2?: AxiosRequestConfig,
	): AxiosRequestConfig {
		const method = params1.method || (params2 && params2.method);

		return {
			...this.instance.defaults,
			...params1,
			...(params2 || {}),
			headers: {
				...((method &&
					this.instance.defaults.headers[
						method.toLowerCase() as keyof HeadersDefaults
					]) ||
					{}),
				...(params1.headers || {}),
				...((params2 && params2.headers) || {}),
			},
		};
	}

	protected stringifyFormItem(formItem: unknown) {
		if (typeof formItem === 'object' && formItem !== null) {
			return JSON.stringify(formItem);
		} else {
			return `${formItem}`;
		}
	}

	protected createFormData(input: Record<string, unknown>): FormData {
		if (input instanceof FormData) {
			return input;
		}
		return Object.keys(input || {}).reduce((formData, key) => {
			const property = input[key];
			const propertyContent: any[] = property instanceof Array ? property : [property];

			for (const formItem of propertyContent) {
				const isFileType = formItem instanceof Blob || formItem instanceof File;
				formData.append(key, isFileType ? formItem : this.stringifyFormItem(formItem));
			}

			return formData;
		}, new FormData());
	}

	public request = async <T = any, _E = any>({
		secure,
		path,
		type,
		query,
		format,
		body,
		...params
	}: FullRequestParams): Promise<AxiosResponse<T>> => {
		const secureParams =
			((typeof secure === 'boolean' ? secure : this.secure) &&
				this.securityWorker &&
				(await this.securityWorker(this.securityData))) ||
			{};
		const requestParams = this.mergeRequestParams(params, secureParams);
		const responseFormat = format || this.format || undefined;

		if (type === ContentType.FormData && body && body !== null && typeof body === 'object') {
			body = this.createFormData(body as Record<string, unknown>);
		}

		if (type === ContentType.Text && body && body !== null && typeof body !== 'string') {
			body = JSON.stringify(body);
		}

		return this.instance.request({
			...requestParams,
			headers: {
				...(requestParams.headers || {}),
				...(type ? { 'Content-Type': type } : {}),
			},
			params: query,
			responseType: responseFormat,
			data: body,
			url: path,
		});
	};
}

/**
 * @title Auth API
 * @version 1.0.0
 * @baseUrl https://localhost:5000
 *
 * API for user authentication
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
	api = {
		/**
		 * No description
		 *
		 * @tags OAuth
		 * @name AuthGoogleList
		 * @summary Авторизация через Google
		 * @request GET:/api/auth/google
		 */
		authGoogleList: (params: RequestParams = {}) =>
			this.request<any, void>({
				path: `/api/auth/google`,
				method: 'GET',
				...params,
			}),

		/**
		 * No description
		 *
		 * @tags OAuth
		 * @name AuthGoogleCallbackList
		 * @summary Обработка ответа от Google
		 * @request GET:/api/auth/google/callback
		 */
		authGoogleCallbackList: (params: RequestParams = {}) =>
			this.request<
				{
					user?: {
						id?: string;
						email?: string;
						login?: string;
						role?: number;
						isApproved?: boolean;
					};
					access_token?: string;
					refresh_token?: string;
				},
				void
			>({
				path: `/api/auth/google/callback`,
				method: 'GET',
				format: 'json',
				...params,
			}),

		/**
		 * No description
		 *
		 * @tags OAuth
		 * @name AuthYandexList
		 * @summary Авторизация через Yandex
		 * @request GET:/api/auth/yandex
		 */
		authYandexList: (params: RequestParams = {}) =>
			this.request<any, void>({
				path: `/api/auth/yandex`,
				method: 'GET',
				...params,
			}),

		/**
		 * No description
		 *
		 * @tags OAuth
		 * @name AuthYandexCallbackList
		 * @summary Обработка ответа от Yandex
		 * @request GET:/api/auth/yandex/callback
		 */
		authYandexCallbackList: (params: RequestParams = {}) =>
			this.request<
				{
					user?: {
						id?: string;
						email?: string;
						login?: string;
						role?: number;
						isApproved?: boolean;
					};
					access_token?: string;
					refresh_token?: string;
				},
				void
			>({
				path: `/api/auth/yandex/callback`,
				method: 'GET',
				format: 'json',
				...params,
			}),

		/**
		 * No description
		 *
		 * @tags Auth
		 * @name AuthRegistrationCreate
		 * @summary Register a new user
		 * @request POST:/api/auth/registration
		 */
		authRegistrationCreate: (
			data: {
				email?: string;
				username?: string;
				password?: string;
			},
			params: RequestParams = {},
		) =>
			this.request<void, void>({
				path: `/api/auth/registration`,
				method: 'POST',
				body: data,
				type: ContentType.Json,
				...params,
			}),

		/**
		 * No description
		 *
		 * @tags Auth
		 * @name AuthVerifyEmailList
		 * @summary Verify email
		 * @request GET:/api/auth/verify-email
		 */
		authVerifyEmailList: (
			query: {
				/** Verification token */
				token: string;
			},
			params: RequestParams = {},
		) =>
			this.request<
				{
					tokens?: {
						access_token?: string;
						refresh_token?: string;
					};
					userid?: string;
					role?: number;
				},
				void
			>({
				path: `/api/auth/verify-email`,
				method: 'GET',
				query: query,
				format: 'json',
				...params,
			}),

		postRating: (
			data: {
				/** Verification token */
				rate: number;
				tex?: string;
				collection_id: string;
				user_id: string;
			},

			params: RequestParams = {},
		) =>
			this.request<
				{
					tokens?: {
						access_token?: string;
						refresh_token?: string;
					};
					userid?: string;
					role?: number;
				},
				void
			>({
				path: `/api/collections/rate`,
				method: 'POST',
				body: data,
				format: 'json',
				...params,
			}),

		deleteRating: (
			data: {
				collection_id: string;
				user_id: string;
			},

			params: RequestParams = {},
		) =>
			this.request<
				{
					tokens?: {
						access_token?: string;
						refresh_token?: string;
					};
					userid?: string;
					role?: number;
				},
				void
			>({
				path: `/api/collections/rate`,
				method: 'DELETE',
				body: data,
				format: 'json',
				...params,
			}),

		/**
		 * No description
		 *
		 * @tags Auth
		 * @name AuthLoginCreate
		 * @summary Login a user
		 * @request POST:/api/auth/login
		 */
		authLoginCreate: (
			data: {
				email?: string;
				password?: string;
			},
			params: RequestParams = {},
		) =>
			this.request<
				{
					tokenData?: {
						access_token?: string;
						refresh_token?: string;
					};
					userid?: string;
					role?: number;
				},
				void
			>({
				path: `/api/auth/login`,
				method: 'POST',
				body: data,
				type: ContentType.Json,
				format: 'json',
				...params,
			}),

		/**
		 * @description Логаут пользователя, очищает токены доступа и обновления из куки и базы данных.
		 *
		 * @tags Auth
		 * @name LogoutUser
		 * @summary Logout a user
		 * @request POST:/api/auth/logout
		 * @secure
		 */
		logoutUser: (params: RequestParams = {}) =>
			this.request<
				{
					/** @example "Вы успешно вышли из системы" */
					message?: string;
				},
				| {
						/** @example "Не залогинен" */
						message?: string;
				  }
				| {
						/** @example "Внутренняя ошибка" */
						message?: string;
				  }
			>({
				path: `/api/auth/logout`,
				method: 'POST',
				secure: true,
				format: 'json',
				...params,
			}),

		/**
		 * No description
		 *
		 * @tags Auth
		 * @name AuthGetRoleList
		 * @summary Get user role
		 * @request GET:/api/auth/getRole
		 */
		authGetRoleList: (
			query: {
				/** AccessToken */
				token: string;
			},
			params: RequestParams = {},
		) =>
			this.request<
				{
					role?: number;
				},
				void
			>({
				path: `/api/auth/getRole`,
				method: 'GET',
				query: query,
				format: 'json',
				...params,
			}),

		/**
		 * No description
		 *
		 * @tags Categories
		 * @name CategoriesList
		 * @summary Возвращает список всех категорий
		 * @request GET:/api/categories
		 */
		categoriesList: (params: RequestParams = {}) =>
			this.request<Category[], any>({
				path: `/api/categories`,
				method: 'GET',
				format: 'json',
				...params,
			}),

		/**
		 * No description
		 *
		 * @tags Categories
		 * @name CategoriesCreate
		 * @summary Создает новую категорию
		 * @request POST:/api/categories
		 */
		categoriesCreate: (data: Category, params: RequestParams = {}) =>
			this.request<
				Category,
				{
					error?: string;
				}
			>({
				path: `/api/categories`,
				method: 'POST',
				body: data,
				type: ContentType.Json,
				format: 'json',
				...params,
			}),

		/**
		 * No description
		 *
		 * @tags Categories
		 * @name CategoriesDetail
		 * @summary Возвращает категорию по ID
		 * @request GET:/api/categories/{id}
		 */
		categoriesDetail: (id: string, params: RequestParams = {}) =>
			this.request<
				Category,
				{
					error?: string;
				}
			>({
				path: `/api/categories/${id}`,
				method: 'GET',
				format: 'json',
				...params,
			}),

		/**
		 * No description
		 *
		 * @tags Categories
		 * @name CategoriesUpdate
		 * @summary Обновляет категорию по ID
		 * @request PUT:/api/categories/{id}
		 */
		categoriesUpdate: (id: string, data: Category, params: RequestParams = {}) =>
			this.request<
				Category,
				{
					error?: string;
				}
			>({
				path: `/api/categories/${id}`,
				method: 'PUT',
				body: data,
				type: ContentType.Json,
				format: 'json',
				...params,
			}),

		/**
		 * No description
		 *
		 * @tags Categories
		 * @name CategoriesDelete
		 * @summary Удаляет категорию по ID
		 * @request DELETE:/api/categories/{id}
		 */
		categoriesDelete: (id: string, params: RequestParams = {}) =>
			this.request<
				void,
				{
					error?: string;
				}
			>({
				path: `/api/categories/${id}`,
				method: 'DELETE',
				...params,
			}),

		/**
		 * No description
		 *
		 * @tags CollectionItems
		 * @name CollectionitemsCreate
		 * @summary Создает новый элемент коллекции
		 * @request POST:/api/collectionitems
		 */
		collectionitemsCreate: (data: CollectionItem, params: RequestParams = {}) =>
			this.request<
				CollectionItem,
				{
					error?: string;
				}
			>({
				path: `/api/collectionitems`,
				method: 'POST',
				body: data,
				type: ContentType.Json,
				format: 'json',
				...params,
			}),

		/**
		 * No description
		 *
		 * @tags CollectionItems
		 * @name CollectionitemsDetail
		 * @summary Возвращает элемент коллекции по ID
		 * @request GET:/api/collectionitems/{id}
		 */
		collectionitemsDetail: (id: string, params: RequestParams = {}) =>
			this.request<
				CollectionItem,
				{
					error?: string;
				}
			>({
				path: `/api/collectionitems/${id}`,
				method: 'GET',
				format: 'json',
				...params,
			}),

		/**
		 * No description
		 *
		 * @tags CollectionItems
		 * @name CollectionitemsUpdate
		 * @summary Обновляет элемент коллекции по ID
		 * @request PUT:/api/collectionitems/{id}
		 */
		collectionitemsUpdate: (id: string, data: CollectionItem, params: RequestParams = {}) =>
			this.request<
				CollectionItem,
				{
					error?: string;
				}
			>({
				path: `/api/collectionitems/${id}`,
				method: 'PUT',
				body: data,
				type: ContentType.Json,
				format: 'json',
				...params,
			}),

		/**
		 * No description
		 *
		 * @tags CollectionItems
		 * @name CollectionitemsDelete
		 * @summary Удаляет элемент коллекции по ID
		 * @request DELETE:/api/collectionitems/{id}
		 */
		collectionitemsDelete: (id: string, params: RequestParams = {}) =>
			this.request<
				void,
				{
					error?: string;
				}
			>({
				path: `/api/collectionitems/${id}`,
				method: 'DELETE',
				...params,
			}),

		/**
		 * No description
		 *
		 * @tags CollectionItems
		 * @name CollectionitemsItemsDetail
		 * @summary Возвращает все элементы для данной коллекции
		 * @request GET:/api/collectionitems/{collectionId}/items
		 */
		collectionitemsItemsDetail: (collectionId: string, params: RequestParams = {}) =>
			this.request<CollectionItem[], any>({
				path: `/api/collectionitems/${collectionId}/items`,
				method: 'GET',
				format: 'json',
				...params,
			}),

		/**
		 * No description
		 *
		 * @tags CollectionItems
		 * @name CollectionitemsAdditemCreate
		 * @summary Добавляет предмет в коллекцию
		 * @request POST:/api/collectionitems/additem
		 */
		collectionitemsAdditemCreate: (
			data: {
				collectionId?: string;
				itemId?: string;
			},
			params: RequestParams = {},
		) =>
			this.request<
				CollectionItem,
				{
					error?: string;
				}
			>({
				path: `/api/collectionitems/additem`,
				method: 'POST',
				body: data,
				type: ContentType.Json,
				format: 'json',
				...params,
			}),

		/**
		 * No description
		 *
		 * @tags CollectionItems
		 * @name CollectionitemsRemoveitemDelete
		 * @summary Удаляет предмет из коллекции
		 * @request DELETE:/api/collectionitems/removeitem
		 */
		collectionitemsRemoveitemDelete: (
			data: {
				collectionId?: string;
				itemId?: string;
			},
			params: RequestParams = {},
		) =>
			this.request<
				void,
				{
					error?: string;
				}
			>({
				path: `/api/collectionitems/removeitem`,
				method: 'DELETE',
				body: data,
				type: ContentType.Json,
				...params,
			}),

		/**
		 * No description
		 *
		 * @tags Collections
		 * @name CollectionsList
		 * @summary Возвращает список всех коллекций
		 * @request GET:/api/collections
		 */
		collectionsList: (
			query?: {
				/** Номер страницы */
				page?: number;
				/** Количество записей на страницу */
				limit?: number;
				/** Название коллекции */
				title?: string;
				/** Тип коллекции */
				type?: string;
				category_id?: string;
				owner_id?: string;
				isPublic?: true;
			},
			params: RequestParams = {},
		) =>
			this.request<{ count: number; rows: Collection[] }, any>({
				path: `/api/collections`,
				method: 'GET',
				query: query,
				format: 'json',
				...params,
			}),

		/**
		 * No description
		 *
		 * @tags Collections
		 * @name CollectionsCreate
		 * @summary Создает новую коллекцию
		 * @request POST:/api/collections
		 */
		collectionsCreate: (data: Collection, params: RequestParams = {}) =>
			this.request<
				Collection,
				{
					error?: string;
				}
			>({
				path: `/api/collections`,
				method: 'POST',
				body: data,
				type: ContentType.Json,
				format: 'json',
				...params,
			}),

		/**
		 * No description
		 *
		 * @tags Collections
		 * @name CollectionsDetail
		 * @summary Возвращает коллекцию по ID
		 * @request GET:/api/collections/{id}
		 */
		collectionsDetail: (id: string, params: RequestParams = {}) =>
			this.request<
				Collection,
				{
					error?: string;
				}
			>({
				path: `/api/collections/${id}`,
				method: 'GET',
				format: 'json',
				...params,
			}),

		/**
		 * No description
		 *
		 * @tags Collections
		 * @name CollectionsUpdate
		 * @summary Обновляет коллекцию по ID
		 * @request PUT:/api/collections/{id}
		 */
		collectionsUpdate: (id: string, data: Collection, params: RequestParams = {}) =>
			this.request<
				Collection,
				{
					error?: string;
				}
			>({
				path: `/api/collections/${id}`,
				method: 'PUT',
				body: data,
				type: ContentType.Json,
				format: 'json',
				...params,
			}),

		/**
		 * No description
		 *
		 * @tags Collections
		 * @name CollectionsDelete
		 * @summary Удаляет коллекцию по ID
		 * @request DELETE:/api/collections/{id}
		 */
		collectionsDelete: (id: string, params: RequestParams = {}) =>
			this.request<
				void,
				{
					error?: string;
				}
			>({
				path: `/api/collections/${id}`,
				method: 'DELETE',
				...params,
			}),

		/**
		 * No description
		 *
		 * @tags ItemAdvertisements
		 * @name ItemadvertisementsList
		 * @summary Возвращает список всех объявлений на предметы
		 * @request GET:/api/itemadvertisements
		 */
		itemadvertisementsList: (
			query?: {
				/** Номер страницы */
				page?: number;
				/** Количество записей на страницу */
				pageSize?: number;
				/** ID предмета */
				item_id?: string;
				/** ID пользователя */
				user_id?: string;
				/** Описание объявления */
				advertisement_description?: string;
				/** ID категории */
				category_id?: string;
				/** Поле для сортировки */
				sortField?: string;
				/** Порядок сортировки (ASC или DESC) */
				sortOrder?: 'ASC' | 'DESC';
			},
			params: RequestParams = {},
		) =>
			this.request<{ total: number; itemAdvertisements: any[] }, any>({
				path: `/api/itemadvertisements`,
				method: 'GET',
				query: query,
				format: 'json',
				...params,
			}),

		itemadvertisementsResponse: (
			query?: {
				user_id?: string;
				owner_id?: string;
				item_id?: string;
			},
			params: RequestParams = {},
		) =>
			this.request<{ total: number; itemAdvertisements: any[] }, any>({
				path: `/api/itemadvertisements/response`,
				method: 'PATCH',
				query: query,
				format: 'json',
				...params,
			}),
		itemRequestsResponse: (
			query?: {
				user_id?: string;
				owner_id?: string;
				item_id?: string;
			},
			params: RequestParams = {},
		) =>
			this.request<{ total: number; itemAdvertisements: any[] }, any>({
				path: `/api/itemrequests/response`,
				method: 'PATCH',
				query: query,
				format: 'json',
				...params,
			}),
		/**
		 * No description
		 *
		 * @tags ItemAdvertisements
		 * @name ItemadvertisementsCreate
		 * @summary Создает новое объявление на предмет
		 * @request POST:/api/itemadvertisements
		 */
		itemadvertisementsCreate: (data: ItemAdvertisement, params: RequestParams = {}) =>
			this.request<
				ItemAdvertisement,
				{
					error?: string;
				}
			>({
				path: `/api/itemadvertisements`,
				method: 'POST',
				body: data,
				type: ContentType.Json,
				format: 'json',
				...params,
			}),

		/**
		 * No description
		 *
		 * @tags ItemAdvertisements
		 * @name ItemadvertisementsDetail
		 * @summary Возвращает объявление на предмет по ID
		 * @request GET:/api/itemadvertisements/{id}
		 */
		itemadvertisementsDetail: (id: string, params: RequestParams = {}) =>
			this.request<
				ItemAdvertisement,
				{
					error?: string;
				}
			>({
				path: `/api/itemadvertisements/${id}`,
				method: 'GET',
				format: 'json',
				...params,
			}),

		/**
		 * No description
		 *
		 * @tags ItemAdvertisements
		 * @name ItemadvertisementsUpdate
		 * @summary Обновляет объявление на предмет по ID
		 * @request PUT:/api/itemadvertisements/{id}
		 */
		itemadvertisementsUpdate: (
			id: string,
			data: ItemAdvertisement,
			params: RequestParams = {},
		) =>
			this.request<
				ItemAdvertisement,
				{
					error?: string;
				}
			>({
				path: `/api/itemadvertisements/${id}`,
				method: 'PUT',
				body: data,
				type: ContentType.Json,
				format: 'json',
				...params,
			}),

		/**
		 * No description
		 *
		 * @tags ItemAdvertisements
		 * @name ItemadvertisementsDelete
		 * @summary Удаляет объявление на предмет по ID
		 * @request DELETE:/api/itemadvertisements/{id}
		 */
		itemadvertisementsDelete: (id: string, params: RequestParams = {}) =>
			this.request<
				void,
				{
					error?: string;
				}
			>({
				path: `/api/itemadvertisements/${id}`,
				method: 'DELETE',
				...params,
			}),

		/**
		 * No description
		 *
		 * @tags ItemRequests
		 * @name ItemrequestsList
		 * @summary Возвращает список всех запросов на предметы
		 * @request GET:/api/itemrequests
		 */
		itemrequestsList: (
			query?: {
				/** Номер страницы */
				page?: number;
				/** Количество записей на страницу */
				pageSize?: number;
				/** Название предмета */
				item_title?: string;
				/** Описание запроса */
				request_description?: string;
				/** Фото запроса */
				request_photo?: string;
				/** ID категории */
				category_id?: string;
				/** Поле для сортировки */
				sortField?: string;
				/** Порядок сортировки (ASC или DESC) */
				sortOrder?: 'ASC' | 'DESC';
				user_id?: string;
			},
			params: RequestParams = {},
		) =>
			this.request<{ total: number; itemRequests: any[] }, any>({
				path: `/api/itemrequests`,
				method: 'GET',
				query: query,
				format: 'json',
				...params,
			}),

		/**
		 * No description
		 *
		 * @tags ItemRequests
		 * @name ItemrequestsCreate
		 * @summary Создает новый запрос на предмет
		 * @request POST:/api/itemrequests
		 */
		itemrequestsCreate: (data: ItemRequest, params: RequestParams = {}) =>
			this.request<
				ItemRequest,
				{
					error?: string;
				}
			>({
				path: `/api/itemrequests`,
				method: 'POST',
				body: data,
				type: ContentType.FormData,
				format: 'json',
				...params,
			}),

		/**
		 * No description
		 *
		 * @tags ItemRequests
		 * @name ItemrequestsDetail
		 * @summary Возвращает запрос на предмет по ID
		 * @request GET:/api/itemrequests/{id}
		 */
		itemrequestsDetail: (id: string, params: RequestParams = {}) =>
			this.request<
				ItemRequest,
				{
					error?: string;
				}
			>({
				path: `/api/itemrequests/${id}`,
				method: 'GET',
				format: 'json',
				...params,
			}),

		/**
		 * No description
		 *
		 * @tags ItemRequests
		 * @name ItemrequestsUpdate
		 * @summary Обновляет запрос на предмет по ID
		 * @request PUT:/api/itemrequests/{id}
		 */
		itemrequestsUpdate: (id: string, data: ItemRequest, params: RequestParams = {}) =>
			this.request<
				ItemRequest,
				{
					error?: string;
				}
			>({
				path: `/api/itemrequests/${id}`,
				method: 'PUT',
				body: data,
				type: ContentType.FormData,
				format: 'json',
				...params,
			}),

		/**
		 * No description
		 *
		 * @tags ItemRequests
		 * @name ItemrequestsDelete
		 * @summary Удаляет запрос на предмет по ID
		 * @request DELETE:/api/itemrequests/{id}
		 */
		itemrequestsDelete: (id: string, params: RequestParams = {}) =>
			this.request<
				void,
				{
					error?: string;
				}
			>({
				path: `/api/itemrequests/${id}`,
				method: 'DELETE',
				...params,
			}),

		/**
		 * No description
		 *
		 * @tags Items
		 * @name ItemsList
		 * @summary Возвращает список всех предметов
		 * @request GET:/api/items
		 */
		itemsList: (
			query?: {
				/** Номер страницы */
				page?: number;
				/** Количество записей на страницу */
				limit?: number;
				/** Название предмета */
				name?: string;
				/** ID владельца */
				owner_id?: string;
			},
			params: RequestParams = {},
		) =>
			this.request<Item[], any>({
				path: `/api/items`,
				method: 'GET',
				query: query,
				format: 'json',
				...params,
			}),

		/**
		 * No description
		 *
		 * @tags Items
		 * @name ItemsCreate
		 * @summary Создает новый предмет
		 * @request POST:/api/items
		 */
		itemsCreate: (data: Item, params: RequestParams = {}) =>
			this.request<
				Item,
				{
					error?: string;
				}
			>({
				path: `/api/items`,
				method: 'POST',
				body: data,
				type: ContentType.Json,
				format: 'json',
				...params,
			}),

		/**
		 * No description
		 *
		 * @tags Items
		 * @name ItemsDetail
		 * @summary Возвращает предмет по ID
		 * @request GET:/api/items/{id}
		 */
		itemsDetail: (id: string, params: RequestParams = {}) =>
			this.request<
				Item,
				{
					error?: string;
				}
			>({
				path: `/api/items/${id}`,
				method: 'GET',
				format: 'json',
				...params,
			}),

		/**
		 * No description
		 *
		 * @tags Items
		 * @name ItemsUpdate
		 * @summary Обновляет предмет по ID
		 * @request PUT:/api/items/{id}
		 */
		itemsUpdate: (id: string, data: Item, params: RequestParams = {}) =>
			this.request<
				Item,
				{
					error?: string;
				}
			>({
				path: `/api/items/${id}`,
				method: 'PUT',
				body: data,
				type: ContentType.Json,
				format: 'json',
				...params,
			}),

		/**
		 * No description
		 *
		 * @tags Items
		 * @name ItemsDelete
		 * @summary Удаляет предмет по ID
		 * @request DELETE:/api/items/{id}
		 */
		itemsDelete: (id: string, params: RequestParams = {}) =>
			this.request<
				void,
				{
					error?: string;
				}
			>({
				path: `/api/items/${id}`,
				method: 'DELETE',
				...params,
			}),

		/**
		 * No description
		 *
		 * @tags Items
		 * @name ItemsUploadCreate
		 * @summary Загружает изображение и обновляет элемент
		 * @request POST:/api/items/upload/{id}
		 */
		itemsUploadCreate: (
			id: string,
			data: {
				/** @format binary */
				photo?: File;
			},
			params: RequestParams = {},
		) =>
			this.request<
				{
					/** @example "http://localhost:9000/scarbnikpictures/photos/unique-id.png" */
					imageUrl?: string;
				},
				| {
						/** @example "Ошибка загрузки изображения" */
						error?: string;
				  }
				| {
						/** @example "Элемент не найден" */
						error?: string;
				  }
			>({
				path: `/api/items/upload/${id}`,
				method: 'POST',
				body: data,
				type: ContentType.FormData,
				format: 'json',
				...params,
			}),

		/**
		 * No description
		 *
		 * @tags Auth
		 * @name RefreshCreate
		 * @summary Обновляет токены доступа и обновления
		 * @request POST:/api/refresh
		 */
		refreshCreate: (data: TokenRefresh, params: RequestParams = {}) =>
			this.request<
				Tokens,
				| {
						message?: string;
				  }
				| {
						message?: string;
						error?: string;
				  }
			>({
				path: `/api/refresh`,
				method: 'POST',
				body: data,
				type: ContentType.Json,
				format: 'json',
				...params,
			}),

		/**
		 * No description
		 *
		 * @tags UserFavorites
		 * @name UserfavoritesCreate
		 * @summary Создает новый элемент избранного
		 * @request POST:/api/userfavorites
		 */
		userfavoritesCreate: (data: UserFavorite, params: RequestParams = {}) =>
			this.request<
				UserFavorite,
				{
					error?: string;
				}
			>({
				path: `/api/userfavorites`,
				method: 'POST',
				body: data,
				type: ContentType.Json,
				format: 'json',
				...params,
			}),

		/**
		 * No description
		 *
		 * @tags UserFavorites
		 * @name UserfavoritesDetail
		 * @summary Возвращает элемент избранного по ID
		 * @request GET:/api/userfavorites/{id}
		 */
		userfavoritesDetail: (id: string, params: RequestParams = {}) =>
			this.request<
				UserFavorite,
				{
					error?: string;
				}
			>({
				path: `/api/userfavorites/${id}`,
				method: 'GET',
				format: 'json',
				...params,
			}),

		/**
		 * No description
		 *
		 * @tags UserFavorites
		 * @name UserfavoritesUpdate
		 * @summary Обновляет элемент избранного по ID
		 * @request PUT:/api/userfavorites/{id}
		 */
		userfavoritesUpdate: (id: string, data: UserFavorite, params: RequestParams = {}) =>
			this.request<
				UserFavorite,
				{
					error?: string;
				}
			>({
				path: `/api/userfavorites/${id}`,
				method: 'PUT',
				body: data,
				type: ContentType.Json,
				format: 'json',
				...params,
			}),

		/**
		 * No description
		 *
		 * @tags UserFavorites
		 * @name UserfavoritesDelete
		 * @summary Удаляет элемент избранного по ID
		 * @request DELETE:/api/userfavorites/{id}
		 */
		userfavoritesDelete: (id: string, params: RequestParams = {}) =>
			this.request<
				void,
				{
					error?: string;
				}
			>({
				path: `/api/userfavorites/${id}`,
				method: 'DELETE',
				...params,
			}),

		/**
		 * No description
		 *
		 * @tags UserFavorites
		 * @name UserfavoritesAddFavoriteCreate
		 * @summary Добавляет элемент в избранное
		 * @request POST:/api/userfavorites/addFavorite
		 */
		userfavoritesAddFavoriteCreate: (
			data: {
				userId?: string;
				favoritableId?: string;
				favoritableType?: string;
			},
			params: RequestParams = {},
		) =>
			this.request<
				UserFavorite,
				{
					error?: string;
				}
			>({
				path: `/api/userfavorites/addFavorite`,
				method: 'POST',
				body: data,
				type: ContentType.Json,
				format: 'json',
				...params,
			}),

		/**
		 * No description
		 *
		 * @tags UserFavorites
		 * @name UserfavoritesRemoveFavoriteCreate
		 * @summary Удаляет элемент из избранного
		 * @request POST:/api/userfavorites/removeFavorite
		 */
		userfavoritesRemoveFavoriteCreate: (
			data: {
				userId?: string;
				favoritableId?: string;
				favoritableType?: string;
			},
			params: RequestParams = {},
		) =>
			this.request<
				void,
				{
					error?: string;
				}
			>({
				path: `/api/userfavorites/removeFavorite`,
				method: 'POST',
				body: data,
				type: ContentType.Json,
				...params,
			}),

		getAllFavorites: (
			query: {
				userId?: string;
				favoritable_type?: string;
			},
			params: RequestParams = {},
		) =>
			this.request<
				void,
				{
					error?: string;
				}
			>({
				path: `/api/userfavorites/getAll`,
				method: 'get',
				query: query,
				type: ContentType.Json,
				...params,
			}),
		/**
		 * No description
		 *
		 * @tags UserFavorites
		 * @name UserfavoritesFavoritesDetail
		 * @summary Возвращает все избранные элементы для данного пользователя
		 * @request GET:/api/userfavorites/{userId}/favorites
		 */
		userfavoritesFavoritesDetail: (
			userId: string,
			query?: {
				/** Номер страницы */
				page?: number;
				/** Количество записей на страницу */
				limit?: number;
				/** Тип избранного элемента */
				type?: string;
			},
			params: RequestParams = {},
		) =>
			this.request<UserFavorite[], any>({
				path: `/api/userfavorites/${userId}/favorites`,
				method: 'GET',
				query: query,
				format: 'json',
				...params,
			}),

		/**
		 * No description
		 *
		 * @tags UserProfiles
		 * @name UserprofilesCreate
		 * @summary Создает новый профиль пользователя
		 * @request POST:/api/userprofiles
		 */
		userprofilesCreate: (data: UserProfile, params: RequestParams = {}) =>
			this.request<
				UserProfile,
				{
					error?: string;
				}
			>({
				path: `/api/userprofiles`,
				method: 'POST',
				body: data,
				type: ContentType.Json,
				format: 'json',
				...params,
			}),

		/**
		 * No description
		 *
		 * @tags UserProfiles
		 * @name UserprofilesDetail
		 * @summary Возвращает профиль пользователя по ID
		 * @request GET:/api/userprofiles/{id}
		 */
		userprofilesDetail: (id: string, params: RequestParams = {}) =>
			this.request<
				UserProfile,
				{
					error?: string;
				}
			>({
				path: `/api/userprofiles/${id}`,
				method: 'GET',
				format: 'json',
				...params,
			}),

		/**
		 * No description
		 *
		 * @tags UserProfiles
		 * @name UserprofilesUpdate
		 * @summary Обновляет профиль пользователя по ID
		 * @request PUT:/api/userprofiles/{id}
		 */
		userprofilesUpdate: (id: string, data: UserProfile, params: RequestParams = {}) =>
			this.request<
				UserProfile,
				{
					error?: string;
				}
			>({
				path: `/api/userprofiles/${id}`,
				method: 'PUT',
				body: data,
				type: ContentType.Json,
				format: 'json',
				...params,
			}),

		/**
		 * No description
		 *
		 * @tags UserProfiles
		 * @name UserprofilesDelete
		 * @summary Удаляет профиль пользователя по ID
		 * @request DELETE:/api/userprofiles/{id}
		 */
		userprofilesDelete: (id: string, params: RequestParams = {}) =>
			this.request<
				void,
				{
					error?: string;
				}
			>({
				path: `/api/userprofiles/${id}`,
				method: 'DELETE',
				...params,
			}),

		/**
		 * No description
		 *
		 * @tags UserProfiles
		 * @name UserprofilesUploadImageCreate
		 * @summary Загрузить изображение профиля
		 * @request POST:/api/userprofiles/upload-image
		 */
		userprofilesUploadImageCreate: (
			data: {
				/**
				 * Изображение профиля (PNG, JPG и т.д.)
				 * @format binary
				 */
				image: File;
				/** Идентификатор пользователя */
				userId: string;
			},
			params: RequestParams = {},
		) =>
			this.request<
				{
					message?: string;
					imageUrl?: string;
					updatedUserProfile?: object;
				},
				void
			>({
				path: `/api/userprofiles/upload-image`,
				method: 'POST',
				body: data,
				type: ContentType.FormData,
				format: 'json',
				...params,
			}),

		/**
		 * No description
		 *
		 * @tags UserReports
		 * @name UserreportsList
		 * @summary Возвращает список всех жалоб пользователей
		 * @request GET:/api/userreports
		 */
		userreportsList: (
			query?: {
				/** Номер страницы */
				page?: number;
				/** Количество записей на страницу */
				limit?: number;
				/** ID пользователя */
				user_id?: string;
				/** ID типа жалобы */
				report_type_id?: string;
				/**
				 * Начальная дата
				 * @format date-time
				 */
				fromDate?: string;
				/**
				 * Конечная дата
				 * @format date-time
				 */
				toDate?: string;
			},
			params: RequestParams = {},
		) =>
			this.request<UserReport[], any>({
				path: `/api/userreports`,
				method: 'GET',
				query: query,
				format: 'json',
				...params,
			}),

		/**
		 * No description
		 *
		 * @tags UserReports
		 * @name UserreportsCreate
		 * @summary Создает новую жалобу пользователя
		 * @request POST:/api/userreports
		 */
		userreportsCreate: (data: UserReport, params: RequestParams = {}) =>
			this.request<
				UserReport,
				{
					error?: string;
				}
			>({
				path: `/api/userreports`,
				method: 'POST',
				body: data,
				type: ContentType.Json,
				format: 'json',
				...params,
			}),

		/**
		 * No description
		 *
		 * @tags UserReports
		 * @name UserreportsDetail
		 * @summary Возвращает жалобу пользователя по ID
		 * @request GET:/api/userreports/{id}
		 */
		userreportsDetail: (id: string, params: RequestParams = {}) =>
			this.request<
				UserReport,
				{
					error?: string;
				}
			>({
				path: `/api/userreports/${id}`,
				method: 'GET',
				format: 'json',
				...params,
			}),

		/**
		 * No description
		 *
		 * @tags UserReports
		 * @name UserreportsUpdate
		 * @summary Обновляет жалобу пользователя по ID
		 * @request PUT:/api/userreports/{id}
		 */
		userreportsUpdate: (id: string, data: UserReport, params: RequestParams = {}) =>
			this.request<
				UserReport,
				{
					error?: string;
				}
			>({
				path: `/api/userreports/${id}`,
				method: 'PUT',
				body: data,
				type: ContentType.Json,
				format: 'json',
				...params,
			}),

		/**
		 * No description
		 *
		 * @tags UserReports
		 * @name UserreportsDelete
		 * @summary Удаляет жалобу пользователя по ID
		 * @request DELETE:/api/userreports/{id}
		 */
		userreportsDelete: (id: string, params: RequestParams = {}) =>
			this.request<
				void,
				{
					error?: string;
				}
			>({
				path: `/api/userreports/${id}`,
				method: 'DELETE',
				...params,
			}),

		/**
		 * No description
		 *
		 * @tags UserReportTypes
		 * @name UserreporttypesList
		 * @summary Возвращает список всех типов жалоб
		 * @request GET:/api/userreporttypes
		 */
		userreporttypesList: (params: RequestParams = {}) =>
			this.request<UserReportType[], any>({
				path: `/api/userreporttypes`,
				method: 'GET',
				format: 'json',
				...params,
			}),

		/**
		 * No description
		 *
		 * @tags UserReportTypes
		 * @name UserreporttypesCreate
		 * @summary Создает новый тип жалобы
		 * @request POST:/api/userreporttypes
		 */
		userreporttypesCreate: (data: UserReportType, params: RequestParams = {}) =>
			this.request<
				UserReportType,
				{
					error?: string;
				}
			>({
				path: `/api/userreporttypes`,
				method: 'POST',
				body: data,
				type: ContentType.Json,
				format: 'json',
				...params,
			}),

		/**
		 * No description
		 *
		 * @tags UserReportTypes
		 * @name UserreporttypesDetail
		 * @summary Возвращает тип жалобы по ID
		 * @request GET:/api/userreporttypes/{id}
		 */
		userreporttypesDetail: (id: string, params: RequestParams = {}) =>
			this.request<
				UserReportType,
				{
					error?: string;
				}
			>({
				path: `/api/userreporttypes/${id}`,
				method: 'GET',
				format: 'json',
				...params,
			}),

		/**
		 * No description
		 *
		 * @tags UserReportTypes
		 * @name UserreporttypesUpdate
		 * @summary Обновляет тип жалобы по ID
		 * @request PUT:/api/userreporttypes/{id}
		 */
		userreporttypesUpdate: (id: string, data: UserReportType, params: RequestParams = {}) =>
			this.request<
				UserReportType,
				{
					error?: string;
				}
			>({
				path: `/api/userreporttypes/${id}`,
				method: 'PUT',
				body: data,
				type: ContentType.Json,
				format: 'json',
				...params,
			}),

		/**
		 * No description
		 *
		 * @tags UserReportTypes
		 * @name UserreporttypesDelete
		 * @summary Удаляет тип жалобы по ID
		 * @request DELETE:/api/userreporttypes/{id}
		 */
		userreporttypesDelete: (id: string, params: RequestParams = {}) =>
			this.request<
				void,
				{
					error?: string;
				}
			>({
				path: `/api/userreporttypes/${id}`,
				method: 'DELETE',
				...params,
			}),

		/**
		 * No description
		 *
		 * @tags Users
		 * @name UsersList
		 * @summary Возвращает список всех пользователей
		 * @request GET:/api/users
		 */
		usersList: (
			query?: {
				/** Номер страницы */
				page?: number;
				/** Количество записей на страницу */
				pageSize?: number;
				/** Электронная почта пользователя */
				email?: string;
				/**
				 * Дата регистрации
				 * @format date-time
				 */
				registration_date?: string;
				/** Статус подтверждения пользователя */
				isApproved?: boolean;
				/** Статус бана пользователя */
				isBanned?: boolean;
				/** Статус OAuth профиля пользователя */
				isOauthProfile?: boolean;
				/** Поле для сортировки */
				sortField?: string;
				/** Порядок сортировки (ASC или DESC) */
				sortOrder?: 'ASC' | 'DESC';
			},
			params: RequestParams = {},
		) =>
			this.request<{ total: number; users: any[] }, any>({
				path: `/api/users`,
				method: 'GET',
				query: query,
				format: 'json',
				...params,
			}),

		/**
		 * No description
		 *
		 * @tags Users
		 * @name UsersCreate
		 * @summary Создает нового пользователя
		 * @request POST:/api/users
		 */
		usersCreate: (data: User, params: RequestParams = {}) =>
			this.request<
				User,
				{
					error?: string;
				}
			>({
				path: `/api/users`,
				method: 'POST',
				body: data,
				type: ContentType.Json,
				format: 'json',
				...params,
			}),

		/**
		 * @description Получить информацию о пользователе на основе токена из куки
		 *
		 * @tags Users
		 * @name UsersSelfList
		 * @summary Получить информацию о пользователе
		 * @request GET:/api/users/self
		 */
		usersSelfList: (params: RequestParams = {}) =>
			this.request<
				{
					/** @example "12345" */
					id?: string;
					/** @example "user@example.com" */
					email?: string;
					UserProfile?: {
						/** @example "John Doe" */
						fio?: string;
						/** @example "https://example.com/photo.jpg" */
						photo?: string;
					};
				},
				| {
						/** @example "Не авторизован" */
						message?: string;
				  }
				| {
						/** @example "JWT verification failed" */
						error?: string;
				  }
			>({
				path: `/api/users/self`,
				method: 'GET',
				format: 'json',
				...params,
			}),

		/**
		 * No description
		 *
		 * @tags Users
		 * @name UsersDetail
		 * @summary Возвращает пользователя по ID
		 * @request GET:/api/users/{id}
		 */
		usersDetail: (id: string, params: RequestParams = {}) =>
			this.request<
				User,
				{
					error?: string;
				}
			>({
				path: `/api/users/${id}`,
				method: 'GET',
				format: 'json',
				...params,
			}),

		/**
		 * No description
		 *
		 * @tags Users
		 * @name UsersUpdate
		 * @summary Обновляет пользователя по ID
		 * @request PUT:/api/users/{id}
		 */
		usersUpdate: (id: string, data: User, params: RequestParams = {}) =>
			this.request<
				User,
				{
					error?: string;
				}
			>({
				path: `/api/users/${id}`,
				method: 'PUT',
				body: data,
				type: ContentType.Json,
				format: 'json',
				...params,
			}),

		/**
		 * No description
		 *
		 * @tags Users
		 * @name UsersDelete
		 * @summary Удаляет пользователя по ID
		 * @request DELETE:/api/users/{id}
		 */
		usersDelete: (id: string, params: RequestParams = {}) =>
			this.request<
				void,
				{
					error?: string;
				}
			>({
				path: `/api/users/${id}`,
				method: 'DELETE',
				...params,
			}),
	};
}
