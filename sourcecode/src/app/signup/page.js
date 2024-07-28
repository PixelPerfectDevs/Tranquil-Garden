"use client"
import React, { useState, useEffect, use } from "react";
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
import { useRouter } from 'next/navigation';
import createUser from "@/Services/newuser";
export default function SignUp() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [name, setName] = useState("");
  useEffect(() => {
    document.body.style.backgroundColor = "white";
  }, []);
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setName(JSON.parse(storedUser).displayName);
    }
  }, []);
  
  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleSubmit = async() => {
    const newuser = {
      displayName: name,
      email: user.email,
      photoURL: user.photoURL
    };
    await createUser(newuser);
    router.push("/chat");
  }
  return (
   <div className="border border-black rounded-md p-8 m-4 mx-12 h-full">
    
      <TextField
          label="Enter Name"
          variant="outlined"
          value={name}

          onChange={handleNameChange}
          sx={{ marginBottom: '20px' }}
        />
      <Typography variant="h5" sx={{paddingTop:'10px'}}>What Interests you the most? </Typography>
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
          <Button variant="outlined" onClick={handleSubmit}> Submit </Button>
      </div>
   </div>
  );
}