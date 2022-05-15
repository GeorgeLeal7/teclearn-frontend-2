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
	Pagination,
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
import { CardUser } from './componnents/CardUser';
import { UserService } from './services/api/user/UserService';
import { check } from 'prettier';
import { EditUser } from './componnents/EditUser';
const dashboard = () => {
	const { handleSetDrawerOptions } = useDrawerContext();
	const theme = useTheme();
	const xlDown = useMediaQuery(theme.breakpoints.down('xl'));

	const [openDeleteConfirm, setOpeDeleteConfirm] = useState(false);
	const [openUserCard, setOpenUserCard] = useState(false);
	const [openEditUser, setOpenEditUser] = useState(false);
	const [open, setOpen] = useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	const [users, setUsers] = useState([]);
	const [user, setUser] = useState([]);
	const [userID, setUserID] = useState(0);

	const [filterTipo, setFilterTipo] = useState('');
	const [filterStatus, setFilterStatus] = useState('');
	const [filterModerador, setFilterModerador] = useState('');
	const [order, setOrder] = useState('');
	const [busca, setBusca] = useState('');

	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [categoria, setCategoria] = useState('');
	const [moderador, setModerador] = useState('');
	const [checked, setChecked] = useState('');

	const [totalCount, setTotalCount] = useState(0);
	const [page, setPage] = useState(1);
	const limit = 9;

	const listUsers = () => {
		UserService.getAll(
			page,
			filterTipo,
			filterStatus,
			filterModerador,
			order,
			busca
		).then(result => {
			if (result instanceof Error) {
				alert(result.message);
				return;
			} else {
				setTotalCount(result.size)
				setUsers(result.usuarios);
			}
		});
	};
	useEffect(() => {
		listUsers();
	}, [filterTipo, filterModerador, filterStatus, order, busca, page]);

	const handleClickCreate = () => {
		UserService.create({
			nome: name,
			email: email,
			classificacao: categoria,
			moderador: checked,
			pontuacao: 0,
			reputacao: 100,
			status: true,
			senha: 'SENHA!@#',
		}).then(() => {
			setOpen(false);
			listUsers();
		});
	};

	const handleClickSearch = id => {
		UserService.getById(id).then(result => {
			if (result instanceof Error) {
				alert(result.message);
				return;
			} else {
				setUser(result);
				console.log(result);
				setOpenUserCard(true);
			}
		});
	};
	const handleClickEdit = id => {
		UserService.getById(id).then(result => {
			if (result instanceof Error) {
				alert(result.message);
				return;
			} else {
				setUser(result);
				console.log(result);
				setOpenEditUser(true);
			}
		});
	};

	const handleClickDelete = async () => {
		await UserService.deleteById(userID);
		listUsers();
		setOpeDeleteConfirm(false);
	};

	useEffect(() => {
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
				icon: 'gpp_good',
				path: '/dashboard/administradores',
				label: 'Administradores',
			},
		]);
	}, []);

	return (
		<MenuDrawer>
			<BaseLayout onClick={handleOpen} title="Usuário" pagination page={page} setPage={setPage} limit={limit} totalCount={totalCount}>
				<UserToolbar
					setBuscador={setBusca}
					setOrder={setOrder}
					setTipo={setFilterTipo}
					setStatus={setFilterStatus}
					setModerador={setFilterModerador}
				/>
				<TableContainer
					width="100%"
					height="90%"
					sx={{ maxHeight: '90%' }}>
					<Table stickyHeader>
						<TableHead backgroundColor="#fff">
							<TableRow>
								<TableCell width={theme.spacing(8)}>
									<ColumnTitle> Perfil </ColumnTitle>
								</TableCell>
								<TableCell width={theme.spacing(25)}>
									<ColumnTitle> Nome</ColumnTitle>
								</TableCell>
								<TableCell
									width={theme.spacing(25)}
									sx={{
										display: xlDown ? 'none' : 'table-cell',
									}}>
									<ColumnTitle> E-mail</ColumnTitle>
								</TableCell>
								<TableCell width={theme.spacing(10)}>
									<ColumnTitle> Categoria</ColumnTitle>
								</TableCell>
								<TableCell
									width={theme.spacing(10)}
									sx={{
										display: xlDown ? 'none' : 'table-cell',
									}}>
									<ColumnTitle> Pontuação</ColumnTitle>
								</TableCell>
								<TableCell width={theme.spacing(10)}>
									<ColumnTitle> Reputação</ColumnTitle>
								</TableCell>
								<TableCell width={theme.spacing(10)}>
									<ColumnTitle> Mod.</ColumnTitle>
								</TableCell>
								<TableCell width={theme.spacing(10)}>
									<ColumnTitle> Status</ColumnTitle>
								</TableCell>
								<TableCell width={theme.spacing(10)}>
									Actions
								</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{users.map((row, i) => (
								<TableRow
									height={theme.spacing(9)}
									sx={{
										backgroundColor:
											i % 2 === 0 ? '#F1FBFF' : '#fff',
									}}>
									<TableCell width={theme.spacing(8)}>
										<Avatar
											sx={{
												height: theme.spacing(6),
												width: theme.spacing(6),
											}}
											alt="Paulo Henrique"
											src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=464&q=80"
										/>
									</TableCell>
									<TableCell width={theme.spacing(10)}>
										<Text>{row.tblUsuario.nome}</Text>
									</TableCell>

									<TableCell
										width={theme.spacing(25)}
										sx={{
											display: xlDown
												? 'none'
												: 'table-cell',
										}}>
										{row.tblUsuario.email}
									</TableCell>
									<TableCell width={theme.spacing(10)}>
										{row.tblUsuario.classificacao}
									</TableCell>
									<TableCell
										width={theme.spacing(10)}
										sx={{
											display: xlDown
												? 'none'
												: 'table-cell',
										}}>
										{row.pontuacao}
									</TableCell>
									<TableCell width={theme.spacing(10)}>
										<ReputationBar
											color={
												row.reputacao < 33
													? '#FF6969'
													: row.reputacao < 66
													? '#FFF069'
													: '#65DF80'
											}
										/>
									</TableCell>
									<TableCell width={theme.spacing(10)}>
										<Switch
											checked={
												row.moderador ? 'checked' : ''
											}
										/>
									</TableCell>
									<TableCell width={theme.spacing(10)}>
										<Switch
											checked={
												row.tblUsuario.status
													? 'checked'
													: ''
											}
										/>
									</TableCell>
									<TableCell
										width={theme.spacing(15)}
										sx={{ overFlow: 'hidden' }}
										display="flex"
										flexDirection="row">
										<Box width={theme.spacing(15)}>
											<IconButton
												onClick={() =>
													handleClickSearch(
														row.idUsuarioComum
													)
												}
												children={<Search />}
											/>

											<IconButton
												onClick={() => {
													handleClickEdit(
														row.idUsuarioComum
													);
												}}
												children={<Edit />}
												sx={{ color: '#8BDF94' }}
											/>
											<IconButton
												onClick={() => {
													setOpeDeleteConfirm(true);
													setUserID(
														row.idUsuarioComum
													);
												}}
												children={<Delete />}
												sx={{ color: '#FF6969' }}
											/>
										</Box>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>
				

				<Modal
					open={openDeleteConfirm}
					display="flex"
					alignItems="center"
					justifyContent="center"
					backgroundColor="primary.modal"
					component={Box}>
					<Box
						width={theme.spacing(60)}
						height={theme.spacing(25)}
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
								height="22%"
								display="flex"
								alignItems="flex-start"
								justifyContent="space-between"
								padding={0.5}>
								<ModalTitle>Cadastro de usuário</ModalTitle>
								<IconButton
									onClick={() => setOpeDeleteConfirm(false)}
									children={<Close />}
									sx={{ color: '#FF6969' }}
								/>
							</Grid>
							<Grid
								item
								xs={12}
								height="50%"
								display="flex"
								alignItems="flex-start"
								justifyContent="space-between"
								padding={0.5}>
								<Text>
									O usuário será apagado permanentemente da
									plataforma. Tem certeza de que deseja
									exclui-lo?
								</Text>
							</Grid>
							<Grid
								item
								xs={12}
								height="25%"
								display="flex"
								alignItems="flex-start"
								justifyContent="flex-end"
								padding={1}>
								<Button
									variant="contained"
									onClick={handleClickDelete}>
									Excluir
								</Button>
							</Grid>
						</Grid>
					</Box>
				</Modal>
				<Modal
					open={openUserCard}
					display="flex"
					alignItems="center"
					justifyContent="center"
					backgroundColor="primary.modal"
					component={Box}>
					<CardUser setOpenUserCard={setOpenUserCard} data={user} />
				</Modal>
				<Modal
					open={openEditUser}
					display="flex"
					alignItems="center"
					justifyContent="center"
					backgroundColor="primary.modal"
					component={Box}>
					<EditUser
						listUsers={listUsers}
						setOpenUserCard={setOpenEditUser}
						data={user}
					/>
				</Modal>

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
								<ModalTitle>Cadastro de usuário</ModalTitle>
								<IconButton
									onClick={handleClose}
									children={<Close />}
									sx={{ color: '#FF6969' }}
								/>
							</Grid>
							<Grid
								item
								xs={12}
								height="40%"
								padding={3}
								display="flex"
								flexDirection="column"
								gap={4}>
								<TextField
									value={name}
									onChange={e => setName(e.target.value)}
									fullWidth
									variant="standard"
									label="Nome"
									size="large"
								/>
								<TextField
									value={email}
									onChange={e => setEmail(e.target.value)}
									fullWidth
									variant="standard"
									label="E-mail"
									size="large"
								/>
							</Grid>
							<Grid
								item
								xs={6}
								height="32%"
								padding={3}
								display="flex"
								flexDirection="column"
								justifyContent="flex-start"
								alignItems="flex-start"
								gap={4}>
								<ToolbarSelect
									label="Categoria"
									setLabel={setCategoria}
									options={[
										{
											name: 'Aluno',
										},
										{
											name: 'Professor',
										},
									]}
								/>
							</Grid>
							<Grid
								item
								xs={6}
								height="32%"
								padding={3}
								display="flex"
								flexDirection="column"
								justifyContent="flex-start"
								alignItems="flex-end"
								gap={1}>
								<ModalTitle>Moderador</ModalTitle>
								<Switch
									checked={checked}
									onChange={e =>
										moderador
											? setChecked(e.target.checked)
											: setChecked(e.target.checked)
									}
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
								<Button
									sx={{ textTransform: 'capitalize' }}
									variant="contained"
									onClick={handleClickCreate}>
									Cadastrar
								</Button>
							</Grid>
						</Grid>
					</Box>
				</Modal>
			</BaseLayout>
			
		</MenuDrawer>
	);
};

export default dashboard;
