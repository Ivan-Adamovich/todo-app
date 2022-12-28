import { useState } from 'react';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';

interface AddTaskFolderProps {
    addNewFolder(titleFolder: string): void
}

const AddTaskFolder: React.FC<AddTaskFolderProps> = ({addNewFolder}) =>{
    const [titleFolder, setTitleFolder] = useState<string>('')

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTitleFolder(event.target.value)
    }

    const handleDownEnter = (event: React.KeyboardEvent) => {
        if(event.key === 'Enter' && titleFolder.length >= 1){
            addNewFolder(titleFolder)
            setTitleFolder('')
        }
    }

    const handleMouseEnter = () => {
        if(titleFolder.length >= 1){
            addNewFolder(titleFolder)
            setTitleFolder('')
        }
    }


    return(
        <Paper sx={{bgcolor: 'background.paper', width: '100%', boxShadow: 'none', mt: '16px' }}>
            <div style={{width: '90%' , margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                <TextField 
                    value={titleFolder}
                    onChange={handleChange}
                    onKeyDown={handleDownEnter}
                    id="outlined-basic" 
                    label="Добавить папку" 
                    variant="outlined" 
                    size="small"
                    color="primary"
                    sx={{width: '50%'}}/>
                <Button
                    onClick={handleMouseEnter} 
                    variant="outlined" 
                    size='small'
                    color='primary'>
                        <AddIcon fontSize="small" sx={{mr: 1, color: 'primary.main'}}/>
                        Добавить
                </Button>
            </div>
        </Paper>
    )
}

export default AddTaskFolder;