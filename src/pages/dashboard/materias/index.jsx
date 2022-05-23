import { useTheme, useMediaQuery, Box, Grid, Typography, IconButton, Icon, InputBase, Chip, Button, Paper, Modal, TextField } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import { MenuDrawer } from '../componnents/menuDrawer/MenuDrawer';
import { useDrawerContext } from '../../../shared/contexts';
import BaseLayout from '../layout/BaseLayout';
import { CursoService } from '../services/api/curso/CursoService';
import { useRouter } from 'next/router';
import { AddCircleOutline, Close } from '@mui/icons-material';
import { ModalTitle } from '../componnents/Texts/ModalTitle';
import { MateriaService } from '../services/api/materia/MateriaService';
import { CategoriaService } from '../services/api/categoria/CategoriaService';

const dashboard = () => {
	const { handleSetDrawerOptions } = useDrawerContext();
	const theme = useTheme();
	const router = useRouter();
	const xlDown = useMediaQuery(theme.breakpoints.down('xl'));
	const lgDown = useMediaQuery(theme.breakpoints.down('lg'));

	const [curso, setCurso] = useState();
	const [materias, setMaterias] = useState();
	const [materia, setMateria] = useState();
	const [materiasSelectable, setMateriasSelectable] = useState();	
	const [busca, setBusca] = useState();

	const [categorias, setCategorias] = useState();
	const [categoriaByMateria, setCategoriaByMateria] = useState();
	const [selectCategoria, setSelectCategoria] = useState([]);

	const [materiaNome, setMateriaNome] = useState();

	const [open, setOpen] = useState(false);

	const id = useMemo(()=>{
		return router.query.id
	}, [router.query]);

	const handleExcludeCategoria = () =>{

	};

	useEffect(()=>{
		MateriaService.getAll().then(result => {
			if (result instanceof Error) {
				alert(result.message);
				return;
			} else {
				setMaterias(result);
				console.log(result);
			}
		});
	}, [id]);

	const findAllCategorias = () => {
		CategoriaService.getAll().then(result => {
			if (result instanceof Error) {
				alert(result.message);
				return;
			} else {
				setCategorias(result);
				console.log(result);
			}
		});
	}
	const handleClickChip = (id) => {
		var add = true
		console.log(id.id);
		selectCategoria.length != 0  && selectCategoria.map((idCategoria, key) => {
			if (idCategoria.id == id.id) {
				selectNewMateria.splice(key, 1);
				add = false;
			}
		})
		if (add) setSelectCategoria([...selectCategoria, id]);
		console.log(selectCategoria)
	
	};


	const createMateria = () => {
		MateriaService.create({
			materiaNome
		}).then((result) => {
			setMateriaNome('');
		});
	}

	const getCategoriaByMateria = () => {
		CategoriaService.getAll(materia).then(result => {
			if (result instanceof Error) {
				alert(result.message);
				return;
			} else {
				setCategoriaByMateria(result);
				console.log(result);
			}
		});
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
			<BaseLayout sx={{ display: 'flex', padding: 0 }} title="Materia">
				<Box width="50%" height="100%" display="flex" flexDirection="column" justifyContent="space-between">
					<Grid container width="100%">
						
						<Grid
							item
							xs={12}
							height={theme.spacing(7.5)}
							display="flex"
							>
							
							<Box width="100%" height={theme.spacing(7.5)} padding={2} display="flex" justifyContent="space-between">
								<Typography
									fontSize={21}
									fontWeight="500"
									fontFamily="poppins"
									color="primary.fontMain"
									display="flex"
									>
									Matérias
								</Typography>
								<Box
									width="50%"
									height={33}
									backgroundColor="#E8EBEE"
									borderRadius={2}>
									<IconButton size="small"sx={{ marginTop: 0 }}>
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
							height={325}
							display="flex"
							flexDirection="column"
							alignItems="flex-start"
							justifyContent="space-between"
							sx={{paddingBottom: 10}}
							>
							
							
							{
								materias && materias.length != 0 && materias.map((row)=>(
									<Box 
										width="100%" 
										height={theme.spacing(6.5)} 
										padding={2}
										backgroundColor={materia == row.idMateria?'#F4F4F4':''}
										onClick={()=>{setMateria(row.idMateria); getCategoriaByMateria()}} 
										sx={{cursor: 'pointer'}}
										>
										<Typography
											fontSize={xlDown ? (lgDown ? 13 : 17) : 21}
											fontWeight="400"
											fontFamily="poppins"
											color="primary.fontMain"
											display="flex"
											>
											{row.materiaNome}
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
									onClick={()=>{setOpen(true); findAllCategorias()}}
									endIcon={<AddCircleOutline />}
									>
									Cadastrar Materia
								</Button>
					</Box>
				
					
				</Box>
				<Box width="50%" height="100%" backgroundColor="#F4F4F4" display="flex" justifyContent="space-between" flexDirection="column">
				<Grid container width="100%">
						
						<Grid
							item
							xs={12}
							height={theme.spacing(7)}
							display="flex"
							alignItems="flex-start"
							>
							
							<Box width="100%" height={theme.spacing(5)} padding={2} display="flex" justifyContent="space-between">
								<Typography
									fontSize={21}
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
							flexWrap="wrap"
							gap={1}
							padding={2}
							sx={{paddingBottom: 10}}
							>
								{
									categoriaByMateria && categoriaByMateria.map((row)=>(
										<Chip
										key={row.idCategoria}
										size="small"
										color="primary"
										label={row.categoriaNome}	
										onDelete={handleExcludeCategoria}
									/>
									))
								}
								
								
							
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
							<ModalTitle>Cadastrar Matéria</ModalTitle>
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
								 <TextField value={materiaNome} onChange={(e)=>setMateriaNome(e.target.value)} fullWidth variant="standard" label="Nome da matéria" />
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
								<ModalTitle>Categoria</ModalTitle>
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
										categorias && categorias.map((row, i) => (
											<Chip 
												key={i} 
												label={row.categoriaNome} 
												onClick={() => handleClickChip({ id: row.idCategoria})}/>
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
								onClick={()=>createMateria()}
							>
								Cadastrar
							</Button>
						</Grid>
					</Grid>
				</Box>
			</Modal>
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
									
									endIcon={<AddCircleOutline />}
									>
									Adicionar Categoria
								</Button>
					</Box>
				</Box>
			</BaseLayout>
		</MenuDrawer>
	);
};

export default dashboard;
