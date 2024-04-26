import {
	createAsyncThunk,
	createEntityAdapter,
	createSlice,
} from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import { RootState } from '../..';
import { ResponseSearch } from '../../types/ResponseRequest';
import { showNotification } from '../Notification/notificationSlice';
import serviceApi from '../../../configs/services/api';
import { SearchDTO } from '../../types/Search';

type CreateSearchDTO = {
	id: string;
	district: string;
	researcherName: string;
	researchedName: string;
	createdAt: Date;
};

export const createSearch = createAsyncThunk(
	'search/create',
	async (data: CreateSearchDTO, { dispatch }) => {
		try {
			const response = await serviceApi.post('/search', data);

			dispatch(
				showNotification({
					success: response.data.success,
					message: response.data.message,
				}),
			);

			return response.data;
		} catch (error) {
			if (error instanceof AxiosError) {
				const response: ResponseSearch = {
					success: error.response?.data.success,
					message: error.response?.data.message,
				};

				dispatch(
					showNotification({
						message: error.response?.data.message,
						success: false,
					}),
				);
				return response;
			}

			return {
				success: false,
				message: 'Algo de errado não está certo. A requisição falhou.',
			};
		}
	},
);

export const listSearch = createAsyncThunk(
	'search/list',
	async (_, { dispatch }) => {
		try {
			const response = await serviceApi('/search', {});
			dispatch(
				showNotification({
					message: response.data.message,
					success: response.data.success,
				}),
			);
			return response.data;
		} catch (error) {
			if (error instanceof AxiosError) {
				const retorno: ResponseSearch = {
					success: error.response?.data.success,
					message: error.response?.data.message,
				};
				dispatch(
					showNotification({
						message: error.response?.data.message,
						success: false,
					}),
				);
				return retorno;
			}
			return {
				success: false,
				message: 'Algo de errado não está certo. A requisição falhou.',
			};
		}
	},
);

const searchAdapter = createEntityAdapter<SearchDTO>({
	selectId: (state) => state.id,
});

export const { selectAll: listAllSearch } = searchAdapter.getSelectors(
	(global: RootState) => global.searches,
);

const searchSlice = createSlice({
	name: 'search',
	initialState: searchAdapter.getInitialState({
		loading: false,
		message: '',
	}),
	reducers: {
		refresh(state) {
			return { ...state };
		},
	},

	extraReducers: (builder) => {
		builder.addCase(listSearch.pending, (state) => {
			state.loading = true;
			state.message = 'Carregando pesquisa.';
		});

		builder.addCase(listSearch.fulfilled, (state, action) => {
			const { message, data } = action.payload;

			state.loading = false;
			state.message = message;

			if (!data || data.length === 0) {
				state.message = 'Nada encontrado.';
				return;
			}

			searchAdapter.setAll(state, data);
		});

		builder.addCase(createSearch.pending, (state) => {
			state.loading = true;
			state.message = 'Carregando question.';
		});

		builder.addCase(createSearch.fulfilled, (state, action) => {
			const { message, data } = action.payload;

			state.loading = false;
			state.message = message;

			if (!data?.id) {
				console.log(action.payload);
				return;
			}

			searchAdapter.addOne(state, data);
		});

		builder.addCase(createSearch.rejected, (state) => {
			state.loading = false;
			state.message = 'Question não criada.';
		});
	},
});

export default searchSlice.reducer;
export const { refresh } = searchSlice.actions;
