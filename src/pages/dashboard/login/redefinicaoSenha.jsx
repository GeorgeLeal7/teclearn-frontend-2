import { useTheme } from '@emotion/react';
import { Button, capitalize, Grid, IconButton, InputAdornment, Link, Paper, TextField, Typography } from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import { Box } from '@mui/system';
import BaseLoginLayout from '../layout/BaseLoginLayout';
import { useState } from 'react';
import { Visibility, VisibilityOff } from '@mui/icons-material';


const dashboard = () => {
	const theme = useTheme();
    const [showPassword, setShowPassword] = useState(false);
    const [showPassword2, setShowPassword2] = useState(false);

	
	return (
			<BaseLoginLayout>
      <Box
        width={500}
        height={350}
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
              Redefinição de senha
            </Typography>
           
          </Grid>
          <Grid item>
            <TextField fullWidth variant="standard" label="Nova senha " type={showPassword2 ? 'text' : 'password'}  InputProps={{
                endAdornment: (
                    <InputAdornment position="end">
                    <IconButton
                        aria-label="toggle password visibility"
                        marginRight={5}    
                        onClick={()=> showPassword2? setShowPassword2(false) : setShowPassword2(true)}
                        >
                      {showPassword2 ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
            }}/>
          </Grid>
          <Grid item display="flex" flexDirection="column">
            <TextField fullWidth variant="standard" label="Confirme sua senha" type={showPassword ? 'text' : 'password'} InputProps={{
                endAdornment: (
                    <InputAdornment position="end">
                    <IconButton
                        aria-label="toggle password visibility"
                        marginRight={5}    
                        onClick={()=> showPassword? setShowPassword(false) : setShowPassword(true)}
                        >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
            }}/>
           
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
