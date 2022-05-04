import { Box, List, useTheme, IconButton } from '@mui/material';
import { ArrowBack, ArrowForward } from '@mui/icons-material';
import { Drawer } from '@mui/material';
import { useDrawerContext } from '../../../../shared/contexts';
import { ListItemLink } from '../listItemLink';

export const MenuDrawer = ({ children }) => {
	const theme = useTheme();

	const { isDrawerOpen, toggleDrawerOpen, drawerOptions } =
		useDrawerContext();
	return (
		<Box width="100vw" height="100vh">
			<Drawer
				variant="permanent"
				onClose={toggleDrawerOpen}
				overFlowX="hidden">
				<Box
					sx={{
						width: isDrawerOpen
							? theme.spacing(34)
							: theme.spacing(7),
						transition: theme.transitions.create(
							['width', 'margin'],
							{
								easing: theme.transitions.easing.sharp,
								duration:
									theme.transitions.duration.enteringScreen,
							}
						),
					}}
					borderRadius={0}
					backgroundColor="secondary.main"
					height="100%"
					dislay="flex"
					flexDirection="column">
					<Box
						width="100%"
						height="14%"
						display="flex"
						justifyContent="end">
						<Box width={theme.spacing(6)} height={theme.spacing(6)}>
							<IconButton
								onClick={toggleDrawerOpen}
								children={
									isDrawerOpen ? (
										<ArrowBack />
									) : (
										<ArrowForward />
									)
								}
								sx={{ color: 'primary.contrastText' }}
							/>
						</Box>
					</Box>
					<Box>
						<List>
							{drawerOptions.map(drawerOptions => {
								return (
									<ListItemLink
										key={drawerOptions.label}
										icon={drawerOptions.icon}
										path={drawerOptions.path}
										label={drawerOptions.label}
									/>
								);
							})}
						</List>
					</Box>
				</Box>
			</Drawer>
			<Box
				sx={{
					marginLeft: isDrawerOpen
						? theme.spacing(34)
						: theme.spacing(7),
					transition: theme.transitions.create(['width', 'margin'], {
						easing: theme.transitions.easing.sharp,
						duration: theme.transitions.duration.enteringScreen,
					}),
				}}
				backgroundColor="#f0f"
				display="flex"
				flexGrow={1}>
				{children}
			</Box>
		</Box>
	);
};
