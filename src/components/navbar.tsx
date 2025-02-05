import { Link } from "react-router-dom";
import { AppBar, Toolbar, Button, Box } from "@mui/material";
export default () => {
    return (
        <AppBar position="fixed" sx={{ backgroundColor: '#4CAF50' }}> {/* Set the permanent background color */}
            <Toolbar>
                <Box sx={{ flexGrow: 1 }} />
                <Button
                    component={Link}
                    to="home"
                    sx={{
                        color: '#FFFFFF',
                        backgroundColor: 'transparent',
                        transition: 'color 0.3s',
                        '&:hover': {
                            color: '#FFEB3B'
                        }
                    }}>Home
                </Button>
                <Button
                    component={Link}
                    to="about"
                    sx={{
                        color: '#FFFFFF',
                        backgroundColor: 'transparent',
                        transition: 'color 0.3s',
                        '&:hover': {
                            color: '#FFEB3B'
                        }
                    }}>About
                </Button>
                <Button
                    component={Link}
                    to="recipes"
                    sx={{
                        color: '#FFFFFF',
                        backgroundColor: 'transparent',
                        transition: 'color 0.3s',
                        '&:hover': {
                            color: '#FFEB3B'
                        }
                    }}
                >
                    Recipes
                </Button>
            </Toolbar>
        </AppBar>
    );
}
