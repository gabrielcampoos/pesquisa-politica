/* eslint-disable @typescript-eslint/no-unused-vars */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface SearchProps {
	id: string;
	district: string;
	researcherName: string;
	researchedName: string;
	createdAt: string;
}

const initialState: SearchProps = {
	id: '',
	district: '',
	researcherName: '',
	researchedName: '',
	createdAt: '',
};

export const idSearchSlice = createSlice({
	name: 'idSearch',
	initialState,
	reducers: {
		getId: (state, action: PayloadAction<SearchProps>) => {
			return {
				id: action.payload.id ?? '',
				district: action.payload.district ?? '',
				researcherName: action.payload.researcherName ?? '',
				researchedName: action.payload.researchedName ?? '',
				createdAt: action.payload.createdAt ?? '',
			};
		},
		deleteId: (state) => {
			return initialState;
		},
	},
});

export const { getId, deleteId } = idSearchSlice.actions;

export default idSearchSlice.reducer;
