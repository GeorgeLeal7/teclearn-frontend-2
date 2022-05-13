import { useTheme, Grid, useMediaQuery, Chip } from '@mui/material';
import { useEffect, useState } from 'react';
import { MenuDrawer } from '../componnents/menuDrawer/MenuDrawer';
import { useDrawerContext } from '../../../shared/contexts';
import BaseCleanLayout from '../layout/BaseCleanLayout';
import { CardCurso } from '../componnents/CardCurso';
import { CardAdd } from '../componnents/CardAdd';
import { CursoService } from '../services/api/curso/CursoService';

const dashboard = () => {
	const theme = useTheme();
	const { handleSetDrawerOptions } = useDrawerContext();

	const lgDown = useMediaQuery(theme.breakpoints.down(1400));
	const exUp = useMediaQuery(theme.breakpoints.up(1900));

	const [cursos, setCursos] = useState('');

	const findAllCursos = () => {
		CursoService.getAll().then(result => {
			if (result instanceof Error) {
				alert(result.message);
				return;
			} else {
				
				setCursos(result);
				// cursos(result);
			}
		});
	};

	useEffect(() => {
		findAllCursos();
		console.log(cursos);
	}, []);
	useEffect(() => {
		console.log(cursos)
	}, [cursos]);

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
			<BaseCleanLayout>
				<Grid container width="100%" height="100%">
					{
						cursos.length > 0 && cursos.map(curso => (	
							<Grid
								key={curso.idCurso}
								item
								xs={3}
								height={
									lgDown
										? theme.spacing(30)
										: exUp
										? theme.spacing(43)
										: theme.spacing(35)
									}
								padding={1}>
									<CardCurso id={curso.idCurso} nome={curso.cursoNome} imagem={curso.cursoImagem} />
								</Grid>
							)
						)
					}

								


					{/* // 	<Grid
					// 		key={row.idCurso}
					// 		item
					// 		xs={3}
					// 		height={
					// 			lgDown
					// 				? theme.spacing(30)
					// 				: exUp
					// 				? theme.spacing(43)
					// 				: theme.spacing(35)
					// 		}
					// 		padding={1}>
					// 		<CardCurso id={row.idCurso} nome={row.cursoNome} imagem={row.cursoImagem} setCursos={findAllCursos}/>
							
					// 	</Grid>
					// )
					
					// ) */}
					<Grid
						item
						xs={3}
						padding={1}
						height={
							lgDown
								? theme.spacing(30)
								: exUp
								? theme.spacing(43)
								: theme.spacing(35)
						}>
						<CardAdd findCursos={findAllCursos}/>
					</Grid>
				</Grid>
			</BaseCleanLayout>
		</MenuDrawer>
	);
};

export default dashboard;
