import { Button } from '@mui/material';
import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();

  const redirectDashBoard = () =>{
    router.push("./geral");
  };
  return (
        <Button variant="contained" onClick={redirectDashBoard}>Dashboard</Button>
  );
};
