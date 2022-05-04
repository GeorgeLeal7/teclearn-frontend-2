import {
	Button,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableRow,
	useTheme,
	useMediaQuery,
	TableContainer,
	Switch,
	Avatar,
	IconButton,
	Box,
	Modal,
	Paper,
	Grid,
	TextField,
} from '@mui/material';
import { ReputationBar } from './componnents/ReputationBar';
import { ColumnTitle } from './componnents/Texts/ColumnTitle';
import { useEffect, useState } from 'react';
import { MenuDrawer } from './componnents/menuDrawer/MenuDrawer';
import UserToolbar from './componnents/userToolbar/UserToolbar';
import { useDrawerContext } from '../../shared/contexts';
import BaseLayout from './layout/BaseLayout';
import { ArrowBack, Close, Delete, Edit, Search } from '@mui/icons-material';
import { Text } from './componnents/Texts/Text';
import { ModalTitle } from './componnents/Texts/ModalTitle';
import { ToolbarSelect } from './componnents/ToolbarSelect';

const dashboard = () => {
	const { handleSetDrawerOptions } = useDrawerContext();
	const theme = useTheme();
	const xlDown = useMediaQuery(theme.breakpoints.down('xl'));
	const lgDown = useMediaQuery(theme.breakpoints.down('lg'));

	const [open, setOpen] = useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	useEffect(() => {
		console.log(handleSetDrawerOptions);
		handleSetDrawerOptions([
			{
				icon: 'home',
				path: '/dashboard',
				label: 'Pagina Inicial',
			},
			{
				icon: 'person_add_alt_1',
				path: '/dashboard/usuarios',
				label: 'Usuários',
			},
			{
				icon: 'school',
				path: '/dashboard/cursos',
				label: 'Cursos',
			},
			{
				icon: 'auto_stories',
				path: '/dashboard/materias',
				label: 'Matérias',
			},
			{
				icon: 'category',
				path: '/dashboard/categorias',
				label: 'Categorias',
			},
			{
				icon: 'report_problem',
				path: '/dashboard/denuncias',
				label: 'Denúncias',
			},
			{
				icon: 'gpp_good',
				path: '/dashboard/administradores',
				label: 'Administradores',
			},
		]);
	}, []);
	return (
		<MenuDrawer>
			<BaseLayout onClick={handleOpen}></BaseLayout>
		</MenuDrawer>
	);
};

export default dashboard;
