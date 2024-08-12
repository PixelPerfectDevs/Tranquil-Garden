"use client";
import React, { useState, useEffect } from "react";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import LogoutIcon from '@mui/icons-material/Logout';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import Checkbox from '@mui/material/Checkbox';
import ArrowForwardIos from '@mui/icons-material/ArrowForwardIos';
import { useRouter } from 'next/navigation';
import { auth, provider } from "@/Services/signIn";
import { signOut } from "firebase/auth";
import setUserData from "@/Services/setuserdata";
import "../chat/chat.css";

export default function Nav({settings})  {
    const router = useRouter();
    const [photourl, setPhotourl] = useState(null);
    const [email, setEmail] = useState("");
    const [user, setUser] = useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const [dialogopen, setdialogOpen] = React.useState(false);
    const [view, setView] = useState('buttons');
    const [name, setName] = useState(user ? user.name : '');
    const [originalName, setOriginalName] = useState(user ? user.name : '');
    const [interest, setInterest] = useState(user ? user.interest : []);
    const [originalInterest, setOriginalInterest] = useState(user ? user.interest : []);
    const interestOptions = ['Music', 'Painting', 'Yoga','Dance','Gym','Books', 'Sports', 'Movies']; 
    const handleToggle = (value) => {
        const currentIndex = interest.indexOf(value);
        const newInterest = [...interest];
    
        if (currentIndex === -1) {
          newInterest.push(value);
        } else {
          newInterest.splice(currentIndex, 1);
        }
    
        setInterest(newInterest);
      };
    useEffect(() => {
        document.body.style.backgroundColor = "white";
        document.body.style.overflow = "hidden";
        const storedPhotoUrl = localStorage.getItem('photo');
        const storedUser = JSON.parse(localStorage.getItem('user'));  
        if (storedPhotoUrl) {
          setPhotourl(storedPhotoUrl);
        }
        if (storedUser) {
          setEmail(storedUser.email);
        }
        if (typeof window !== 'undefined') {
            const storedUser = JSON.parse(sessionStorage.getItem("user")) ||null;
            setUser(storedUser);
            setName(storedUser.name);
            setOriginalName(storedUser.name);
            setInterest(storedUser.interest);
            setOriginalInterest(storedUser.interest);
        }
    }, []);
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };
    const handleInterestChange = (event) => {
        setInterest(event.target.value);
      };
    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };
    const handleDialogOpen = () => {
        setdialogOpen(true);
    };
    const handleDialogClose = () => {
    setdialogOpen(false);
    };
    const handleLogout = async()=>{
        signOut(auth)
        localStorage.removeItem('user')
        router.push("/")
    }
    const handleNameChange = (event) => {
    setName(event.target.value);
    };
    const handleReports = async ()=>{
        router.push("/report")
    }
    const handleChat = async ()=>{
        router.push("/chat")
    }
    const handleUpdate = async() => {
        console.log("fromupdate",name,interest)
        const updatedUserData = { email, name, interest };
        await setUserData(updatedUserData); // This will trigger a re-render if userData is used in the component
      
        setName(name);
        setOriginalName(name);
        setInterest(interest);
        setOriginalInterest(interest);
        setView('buttons');
        let userData = JSON.parse(sessionStorage.getItem("user"));
  
        // Update the name and interests
        userData.name = name;
        userData.interest = interest; // Assuming 'interest' is an array of interests
        setUser(userData);
        // Save the updated user data back to sessionStorage
        sessionStorage.setItem("user", JSON.stringify(userData));
        localStorage.setItem("user", JSON.stringify(userData));
      };
    return (
        <div>
            <div className="nav">
                <p>Tranquil Garden</p>
                <div className="img">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src={photourl} />
                </IconButton>
                </div>
            </div>
            <Menu
              sx={{ mt: '50px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
              PaperProps={{
                style: {
                  borderRadius: '25px',
                  width: '25%',
                  backgroundColor: '#e9eef6',
                },
              }}
            >
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <p style={{ fontSize: '15px' }}> {email}</p>
                <img src={photourl} alt="user" style={{ width: '20%', height: '20%', borderRadius: '50%', marginTop: '15px' }} />
                <p style={{fontSize: '25px', paddingBottom:'10px'}}> Hi, {user ? user.name : 'Guest'}!</p>
                <button className="managebutton" onClick={handleDialogOpen}>Manage your account</button>
                <div style={{paddingTop: '20px', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', paddingBottom:'25px'}}>
                  {settings.map((setting, index) => (
                    <MenuItem key={setting} onClick={() => {
                      handleCloseUserMenu();
                      if (setting === 'Sign out') {
                        handleLogout();
                      }
                      if(setting === 'Reports'){
                        handleReports()
                      }
                      if(setting === 'Chat'){
                        handleChat()
                      }
                      if(setting === 'History'){
                        window.alert("Yet to be implemented")
                      }
                    }
                    }
                    className="menuitem" 
                    style={{ backgroundColor: 'white',
                      borderRadius: index === 0 ? '25px 25px 0 0' : index === settings.length - 1 ? '0 0 25px 25px' : '0',
                      width: '90%',
                      marginBottom: index !== settings.length - 1 ? '2px' : '0',
                      padding: '15px',
                    }}>
                      <Typography textAlign="center" style={{ padding:'0 25px',textAlign: 'left' }}>
                        {setting === 'Sign out' && <LogoutIcon style={{ marginRight: '10px' }} />}
                        {setting}
                      </Typography>
                    </MenuItem>
                  ))}
                </div>
              </div>
            </Menu>
            <Dialog
              open={dialogopen}
              onClose={handleDialogClose}
              aria-labelledby="responsive-dialog-title"
              fullWidth={true} // Make the dialog take the full width of the container
              maxWidth="lg"
              PaperProps={{
                style: {
                  height: '90%', // Maximum height to 80% of the viewport height
                  width: '90%', // Set width to 80% of the parent width
                  margin: '0 auto', // Center the dialog
                  borderRadius: '25px',
                },
              }}
            >
              <DialogContent>
              <IconButton
                aria-label="close"
                onClick={handleDialogClose}
                style={{
                  position: 'absolute',
                  right: 8,
                  top: 8,
                  color: 'black',
                }}
              >
                <CloseIcon />
              </IconButton>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px' }}>
                <Avatar alt="Remy Sharp " src={photourl} style={{ width: '100px', height: '100px' }} /> 
                <Typography variant="h6" style={{ paddingTop: '20px' }}> Welcome, {user ? user.name : 'Guest'}</Typography>
                <Typography variant="body1" style={{ paddingTop: '5px', color: 'grey' }}>Info about you and your preferences </Typography>
                <div style={{ padding: '15px', width: '60%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' 
                 }}>
                 {view === 'buttons' ? (
                 <>
                 <Card sx={{width: '100%', border: '1px solid #d3d3d3', borderRadius: '10px'}}>
                   <CardContent>
                     <div>
                       <Button sx={{ width: '100%', color: 'black' }} endIcon={<ArrowForwardIos />} onClick={() => setView('name')}>
                         <Grid container alignItems="center" justifyContent="space-between">
                           <Grid item xs={4}>
                             <Typography sx={{ textAlign: 'left' }}>Name</Typography>
                           </Grid>
                           <Grid item xs sx={{textAlign: 'left'}}>
                             <Typography>{user ? user.name : 'guest'}</Typography>
                           </Grid>
                           <Grid item xs={3} sx={{ visibility: 'hidden' }}>
                             <Typography>Placeholder</Typography>
                           </Grid>
                         </Grid>
                       </Button>
                       <Divider sx={{ my: 1 }} />
                       <Button sx={{ width: '100%', color: 'black' }} endIcon={<ArrowForwardIos />} onClick={() => setView('preferences')}>
                         <Grid container alignItems="center" justifyContent="space-between" >
                           <Grid item xs={4}>
                             <Typography sx={{ textAlign: 'left' }}>Preferences</Typography>
                           </Grid>
                           <Grid item xs sx={{textAlign: 'left'}}>
                             {user && Array.isArray(user.interest) ? (
                               user.interest.map((interest, index) => (
                                 <Typography key={index}>{interest}</Typography>
                               ))
                             ) : (
                               <Typography>No preferences</Typography>
                             )}
                           </Grid>
                           <Grid item xs={3} sx={{ visibility: 'hidden' }}>
                             <Typography>Placeholder</Typography>
                           </Grid>
                         </Grid>
                       </Button>
                     </div>
                   </CardContent>
                 </Card>
               </>
                ) : view === 'name' ? (
                  <>
                   <Card sx={{width: '100%', border: '1px solid #d3d3d3', borderRadius: '10px'}}>
                   <CardContent>
                     <Typography>Edit this to change the name </Typography>
                     <TextField sx={{marginTop: '20px'}} fullWidth label="Name" id="fullWidth" value={name} onChange={handleNameChange} />
                     <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
                        {name !== originalName ? (
                        <>
                            <Button onClick={() => setView('buttons')}>Cancel</Button>
                            <Button onClick={handleUpdate}>Update</Button>
                        </>
                        ) : (
                        <Button onClick={() => setView('buttons')}>Back</Button>
                        )}
                    </div>
                    </CardContent>
                    </Card>
                  </>
                ) : (
                    <>
                    <Card sx={{width: '100%', border: '1px solid #d3d3d3', borderRadius: '10px'}}>
                    <CardContent>
                      <Typography>View or make changes to preferences</Typography>
                      <FormGroup>
                        {interestOptions.map((option) => (
                            <FormControlLabel
                            key={option}
                            control={
                                <Checkbox
                                checked={interest.includes(option)}
                                onChange={() => handleToggle(option)}
                                name={option}
                                />
                            }
                            label={option}
                            />
                        ))}
                        </FormGroup>
                      
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
                         {!arraysEqual(interest,originalInterest) ? (
                         <>
                             <Button onClick={() => setView('buttons')}>Cancel</Button>
                             <Button onClick={handleUpdate}>Update</Button>
                         </>
                         ) : (
                         <Button onClick={() => setView('buttons')}>Back</Button>
                         )}
                     </div>
                     </CardContent>
                     </Card>
                   </>
                )}
                </div>
              </div>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleDialogClose} color="primary">
                  Done
                </Button>
              </DialogActions>
            </Dialog>
        </div>
    );
}
function arraysEqual(a, b) {
    if (a === b) return true; // if both are the same reference
    if (a == null || b == null) return false; // if either is null, they're not equal
    if (a.length !== b.length) return false; // different lengths, not equal
  
    // Sort and then check if every element is equal
    const sortedA = [...a].sort();
    const sortedB = [...b].sort();
    for (let i = 0; i < sortedA.length; i++) {
      if (sortedA[i] !== sortedB[i]) return false;
    }
    return true;
  }