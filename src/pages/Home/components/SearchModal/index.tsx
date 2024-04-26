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
import { createSearch } from '../../../../store/modules/Search/searchSlice';
import { hideModal } from '../../../../store/modules/ContextModal/contextSlice';

export const SearchModal: React.FC = () => {
	const [district, setDistrict] = useState('');
	const [researcherName, setResearcherName] = useState('');
	const [researchedName, setResearchedName] = useState('');

	const dispatch = useAppDispatch();
	const { context, isOpen } = useAppSelector((state) => state.context);

	// useEffect(() => {
	// 	if (isOpen) {
	// 		if (
	// 			contexto === 'editar' &&
	// 			questionSelected.question &&
	// 			questionSelected.answer
	// 		) {
	// 			setQuestion(questionSelected.question);
	// 			setAnswer(questionSelected.answer);
	// 		}
	// 	}
	// }, [questionSelected, contexto, isOpen]);

	const closeModal = () => {
		dispatch(hideModal());
	};

	const handleSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
		ev.preventDefault();

		switch (context) {
			case 'create':
				dispatch(
					createSearch({
						id: '',
						district: district,
						researcherName: researcherName,
						researchedName: researchedName,
						createdAt: String(new Date()),
					}),
				);
				setDistrict('');
				setResearcherName('');
				setResearchedName('');
				closeModal();
				break;
		}
	};

	return (
		<Dialog open={isOpen}>
			<Box component={'form'} onSubmit={handleSubmit}>
				<DialogTitle>
					{context === 'create' && 'Adicionar search'}
					{context === 'edit' && 'Editar search'}
					{context === 'delete' && 'Excluir search'}
				</DialogTitle>
				{context !== 'delete' && (
					<>
						<DialogContent>
							<TextField
								autoFocus
								margin="dense"
								id="district"
								name="district"
								label="Bairro"
								type="text"
								fullWidth
								variant="filled"
								onChange={(ev) => setDistrict(ev.target.value)}
								value={district}
								multiline
								minRows={3}
							/>

							<TextField
								autoFocus
								margin="dense"
								id="researcherName"
								name="researcherName"
								label="Nome Pesquisador"
								type="text"
								fullWidth
								variant="filled"
								onChange={(ev) =>
									setResearcherName(ev.target.value)
								}
								value={researcherName}
								multiline
								minRows={3}
							/>

							<TextField
								autoFocus
								margin="dense"
								id="researchedName"
								name="researchedName"
								label="Nome Entrevistado"
								type="text"
								fullWidth
								variant="filled"
								onChange={(ev) =>
									setResearchedName(ev.target.value)
								}
								value={researchedName}
								multiline
								minRows={3}
							/>
						</DialogContent>
						<DialogActions>
							<Button
								type="button"
								variant="outlined"
								onClick={closeModal}
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
								onClick={closeModal}
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
