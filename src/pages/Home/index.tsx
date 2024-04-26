/* eslint-disable react/no-children-prop */
import AddIcon from '@mui/icons-material/Add';
import {
	Box,
	Fab,
	Grid,
	TextField,
	Typography,
	useMediaQuery,
	useTheme,
} from '@mui/material';
import { useEffect, useState } from 'react';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { showModal } from '../../store/modules/ContextModal/contextSlice';
import { listAllSearch } from '../../store/modules/Search/searchAdapter';
import { listAllSearches } from '../../store/modules/Search/searchSlice';
import AccordionExpandDefault from './components/Accordion';
import Appbar from './components/Appbar';
import { QuestionModal } from './components/QuestionModal';
import { SearchModal } from './components/SearchModal';
import { HomeSm } from './HomeSm';

export const Home = () => {
	const theme = useTheme();
	const smDown = useMediaQuery(theme.breakpoints.down('sm'));

	const [district, setDistrict] = useState('');

	const dispatch = useAppDispatch();

	const selectSearches = useAppSelector(listAllSearch);

	useEffect(() => {
		dispatch(listAllSearches());
	}, [dispatch]);

	return (
		<>
			{(smDown && (
				<>
					<HomeSm />
				</>
			)) || (
				<>
					<Box
						sx={{
							width: '100%',
							height: '895px',
						}}
					>
						<Appbar />
						<Grid
							container
							spacing={{ xs: 2, sm: 2, md: 0 }}
							columns={{ xs: 12, sm: 12, md: 12 }}
							sx={{
								width: '100%',
								height: '100%',
							}}
						>
							<Grid
								item
								xs={12}
								sm={12}
								md={2}
								sx={{
									width: '100%',
									display: 'flex',
									alignItems: 'center',
									flexDirection: 'column',
									background: '#e8e8e8',
								}}
							>
								<Typography
									component="h1"
									variant="h6"
									sx={{ fontWeight: 700, mt: 2 }}
								>
									Filtros
								</Typography>

								<TextField
									label="Bairro"
									onChange={(ev) =>
										setDistrict(ev.currentTarget.value)
									}
									value={district}
									sx={{
										mt: 1,
									}}
									color="error"
								/>
							</Grid>
							<Grid item xs={12} sm={12} md={10}>
								{district !== ''
									? selectSearches
											.filter(
												(item) =>
													item.district === district,
											)
											.map(
												({
													id,
													district,
													researcherName,
													researchedName,
													createdAt,
												}) => (
													<AccordionExpandDefault
														key={id}
														id={id}
														district={district}
														researcherName={
															researcherName
														}
														researchedName={
															researchedName
														}
														createdAt={createdAt}
													/>
												),
											)
									: selectSearches.map(
											({
												id,
												district,
												researcherName,
												researchedName,
												createdAt,
											}) => (
												<AccordionExpandDefault
													key={id}
													id={id}
													district={district}
													researcherName={
														researcherName
													}
													researchedName={
														researchedName
													}
													createdAt={createdAt}
												/>
											),
									  )}
							</Grid>
						</Grid>
					</Box>
					<Box
						sx={{
							position: 'fixed',
							bottom: '24px',
							right: '24px',
							display: 'flex',
							flexDirection: 'column-reverse',
							gap: 2,
						}}
					>
						<Fab
							color="primary"
							aria-label="add"
							onClick={() => {
								dispatch(showModal('create'));
							}}
						>
							<AddIcon />
						</Fab>
					</Box>
					<SearchModal />
					<QuestionModal />
				</>
			)}
		</>
	);
};
