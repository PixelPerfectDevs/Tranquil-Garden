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
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import ListSubheader from '@mui/material/ListSubheader';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';
import { useRouter } from 'next/navigation';
import createUser from "@/Services/newuser";
import setHistory from "@/Services/sethistory";
const data = [
  {
    name: "Music"
  },
   {
    name: "Painting"
  },
  {
    name: "Yoga"
  },
  {
    name: "Meditation"
  },
  {
    name: "Dance"
  },
   {
    name: "Zumba"
  },
  {
    name: "Gym"
  },
  {
    name: "Books"
  },
]

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
    let today = new Date().toLocaleDateString();
    const newuser = {
      displayName: name,
      email: user.email,
      photoURL: user.photoURL,
      interests : list, 
      urls: []
    };
    await createUser(newuser);
    setHistory([], today, user);
    router.push("/chat");
  }
  const [list, populateList] = useState([]);

  const handleCardClick = async(card) =>{
    populateList((prevList) => {
      if (prevList.some(item => item === card)) {
        return prevList.filter(item => item!== card);
      } else {
        return [...prevList, card];
      }
    });
  }
  return (
   <div className="border border-black rounded-md p-8 m-4 mx-12 h-full">
    
        <TextField label="Name" required id="outlined-size-normal" fullWidth  defaultValue={name} sx={{paddingBottom:'14px'}} />
        <Typography variant="h5" sx={{paddingTop:'10px'}}>What Interests you the most? </Typography>
        <hr/>
        <Box sx={{ flexGrow: 1, paddingTop:'20px', paddingBottom:'20px' }} >
      <Grid  container spacing={2} columns={12} display="flex" justifyContent="center" >
        {data.map((card, index) => (
          <Grid item xs={6} sm={6} md={3} lg={3} xl={3} key={index}  sx={{}}>
            <Card sx={{ maxWidth: 300, border: list.some(item => item === card.name) ? '2px solid gray' : 'none'}} onClick={() => handleCardClick(card.name)}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image="data:image/jpeg;base64,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"
          alt="green iguana"
        />
         <ImageListItemBar
                    title={card.name}
                    // subtitle="Lizards are a widespread group of squamate reptiles."
                    position="bottom"

                    sx={{
                      "& .MuiImageListItemBar-title": {
                        textAlign: "center",
                        width: "100%",
                        fontWeight:'bold', 
                        letterSpacing:'2px'
                      },
                    }}
                  />
      </CardActionArea>
    </Card>

          </Grid>
        ))}
      </Grid>
    </Box>
    <hr/>
    <div className="pt-4 flex justify-between">
        <Button onClick={() => handleSubmit()} >Skip</Button>
    <Button variant="outlined" disabled={list.length <3} onClick={() => handleSubmit()}> Submit </Button>
    </div>
   </div>
  );
}