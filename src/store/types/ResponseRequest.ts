import { QuestionDTO } from './Question';
import { SearchDTO } from './Search';

export type ResponseSearch = {
	success: boolean;
	message: string;
	data?: SearchDTO;
};

export type ResponseQuestion = {
	success: boolean;
	message: string;
	data?: QuestionDTO[];
};

export type ResponseGetIdQuestionDTO = {
	success: boolean;
	message: string;
	data?: {
		id: string;
		idSearch: string;
		question: string;
		answer: string;
		createdAt: string;
	};
};
