import { useTheme } from '@emotion/react';
import { AccountCircle, Email, Visibility, VisibilityOff } from '@mui/icons-material';
import { Button, capitalize, Grid, IconButton, InputAdornment, Link, Paper, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useState } from 'react';
import BaseLoginLayout from '../layout/BaseLoginLayout';


const dashboard = () => {
	const theme = useTheme();

  const [showPassword, setShowPassword] = useState(false);
	
	return (
			<BaseLoginLayout>
      <Box
        width={500}
        height={400}
        backgroundColor="primary.contrastText"
        component={Paper}
        elevation={1}
        marginTop={20}
        padding={4.5}
      > 
        <Grid container direction="column" spacing={2}>
          <Grid item >
            <Typography
              fontSize={26}
              fontWeight={600}
              color="#565656"
            >
              Entrar
            </Typography>
            <Typography
              fontSize={18}
              fontWeight={400}  
              color="#737C88"
            >
             Faça login para acessar o CMS
            </Typography>
          </Grid>
          <Grid item>
            <TextField fullWidth variant="standard" label="Email" placeholder='email.example@email.com' 
            />
          </Grid>
          <Grid item display="flex" flexDirection="column">
            <TextField fullWidth variant="standard" label="Senha" type={showPassword ? 'text' : 'password'} InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    marginRight={5}
                    onClick={() => showPassword ? setShowPassword(false) : setShowPassword(true)}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }} />
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
