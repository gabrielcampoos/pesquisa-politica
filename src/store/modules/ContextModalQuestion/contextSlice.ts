import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import ContextStateQuestion from '../../types/ContextStateQuestion';

const initialState: ContextStateQuestion = {
	isOpen: false,
	context: 'create',
};

export const contextSliceQuestion = createSlice({
	name: 'contextModalQuestion',
	initialState,
	reducers: {
		showModalQuestion: (
			state,
			action: PayloadAction<'create' | 'edit' | 'delete'>,
		) => {
			return {
				isOpen: true,
				context: action.payload,
			};
		},

		hideModalQuestion: (state) => {
			return {
				...state,
				isOpen: false,
			};
		},
	},
});

export const { showModalQuestion, hideModalQuestion } =
	contextSliceQuestion.actions;

export default contextSliceQuestion.reducer;
