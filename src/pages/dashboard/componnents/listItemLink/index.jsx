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

const ListItemLink = ({ path, icon, label, onClick }) => {
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
				height: theme.spacing(6),
				overflow: 'hidden',
			}}>
			<ListItemIcon>
				<Icon sx={{ color: 'primary.contrastText' }}>{icon}</Icon>
			</ListItemIcon>
			<ListItemText
				primary={isDrawerOpen ? label : ''}
				primaryTypographyProps={{
					color: 'primary.contrastText',
					fontSize: mdDown ? 18 : 20,
					fontFamily: 'poppins',
					whiteSpace: 'nowrap',
				}}
			/>
		</ListItemButton>
	);
};

export { ListItemLink };
