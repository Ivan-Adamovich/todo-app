//components
import { AppBar, IconButton, Toolbar, Typography } from '@mui/material';
//icons
import MenuIcon from '@mui/icons-material/Menu';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

interface HeaderHeightProps {
    showMenu: boolean,
    toggleShowMenu(): void
}

const AppNav: React.FC<HeaderHeightProps> = ({showMenu, toggleShowMenu}) =>{
    return(
        <AppBar position="relative" sx={{bgcolor: 'primary.main' ,pt: 0 , boxShadow: 'none', height: '64px'}}>
            <Toolbar sx={{height: '64px'}}>
                <IconButton
                    onClick={toggleShowMenu}
                    size="small"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{ mr: 2 }}>
                        {showMenu ? <ArrowBackIosIcon/> : <MenuIcon/>}
                </IconButton>
                <Typography 
                variant="h6" 
                component="div" 
                sx={{ flexGrow: 1, cursor: 'default' }}>
                    To-Do
                </Typography>
            </Toolbar>
        </AppBar>
    )
}

export default AppNav;