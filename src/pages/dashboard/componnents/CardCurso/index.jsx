import { Edit } from '@mui/icons-material';
import { Box, Paper, Typography, useMediaQuery, useTheme } from '@mui/material';
import {useRouter} from 'next/router'

const CardCurso = ({id, nome, foto}) => {
	const theme = useTheme();
	const router = useRouter();

	const lgDown = useMediaQuery(theme.breakpoints.down(1400));
	const exUp = useMediaQuery(theme.breakpoints.up(1900));


	const  handleClickEdit = (id) =>{
		router.push(`/dashboard/cursos/editar?id=${id}`);
	}

	
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
					src={'http://10.107.144.28:8080/uploads/' + foto}></Box>

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
						cursor: 'pointer',
						backgroundColor: '#c4c4c490',
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
				onClick={()=> handleClickEdit(id)}
				>
				<Edit
					sx={{
						width: '40%',
						height: '40%',
						color: '#606060',
					}}
				/>
			</Box>
		</>
	);
};

export { CardCurso };
