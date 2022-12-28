import {useState} from 'react';

import { Folder } from '../Interfaces/FolderInterface';

import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

interface FolderSelectButtonProps {
    folders: Folder[],
    toggleFolder(folderTitle: string): void
}

const FolderSelectButton: React.FC<FolderSelectButtonProps> = ({folders, toggleFolder}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleFolderSelect = (folderTitle: string) => {
    toggleFolder(folderTitle)
    handleClose()
  }

  return (
    <div>
      {folders.length >= 1 ? 
      <Button
        id="basic-button"
        variant="outlined" 
        size='small'
        color='primary'
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}>
        Добавить в папку : 
      </Button> : null}
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        {folders.map((folder) => {
            return(
                <MenuItem key={folder.title} onClick={() => handleFolderSelect(folder.title)}>{folder.title}</MenuItem>
            )
        })}
      </Menu>
    </div>
  );
}

export default FolderSelectButton;