/* eslint-disable @typescript-eslint/no-unused-vars */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface QuestionProps {
	id: string;
	idSearch: string;
	question: string;
	answer: string;
	createdAt: string;
}

const initialState: QuestionProps = {
	id: '',
	idSearch: '',
	question: '',
	answer: '',
	createdAt: '',
};

export const idQuestionSlice = createSlice({
	name: 'idQuestion',
	initialState,
	reducers: {
		getIdQuestion: (state, action: PayloadAction<QuestionProps>) => {
			return {
				id: action.payload.id ?? '',
				idSearch: action.payload.idSearch ?? '',
				question: action.payload.question ?? '',
				answer: action.payload.answer ?? '',
				createdAt: action.payload.createdAt ?? '',
			};
		},
		deleteIdQuestion: (state) => {
			return initialState;
		},
	},
});

export const { getIdQuestion, deleteIdQuestion } = idQuestionSlice.actions;

export default idQuestionSlice.reducer;
