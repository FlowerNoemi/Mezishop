import React, { useState, useEffect} from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import {getAllMessage} from '../api/getmessage';
import './message.css';



const Message = () => {
  const [messages, setMessages] = useState(['']);


  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      background: 'rgb(239,165,65)',
      color: 'black',
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 13,
    },
  }));
  
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 1,
    },
  }));
  
  
  const allMessage = async () => {
    try {
      const MessageRequest = await  getAllMessage();
      console.log(MessageRequest)
      setMessages(MessageRequest);
      
      } catch(e) {
      console.log('error message : ', e);
      }
  };

  useEffect(() => {
    
    allMessage();    
} , [] 
);



  return (
    <>
     

    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 , marginTop:5 }} aria-label="customized table">
        <TableHead>
          <TableRow>

            <StyledTableCell align="center">id</StyledTableCell>
            <StyledTableCell align="center">Dátum</StyledTableCell>
            <StyledTableCell align="center">Email cím</StyledTableCell>
            <StyledTableCell align="center">Üzenet</StyledTableCell>

        
          </TableRow>
        </TableHead>
        <TableBody>
        {messages.map((message, id) => (
            <StyledTableRow key={id}>
              <StyledTableCell component="th" scope="row" >
                {message.id}
              </StyledTableCell>
              <StyledTableCell align="center" >{message.date}</StyledTableCell>
              <StyledTableCell align="center" >{message.email}</StyledTableCell>
              <StyledTableCell align="center">{message.message}</StyledTableCell>
              
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    <Stack spacing={2} direction="row">
        <Button className='btnadmin' variant="contained" onClick={() => allMessage()} sx={{ margin:2 }}>Frissít</Button>
    </Stack>
    </>
  );
}


export default Message;