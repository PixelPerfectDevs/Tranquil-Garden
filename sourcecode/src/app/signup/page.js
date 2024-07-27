"use client"
import React, { useState } from "react";
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea } from '@mui/material';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { experimentalStyled as styled } from '@mui/material/styles';
export default function SignUp() {
  
  return (
   <div className="border border-black rounded-md p-8 m-4 mx-12 h-full">
    
        <TextField label="Name" required id="outlined-size-normal" fullWidth  defaultValue="Forum Shah" sx={{paddingBottom:'14px'}} />
        <Typography variant="h5" sx={{paddingTop:'10px'}}>What Interests you the most? </Typography>
        {/* <span>Pick atleast 3</span> */}
        <hr/>
        <Box sx={{ flexGrow: 1, paddingTop:'20px', paddingBottom:'20px' }} >
      <Grid container spacing={{ xs: 2, md: 3 }} columns={{sm: 4, md: 6 }}   >
        {Array.from(Array(6)).map((_, index) => (
          <Grid item xs={1} sm={2} md={2} key={index} display="flex" justifyContent="center">
            <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image="/static/images/cards/contemplative-reptile.jpg"
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Lizard
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>

          </Grid>
        ))}
      </Grid>
    </Box>
    <hr/>
    <div className="pt-4 flex justify-between">
        <Button>Skip</Button>
    <Button variant="outlined"> Submit </Button>
    </div>
   </div>
  );
}