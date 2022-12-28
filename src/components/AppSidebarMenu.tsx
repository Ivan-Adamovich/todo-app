//interface
import { Todo } from '../Interfaces/TodoInterface';
//mui components
import { Paper, MenuList, MenuItem, ListItemText, ListItemIcon, Typography, Divider} from '@mui/material';
//mui icons
import StarIcon from '@mui/icons-material/Star';
import AssignmentIcon from '@mui/icons-material/Assignment';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

interface SidebarMenuProps {
    importantTodosLength: number,
    doneTodosLength: number,
    todos: Todo[],
    showAllTodos(): void,
    showDoneTodos(): void,
    showImportantTodos(): void,
}

const AppSidebarMenu: React.FC<SidebarMenuProps> = ({todos, importantTodosLength, doneTodosLength, showAllTodos, showDoneTodos, showImportantTodos}) =>{

    
    return(
        <Paper sx={{ bgcolor: 'background.paper', width: '100%', boxShadow: 'none', }}>
            <MenuList>
                <MenuItem onClick={showAllTodos} sx={{ mt: 1 }}>
                    <ListItemIcon sx={{ color: 'primary.main'}}>
                        <AssignmentIcon fontSize="small"/>
                    </ListItemIcon>
                    <ListItemText>Все задачи</ListItemText>
                    <Typography variant="body2" color="primary.main">
                        {todos.length}
                    </Typography>
                </MenuItem>
                <Divider/>
                <MenuItem onClick={showImportantTodos} sx={{ mt: 1 }}>
                    <ListItemIcon sx={{ color: 'primary.main'}}>
                        <StarIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Важные</ListItemText>
                    <Typography variant="body2" color="primary.main">
                        {importantTodosLength}
                    </Typography>
                </MenuItem>
                <MenuItem onClick={showDoneTodos} sx={{ mt: 1, mb: 1 }}>
                    <ListItemIcon sx={{ color: 'primary.main'}}>
                        <CheckBoxIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Выполненные</ListItemText>
                    <Typography variant="body2" color="primary.main">
                        {doneTodosLength}
                    </Typography>
                </MenuItem>
            </MenuList>
            <Divider/>
        </Paper>
    )
}

export default AppSidebarMenu;