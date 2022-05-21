import { useRouter } from 'next/router';
import { useDrawerContext } from '../../../../shared/contexts/DrawerContext';
import {
	ListItemButton,
	ListItemIcon,
	Icon,
	ListItemText,
	useTheme,
	useMediaQuery,
} from '@mui/material';

const ListItemLink = ({ path, icon, label, onClick, color }) => {
	const theme = useTheme();
	const router = useRouter();
	const mdDown = useMediaQuery(theme.breakpoints.down('md'));

	const { isDrawerOpen } = useDrawerContext();
	const selected = router.pathname == path ? true : false;
	const handleClick = () => {
		router.push(path);
		onClick?.();
	};

	return (
		<ListItemButton
			selected={selected}
			onClick={handleClick}
		
			sx={{
				backgroundColor: color,
				height: theme.spacing(6),
				overflow: 'hidden',
			}}>
			<ListItemIcon >
				<Icon sx={{ '&.material-icons':{
					fontSize: 20
				}, color: 'primary.contrastText' }}>{icon}</Icon>
			</ListItemIcon>
			<ListItemText
				primary={isDrawerOpen ? label : ''}
				primaryTypographyProps={{
					color: 'primary.contrastText',
					fontSize: 16,
					fontFamily: 'poppins',
					whiteSpace: 'nowrap',
				}}
			/>
		</ListItemButton>
	);
};

export { ListItemLink };
