import React from 'react'
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import { Avatar, IconButton, Typography } from '@mui/material';
import { DeleteOutlined } from '@mui/icons-material';
import { makeStyles } from '@mui/styles';
import { blue, green, pink, yellow } from '@mui/material/colors';
import MapImage from './MapImage';



const useStyles = makeStyles({

})

export default function NoteCard({ note, handleDelete }) {
    const classes = useStyles(note)
  return (
    <div>
        <Card elevation={1}>
            <CardHeader 
                avatar = {
                    <Avatar 
                        sx={{backgroundColor: note.category == "work" ? yellow[700] : note.category == "money" ? green[500] : note.category == "todos" ? pink[500] : blue[500]}}  
                    >
                        {note.category[0].toUpperCase()}
                    </Avatar>
                }
                action={
                    <IconButton onClick={() => handleDelete(note.id)}>
                        <DeleteOutlined />
                    </IconButton>
                }
                title={note.title}
                subheader={note.category}
            />
            <CardContent>
                <Typography variant="body2" color="textSecondary">
                    {note.details}
                </Typography>
            </CardContent>
        </Card>
    </div>
  )
}
