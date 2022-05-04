import {
	Paper,
	Modal,
	Grid,
	IconButton,
	TextField,
	Button,
	Chip,
	Icon,
	InputBase,
} from '@mui/material';
import { Add } from '@mui/icons-material';
import { Box, useTheme } from '@mui/material';
import { useState } from 'react';
import { ModalTitle } from '../Texts/ModalTitle';
import { Close } from '@mui/icons-material';

const CardAdd = () => {
	const theme = useTheme();

	const [open, setOpen] = useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	const [chips, setChips] = useState({});

	const handleClickChip = e => {
		// setChips({ ...chips, id: e.target.id });
		console.log(e);
	};

	return (
		<>
			<Box
				onClick={handleOpen}
				sx={{ cursor: 'pointer' }}
				width="100%"
				height="100%"
				display="flex"
				backgroundColor="#e6e6e6"
				borderRadius={1}
				justifyContent="center"
				alignItems="center">
				<Add
					sx={{
						width: '40%',
						height: '40%',
						color: '#606060',
					}}
				/>
			</Box>
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
							<ModalTitle>Cadastro de cursos</ModalTitle>
							<IconButton
								onClick={handleClose}
								children={<Close />}
								sx={{ color: '#FF6969' }}
							/>
						</Grid>
						<Grid
							item
							xs={12}
							height="80%"
							padding={3}
							display="flex"
							flexDirection="column"
							gap={3}>
							<TextField
								fullWidth
								variant="standard"
								label="Nome"
								size="large"
							/>
							<Box
								width="100%"
								height={30}
								display="flex"
								justifyContent="space-between">
								<ModalTitle>Matérias</ModalTitle>
								<Box
									width="60%"
									height={30}
									backgroundColor="#E8EBEE"
									borderRadius={2}>
									<IconButton sx={{ marginTop: -0.5 }}>
										<Icon>search</Icon>
									</IconButton>
									<InputBase
										sx={{ marginTop: -0.5, ml: 1, flex: 1 }}
										placeholder="Pesquisar..."
										inputProps={{
											'aria-label': 'search google maps',
										}}
										fontSize="18px"
									/>
								</Box>
							</Box>

							<Box
								maxHeight="100%"
								width="100%"
								display="flex"
								gap={1}
								flexWrap="wrap"
								overflow="scroll">
								<Chip
									key="1"
									id="2"
									sx={{ flexGrow: 1 }}
									label="Hardware e Redes"
									onClick={handleClickChip}
								/>
								<Chip
									sx={{ flexGrow: 1 }}
									label="Linguagem de Marcacão"
								/>
								<Chip sx={{ flexGrow: 1 }} label="Projetos" />
								<Chip
									sx={{ flexGrow: 1 }}
									label="Hardware e Redes"
								/>
								<Chip
									sx={{ flexGrow: 1 }}
									label="Linguagem de Marcacão"
								/>
								<Chip sx={{ flexGrow: 1 }} label="Projetos" />
								<Chip
									sx={{ flexGrow: 1 }}
									label="Hardware e Redes"
								/>
								<Chip
									sx={{ flexGrow: 1 }}
									label="Linguagem de Marcacão"
								/>
								<Chip sx={{ flexGrow: 1 }} label="Projetos" />
								<Chip
									sx={{ flexGrow: 1 }}
									label="Hardware e Redes"
								/>
								<Chip
									sx={{ flexGrow: 1 }}
									label="Linguagem de Marcacão"
								/>
								<Chip sx={{ flexGrow: 1 }} label="Projetos" />
								<Chip sx={{ flexGrow: 1 }} label="Projetos" />
								<Chip
									sx={{ flexGrow: 1 }}
									label="Hardware e Redes"
								/>
								<Chip
									sx={{ flexGrow: 1 }}
									label="Linguagem de Marcacão"
								/>
								<Chip sx={{ flexGrow: 1 }} label="Projetos" />
								<Chip sx={{ flexGrow: 1 }} label="Projetos" />
								<Chip
									sx={{ flexGrow: 1 }}
									label="Hardware e Redes"
								/>
								<Chip
									sx={{ flexGrow: 1 }}
									label="Linguagem de Marcacão"
								/>
								<Chip sx={{ flexGrow: 1 }} label="Projetos" />
								<Chip sx={{ flexGrow: 1 }} label="Projetos" />
								<Chip
									sx={{ flexGrow: 1 }}
									label="Hardware e Redes"
								/>
								<Chip
									sx={{ flexGrow: 1 }}
									label="Linguagem de Marcacão"
								/>
								<Chip sx={{ flexGrow: 1 }} label="Projetos" />
								<Chip sx={{ flexGrow: 1 }} label="Projetos" />
								<Chip
									sx={{ flexGrow: 1 }}
									label="Hardware e Redes"
								/>
								<Chip
									sx={{ flexGrow: 1 }}
									label="Linguagem de Marcacão"
								/>
								<Chip sx={{ flexGrow: 1 }} label="Projetos" />
								<Chip sx={{ flexGrow: 1 }} label="Projetos" />
								<Chip
									sx={{ flexGrow: 1 }}
									label="Hardware e Redes"
								/>
								<Chip
									sx={{ flexGrow: 1 }}
									label="Linguagem de Marcacão"
								/>
								<Chip sx={{ flexGrow: 1 }} label="Projetos" />
							</Box>
						</Grid>

						<Grid
							item
							xs={12}
							height="11%"
							display="flex"
							flexDirection="column"
							justifyContent="stretch"
							alignItems="stretch"
							paddingLeft={3}
							paddingRight={3}>
							<Button
								sx={{ textTransform: 'capitalize' }}
								variant="contained">
								Cadastrar
							</Button>
						</Grid>
					</Grid>
				</Box>
			</Modal>
		</>
	);
};

export { CardAdd };
