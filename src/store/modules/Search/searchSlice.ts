import {
	createAsyncThunk,
	createEntityAdapter,
	createSlice,
} from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import { ResponseSearch } from '../../types/ResponseRequest';
import { SearchDTO } from '../../types/Search';
import { showNotification } from '../Notification/notificationSlice';
import serviceApi from '../../../configs/services/api';
import { RootState } from '../..';

const initialState = {
	search: {
		id: '',
		district: '',
		researcherName: '',
		researchedName: '',
		createdAt: '',
	},
	loading: false,
};

export const createSearch = createAsyncThunk(
	'search/create',
	async (newSearch: SearchDTO, { dispatch }) => {
		try {
			const response = await serviceApi.post('/search', newSearch);

			const responseAPI = response.data as ResponseSearch;

			dispatch(
				showNotification({
					message: responseAPI.message,
					success: responseAPI.success,
				}),
			);

			return responseAPI;
		} catch (error) {
			if (error instanceof AxiosError) {
				const response = error.response?.data as ResponseSearch;

				dispatch(
					showNotification({
						message: response.message,
						success: response.success,
					}),
				);

				return response;
			}

			return {
				success: false,
				message: 'Erro inesperado.',
			};
		}
	},
);

export const listAllSearches = createAsyncThunk(
	'search/list',
	async (_, { dispatch }) => {
		try {
			const response = await serviceApi.get('/search');

			const responseAPI = response.data as ResponseSearch;

			dispatch(
				showNotification({
					message: responseAPI.message,
					success: responseAPI.success,
				}),
			);

			return responseAPI;
		} catch (error) {
			if (error instanceof AxiosError) {
				const response = error.response?.data as ResponseSearch;

				dispatch(
					showNotification({
						message: response.message,
						success: response.success,
					}),
				);

				return response;
			}

			return {
				success: false,
				message: 'Erro inesperado.',
			};
		}
	},
);

export const searchSlice = createSlice({
	name: 'search',
	initialState: initialState,

	reducers: {
		setSearch: (state, action) => {
			return {
				...state,
				search: {
					id: action.payload.id,
					district: action.payload.district,
					researcherName: action.payload.researcherName,
					researchedName: action.payload.researchedName,
					createdAt: action.payload.createdAt,
				},
			};
		},
	},

	extraReducers: (builder) => {
		builder.addCase(createSearch.pending, (state) => {
			return {
				...state,
				loading: true,
			};
		});

		builder.addCase(createSearch.fulfilled, (state, action) => {
			const payload = action.payload as ResponseSearch;

			if (payload.success && payload.data) {
				return {
					search: {
						id: payload.data?.id,
						district: payload.data.district,
						researcherName: payload.data.researcherName,
						researchedName: payload.data.researchedName,
						createdAt: payload.data.createdAt,
					},
					loading: false,
				};
			}

			if (!payload.success) {
				return {
					...state,
					loading: false,
				};
			}
		});

		builder.addCase(createSearch.rejected, (state) => {
			return {
				...state,
				loading: false,
			};
		});

		builder.addCase(listAllSearches.pending, (state) => {
			return {
				...state,
				loading: true,
			};
		});

		builder.addCase(listAllSearches.fulfilled, (state, action) => {
			const payload = action.payload as ResponseSearch;

			if (payload.success && payload.data) {
				return {
					search: {
						id: payload.data.id,
						district: payload.data.district,
						researcherName: payload.data.researcherName,
						researchedName: payload.data.researchedName,
						createdAt: payload.data.createdAt,
					},
					loading: false,
				};
			}

			if (!payload.success) {
				return {
					...state,
					loading: false,
				};
			}
		});

		builder.addCase(listAllSearches.rejected, (state) => {
			return {
				...state,
				loading: false,
			};
		});
	},
});

export const { setSearch } = searchSlice.actions;

export default searchSlice.reducer;
