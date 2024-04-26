import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
	Box,
	Button,
	Grid,
	IconButton,
	useMediaQuery,
	useTheme,
} from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import { showModalQuestion } from '../../../../store/modules/ContextModalQuestion/contextSlice';
import { getId } from '../../../../store/modules/ModalId/idSlice';
import {
	listAllQuestion,
	listQuestion,
} from '../../../../store/modules/Question/questionAdapter';
import AccordionExpandDefaultSm from './AccordionSm';

interface AccordionProps {
	id: string;
	district: string;
	researcherName: string;
	researchedName: string;
	createdAt: string;
}

export default function AccordionExpandDefault({
	id,
	district,
	researcherName,
	researchedName,
	createdAt,
}: AccordionProps) {
	const theme = useTheme();
	const smDown = useMediaQuery(theme.breakpoints.down('sm'));

	const dispatch = useAppDispatch();

	const selectQuestions = useAppSelector(listAllQuestion);

	useEffect(() => {
		dispatch(listQuestion());
	}, [dispatch]);

	const idSearch = dispatch(
		getId({
			id: id,
			district: district,
			researcherName: researcherName,
			researchedName: researchedName,
			createdAt: createdAt,
		}),
	);

	const newData = new Date();
	const dataFormatada =
		newData.getDate() +
		'/' +
		(newData.getMonth() + 1) +
		'/' +
		newData.getFullYear();

	return (
		<>
			{(smDown && (
				<>
					<AccordionExpandDefaultSm
						id={id}
						district={district}
						researcherName={researcherName}
						researchedName={researchedName}
						createdAt={createdAt}
					/>
				</>
			)) || (
				<>
					<div>
						<Accordion
							sx={{
								mb: 3,
							}}
						>
							<AccordionSummary
								expandIcon={<ExpandMoreIcon />}
								aria-controls="panel1-content"
								id={id}
								sx={{
									boxShadow: '1px 1px 3px 1px red',
								}}
							>
								<Typography
									sx={{
										flex: 1,
									}}
								>
									<span style={{ fontWeight: 700 }}>
										Bairro:
									</span>{' '}
									{district}
								</Typography>
								<Typography
									sx={{
										flex: 1,
									}}
								>
									<span style={{ fontWeight: 700 }}>
										Entrevistador:
									</span>{' '}
									{researcherName}
								</Typography>
								<Typography
									sx={{
										flex: 1,
									}}
								>
									<span style={{ fontWeight: 700 }}>
										Entrevistado:
									</span>{' '}
									{researchedName}
								</Typography>
								<Typography
									sx={{
										flex: 1,
									}}
								>
									<span style={{ fontWeight: 700 }}>
										Criado em:
									</span>{' '}
									{(createdAt = dataFormatada)}
								</Typography>
							</AccordionSummary>
							<AccordionDetails>
								<Grid
									container
									key={id}
									spacing={{
										xs: 2,
										sm: 2,
										md: 4,
									}}
									columns={{
										xs: 12,
										sm: 12,
										md: 12,
									}}
								>
									{selectQuestions
										.filter(
											(id) =>
												id.idSearch.id ===
												idSearch.payload.id,
										)
										.map(({ id, question, answer }) => (
											<>
												<Grid
													item
													key={id}
													xs={12}
													sm={12}
													md={1.6}
													sx={{
														display: 'flex',
														flexDirection: 'column',
													}}
												>
													<Typography
														key={id}
														sx={{
															mb: 4,
														}}
													>
														<span
															style={{
																fontWeight: 700,
															}}
														>
															Pergunta:
														</span>{' '}
														{question}
														<br />
														<span
															style={{
																fontWeight: 700,
															}}
														>
															Resposta:
														</span>{' '}
														{answer}
														<br />
														<span
															style={{
																fontWeight: 700,
															}}
														>
															Criado em:{' '}
														</span>
														{
															(createdAt =
																dataFormatada)
														}
													</Typography>
												</Grid>
												<Grid
													item
													key={id}
													xs={12}
													sm={12}
													md={0.5}
													sx={{
														display: 'flex',
														flexDirection: 'column',
														mr: 4,
													}}
												>
													<IconButton
														size="small"
														onClick={() => {
															localStorage.setItem(
																'idQuestion',
																id,
															);

															localStorage.setItem(
																'idSearchDistrict',
																idSearch.payload
																	.district,
															);
															localStorage.setItem(
																'idSearchResearcherName',
																idSearch.payload
																	.researcherName,
															);
															localStorage.setItem(
																'idSearchResearchedName',
																idSearch.payload
																	.researchedName,
															);

															localStorage.setItem(
																'idSearchCreatedAt',
																idSearch.payload
																	.createdAt,
															);

															dispatch(
																showModalQuestion(
																	'edit',
																),
															);
														}}
													>
														<EditIcon />
													</IconButton>

													<IconButton
														size="small"
														onClick={() => {
															localStorage.setItem(
																'idQuestion',
																id,
															);

															localStorage.setItem(
																'idSearch',
																idSearch.payload
																	.id,
															);

															dispatch(
																showModalQuestion(
																	'delete',
																),
															);
														}}
													>
														<DeleteIcon />
													</IconButton>
												</Grid>
											</>
										))}
								</Grid>
								<Box
									sx={{
										float: 'right',
										mb: 1,
									}}
								>
									<Button
										color="primary"
										variant="contained"
										size="small"
										aria-label="add"
										onClick={() => {
											localStorage.setItem(
												'idSearch',
												idSearch.payload.id,
											);

											dispatch(
												showModalQuestion('create'),
											);
										}}
									>
										Adicionar
									</Button>
								</Box>
							</AccordionDetails>
						</Accordion>
					</div>
				</>
			)}
		</>
	);
}
