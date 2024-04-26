import { SearchDTO } from './Search';

export interface QuestionDTO {
	id: string;
	idSearch: SearchDTO;
	question: string;
	answer: string;
	createdAt: string;
}

export interface FilterDTO {
	district?: string;
}

export interface DeleteQuestionDTO {
	id: string;
}

export interface EditQuestionDTO {
	id: string;
	question: string;
	answer: string;
}

export interface GetIdQuestionDTO {
	idQuestion: string;
}
