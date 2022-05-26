import { Close } from '@mui/icons-material';
import {
	Typography,
	Icon,
	Box,
	Paper,
	useTheme,
	useMediaQuery,
	Avatar,
	Grid,
	IconButton,
	TextField,
	Button,
	Switch,
	Toolbar,
} from '@mui/material';
import { blue, deepOrange, green, pink, yellow } from '@mui/material/colors';
import { useState } from 'react';
import { UserService } from '../../services/api/user/UserService';
import { ReputationBar } from '../ReputationBar';
import { ModalTitle } from '../Texts/ModalTitle';
import { ToolbarSelect } from '../ToolbarSelect';

const EditUser = ({ setOpenUserCard, listUsers, data }) => {
	const theme = useTheme();

	const [nome, setNome] = useState(data.tblUsuario.nome);
	const [foto, setFoto] = useState(data.foto);
	const [tag, setTag] = useState(data.apelido);
	const [email, setEmail] = useState(data.tblUsuario.email);
	const [sobre, setSobre] = useState(data.biografia);
	const [moderador, setModerador] = useState(data.moderador);
	const [classificacao, setClassificacao] = useState(data.tblUsuario.classificacao);

	console.log(data);
	const updateUser = () => {
		const result = UserService.update(
			{
				nome,
				email,
				classificacao,
				moderador,
				status: data.tblUsuario.status,
				biografia: sobre,
				apelido: tag,
			},
			data.tblUsuarioIdUsuario
		).then(() => {
			if (result instanceof Error) {
				alert(result.message);
				return;
			} else {
				listUsers();
			}
		});
	};

	return (
		<Box
			width={theme.spacing(100)}
			height={theme.spacing(70)}
			backgroundColor="#fff"
			component={Paper}
			elevation={2}
			overflow="hidden"
			borderRadius={2}>
			<Box
				sx={{
					backgroundImage: 'linear-gradient(135deg, #6AC1FF, #1A76E3 90%)',
				}}
				width="100%"
				height="27%"
				display="flex"
				flexDirection="column"
				padding={2}>
				<Box width="100%" height="30%" display="flex" flexDirection="column" alignItems="flex-end">
					<IconButton onClick={() => setOpenUserCard(false)} children={<Close />} sx={{ color: '#FFF' }} />
				</Box>
				<Avatar
					sx={{
						height: theme.spacing(20),
						width: theme.spacing(20),
						border: '4px solid #fff',
						marginLeft: 3,
						marginTop: 5,
						position: 'absolute',
						bgcolor:data.idUsuarioComum % 10 == 1 || data.idUsuarioComum % 10 == 3 ? green[500] :
								data.idUsuarioComum % 10 == 2 || data.idUsuarioComum % 10 == 4 ? pink[500] :
								data.idUsuarioComum % 10 == 5 || data.idUsuarioComum % 10 == 7 ? deepOrange[500] :
								data.idUsuarioComum % 10 == 6 || data.idUsuarioComum % 10 == 8 ? yellow[500] :
								data.idUsuarioComum % 10 == 9 || data.idUsuarioComum % 10 == 0 ? blue[500] : ''
					}}
					alt={nome}
					src={'http://10.107.144.26:8080/uploads/' + foto}
				/>
				<ToolbarSelect
					label={classificacao}
					setLabel={setClassificacao}
					options={[
						{
							name: 'Aluno',
						},
						{
							name: 'Professor',
						},
					]}
					alignSelf="self-end"
					marginRight={4}
					marginTop={8}
					fontSize={18}
					fontFamily="roboto"
					color="primary.contrastText"
				/>
			</Box>
			<Box width="100%" height="70%" display="flex" flexDirection="column" padding={7} paddingTop={9}>
				<Grid container width="100%" height="100%" spacing={1}>
					<Grid item xs={7}>
						<TextField
							fullWidth
							label="Nome"
							placeholder="Nome e sobrenome"
							value={nome}
							onChange={e => setNome(e.target.value)}
						/>
					</Grid>
					<Grid item xs={5}>
						<TextField
							fullWidth
							label="Tag"
							placeholder="Tag do Usuário"
							value={tag}
							onChange={e => setTag(e.target.value)}
						/>
					</Grid>
					<Grid item xs={12}>
						<TextField
							fullWidth
							label="Email"
							placeholder="email.example@domain.com"
							value={email}
							onChange={e => setEmail(e.target.value)}
						/>
					</Grid>

					<Grid item xs={12}>
						<TextField
							fullWidth
							multiline
							rows={3}
							label="Sobre"
							placeholder="Sobre o usuário"
							value={sobre}
							onChange={e => setSobre(e.target.value)}
						/>
					</Grid>

					<Grid
						item
						xs={6}
						display="flex"
						flexDirection="column"
						justifyContent="flex-start"
						alignItems="flex-start">
						<ModalTitle>Moderador</ModalTitle>
						<Switch
							checked={moderador}
							onChange={e =>
								moderador ? setModerador(e.target.checked) : setModerador(e.target.checked)
							}
						/>
					</Grid>
					<Grid
						item
						xs={6}
						height="32%"
						display="flex"
						flexDirection="column"
						justifyContent="flex-start"
						alignItems="flex-end"
						gap={1}>
						<Button sx={{ textTransform: 'capitalize' }} variant="contained" onClick={updateUser}>
							Atualizar
						</Button>
					</Grid>
				</Grid>
			</Box>
		</Box>
	);
};

export { EditUser };
