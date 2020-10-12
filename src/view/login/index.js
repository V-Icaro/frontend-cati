import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';

import './login.css';
import api from '../../api';
import { useForm } from 'react-hook-form';

import { useSelector, useDispatch } from 'react-redux';


import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { makeStyles } from '@material-ui/core/styles';

import { Avatar, Button, CssBaseline, TextField, Link, Box, Typography, Container } from '@material-ui/core'

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
                Your Website
        </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
        height: '300px',
        width: '300px'
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
        marginTop: '30px'
    },
}));

function Login() {

    const classes = useStyles();

    console.log('passei aqui')
    const [msg, setMsg] = useState('');

    const dispatch = useDispatch();

    const { register, errors, handleSubmit } = useForm();

    async function onSubmit(data) {
        try {
            const response = await api.post('logon', { data })
            setMsg('sucesso')
            setTimeout(() => {
                dispatch({ type: 'LOG_IN', usuarioNome: response.data.nome, usuarioId: response.data.id, usuarioControle: response.data.controle });
            }, 1000)
            console.log(response.data)
            alert('sucesso');
        } catch (err) {
            setMsg('erro')
        }
    };

    return (
        <>


            {
                useSelector(state => state.usuarioLogado) > 0 ? <Redirect to="/home" /> : null
            }

            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon style={{ fontSize: 100}} />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Login
                    </Typography>
                    <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            inputRef={register({ required: true})}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="senha"
                            label="Senha"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            inputRef={register({ required: true})}
                        />
                        
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            Entrar
                        </Button>
                        
                        <p>{msg === 'sucesso' && 'Logado com sucesso'}</p>
                        <p>{msg === 'erro' && 'Falha ao conectar'}</p>
                    </form>
                </div>
                <Box mt={8}>
                    <Copyright />
                </Box>
            </Container>
        </>
    )
}

export default Login