import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Menu from '../../components/menu';
import Pagination from '../../components/pagination';
import api from '../../api'
import './computadores.css';

function Computadores() {



    //dados para buscar computador e atualizar computador
    const [id, setId] = useState('')
    const [patrimonio, setPatrimonio] = useState('')
    const [marca, setMarca] = useState('')
    const [modelo, setModelo] = useState('')
    const [numero_serie, setNS] = useState('')
    const [status, setStatus] = useState('')
    const [unidade, setUnidade] = useState('')
    const [localizacao, setLocalizacao] = useState('')

    //dados para dar entrada em manutenção
    const [chamado, setChamado] = useState()
    const [defeito, setDefeito] = useState()
    const [detalhes, setDetalhes] = useState()
    const usuario = useSelector(state => state.usuarioNome)




    const [item, setItem] = useState([]);
    const [pesquisa, setPesquisa] = useState('');
    let listaItens = [];



    const [msg, setMsg] = useState('')

    const [currentPage, setCurrentPage] = useState(1)
    const [postsPerPage, setPostPerPage] = useState(10)

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = item.slice(indexOfFirstPost, indexOfLastPost);


    const paginate = pageNum => setCurrentPage(pageNum);

    const nextPage = () => setCurrentPage(currentPage + 1);

    const prevPage = () => setCurrentPage(currentPage - 1);

    function load() {
        api.get(`/computadores-todos`)
            .then(async (response) => {
                await response.data.forEach(doc => {
                    if (doc.patrimonio.indexOf(pesquisa) >= 0) {
                        listaItens.push({
                            id: doc.id,
                            ...doc
                        })
                    } else if (doc.localizacao.indexOf(pesquisa) >= 0) {
                        listaItens.push({
                            id: doc.id,
                            ...doc
                        })
                    } else if (doc.marca.indexOf(pesquisa) >= 0) {
                        listaItens.push({
                            id: doc.id,
                            ...doc
                        })
                    }
                })
                setItem(listaItens)
            })
    }

    function criarManutencao(id) {
        const dados = {
            id_equipamento: id,
            tipo: 'computador',
            aberto: 1,
            status: 'Manutenção',
            defeito: defeito,
            detalhes: detalhes,
            chamado: chamado,
            responsavel: usuario,
            data_inicio: new Date().toISOString()
        }
        try {
            api.post(`/manutencoes-novo`, dados)
                .then(response => {
                    load()
                    setMsg('sucesso')
                })

        } catch (err) {
            alert(err)
        }
    }


    function buscarDados(id) {
        try {
            api.post(`/computadores-id/${id}`)
                .then(response => {
                    setId(response.data.id)
                    setPatrimonio(response.data.patrimonio)
                    setMarca(response.data.marca)
                    setModelo(response.data.modelo)
                    setNS(response.data.numero_serie)
                    setStatus(response.data.status)
                    setUnidade(response.data.unidade)
                    setLocalizacao(response.data.localizacao)
                })
        } catch (err) {
            alert(err)
        }
    }

    function atualizar(id) {
        const dados = { patrimonio, marca, modelo, numero_serie, status, unidade, localizacao }
        try {
            api.post(`/computadores-update/${id}`, dados)
                .then(async (response) => {
                    load()
                    setMsg('sucesso')
                }).catch((error) => {
                    alert(error.response.data)
                    setMsg('erro')
                })
        } catch (err) {
            alert('erro ao atualizar')
        }
    }

    useEffect(() => {
        try {
            load()
        } catch(err) {
            alert(err)
        }

    }, [pesquisa])

    return (
        <>

            <Menu />

            <div className="row p-2">
                <div className="col-md-m mr-auto ml-3">
                    <h1>COMPUTADORES</h1>
                    <select className="custom-select" onChange={(e) => setPostPerPage(e.target.value)}>
                        <option defaultValue="10" selected disabled>Quantidade de Resultados...</option>
                        <option value="10">10</option>
                        <option value="20">20</option>
                        <option value="20">50</option>
                        <option value="20">100</option>
                        <option value="20">200</option>
                    </select>
                </div>
                <form className="form-inline my-2 my-lg-0 mr-5">
                    <input onChange={(e) => setPesquisa(e.target.value)} type="text" className="form-control mr-sm-6" placeholder="Pesquisar Equipamento" />
                </form>
            </div>
            <div className="col-md-12 mx-auto">
                <table className="table table-bordered table-striped table-active table-hover font-weight-bold">
                    <thead className="thead-dark">
                        <tr>
                            <th scope="col">Patrimônio</th>
                            <th scope="col">Marca</th>
                            <th scope="col">Modelo</th>
                            <th scope="col">Numero Série</th>
                            <th scope="col">Status</th>
                            <th scope="col">Unidade</th>
                            <th scope="col">Setor</th>
                            <th scope="col">Editar</th>
                            <th scope="col">Manutenção</th>
                        </tr>
                    </thead>
                    <tbody>
                        {

                            currentPosts.map(item =>
                                <tr key={item.id}>
                                    <th scope="row">{item.patrimonio}</th>
                                    <td>{item.marca}</td>
                                    <td>{item.modelo}</td>
                                    <td>{item.numero_serie}</td>
                                    <td>{item.status}</td>
                                    <td>{item.unidade}</td>
                                    <td>{item.localizacao}</td>
                                    <td><button onClick={() => buscarDados(item.id)} type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModal">Editar</button></td>
                                    <td>{item.status === "Manutencao" ? <button disabled type="button" className="btn btn-danger">Em Manutenção</button>
                                        : <button onClick={() => setId(item.id)} type="button" className="btn btn-success" data-toggle="modal" data-target="#exampleModal2">Manutenção</button>} </td>
                                </tr>
                            )

                        }
                    </tbody>
                </table>
            </div>
            <Pagination postsPerPage={postsPerPage} totalPosts={item.length} paginate={paginate} nextPage={nextPage} prevPage={prevPage} page={currentPage} quant={currentPosts.length} />

            {/*<div class="row font-weight-bold">
            <div class="col-md-2 mx-auto">
                <nav aria-label="Page navigation example">
                    <ul className="pagination mx-auto">
                        <li className={page >= 2 ? "page-item" : "page-item disabled"}><a className="page-link" onClick={() => prevPage()} >Anterior</a></li>
                        <li className="page-item"><a className="page-link">...</a></li>
                        <li className={item.length < limit ? "page-item disabled" : "page-item"}><a className="page-link" onClick={() => nextPage()} >Próximo</a></li>
                    </ul>
                </nav>
            </div>
        </div>*/}

            {
                useSelector(state => state.usuarioLogado) === 0 && <Redirect to="/" />
            }
            <div className="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Atualizar Dados - Id : {id}</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="row">
                                <div className="col-md-6">
                                    Patrimonio:
                              <input
                                        name="patrimonio"
                                        placeholder="patrimonio"
                                        value={patrimonio && patrimonio}
                                        onChange={(e) => setPatrimonio(e.target.value)}
                                    />
                                </div>
                                <div className="col-md-6">
                                    Marca:
                              <br></br>
                                    <input
                                        name="marca"
                                        placeholder="Marca"
                                        value={marca && marca}
                                        onChange={(e) => setMarca(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    Modelo:
                              <input
                                        name="modelo"
                                        placeholder="Modelo"
                                        value={modelo && modelo}
                                        onChange={(e) => setModelo(e.target.value)}
                                    />
                                </div>
                                <div className="col-md-6">
                                    Numero de Série:
                              <input
                                        name="NS"
                                        placeholder="Numero de Série"
                                        value={numero_serie && numero_serie}
                                        onChange={(e) => setNS(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    Unidade:
                              <input
                                        name="unidade"
                                        placeholder="Unidade"
                                        value={unidade && unidade}
                                        onChange={(e) => setUnidade(e.target.value)}
                                    />
                                </div>
                                <div className="col-md-6">
                                    Localizacao:
                              <input
                                        name="localizacao"
                                        placeholder="Localizacao"
                                        value={localizacao && localizacao}
                                        onChange={(e) => setLocalizacao(e.target.value)}
                                    />
                                </div>
                            </div>
                            {msg === 'sucesso' && <p>Atualizado com sucesso</p>}
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Fechar</button>
                            <button type="button" className="btn btn-primary" onClick={() => atualizar(id)}>Editar</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="modal fade" id="exampleModal2" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Entrada Manutenção - Id: {id}</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="row">
                                <div className="col-md-6">
                                    Chamado:
                              <input
                                        name="chamado"
                                        placeholder="Chamado"
                                        maxLength="16"
                                        onChange={(e) => setChamado(e.target.value)}
                                    />
                                </div>
                                <div className="col-md-6">
                                    Defeito:
                              <input
                                        name="defeito"
                                        placeholder="Detalhes"
                                        onChange={(e) => setDefeito(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div class="mb-3">
                                <label>Detalhes</label>
                                <textarea class="form-control" placeholder="Detalhes do Chamado" onChange={(e) => setDetalhes(e.target.value)} required></textarea>
                            </div>
                            {msg === 'sucesso' && <p>Atualizado com sucesso</p>}
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Fechar</button>
                            <button type="button" className="btn btn-primary" onClick={() => criarManutencao(id)}>Editar</button>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Computadores;