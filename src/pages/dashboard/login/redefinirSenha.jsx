import { useTheme } from '@emotion/react';
import { Button, capitalize, Grid, Link, Paper, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import BaseLoginLayout from '../layout/BaseLoginLayout';


const dashboard = () => {
	const theme = useTheme();


	
	return (
			<BaseLoginLayout>
      <Box
        width={500}
        height={400}
        backgroundColor="primary.contrastText"
        component={Paper}
        elevation={1}
        marginTop={20}
        padding={5}
      > 
        <Grid container direction="column" spacing={2}>
          <Grid item >
            <Typography
              fontSize={26}
              fontWeight={600}
              color="#565656"
            >
              Login
            </Typography>
            <Typography
              fontSize={18}
              fontWeight={300}  
              color="#737C88"
            >
             Faça login para acessar o CMS
            </Typography>
          </Grid>
          <Grid item>
            <TextField fullWidth variant="standard" label="Email" placeholder='email.example@email.com' />
          </Grid>
          <Grid item display="flex" flexDirection="column">
            <TextField fullWidth variant="standard" label="Senha" type="password" />
            <Link href="/dashboard/login/redefinirSenha" variant="body2" ml={37} marginTop={2.5}>
              Esqueceu a senha?
            </Link>
          </Grid>
          <Grid item display="flex" alignItems="flex-end" justifyContent="flex-end" mt={5}>
            <Button variant='contained' size="small" sx={{textTransform: "capitalize", width: 100}}>Entrar</Button>
          </Grid>
        </Grid>
        </Box>
			</BaseLoginLayout>
	
	);
};

export default dashboard;
