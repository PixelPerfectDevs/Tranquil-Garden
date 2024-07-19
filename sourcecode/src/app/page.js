"use client";
import Button from '@mui/material/Button';
import SignInService from '@/Services/signIn';
export default function Home() {
 
  const handlesignin = async() => {
    SignInService()
  }
  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Button variant="outlined" onClick={handlesignin} >SignIn</Button>
      </div>
    </>
  );
}
