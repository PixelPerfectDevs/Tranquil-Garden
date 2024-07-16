"use client";
import Button from '@mui/material/Button';
import { useRouter } from 'next/navigation';
export default function Home() {
  const router = useRouter();
  const handlesignin = () => {
    router.push('/signin');
  }
  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Button variant="outlined" onClick={handlesignin} >SignIn</Button>
      </div>
    </>
  );
}
