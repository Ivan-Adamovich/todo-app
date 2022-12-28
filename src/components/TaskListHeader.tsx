//interface
import { Todo } from '../Interfaces/TodoInterface';
//mui components
import { Typography, TextField, Button } from '@mui/material';
//mui icons
import AssignmentIcon from '@mui/icons-material/Assignment';
import StarIcon from '@mui/icons-material/Star';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import SearchIcon from '@mui/icons-material/Search';
import UnfoldMoreIcon from '@mui/icons-material/UnfoldMore';

interface TaskListHeaderProp {
    showTodos: Todo[],
    showSearchTodos(searchValue: string): void,
    header: string,
    activeFolderTitle: string,
    toggleSortMode(): void
}

const TaskListHeader: React.FC<TaskListHeaderProp> = ({
    header, 
    showTodos, 
    showSearchTodos, 
    toggleSortMode,
    activeFolderTitle
}) => {

    const handleValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        showSearchTodos(event.target.value)
    }

    const returnHeaderTitle = () => {
        if(header === 'Complited'){
            return(
                <>
                    <CheckBoxIcon sx={{ color: 'primary.main', fontSize: 32 , mr: 1 }}/>
                    <Typography variant="h5">Выполненные задачи: {showTodos.length}</Typography>
                </>
            )
        } else if (header === 'Important'){
            return(
                <>
                    <StarIcon sx={{ color: 'primary.main', fontSize: 32 , mr: 1 }}/>
                    <Typography variant="h5">Важные задачи: {showTodos.length}</Typography>
                </>
                
            )
        } else if (header === 'Folder'){
            return(
                <>
                    <StarIcon sx={{ color: 'primary.main', fontSize: 32 , mr: 1 }}/>
                    <Typography variant="h5">Задачи в папке {activeFolderTitle}: {showTodos.length}</Typography>
                </>
                
            )
        } else {
            return (
                <>
                    <AssignmentIcon sx={{ color: 'primary.main', fontSize: 32 , mr: 1 }}/>
                    <Typography variant="h5">Все задачи: {showTodos.length}</Typography>
                </>
            )
        }
        
    }

    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
            <div style={{ display: 'flex', alignItems: 'center', width: '60%' }}>
                {returnHeaderTitle()}
                {showTodos.length < 2 ? null :
                <Button
                    id="fade-button"
                    variant="outlined" 
                    size="small"
                    color="primary"
                    onClick={toggleSortMode}
                    sx={{ml: 2}}>
                        Сортировать
                        <UnfoldMoreIcon fontSize='small' sx={{ml: 1}}/>
                </Button>}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', width: '40%'}}>
                <SearchIcon sx={{ color: 'primary.main' }}/>
                <TextField 
                    onChange={handleValueChange}
                    id="outlined-basic" 
                    label="Поиск" 
                    variant="outlined" 
                    size="small"
                    color="primary"
                    sx={{ ml: 1, width: '100%', bgcolor: '#fff' }}/>
            </div>
        </div>
    )
}

export default TaskListHeader;