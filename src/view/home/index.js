import React, { useEffect, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Menu from '../../components/menu';
import api from '../../api'
import './home.css';
import moment from 'moment';

function Home() {
    moment.locale('pt-BR')
    const [item, setItem] = useState([]);
    const [pesquisa, setPesquisa] = useState('');
    let listaItens = [];

    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);

    //tem que ajeitar isso//
    function pesquisar(pesquisa){
        api.get(`/computadores-todos`)
            .then(async (response) => {
                console.log(response.data.length)
                await response.data.forEach(doc => {
                    if(doc.patrimonio.indexOf(pesquisa) >= 0)
                        {
                            listaItens.push({
                                id: doc.id,
                                ...doc
                        })
                    }else if(doc.localizacao.indexOf(pesquisa) >= 0)
                    {
                        listaItens.push({
                            id: doc.id,
                            ...doc
                        })
                    }else if(doc.marca.indexOf(pesquisa) >= 0)
                    {
                        listaItens.push({
                            id: doc.id,
                            ...doc
                        })
                    }
                })
                setItem(listaItens)
            })
        }

    function loadData() {
        api.get(`/manutencoes/${page}/${limit}`)
        .then(async (response) => {
            await response.data.forEach(doc => {
                listaItens.push({
                    id: doc.id,
                    ...doc
                })
            })
            setItem(listaItens)
        })
    }

    function nextPage() {
        setPage(page + 1)
    }

    function prevPage() {
        setPage(page - 1)
    }

    
    
    useEffect(() => {
        try {
            loadData()
        } catch(err) {
            alert(err)
        }
              
    },[pesquisa, page, limit]) 

    return(
        <>

        <Menu />

        <div className="row p-2">
            <div className="col-md-m mr-auto ml-3">
            <h1>CATI</h1>
                <select class="custom-select" onChange={(e) => setLimit(e.target.value)}>
                    <option value="10" selected disabled>Quantidade de Resultados...</option>
                    <option value="10">10</option>
                    <option value="20">20</option>
                    <option value="20">50</option>
                    <option value="20">100</option>
                    <option value="20">200</option>
                </select>
            </div>
            <form class="form-inline my-2 my-lg-0">
                <input onChange={(e) => setPesquisa(e.target.value)} type="text" className="form-control mr-sm-2" placeholder="Pesquisar Equipamento"/>
                <button onClick={() => pesquisar(pesquisa)} type="button" className="btn btn-outline-success my-2 my-sm-0 mr-5">Pesquisar</button>
            </form>
        </div>
        <div className="col-md-12 mx-auto">
            <table className="table table-striped table-hover table-bordered table-responsive-md font-weight-bold mt-3">
            <thead className="thead-dark">
                <tr>
                <th scope="col">Chamado</th>
                <th scope="col">Tipo</th>
                <th scope="col">Status</th>
                <th scope="col">Técnico</th>
                <th scope="col">Defeito</th>
                <th scope="col">Data de Entrada</th>
                <th scope="col">Detalhes</th>
                </tr>
            </thead>
            <tbody>
            {item.map(item =>
            <tr key={item.id} >
                <td>{item.chamado}</td>
                <td>{item.tipo}</td>
                <td>{item.status}</td>
                <td>{item.responsavel}</td>
                <td>{item.defeito}</td>
                <td>{moment(item.data_inicio).format('DD/MM/YYYY')}</td>
                <td><Link type="button" className="btn btn-success" to={'/detalhes-computador'}>+ Detalhes</Link></td>
            </tr>)}
            </tbody>
        </table>
        </div>        
        <div class="row font-weight-bold">
            <div class="col-md-2 mx-auto">
                <nav aria-label="Page navigation example">
                    <ul className="pagination mx-auto">
                        <li className={page >= 2 ? "page-item" : "page-item disabled"}><a className="page-link" onClick={() => prevPage()} >Anterior</a></li>
                        <li className="page-item"><a className="page-link">...</a></li>
                        <li className={item.length < limit ? "page-item disabled" : "page-item"}><a className="page-link" onClick={() => nextPage()} >Próximo</a></li>
                    </ul>
                </nav>
            </div>
        </div>
        {
            useSelector(state => state.usuarioLogado) === 0 && <Redirect to="/" />
        } 
        </>
    )
}

export default Home;