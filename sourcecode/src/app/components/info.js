"use client";
import React from 'react';
export default function Info() {
    return (
        <div style={{ 
            position: 'fixed', 
            top: '50%', 
            left: '50%', 
            width: '100vw', // Set width to 100% of the viewport width
            height: '100vh',
            transform: 'translate(-50%, -50%)', 
            fontSize: '2rem', 
            // color: 'black', // Changed text color to black for contrast
            color: 'white', // Set background color to white
            padding: '20px', // Added padding for better visual appearance
            borderRadius: '8px' // Optional: Added border radius for a softer look
        }}>
          Link to github:
        </div>
    );
}