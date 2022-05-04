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
import BasicToolbar from './componnents/BasicToolbar/BasicToolbar';

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
				path: '/dashboard/geral',
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
			<BaseLayout onClick={handleOpen} title="Administrador">
				<BasicToolbar title="Administradores" />
				<TableContainer
					width="100%"
					height="90%"
					sx={{ maxHeight: '90%' }}>
					<Table stickyHeader>
						<TableHead backgroundColor="#fff">
							<TableRow>
								<TableCell width={theme.spacing(25)}>
									<ColumnTitle> Nome</ColumnTitle>
								</TableCell>
								<TableCell width={theme.spacing(25)}>
									<ColumnTitle> E-mail</ColumnTitle>
								</TableCell>
								<TableCell width={theme.spacing(8)}></TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							<TableRow
								height={theme.spacing(9)}
								sx={{ backgroundColor: '#F1FBFF' }}>
								<TableCell width={theme.spacing(65)}>
									<Text>
										Paulo Henrique de Andrade Junior
									</Text>
								</TableCell>

								<TableCell width={theme.spacing(70)}>
									Paulo.Henrique_andrade1762@outlook.com
								</TableCell>
								<TableCell
									width={theme.spacing(15)}
									sx={{ overFlow: 'hidden' }}
									display="flex"
									flexDirection="row">
									<Box
										width={theme.spacing(30)}
										display="flex"
										justifyContent="flex-end">
										<IconButton
											onClick={handleOpen}
											children={<Edit />}
											sx={{ color: '#8BDF94' }}
										/>
										<IconButton
											children={<Delete />}
											sx={{ color: '#FF6969' }}
										/>
									</Box>
								</TableCell>
							</TableRow>
						</TableBody>
					</Table>
				</TableContainer>
				<Modal
					open={open}
					display="flex"
					alignItems="center"
					justifyContent="center"
					backgroundColor="primary.modal"
					component={Box}>
					<Box
						width={theme.spacing(80)}
						height={theme.spacing(55)}
						backgroundColor="primary.contrastText"
						marginTop={-5}
						borderRadius={1}
						elevation={2}
						padding={2}
						component={Paper}>
						<Grid container width="100%" height="100%">
							<Grid
								item
								xs={12}
								height="8%"
								display="flex"
								alignItems="flex-start"
								justifyContent="space-between"
								padding={1}>
								<ModalTitle>
									Cadastro de Administradores
								</ModalTitle>
								<IconButton
									onClick={handleClose}
									children={<Close />}
									sx={{ color: '#FF6969' }}
								/>
							</Grid>
							<Grid
								item
								xs={12}
								height="60%"
								padding={3}
								display="flex"
								flexDirection="column"
								gap={4}>
								<TextField
									fullWidth
									variant="standard"
									label="Nome"
									size="large"
								/>
								<TextField
									fullWidth
									variant="standard"
									label="E-mail"
									size="large"
								/>
								<TextField
									fullWidth
									variant="standard"
									label="Senha"
									size="large"
								/>
							</Grid>

							<Grid
								item
								xs={12}
								height="20%"
								display="flex"
								flexDirection="column"
								justifyContent="flex-start"
								alignItems="flex-end"
								padding={3}>
								<Button variant="contained">Cadastrar</Button>
							</Grid>
						</Grid>
					</Box>
				</Modal>
			</BaseLayout>
		</MenuDrawer>
	);
};

export default dashboard;
