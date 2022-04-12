import React, {useState} from 'react'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import TextField from '@mui/material/TextField';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import { FormControlLabel } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const style = {
  field: {
    marginTop: 3,
    marginBottom: 3,
    display: 'block'
  }
}

export default function Create() {
  const history = useHistory()
  const [title, setTitle] = useState('')
  const [details, setDetails] = useState('')
  const [titleError, setTitleError] = useState(false)
  const [detailsError, setDetailsError] = useState(false)
  const [category, setCategory] = useState('todos')

  const handleSubmit = (e) => {
    e.preventDefault()
    setTitleError(false)
    setDetailsError(false)

    if (title === '') {
      setTitleError(true)
    }

    if (details === '') {
      setDetailsError(true)
    }

    if (title && details) {
      fetch('http://localhost:8000/notes', {
        method: 'POST',
        headers: {"Content-type": "application/json"},
        body: JSON.stringify({ title, details, category })
      }).then(() => history.push('/'))
    }
  }

  return (
    <Container>
      <Typography
        variant='h6'
        color="textSecondary"
        component="h2"
        gutterBottom
      >
        Create a New Note
      </Typography>

      <form noValidate autoComplete='off' onSubmit={handleSubmit}>
        <TextField 
          onChange={(e) => setTitle(e.target.value)}
          sx = {style.field}
          label="Note Title"
          color="secondary"
          fullWidth
          required
          error={titleError}
        />
        <TextField 
          onChange={(e) => setDetails(e.target.value)}
          sx = {style.field}
          label="Details"
          color="secondary"
          multiline
          rows={4}
          fullWidth
          required
          error={detailsError}
        />
        
        <FormControl sx={style.field}>
          <FormLabel>Note Category</FormLabel>
          <RadioGroup value={category} onChange={(e) => setCategory(e.target.value)}>
            <FormControlLabel value="money" control={<Radio color="secondary"/>} label="Money" />
            <FormControlLabel value="todos" control={<Radio color="secondary"/>} label="Todos" />
            <FormControlLabel value="reminders" control={<Radio color="secondary"/>} label="Reminders" />
            <FormControlLabel value="work" control={<Radio color="secondary"/>} label="Work" />
          </RadioGroup>
        </FormControl>

      <Button
        type='submit'
        color='secondary'
        variant='contained'
        endIcon={<KeyboardArrowRightIcon />}
      >
        Submit
      </Button>
      </form>
    </Container>
  )
}
