import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import serviceApi from '../../../configs/services/api';
import { ResponseGetIdQuestionDTO } from '../../types/ResponseRequest';
import { showNotification } from '../Notification/notificationSlice';

interface CreateQuestionDTO {
	id: string;
	idSearch?: string;
	question: string;
	answer: string;
	createdAt: string;
}

const initialState = {
	question: {
		id: '',
		idSearch: '',
		question: '',
		answer: '',
		createdAt: '',
	},
	loading: false,
};

export const createQuestion = createAsyncThunk(
	'question/create',
	async (data: CreateQuestionDTO, { dispatch }) => {
		try {
			const response = await serviceApi.post('/question', data);

			const responseAPI = response.data as ResponseGetIdQuestionDTO;

			dispatch(
				showNotification({
					message: responseAPI.message,
					success: responseAPI.success,
				}),
			);

			return responseAPI;
		} catch (error) {
			if (error instanceof AxiosError) {
				const response = error.response
					?.data as ResponseGetIdQuestionDTO;

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

export const listAllQuestions = createAsyncThunk(
	'question/list',
	async (_, { dispatch }) => {
		try {
			const response = await serviceApi.get('/question');

			const responseAPI = response.data as ResponseGetIdQuestionDTO;

			dispatch(
				showNotification({
					message: responseAPI.message,
					success: responseAPI.success,
				}),
			);

			return responseAPI;
		} catch (error) {
			if (error instanceof AxiosError) {
				const response = error.response
					?.data as ResponseGetIdQuestionDTO;

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

export const getIdQuestion = createAsyncThunk(
	'question/getIdQuestion',
	async (_, { dispatch }) => {
		try {
			const response = await serviceApi.get('/getIdQuestion');

			const responseApi = response.data as ResponseGetIdQuestionDTO;
			localStorage.setItem('idQuestion', JSON.stringify(response.data));
			console.log(responseApi);

			dispatch(
				showNotification({
					message: responseApi.message,
					success: responseApi.success,
				}),
			);

			return responseApi;
		} catch (error) {
			if (error instanceof AxiosError) {
				const response = error.response
					?.data as ResponseGetIdQuestionDTO;

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

export const questionSlice = createSlice({
	name: 'question',
	initialState: initialState,

	reducers: {
		setQuestion: (state, action) => {
			return {
				...state,
				question: {
					id: action.payload.id,
					idSearch: action.payload.idSearch,
					question: action.payload.question,
					answer: action.payload.answer,
					createdAt: action.payload.createdAt,
				},
			};
		},
	},

	extraReducers: (builder) => {
		builder.addCase(createQuestion.pending, (state) => {
			return {
				...state,
				loading: true,
			};
		});

		builder.addCase(createQuestion.fulfilled, (state, action) => {
			const payload = action.payload as ResponseGetIdQuestionDTO;

			if (payload.success && payload.data) {
				return {
					question: {
						id: payload.data?.id,
						idSearch: payload.data.idSearch,
						question: payload.data.question,
						answer: payload.data.answer,
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

		builder.addCase(createQuestion.rejected, (state) => {
			return {
				...state,
				loading: false,
			};
		});

		builder.addCase(listAllQuestions.pending, (state) => {
			return {
				...state,
				loading: true,
			};
		});

		builder.addCase(listAllQuestions.fulfilled, (state, action) => {
			const payload = action.payload as ResponseGetIdQuestionDTO;

			if (payload.success && payload.data) {
				return {
					question: {
						id: payload.data.id,
						idSearch: payload.data.idSearch,
						question: payload.data.question,
						answer: payload.data.answer,
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

		builder.addCase(listAllQuestions.rejected, (state) => {
			return {
				...state,
				loading: false,
			};
		});

		builder.addCase(getIdQuestion.pending, (state) => {
			return {
				...state,
				loading: true,
			};
		});

		builder.addCase(getIdQuestion.fulfilled, (state, action) => {
			const payload = action.payload as ResponseGetIdQuestionDTO;

			if (payload.success && payload.data) {
				return {
					question: {
						id: payload.data.id,
						idSearch: payload.data.idSearch,
						question: payload.data.question,
						answer: payload.data.answer,
						createdAt: payload.data.createdAt,
					},
					loading: false,
				};
			}

			if (!payload.success) {
				return initialState;
			}
		});

		builder.addCase(getIdQuestion.rejected, () => {
			return initialState;
		});
	},
});

export const { setQuestion } = questionSlice.actions;

export default questionSlice.reducer;
