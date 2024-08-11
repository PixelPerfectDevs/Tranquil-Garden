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
import { useRouter } from 'next/navigation';
import { auth, provider } from "@/Services/signIn";
import { signOut } from "firebase/auth";
import "../chat/chat.css";

export default function Nav({settings})  {
    const router = useRouter();
    const [photourl, setPhotourl] = useState(null);
    const [email, setEmail] = useState("");
    const [user, setUser] = useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const [dialogopen, setdialogOpen] = React.useState(false);
    const [view, setView] = useState('buttons');
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
        }
    }, []);
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
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
  
    const handleReports = async ()=>{
        router.push("/report")
    }
    const handleChat = async ()=>{
        router.push("/chat")
    }
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
                    <Button sx={{color: 'black', border: '1px solid black', width: '100%'}} onClick={() => setView('name')}>Name {user ? user.name : 'Guest'}</Button>
                    <Button sx ={{color: 'black', border: '1px solid black', width: '100%'}} onClick={() => setView('preferences')}>Preferences</Button>
                  </>
                ) : view === 'name' ? (
                  <>
                    <input type="text" placeholder="Name" autoFocus />
                    <Button onClick={() => setView('buttons')}>Back</Button> 
                  </>
                ) : (
                  <>
                    <div>Preferences content</div>
                    <Button onClick={() => setView('buttons')}>Back</Button> 
                  </>
                )}
                </div>
              </div>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleDialogClose} color="primary">
                  Cancel
                </Button>
                <Button onClick={handleDialogClose} color="primary">
                  Done
                </Button>
              </DialogActions>
            </Dialog>
        </div>
    );
}