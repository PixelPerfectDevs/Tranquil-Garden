import { ParallaxBanner } from "react-scroll-parallax";
import { Button } from "@mui/material";
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import SignInService from "@/Services/signIn";
export const Backdrop = () => {
  const router = useRouter();
  const handlesignin = () => {
    SignInService().then(()=>{
      router.push("/chat")
    })
    .catch((error)=>{
      console.log(error)  
    });
  }

  const videoBackground = {
    children: (
      <video autoPlay loop muted playsInline style={{ objectFit: 'cover', width: '100%', height: '100vh', pointerEvents: 'none' }}>
        <source src="https://firebasestorage.googleapis.com/v0/b/tranquil-garden-09.appspot.com/o/vecteezy_sunrise-at-khao-takhian-ngo-morning-landscape-of-mist-and_34552172.mp4?alt=media&token=23968773-b329-4655-925b-5eeae01a992c" type="video/mp4" />
      </video>
    ),
    translateY: [0, 0],
    shouldAlwaysCompleteAnimation: true,
    expanded: true 
  };

  const headline = {
    translateY: [0, 30],
    scale: [1, 1.05, "easeOutCubic"],
    shouldAlwaysCompleteAnimation: true,
    children: (
      <div style={{ inset: 0, position: 'absolute', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', zIndex: 30, pointerEvents: 'auto' }}>
        <h1 
          className="headline" 
          style={{
            fontSize: '90px',
            color: 'white',
            textShadow: '2px 2px 8px rgba(0, 0, 0, 0.8)', 
            marginBottom: '20px',
            zIndex: 40
          }}>
          <span style={{ fontSize: 'larger' }}>T</span>ranquil <span style={{ fontSize: 'larger' }}>G</span>arden
        </h1>
        <Button
            class="headline button"
            style={{
                position: 'relative',
                zIndex: 40,
                fontSize: '25px',
                color: 'white',
                textShadow: '2px 2px 8px rgba(0, 0, 0, 0.8)',
                cursor: 'pointer',
                padding: '5px',
            }}
            onClick={handlesignin}
        >
            Get Started <ChevronRightIcon/>
        </Button>
        <div class="mouse"></div>
      </div>
    )
  };

  const gradientOverlay = {
    children: (
      <div style={{ width: '100%', height: '100%', background: 'linear-gradient(to top, transparent, transparent)', pointerEvents: 'none' }} />
    ),
    translateY: [0, 15],
    shouldAlwaysCompleteAnimation: true,
    expanded: true 
  };

  return (
    <ParallaxBanner
      layers={[videoBackground, gradientOverlay, headline]}
      className="full"
      style={{ height: '100%' }} 
    />
  );
};
