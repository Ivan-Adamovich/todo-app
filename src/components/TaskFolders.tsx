import { Folder } from '../Interfaces/FolderInterface';

import React from 'react';
import Paper from '@mui/material/Paper';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import FolderIcon from '@mui/icons-material/Folder';
import IconButton from '@mui/material/IconButton';
import ClearIcon from '@mui/icons-material/Clear';

interface TaskFoldersProps {
    folders: Folder[],
    deleteFolder(id: number, title: string): void,
    showTodosInFolder(titleFolder: string): void
}

const TaskFolders: React.FC<TaskFoldersProps> = ({folders, deleteFolder, showTodosInFolder}) =>{
    const deleteHandler = (event: React.MouseEvent, id: number, title: string) => {
        event?.stopPropagation()
        deleteFolder(id, title)
    } 

    return(
        <Paper sx={{ width: '100%', boxShadow: 'none' }}>
            <MenuList>
                {folders.map((folder) =>{
                    return(
                        <MenuItem 
                            key={folder.title} 
                            sx={{ mb: 1, pt: '2px', pb: '2px'}}
                            onClick={() => showTodosInFolder(folder.title)}>
                            <ListItemIcon>
                                <FolderIcon fontSize="small" sx={{ color: 'primary.main'}}/>
                            </ListItemIcon>
                            <ListItemText>{folder.title}</ListItemText>
                            <IconButton 
                                onClick={(event) => deleteHandler(event, folder.id, folder.title)} 
                                edge="end" 
                                aria-label="delete" 
                                sx={{ml: 2}}>
                                <ClearIcon fontSize="small" sx={{color: 'primary.main'}}/>
                            </IconButton>
                        </MenuItem>
                    )
                })}
                
            </MenuList>
        </Paper>
    )
}

export default TaskFolders;