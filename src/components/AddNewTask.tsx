import {useState} from 'react';

import { Folder } from '../Interfaces/FolderInterface';
import FolderSelectButton from './FolderSelectButton';

import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import ClearIcon from '@mui/icons-material/Clear';

interface AddNewTaskProps {
    addNewTodo(title: string, important: boolean, folderTitle: string): void,
    folders: Folder[],
}

const AddNewTask: React.FC<AddNewTaskProps> = ({addNewTodo, folders}) =>{
    const [title, setTitle] = useState<string>('')
    const [important, setInportant] = useState<boolean>(false)
    const [folderTitle, setFolderTitle] = useState<string>('')

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value)
    }

    const handleDownEnter = (event: React.KeyboardEvent) => {
        if(event.key === 'Enter' && title.length >= 1){
            addNewTodo(title, important, folderTitle)
            setTitle('')
            setInportant(false)
            setFolderTitle('')
        }
    }

    const handleMouseEnter = () => {
        if(title.length >= 1){
            addNewTodo(title, important, folderTitle)
            setTitle('')
            setInportant(false)
            setFolderTitle('')
        }
    }

    const toggleNewImportant = () => {
        setInportant(prev => !prev)
    }

    const toggleFolder = (folderTitle: string) => {
        setFolderTitle(folderTitle)
    }

    const clearFolder = () => {
        setFolderTitle('')
    }

    return(
        <Box sx={{width: '100%', bgcolor: 'background.paper', pt: '16px', pb: '16px', mb: '16px'}}>
            <div style={{width: '97%' , margin: '0 auto'}}>
                <TextField 
                    value={title}
                    onChange={handleChange}
                    onKeyDown={handleDownEnter}
                    id="outlined-basic" 
                    label="Добавить задачу" 
                    variant="outlined" 
                    size="small"
                    color="primary"
                    sx={{width: '100%'}}/>
            </div>
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '16px'}}>
                    <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                                    <Button 
                                        onClick={toggleNewImportant}
                                        variant="outlined" 
                                        size='small'
                                        color='primary'
                                        sx={{mr: 2, ml: 2}}>
                                            {important === true ? 
                                            <StarIcon fontSize="small" sx={{mr: 1, color: 'primary.main'}}/> :
                                            <StarBorderIcon fontSize="small" sx={{mr: 1, color: 'primary.main'}}/>}
                                            Важно
                                    </Button>
                                    <FolderSelectButton folders={folders} toggleFolder={toggleFolder}/>
                                    {folderTitle !== '' ? 
                                    <div style={{display: 'flex', alignItems: 'center'}}>
                                        <ClearIcon fontSize="small" sx={{color: 'primary.main', ml: 2}} onClick={() => clearFolder()}/>
                                        <Typography variant='body1' sx={{color: 'primary.main'}}>{folderTitle}</Typography>
                                    </div>  
                                : null }
                    </div>
                    <Button 
                        onClick={handleMouseEnter} 
                        variant="contained" 
                        size='medium'
                        color='primary'
                        sx={{mr: 2, boxShadow: 'none'}}>
                            Добавить задачу
                    </Button>
            </div>
        </Box>
    )
}

export default AddNewTask;