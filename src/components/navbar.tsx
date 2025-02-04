import React, { useContext } from "react";
import { Link } from "react-router-dom"; 
import { AppBar, Toolbar, Button, Box } from "@mui/material";
import { IsLoggedIn } from "./homePage";

export default () => {
    const { LoggedIn } = useContext(IsLoggedIn);

    return (
        <AppBar position="fixed" sx={{ backgroundColor: '#4CAF50' }}> {/* Set the permanent background color */}
            <Toolbar>
                <Box sx={{ flexGrow: 1 }} />
                <Button 
                    component={Link} 
                    to="/" 
                    sx={{ 
                        color: '#FFFFFF', 
                        backgroundColor: 'transparent',
                        transition: 'color 0.3s', 
                        '&:hover': { 
                            color: '#FFEB3B' // Change text color to yellow on hover
                        } 
                    }} 
                >
                    Home
                </Button>
                <Button 
                    component={Link} 
                    to="/about" 
                    sx={{ 
                        color: '#FFFFFF', 
                        backgroundColor: 'transparent',
                        transition: 'color 0.3s', 
                        '&:hover': { 
                            color: '#FFEB3B' // Change text color to yellow on hover
                        } 
                    }} 
                >
                    About
                </Button>
                <Button 
                    component={Link} 
                    to="/recipes" 
                    sx={{ 
                        color: '#FFFFFF', 
                        backgroundColor: 'transparent',
                        transition: 'color 0.3s', 
                        '&:hover': { 
                            color: '#FFEB3B' // Change text color to yellow on hover
                        } 
                    }} 
                >
                    Recipes
                </Button>
                
            </Toolbar>
        </AppBar>
    );
}
