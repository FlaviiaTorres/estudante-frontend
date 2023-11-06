import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Container ,Paper,Button} from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
     
    },
  },
}));

export default function Student() {
    const paperStyle={padding:'50px 20px', width:600,margin:"20px auto"}
    const[name,setName]=useState('')
    const[address,setAddress]=useState('')
    const[telephone,setTelephone]=useState('')
    const[email,setEmail]=useState('')
    const[cpf,setCpf]=useState('')
    const[students,setStudents]=useState([])
    const classes = useStyles();

    
  
  const handleClick=(e)=>{
    e.preventDefault()
    const student={name,address,telephone,email,cpf}
    console.log(student)
    fetch("http://localhost:8080/student/add",{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify(student)

  }).then(()=>{
    console.log("Novo estudante salvo")
  })
}

useEffect(()=>{
  fetch("http://localhost:8080/student/getAll")
  .then(res=>res.json())
  .then((result)=>{
    setStudents(result);
  }
)
},[])
  return (

    <Container>
        <Paper elevation={3} style={paperStyle}>
            <h1 style={{color:"Purple"}}><u>Cadastro de aluno</u></h1>

    <form className={classes.root} noValidate autoComplete="off">
    
      <TextField id="outlined-basic" label="Nome do estudante:" variant="outlined" fullWidth 
      value={name}
      onChange={(e)=>setName(e.target.value)}
      />
      <TextField id="outlined-basic" label="Endereço:" variant="outlined" fullWidth
      value={address}
      onChange={(e)=>setAddress(e.target.value)}
      />
      <TextField id="outlined-basic" label="Telefone:" variant="outlined" fullWidth
      value={telephone}
      onChange={(e)=>setTelephone(e.target.value)}
      />
      <TextField id="outlined-basic" label="Email:" variant="outlined" fullWidth
      value={email}
      onChange={(e)=>setEmail(e.target.value)}
      />
      <TextField id="outlined-basic" label="CPF:" variant="outlined" fullWidth
      value={cpf}
      onChange={(e)=>setCpf(e.target.value)}
      />

      <Button variant="contained" color="secondary" onClick={handleClick}>
  Salvar
</Button>
    </form>
   
    </Paper>
    <h1>Students</h1>

    <Paper elevation={3} style={paperStyle}>

      {students.map(student=>(
        <Paper elevation={6} style={{margin:"10px",padding:"15px", textAlign:"left"}} key={student.id}>
         Id:{student.id}<br/>
         Name:{student.name}<br/>
         Address:{student.address}

        </Paper>
      ))
}


    </Paper>



    </Container>
  );
}