//interface
import { Todo } from '../Interfaces/TodoInterface';
//my components
import AlertDontHaveTask from './AlertDontHaveTask';
//mui components
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
//icons
import ClearIcon from '@mui/icons-material/Clear';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

interface TaskListProps {
  showTodos: Todo[],
  toggleDoneTodo(id: number): void,
  toggleImportantTodo(id: number): void,
  deleteTodo(id: number): void,
  header: string
}

const TaskList: React.FC<TaskListProps> = ({
    showTodos, 
    toggleDoneTodo, 
    toggleImportantTodo, 
    deleteTodo,
    header
  }) => {

  const deleteHandler = (event: React.MouseEvent, id: number) => {
    event?.stopPropagation()
    deleteTodo(id)
  }  

  if(showTodos.length < 1){
    return (
      <AlertDontHaveTask header={header}/>
    );
  } else {
    return (
      <List>
        {showTodos.map((todo) => {
          return (
          <ListItem key={todo.id} sx={{bgcolor: 'background.paper', mb: 1}}>
              <IconButton 
                onClick={() => toggleDoneTodo(todo.id)} 
                edge="end" 
                aria-label="done" 
                sx={{mr: 1}}>
                {todo.done === true ? 
                  <CheckBoxIcon sx={{color: 'primary.main'}}/> :
                  <CheckBoxOutlineBlankIcon sx={{color: 'primary.main'}}/>}
              </IconButton>
              {todo.done === true ? 
                  <ListItemText primary={todo.title} sx={{textDecoration: 'line-through'}}/> :
                  <ListItemText primary={todo.title}/>}
              <Typography sx={{color: 'text.disabled', mr: 2}}>
                {todo.folder}
              </Typography>
              <IconButton 
                onClick={() => toggleImportantTodo(todo.id)} 
                edge="end" 
                aria-label="important" 
                sx={{mr: 1}}>
              {todo.important === true ? 
                <StarIcon sx={{color: 'primary.main'}}/> :
                <StarBorderIcon sx={{color: 'primary.main'}}/>}
              </IconButton>
              <IconButton 
                onClick={(event) => deleteHandler(event, todo.id)} 
                edge="end" 
                aria-label="delete" 
                sx={{mr: 1}}>
                  <ClearIcon sx={{color: 'primary.main'}}/>
              </IconButton>
            </ListItem>
          );
        })}
      </List>
    )
  }
}

export default TaskList;