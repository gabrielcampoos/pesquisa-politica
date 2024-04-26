import { Logout } from '@mui/icons-material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import { useNavigate } from 'react-router-dom';

import { useAppDispatch } from '../../../../store/hooks';
import {
	hideLoading,
	showLoading,
} from '../../../../store/modules/Loading/loadingSlice';

const Appbar = () => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const logout = () => {
		dispatch(showLoading());
		setTimeout(() => {
			dispatch(hideLoading());
			localStorage.clear();
			navigate('/');
		}, 2000);
	};

	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar position="static">
				<Toolbar
					sx={{
						display: 'flex',
						justifyContent: 'space-between',
						background: '#000',
					}}
				>
					<IconButton
						size="large"
						edge="start"
						color="inherit"
						aria-label="menu"
						sx={{ mr: 2 }}
					></IconButton>

					<IconButton
						size="large"
						edge="start"
						color="inherit"
						aria-label="menu"
						sx={{ mr: 2 }}
						onClick={logout}
					>
						<Logout fontSize="large" />
					</IconButton>
				</Toolbar>
			</AppBar>
		</Box>
	);
};

export default Appbar;
