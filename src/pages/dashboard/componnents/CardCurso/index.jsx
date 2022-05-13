import { Edit } from '@mui/icons-material';
import { Box, Paper, Typography, useMediaQuery, useTheme } from '@mui/material';

const CardCurso = ({nome}) => {
	const theme = useTheme();

	const lgDown = useMediaQuery(theme.breakpoints.down(1400));
	const exUp = useMediaQuery(theme.breakpoints.up(1900));
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
					src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=464&q=80"></Box>

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
				alignItems="center">
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
