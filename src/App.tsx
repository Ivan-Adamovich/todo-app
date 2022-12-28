//react
import {useState, useEffect} from 'react';
//interface
import { Todo } from './Interfaces/TodoInterface';
import { Folder } from './Interfaces/FolderInterface';
//my components
import AppNav from './components/AppNav';
import AppSidebarMenu from './components/AppSidebarMenu';
import TaskList from './components/TaskList';
import TaskListHeader from './components/TaskListHeader';
import AddNewTask from './components/AddNewTask';
import AddTaskFolder from './components/AddTaskFolder';
import TaskFolders from './components/TaskFolders';
//mui components
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

const App: React.FC = () => {
  // tasklist height
  const windowHeight = document.documentElement.clientHeight
  //menu
  const [showMenu, setShowMenu] = useState<boolean>(false)
  //todos
  const [folders, setFolders] = useState<Folder[]>([])
  const [todos, setTodos] = useState<Todo[]>([])
  const [showTodos, setShowTodos] = useState<Todo[]>([])
  //mode
  const [sortMode, setSortMode] = useState<string>('Alphabet')
  const [header, setHeader] = useState<string>('All')
  const [activeFolderTitle, setActiveFolderTitle] = useState<string>('')
  //download
  const [init, setInit] = useState<boolean>(false)
  const [initDone, setInitDone] = useState<boolean>(false)
  

  useEffect(() => {
    let storeTodos = JSON.parse(localStorage.getItem('todos') || '[]') as Todo[]
    let storeFolders = JSON.parse(localStorage.getItem('folders') || '[]') as Folder[]
    setTodos(storeTodos.sort((a, b) => a.id < b.id ? 1 : - 1))
    setFolders(storeFolders)
    setInit(true)
  },[])
 
  useEffect(() => {
    if(init){
      localStorage.setItem('todos', JSON.stringify(todos))
      localStorage.setItem('folders', JSON.stringify(folders))
      if(header === 'Complited'){
        setShowTodos(todos)
        showDoneTodos()
      } else if (header === 'Important'){
        setShowTodos(todos)
        showImportantTodos()
      } else if (header === 'Folder'){
        setShowTodos(todos)
        showTodosInFolder(activeFolderTitle)
      } else {
        setShowTodos(todos)
      } 
      setInitDone(true)
    }
  },[todos, folders, sortMode])

  const addNewTodo = (title: string, important: boolean, folderTitle: string) => {
    const newTodo: Todo = { 
      id: Date.now(), 
      title: title,
      done: false, 
      important: important,
      folder: folderTitle
    }
    setTodos(prev => [newTodo, ...prev])
    setShowTodos(todos)
    setHeader('All')
  }

  const toggleDoneTodo = (id: number) => {
    setTodos(prev => 
      prev.map(todo => {
        if(todo.id === id){
          todo.done = !todo.done
        }
        return todo
    }))
  }

  const toggleImportantTodo = (id: number) => {
    setTodos(prev => 
      prev.map(todo => {
        if(todo.id === id){
          todo.important = !todo.important
        }
        return todo
    }))
  }

  const deleteTodo = (id: number) => {
    const shoudRemove = window.confirm('Вы уверены, что хотите удалить задачу?');
    if(shoudRemove){
      setTodos(prev => prev.filter(todo => todo.id !== id))
    } else {
      return
    }
  }

  const toggleSortMode = () => {
    if(sortMode === 'Alphabet') {
      setSortMode('Date')
      hendleSortTodos()
    } else {
      setSortMode('Alphabet')
      hendleSortTodos()
    } 
  }

  const hendleSortTodos = () => {
    if(sortMode === 'Alphabet'){
      todos.sort((a, b) => a.title.toLowerCase() > b.title.toLowerCase() ? 1 : - 1)
    } else if (sortMode === 'Date') {
      todos.sort((a, b) => a.id < b.id ? 1 : - 1)
    } else {
      return
    }
  }

  const showAllTodos = () => {
    setActiveFolderTitle('')
    setShowTodos(todos)
    setHeader('All')
  }

  const showDoneTodos = () => {
    setActiveFolderTitle('')
    setHeader('Complited')
    setShowTodos(todos.filter(todo => todo.done === true))
  }

  const showImportantTodos = () => {
    setActiveFolderTitle('')
    setHeader('Important')
    setShowTodos(todos.filter(todo => todo.important === true))
  }

  const showTodosInFolder = (folderTitle: string) => {
    setActiveFolderTitle(folderTitle)
    setHeader('Folder')
    setShowTodos(todos.filter(todo => todo.folder === folderTitle))
  }

  const showSearchTodos = (searchValue: string) => {
    if(searchValue === '' && header === 'All'){
      setShowTodos(todos)
    } else if (searchValue === '' && header === 'Complited'){
      setShowTodos(todos)
      showDoneTodos()
    } else if (searchValue === '' && header === 'Important'){
      setShowTodos(todos)
      showImportantTodos()
    } else if (searchValue === '' && header === 'Folder'){
      setShowTodos(todos)
      showImportantTodos()
      showTodosInFolder(activeFolderTitle)
    } else {
      setShowTodos(prev => prev.filter(todo => todo.title.toLowerCase().indexOf(searchValue.toLowerCase()) !== -1))
    }
  }

  const addNewFolder = (titleFolder: string) => {
    const newFolder: Folder = { 
      id: Date.now(), 
      title: titleFolder,
      todos: []
    }
    setFolders(prev => [newFolder, ...prev])
  }

  const deleteFolder = (id: number, titleFolder: string) => {
    const folderDeleteAlert = window.confirm(`Вы уверены, что хотите удалить папку ${titleFolder}?`)
    if(folderDeleteAlert){
      if(header === 'Folder' && activeFolderTitle === titleFolder){
        setActiveFolderTitle('')
        setShowTodos(todos)
        setHeader('All')
      }
      setFolders(prev => prev.filter(folder => folder.id !== id))
      setTodos(prev => prev.filter(todo => todo.folder !== titleFolder))
    }
    return
  }

  const toggleShowMenu = () => {
    setShowMenu(prev => !prev)
  }

  let doneTodosLength = todos.filter(todo => todo.done === true).length
  let importantTodosLength = todos.filter(todo => todo.important === true).length

  return (
      <div className='App' style={{minHeight: `${windowHeight}px`}}>
        <AppNav 
        showMenu={showMenu}
        toggleShowMenu={toggleShowMenu}/>
          <div style={{display: 'flex', alignItems: 'start', justifyContent: 'space-between'}}>
            <div className='AppSidebarMenu' style={{display: 'block', width: `${showMenu ? 25 : 0}%`, backgroundColor: '#fff'}}>
              { showMenu ? 
              <div>
                <AppSidebarMenu 
                todos={todos}
                doneTodosLength={doneTodosLength}
                importantTodosLength={importantTodosLength}
                showAllTodos={showAllTodos}
                showDoneTodos={showDoneTodos}
                showImportantTodos={showImportantTodos} />
                <AddTaskFolder addNewFolder={addNewFolder}/>
                <TaskFolders 
                  deleteFolder={deleteFolder} 
                  folders={folders}
                  showTodosInFolder={showTodosInFolder}/>
              </div> 
              : null }
            </div>
            <div className='AppReightContent' style={{display: 'inline-block', width: `${showMenu ? 75 : 100}%`}}>
              <Container>
                <div className='TaskListHeader' style={{height: '32px', paddingTop: '16px', paddingBottom: '16px'}}>
                  <TaskListHeader 
                    showSearchTodos={showSearchTodos}
                    showTodos={showTodos}
                    header={header}
                    toggleSortMode={toggleSortMode}
                    activeFolderTitle={activeFolderTitle}/>
                </div>
                { header !== 'All' ? null : <AddNewTask addNewTodo={addNewTodo} folders={folders}/> }
                <div className='TaskList'>
                  { initDone ? 
                  <TaskList 
                    header={header}
                    showTodos={showTodos}
                    toggleDoneTodo={toggleDoneTodo}
                    toggleImportantTodo={toggleImportantTodo}
                    deleteTodo={deleteTodo}/> 
                    : <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                        <CircularProgress />
                      </Box> }
                </div>
              </Container>
            </div>
          </div>
      </div>
  );
}

export default App;