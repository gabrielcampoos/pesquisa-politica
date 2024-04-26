import {
	createAsyncThunk,
	createEntityAdapter,
	createSlice,
} from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import { RootState } from '../..';
import serviceApi from '../../../configs/services/api';
import {
	DeleteQuestionDTO,
	EditQuestionDTO,
	GetIdQuestionDTO,
	QuestionDTO,
} from '../../types/Question';
import { ResponseQuestion } from '../../types/ResponseRequest';
import { showNotification } from '../Notification/notificationSlice';

interface CreateQuestionDTO {
	id: string;
	idSearch?: string;
	question: string;
	answer: string;
	createdAt: string;
}

export const createQuestion = createAsyncThunk(
	'question/create',
	async (data: CreateQuestionDTO, { dispatch }) => {
		try {
			const response = await serviceApi.post('/question', data);

			dispatch(
				showNotification({
					success: response.data.success,
					message: response.data.message,
				}),
			);

			return response.data;
		} catch (error) {
			if (error instanceof AxiosError) {
				const response: ResponseQuestion = {
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

export const listQuestion = createAsyncThunk(
	'question/list',
	async (_, { dispatch }) => {
		try {
			const response = await serviceApi.get('/question');
			dispatch(
				showNotification({
					message: response.data.message,
					success: response.data.success,
				}),
			);
			return response.data;
		} catch (error) {
			if (error instanceof AxiosError) {
				const response: ResponseQuestion = {
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

export const editQuestion = createAsyncThunk(
	'question/edit',
	async (data: EditQuestionDTO, { dispatch }) => {
		try {
			const response = await serviceApi.put(
				`/question/edit/${data.id}`,
				data,
			);

			dispatch(
				showNotification({
					success: response.data.success,
					message: response.data.message,
				}),
			);

			return response.data;
		} catch (error) {
			if (error instanceof AxiosError) {
				const response: ResponseQuestion = {
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

export const deleteQuestion = createAsyncThunk(
	'question/delete',
	async (data: DeleteQuestionDTO, { dispatch }) => {
		try {
			const response = await serviceApi.delete(
				`/question/delete/${data.id}`,
			);

			dispatch(
				showNotification({
					success: response.data.success,
					message: response.data.message,
				}),
			);

			return response.data;
		} catch (error) {
			if (error instanceof AxiosError) {
				const response: ResponseQuestion = {
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

export const getIdQuestion = createAsyncThunk(
	'question/getIdQuestion',
	async (data: GetIdQuestionDTO, { dispatch }) => {
		try {
			const response = await serviceApi.get(
				`/getIdQuestion/${data.idQuestion}`,
			);

			dispatch(
				showNotification({
					success: response.data.success,
					message: response.data.message,
				}),
			);

			return response.data;
		} catch (error) {
			if (error instanceof AxiosError) {
				const response: ResponseQuestion = {
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

const questionAdapter = createEntityAdapter<QuestionDTO>({
	selectId: (state) => state.id,
});

export const { selectAll: listAllQuestion } = questionAdapter.getSelectors(
	(global: RootState) => global.questions,
);

const questionSlice = createSlice({
	name: 'question',
	initialState: questionAdapter.getInitialState({
		loading: false,
		message: '',
	}),
	reducers: {
		refresh(state) {
			return { ...state };
		},
	},

	extraReducers: (builder) => {
		builder.addCase(listQuestion.pending, (state) => {
			state.loading = true;
			state.message = 'Carregando perguntas.';
		});

		builder.addCase(listQuestion.fulfilled, (state, action) => {
			const { message, data } = action.payload;

			state.loading = false;
			state.message = message;

			if (!data || data.length === 0) {
				state.message = 'Nada encontrado.';
				return;
			}

			questionAdapter.setAll(state, data);
		});

		builder.addCase(createQuestion.pending, (state) => {
			state.loading = true;
			state.message = 'Carregando pergunta.';
		});

		builder.addCase(createQuestion.fulfilled, (state, action) => {
			const { message, data } = action.payload;

			state.loading = false;
			state.message = message;

			if (!data?.id) {
				console.log(action.payload);
				return;
			}

			questionAdapter.addOne(state, data);
			console.log(data);
		});

		builder.addCase(createQuestion.rejected, (state) => {
			state.loading = false;
			state.message = 'Pergunta não criada.';
		});

		builder.addCase(editQuestion.pending, (state) => {
			state.loading = true;
			state.message = 'Atualizando pergunta...';
		});

		builder.addCase(editQuestion.fulfilled, (state, action) => {
			const { message, data } = action.payload;
			state.loading = false;
			state.message = message;

			if (!data || !data.id) {
				console.log(action.payload);
				return;
			}

			questionAdapter.updateOne(state, {
				id: data.id,
				changes: data,
			});
		});

		builder.addCase(editQuestion.rejected, (state) => {
			state.loading = false;
			state.message = 'Pergunta não atualizada.';
		});

		builder.addCase(deleteQuestion.pending, (state) => {
			state.loading = true;
			state.message = 'Excluindo pergunta...';
		});
		builder.addCase(deleteQuestion.fulfilled, (state, action) => {
			const { message, success, data } = action.payload;
			state.loading = false;
			state.message = message;

			if (success) {
				questionAdapter.removeOne(state, data);
			}
		});
		builder.addCase(deleteQuestion.rejected, (state) => {
			state.loading = false;
			state.message = 'Pergunta não excluida.';
		});
	},
});

export default questionSlice.reducer;
export const { refresh } = questionSlice.actions;
