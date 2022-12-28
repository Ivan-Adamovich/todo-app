import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

interface AlertDontHaveTaskProps {
  header: string
}

const AlertDontHaveTask: React.FC<AlertDontHaveTaskProps> = ({header}) => {
  if(header === 'Complited'){
    return (
      <Stack sx={{width: '100%'}} spacing={2}>
        <Alert severity="info">В настоящий момент у вас нет выполненных задач</Alert>
      </Stack>
    );
  } else if (header === 'Important'){
    return (
      <Stack sx={{width: '100%'}} spacing={2}>
        <Alert severity="info">В настоящий момент у вас нет важных задач</Alert>
      </Stack>
    )
  } else if (header === 'Folder'){
    return (
      <Stack sx={{width: '100%'}} spacing={2}>
        <Alert severity="info">В настоящий момент у вас нет задач в этой папке</Alert>
      </Stack>
    )
  } else {
    return (
      <Stack sx={{width: '100%'}} spacing={2}>
        <Alert severity="info">В настоящий момент у вас нет задач</Alert>
      </Stack>
    )
  }

}

export default AlertDontHaveTask;