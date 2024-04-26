/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable no-case-declarations */
import {
	Box,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	TextField,
	Typography,
} from '@mui/material';
import React, { useState } from 'react';

import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import { hideModalQuestion } from '../../../../store/modules/ContextModalQuestion/contextSlice';
import { deleteId } from '../../../../store/modules/ModalId/idSlice';
import {
	createQuestion,
	deleteQuestion,
	editQuestion,
	refresh,
} from '../../../../store/modules/Question/questionAdapter';

export const QuestionModal: React.FC = () => {
	const [question, setQuestion] = useState('');
	const [answer, setAnswer] = useState('');

	const dispatch = useAppDispatch();

	const { context, isOpen } = useAppSelector(
		(state) => state.contextQuestion,
	);

	const closeModalQuestion = () => {
		dispatch(hideModalQuestion());
	};

	const handleSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
		ev.preventDefault();

		switch (context) {
			case 'create':
				const idSearch = localStorage.getItem('idSearch');
				dispatch(
					createQuestion({
						id: '',
						idSearch: idSearch!,
						question: question,
						answer: answer,
						createdAt: String(new Date()),
					}),
				);

				setQuestion('');
				setAnswer('');
				closeModalQuestion();
				localStorage.clear();
				break;

			case 'edit':
				dispatch(
					editQuestion({
						id: localStorage.getItem('idQuestion')!,
						question: question,
						answer: answer,
					}),
				);

				setQuestion('');
				setAnswer('');
				closeModalQuestion();
				localStorage.clear();
				break;

			case 'delete':
				dispatch(
					deleteQuestion({
						id: localStorage.getItem('idQuestion')!,
					}),
				);

				dispatch(deleteId());
				closeModalQuestion();
				localStorage.clear();
				dispatch(refresh());
				break;
		}
	};

	return (
		<Dialog open={isOpen}>
			<Box component={'form'} onSubmit={handleSubmit}>
				<DialogTitle>
					{context === 'create' && 'Adicionar perguntas'}
					{context === 'edit' && 'Editar perguntas'}
					{context === 'delete' && 'Excluir perguntas'}
				</DialogTitle>
				{context !== 'delete' && (
					<>
						<DialogContent>
							<TextField
								autoFocus
								margin="dense"
								id="question"
								name="question"
								label="Pergunta"
								type="text"
								fullWidth
								variant="filled"
								onChange={(ev) => setQuestion(ev.target.value)}
								value={question}
								multiline
								minRows={3}
							/>

							<TextField
								autoFocus
								margin="dense"
								id="answer"
								name="answer"
								label="Resposta"
								type="text"
								fullWidth
								variant="filled"
								onChange={(ev) => setAnswer(ev.target.value)}
								value={answer}
								multiline
								minRows={3}
							/>
						</DialogContent>
						<DialogActions>
							<Button
								type="button"
								variant="outlined"
								onClick={closeModalQuestion}
							>
								Cancelar
							</Button>
							<Button
								type="submit"
								color="success"
								variant="contained"
							>
								Salvar
							</Button>
						</DialogActions>
					</>
				)}

				{context === 'delete' && (
					<>
						<DialogContent>
							<Typography variant="body1">
								Você deseja mesmo finalizar essa ordem de
								serviço?
							</Typography>
						</DialogContent>

						<DialogActions>
							<Button
								type="button"
								variant="outlined"
								onClick={closeModalQuestion}
							>
								Cancelar
							</Button>
							<Button
								type="submit"
								color="error"
								variant="contained"
							>
								Finalizar
							</Button>
						</DialogActions>
					</>
				)}
			</Box>
		</Dialog>
	);
};
