"use client";
import React from 'react';
import { Button } from '@mui/material';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
// import newimg from '/public/newimg.png';
export default function Info() {
    const handleGithub = () => {
        window.open('https://github.com/PixelPerfectDevs/Tranquil-Garden.git', '_blank');
    }
    return (
        <div style={{ 
            position: 'fixed', 
            top: 0, 
            left: 0, 
            width: '100vw', 
            height: '100vh', 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center',
            fontSize: '2rem', 
            color: 'white', 
            padding: '20px', 
            borderRadius: '8px',
            flexDirection: 'column', 
        }}>
            <iframe id="player" type="text/html" width="640" height="390"
            src="https://www.youtube.com/embed/EjOEj83TxK8"
            frameborder="0" allowfullscreen></iframe>
            <Button onClick={handleGithub} sx={{color:'white'}}><img src='https://firebasestorage.googleapis.com/v0/b/tranquil-garden-09.appspot.com/o/newimg.png?alt=media&token=a52f6418-b6c3-4934-9027-17ebfc9facf9' style={{width:'150px'}}/><ArrowOutwardIcon sx={{fontSize: '25px', marginLeft:'-15px'}}/></Button>
        </div>
    );
}