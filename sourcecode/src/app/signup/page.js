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
    name: "Music", 
    url: 'https://img.freepik.com/premium-vector/3d-rendering-music-notes-with-light-effect-blue-abstract-background_1302-27784.jpg'
  },
   {
    name: "Painting",
    url: 'https://assets.onlineartlessons.com/uploads/20220712225358/4-art-backgrounds-background-as-subject.jpg'
  },
  {
    name: "Yoga",
    url: 'https://img.freepik.com/premium-photo/yoga-day-design-with-stunning-nature-background-girl-meditating_970907-2222.jpg'
  },
 
  {
    name: "Dance",
    url: 'https://i.pinimg.com/736x/69/e3/d3/69e3d35379c870cb3b4539b5122e19c9.jpg'
  },
   
  {
    name: "Gym", 
    url: 'https://st3.depositphotos.com/6203808/19558/v/1600/depositphotos_195586084-stock-illustration-fitness-club-seamless-pattern-or.jpg'
  },
  {
    name: "Books",
    url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSb_Jbg5WIO_p4H10HwbS1DmYogkz94xurkvw&s'
  },
  {
    name: "Sports",
    url: 'https://t3.ftcdn.net/jpg/05/32/57/30/360_F_532573032_XeFcG5HojuT8bMYnaKrPv70o4Nulwxwd.jpg'
  }, 
  {
    name: "Movies",
    url: 'https://st3.depositphotos.com/11433382/14401/i/450/depositphotos_144010359-stock-photo-film-reels-and-movie-clapper.jpg'
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
    // console.log(event.target.value)
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
   <div className="border border-black rounded-md p-8 m-4 mt-0 mx-12 ">
    <div>
        <TextField label="Name" required id="outlined-required" fullWidth onChange={(e)=> handleNameChange(e)}  defaultValue={name} sx={{paddingBottom:'14px'}} />
        </div>
        <Typography variant="h5" sx={{paddingTop:'10px'}}>What Interests you the most? </Typography>
        <hr/>
        <Box sx={{ flexGrow: 1, paddingTop:'20px', paddingBottom:'20px' }} >
      <Grid  container spacing={2} columns={12} display="flex" justifyContent="center" >
        {data.map((card, index) => (
          <Grid item xs={6} sm={6} md={3} lg={3} xl={3} key={index}  sx={{}}>
            <Card sx={{ maxHeight:300, maxWidth: 300, border: list.some(item => item === card.name) ? '2px solid gray' : 'none'}} onClick={() => handleCardClick(card.name)}>
      <CardActionArea>
        <CardMedia
          component="img"
          
          sx={{height:200, objectFit:'cover'}}
          image={card.url}
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