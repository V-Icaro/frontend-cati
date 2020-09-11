import React, { useState } from 'react'
import Menu from '../../../components/menu';
import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import api from '../../../api'

function NovoComputador() {

    const [patrimonio, setPatrimonio] = useState('')
    const [marca, setMarca] = useState('')
    const [modelo, setModelo] = useState('')
    const [numero_serie, setNS] = useState('')
    const [status, setStatus] = useState('')
    const [unidade, setUnidade] = useState('')
    const [localizacao, setLocalizacao] = useState('')

    function verificar() {
        if(patrimonio === ''){
            return alert('Preencha todos os campos para concluir o cadastro')
        } else if(marca === ''){
            return alert('Preencha todos os campos para concluir o cadastro')
        } else if(modelo === ''){
            return alert('Preencha todos os campos para concluir o cadastro')
        } else if(numero_serie === ''){
            return alert('Preencha todos os campos para concluir o cadastro')
        } else if(unidade === ''){
            return alert('Preencha todos os campos para concluir o cadastro')
        } else if(localizacao === ''){
            return alert('Preencha todos os campos para concluir o cadastro')
        } else {
            cadastrar()
        }
    }

    function cadastrar() {
        const dados = {
            patrimonio : patrimonio.toUpperCase(),
            marca : marca.toUpperCase(),
            modelo : modelo.toUpperCase(),
            numero_serie : numero_serie.toUpperCase(),
            status : 'Disponivel',
            unidade : unidade.toUpperCase(),
            localizacao : localizacao.toUpperCase()
        }

            api.post('/computadores-novo', dados)
            .then(async (response) => {
                alert('Cadastrado com sucesso!!')
                console.log(response)
            }) .catch((error) => {
                alert(error.response.data)
            })
        
    }

    return(
        <>
        <Menu />

        {
            useSelector(state => state.usuarioLogado) === 0 && <Redirect to="/" />
        }

        <h1 className="text-center mt-3 font-weight-bold">Cadastrar Computador</h1>
        <div className="content border font-weight-bold col-md-6 mx-auto mt-5 p-5">
            <div className="row border font-weight-bold p-2">
                <div className="col-md-6">
                    Patrimônio:
                    <br></br>
                    <input 
                        name="patrimonio"
                        onChange={(e) => setPatrimonio(e.target.value)}
                    />
                </div>
                <div className="col-md-6">
                    Marca:
                    <br></br>
                    <input 
                        name="marca"
                        onChange={(e) => setMarca(e.target.value)}
                    />
                </div>
            </div>
            <div className="row border font-weight-bold p-2 mt-3">
                <div className="col-md-6">
                    Modelo:
                    <br></br>
                    <input 
                       name="modelo"
                       onChange={(e) => setModelo(e.target.value)}
                    />
                </div>
                <div className="col-md-6">
                    Numero Série:
                    <br></br>
                    <input 
                       name="numero_serie"
                       onChange={(e) => setNS(e.target.value)}
                    />
                </div>
            </div>
            <div className="row border font-weight-bold p-2 mt-3">
                <div className="col-md-6">
                    Unidade:
                    <br></br>
                    <input 
                       name="unidade"
                       onChange={(e) => setUnidade(e.target.value)}
                    />
                </div>
                <div className="col-md-6">
                    Localização:
                    <br></br>
                    <input 
                       name="localizacao"
                       onChange={(e) => setLocalizacao(e.target.value)}
                    />
                </div>
            </div>
            <div className="row mt-5">
                <button onClick={() => verificar()} type="button" className="col-md-4 btn btn-dark mx-auto">Cadastrar</button>
            </div>
        </div>
        </>
    )
}

export default NovoComputador