import {
	Box,
	Container,
	useMediaQuery,
} from '@mui/material';
import { theme } from '../../../shared/themes';


const BaseLoginLayout = ({ children }) => {
	const xlDown = useMediaQuery(theme.breakpoints.down('xl'));
	const lgDown = useMediaQuery(theme.breakpoints.down('lg'));

	return (
		<Box
			flexGrow={1}
			height={theme.spacing(35)}
			backgroundColor="primary.main"
			paddingTop={theme.spacing(4)}
			display="flex"
			justifyContent="center"
			// alignItems="center"
		>
		
				{children}
		
		</Box>
	);
};

export default BaseLoginLayout;
