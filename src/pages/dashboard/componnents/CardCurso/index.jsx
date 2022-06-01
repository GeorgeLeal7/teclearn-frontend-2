import { ArrowBack, Close, Delete, Edit, Save } from '@mui/icons-material';
import { Box, Button, Chip, Grid, Icon, IconButton, InputBase, Modal, Paper, TextField, Typography, useMediaQuery, useTheme } from '@mui/material';
import {useRouter} from 'next/router'
import { useState } from 'react';
import { CursoService } from '../../services/api/curso/CursoService';
import { MateriaService } from '../../services/api/materia/MateriaService';
import { ModalTitle } from '../Texts/ModalTitle';

const CardCurso = ({id, nome, foto, getCursos}) => {
	const theme = useTheme();
	const router = useRouter();

	const lgDown = useMediaQuery(theme.breakpoints.down(1400));
	const exUp = useMediaQuery(theme.breakpoints.up(1900));

	const [open, setOpen] = useState(false);
	const [cursoNome, setCursoNome] = useState('');
	const [busca, setBusca] = useState('');
	const [materias, setMaterias] = useState();
	const [curso, setCurso] = useState();
	const [cursoMaterias, setCursoMaterias] = useState([]);



	const handleClickEdit = (id) => {
		setCursoById(id)
		setAllMaterias();
		setOpen(true);
	}

	const handleClickSalvar = () => {
		console.log(materias);
		console.log()
	}

	const handleDelete = (result) => {
		CursoService.deleteById(id).then(() => {
			if (result instanceof Error) {
				alert(result.message);
				return;
			} else {
				getCursos();
			}
		});
	};

	const setAllMaterias = () => {
		MateriaService.getAll().then((result) => {
			if (result instanceof Error) {
				alert(result.message);
				return;
			} else {
				setMaterias(result);
			}
		})
	}
	const setCursoById = (id) => {
		CursoService.getById(id).then((result) => {
			if (result instanceof Error) {
				alert(result.message);
				return;
			} else {
				setCurso(result);
				result.tblCursosMaterias.map(row => {
					setCursoMaterias([...cursoMaterias, row.tblMateriaIdMateria])
				})
			}
		})
	}

	const handleClickChip = (id) => {
		var add = true
		console.log(id.id);
		materias.length != 0  && materias.map((idMateria, key) => {
			if (idMateria.id == id.id) {
				const a = materias;
				a.splice(key, 1)
				add = false;
				setMaterias([]);
				setTimeout(()=>{
					setMaterias(a);
				}, 100);
			}
		})
		if (add) setMaterias([...materias, id]);
		console.log(materias)
	};
	

	
	return (
		<>
			<Box
				width="100%"
				height="100%"
				borderRadius={1}
				backgroundColor="#ffffff"
				component={Paper}
				elevation={3}
				overflow="hidden"
				position="relative">
				<Box
					component="img"
					sx={{
						objectFit: 'cover',
					}}
					width="100%"
					height="70%"
					src={'http://localhost:8080/uploads/' + foto}></Box>

				<Box width="100%" height="30%" padding={1}>
					<Typography
						fontSize={15}
						fontWeight="500"
						fontFamily="poppins"
						color="primary.fontMain"
						marginLeft={1}
					>
						{nome}
					</Typography>
				</Box>
			</Box>
			<Box
				sx={{
					opacity: 0,
					'&:hover': {
						opacity: 1,
						backgroundColor: '#f4f4f470',
						filter: blur('100px')
					},
				}}
				width="100%"
				height="100%"
				borderRadius={1}
				position="relative"
				marginTop={lgDown ? -28 : exUp ? -41 : -33}
				display="flex"
				justifyContent="center"
				alignItems="center"
				
				gap={1}
				>

				<Button
					variant="contained"
					width={130} 
					height={40} 
					backgroundColor="primary.main" 
					display="flex" 
					alignItems="center" 
					borderRadius={0} 
					sx={{ cursor: "pointer", textTransform: "capitalize" }}
					onClick={()=> handleClickEdit(id)}
					>
				<Edit  sx={{color:"#fff"}}/>
				<Typography
						fontSize={15}
						fontWeight="500"
						fontFamily="poppins"
						color="primary.contrastText"
						marginLeft={1}
					>
						Editar
					</Typography> 
				</Button>
				<Box 
					width={38} 
					height={38} 
					// backgroundColor="primary.main" 
					display="flex" 
					alignItems="center" 
					justifyContent="center" 
					padding={.6} 
					borderRadius={.6}
					border="2px solid #3D97F0"
					sx={{cursor: 'pointer','&:hover' : {
						backgroundColor: '#3D97F0',
				
					}
					}}
					onClick={()=> handleDelete(id)}
					>
					<Delete sx={{color:"#3D97F0", '&:hover': {color:'#fff'}}}/>
				</Box>
		

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
							<ModalTitle>Editar Curso</ModalTitle>
							<IconButton
								onClick={()=>setOpen(false)}
								children={<Close />}
								sx={{ color: '#FF6969' }}
							/>
						</Grid>
						<Grid
							item
							xs={12}
							height="10%"
							padding={3}
							display="flex"
							flexDirection="column"
							gap={2}>
								 <TextField value={cursoNome} onChange={(e)=>setCursoNome(e.target.value)} fullWidth variant="standard" label="Nome da matéria" />
							</Grid>
						<Grid
							marginTop={4}
							item
							xs={12}
							height="60%"
							padding={3}
							display="flex"
							flexDirection="column"
							gap={2}>
								
							<Box
								width="100%"
								height={30}
								display="flex"
								justifyContent="space-between">
								<ModalTitle>Materias</ModalTitle>
								<Box
									width="60%"
									height={30}
									backgroundColor="#E8EBEE"
									borderRadius={2}>
									<IconButton sx={{ marginTop: -0.5 }}>
										<Icon>search</Icon>
									</IconButton>
									<InputBase
										value={busca}
										onChange={(e)=> setBusca(e.target.value)}
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
								maxHeight="40%"
								width="100%"
								display="flex"
								gap={1}
								flexWrap="wrap"
							
								sx={{overflowX:"auto", overFlowY: "none"}}
								>
									{
										materias && materias.map((row, i) => (
											<Chip
												key={i} 
												label={row.materiaNome} 
												onClick={() => handleClickChip({ id: row.idCategoria})}
												sx={cursoMaterias.map((materia)=>{
													if(materia.id == row.idMateria){
														console.log(materia.id, row.idMateria);
														return {backgroundColor: "#3D97F0",
														color: "#fff",
														'&.MuiChip-root:hover': {
															backgroundColor: "#3D97F0",
														}
													}
													} 
												})}
												
												/>
										
											)
												
										)
									}
									
							</Box>
							<Box
								maxHeight="50%"
								width="100%"
								display="flex"
								gap={1}
								flexWrap="wrap"
								overflow="scroll">
								
							</Box>
						</Grid>
						
						<Grid
							item
							xs={6}
							height="11%"
							display="flex"
							flexDirection="column"
							justifyContent="stretch"
							alignItems="stretch"
							paddingLeft={3}
							paddingRight={3}>
							<Button
								sx={{ textTransform: 'capitalize' }}
								variant="contained"
								onClick={()=>setOpen(false)}
								startIcon={<ArrowBack />}
							>
								
								Salvar e voltar
								
							</Button>
						</Grid>
						<Grid
							item
							xs={2}
							height="11%"
							display="flex"
							flexDirection="column"
							justifyContent="stretch"
							alignItems="stretch"
							paddingLeft={3}
							paddingRight={3}></Grid>
						<Grid
							item
							xs={4}
							height="11%"
							display="flex"
							flexDirection="column"
							justifyContent="stretch"
							alignItems="stretch"
							paddingLeft={3}
							paddingRight={3}>
							<Button
								sx={{ textTransform: 'capitalize' }}
								variant="contained"
								onClick={()=>handleClickSalvar()}
								endIcon={<Save />}
							>
								Salvar
							</Button>
						</Grid>
					</Grid>
				</Box>
			</Modal>
		</>
	);
};

export { CardCurso };
