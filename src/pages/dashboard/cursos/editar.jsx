import { useTheme, useMediaQuery, Box, Grid, Typography, IconButton, Icon, InputBase, Chip, Button, Paper, Modal, TextField } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import { MenuDrawer } from '../componnents/menuDrawer/MenuDrawer';
import { useDrawerContext } from '../../../shared/contexts';
import BaseLayout from '../layout/BaseLayout';
import { CursoService } from '../services/api/curso/CursoService';
import { MateriaService } from '../services/api/materia/MateriaService';
import { CategoriaService } from '../services/api/categoria/CategoriaService';
import { useRouter } from 'next/router';
import { AddCircleOutline, Close } from '@mui/icons-material';
import { ModalTitle } from '../componnents/Texts/ModalTitle';

const dashboard = () => {
	const { handleSetDrawerOptions } = useDrawerContext();
	const theme = useTheme();
	const router = useRouter();
	const xlDown = useMediaQuery(theme.breakpoints.down('xl'));
	const lgDown = useMediaQuery(theme.breakpoints.down('lg'));

	const [curso, setCurso] = useState();
	//materia selecionada
	const [materia, setMateria] = useState();
	const [materias, setMaterias] = useState();
	const [materiasSelectable, setMateriasSelectable] = useState();
	const [categorias, setCategorias] = useState();
	const [busca, setBusca] = useState();



	const [open, setOpen] = useState(false);

	const id = useMemo(()=>{
		return router.query.id
	}, [router.query]);

	const handleExcludeCategoria = () =>{

	};
	
	const handleClickMateria = (materia) => {
		setMateria(materia);
		CategoriaService.getCategoriaByIdMateria(materia).then(result => {
			if (result instanceof Error) {
				alert(result.message);
				return;
			} else {
				setCategorias(result.tblMateriasCategorias);
			}
		});

	}
	
	useEffect(()=>{
		id && CursoService.getById(id).then(result => {
			if (result instanceof Error) {
				alert(result.message);
				return;
			} else {
				setCurso(result);
				setMaterias(result.tblCursosMaterias.map(row => row.tblMateriaIdMateria));
				// console.log(result);
			}
		});
	}, [id]);

	useEffect(() => {
		if (materias) {
			console.log(materias)
			MateriaService.getDifMateria(materias).then(result => {
				if (result instanceof Error) {
					alert(result.message);
					return;
				} else {
					setMateriasSelectable(result);
					console.log(result)
				}
			});
		}
	}, [materias]);

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
			<BaseLayout sx={{ display: 'flex', padding: 0 }} title="Curso">
				<Box width="50%" height="100%" display="flex" flexDirection="column" justifyContent="space-between">
					<Grid container width="100%">
						<Grid
							item
							xs={12}
							height={theme.spacing(9)}
							display="flex"
							alignItems="flex-start"
							justifyContent="space-between"
						
							padding={4}
							>
								<Typography
									fontSize={xlDown ? (lgDown ? 20 : 24) : 28}
									fontWeight="500"
									fontFamily="poppins"
									color="primary.fontMain"
									display="flex"
									justifyContent="center"
									alignItems="center">
										Ciência da Computação
								</Typography>
							
						</Grid>
						<Grid
							item
							xs={12}
							height={theme.spacing(10)}
							display="flex"
							>
							
							<Box width="100%" height={theme.spacing(7.5)} padding={4} display="flex" justifyContent="space-between">
								<Typography
									fontSize={xlDown ? (lgDown ? 13 : 17) : 21}
									fontWeight="500"
									fontFamily="poppins"
									color="primary.fontMain"
									display="flex"
									>
									Matérias
								</Typography>
								<Box
									width="50%"
									height={35}
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
											width: "10px",
											'aria-label': 'search google maps',
										}}
										fontSize="18px"
									/>
								</Box>
							</Box>
						</Grid>
						<Grid
							item
							xs={12}
							display="flex"
							flexDirection="column"
							alignItems="flex-start"
							justifyContent="space-between"
							sx={{paddingBottom: 10}}
							>
							
							
							{
								curso && curso.length != 0 && curso.tblCursosMaterias.map((row)=>(
									<Box 
										width="100%" 
										height={theme.spacing(7.5)} 
										padding={2}
										paddingLeft={4}
										backgroundColor={materia == row.tblMateriaIdMateria?'#F4F4F4':''}
										onClick={()=>handleClickMateria(row.tblMateriaIdMateria)} 
										sx={{cursor: 'pointer'}}
										>
										<Typography
											fontSize={xlDown ? (lgDown ? 13 : 17) : 21}
											fontWeight="400"
											fontFamily="poppins"
											color="primary.fontMain"
											display="flex"
											>
											{row.tblMateria.materiaNome}
										</Typography>
									</Box>
									))
									}
						</Grid>
						
					</Grid>
					<Box
						width="100%"
						height={theme.spacing(7)}
						display="flex"
						justifyContent="flex-end"
						alignItems="flex-end"
						padding={2}
					>
							<Button
									sx={{
									fontSize: xlDown ? lgDown ? 13 : 17 : 21,
									fontWeight:"500",
									fontFamily:"poppins",
									textTransform: "capitalize",
									display:"flex",
									justifyContent:"center",
									alignItems:"center",
									}}
									onClick={()=>setOpen(true)}
									endIcon={<AddCircleOutline />}
									>
									Adicionar Materia
								</Button>
					</Box>
				
					
				</Box>
				<Box width="50%" height="100%" backgroundColor="#F4F4F4" display="flex" justifyContent="space-between" flexDirection="column">
				<Grid container width="100%">
						
						<Grid
							item
							xs={12}
							height={theme.spacing(16)}
							display="flex"
							alignItems="flex-end"
							>
							
							<Box width="100%" height={theme.spacing(7.5)} padding={2} display="flex" justifyContent="space-between">
								<Typography
									fontSize={xlDown ? (lgDown ? 13 : 17) : 21}
									fontWeight="500"
									fontFamily="poppins"
									color="primary.fontMain"
									display="flex"
									>
									Categorias
								</Typography>
								
							</Box>
						</Grid>
						<Grid
							item
							xs={12}
							display="flex"
							alignItems="flex-start"
							gap={1}
							padding={2}
							sx={{paddingBottom: 10}}
						>
							{categorias && categorias.map((row) => (
								
								<Chip
								color="primary"
								label={row.tblCategoria.categoriaNome}	
								onDelete={handleExcludeCategoria}
							/>
							))}
							
							
						</Grid>
						
					</Grid>
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
							<ModalTitle>Adicionar Matéria</ModalTitle>
							<IconButton
								onClick={()=>setOpen(false)}
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
							gap={2}>
								
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
										materiasSelectable && materiasSelectable[0].map((row, i) => (
											<Chip key={i} label={row.materiaNome}/>
										))
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
								variant="contained"
							
							>
								Cadastrar
							</Button>
						</Grid>
					</Grid>
				</Box>
			</Modal>
					
				</Box>
			</BaseLayout>
		</MenuDrawer>
	);
};

export default dashboard;
