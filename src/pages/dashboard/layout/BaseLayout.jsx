import {
	Box,
	Container,
	Paper,
	Button,
	useMediaQuery,
	Typography,
	Pagination,
} from '@mui/material';
import { theme } from '../../../shared/themes';

const BaseLayout = ({ title, subtitle, onClick, children, sx, pagination, page, setPage, limit, totalCount}) => {
	const xlDown = useMediaQuery(theme.breakpoints.down('xl'));
	const lgDown = useMediaQuery(theme.breakpoints.down('lg'));

	

	return (
		<Box
			flexGrow={1}
			height={theme.spacing(35)}
			backgroundColor="primary.main"
			paddingTop={theme.spacing(4)}>
			<Container
				maxWidth="lg"
				sx={{
					'&.MuiContainer-maxWidthLg': {
						maxWidth: '2000px',
						width: '80vw',
						minWidth: '1000px',
					},
				}}>
				<Box
					width="100%"
					height={theme.spacing(17)}
					display="flex"
					justifyContent="space-between">
					<Box
						width={theme.spacing(50)}
						height={theme.spacing(14)}
						display="flex"
						flexDirection="column"
						gap={3}>
						<Typography
							variant={'h4'}
							color="primary.contrastText"
							fontFamily="poppins"
							backgroundColor="primary.abc">
							Controle de {title + 's'}
						</Typography>
						<Typography
							width={theme.spacing(36)}
							color="primary.contrastText"
							fontFamily="poppins"
							fontSize={22}
							fontWeight="300">
							Gerencie os {title + 's'} da plataforma.
						</Typography>
					</Box>
					<Box
						width={theme.spacing(30)}
						height={theme.spacing(10)}
						alignSelf="flex-end"
						display="flex"
						justifyContent="flex-end"
						alignItems="flex-end">
						<Button
							sx={{
								borderRadius: 5,
								paddingTop: 0.5,
								paddingBottom: 0.5,
								paddingLeft: 4,
								paddingRight: 4,
							}}
							onClick={onClick}
							color="info"
							variant="outlined"
							alignSelf="flex-end">
							Novo {title}
						</Button>
					</Box>
				</Box>
				<Box
					sx={sx}
					width="100%"
					height="68vh"
					minHeight="400px"
					borderRadius={2}
					backgroundColor="#ffffff"
					marginTop={1.4}
					component={Paper}
					elevation={3}
					padding={2.5}
					overflow="hidden">
					{children}
				</Box>
				{pagination && (<Pagination
					sx={{marginTop: 3}}
				page={page}
				count={Math.ceil(totalCount / limit)}
				onChange={(e, newPage) => setPage(newPage)}
			/>)}
			</Container>
		</Box>
	);
};

export default BaseLayout;
