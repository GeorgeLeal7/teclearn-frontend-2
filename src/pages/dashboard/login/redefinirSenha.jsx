import { useTheme } from '@emotion/react';
import { Button, capitalize, Grid, Link, Paper, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import BaseLoginLayout from '../layout/BaseLoginLayout';


const dashboard = () => {
  const theme = useTheme();
  const [email, setEmail] = useState();

  const handleClickSendEmail = () => {
    LoginService.login({
      email,
      senha,
    }).then(result => {
      if (result instanceof Error) {
        alert(result.message);
        return;
      });
  }
  }
	
	return (
			<BaseLoginLayout>
      <Box
        width={500}
        height={350}
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
               Esqueceu a senha?
            </Typography>
            <Typography
              fontSize={18}
              fontWeight={400}  
              color="#737C88"
            >
             Digite seu email para indentificarmos sua conta.
            </Typography>
          </Grid>
          <Grid item marginTop={4}>
            <TextField value={email} onChange={(e)=> setEmail(e.target.value)} fullWidth variant="standard" label="Confirme seu E-mail" placeholder='email.example@email.com' />
          </Grid>
          
          <Grid item display="flex" alignItems="flex-end" justifyContent="flex-end" mt={5}>
            <Button onClick={()=>handleClickSendEmail()} variant='contained' size="small" sx={{textTransform: "capitalize", width: 100}}>Entrar</Button>
          </Grid>
        </Grid>
        </Box>
			</BaseLoginLayout>
	
	);
};

export default dashboard;
