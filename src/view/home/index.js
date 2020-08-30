import React, { useEffect, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { useSelector, useDispatch} from 'react-redux';
import Menu from '../../components/menu';
import api from '../../api'
import './home.css';
import moment from 'moment';

function Home() {

    //dados para buscar computador e atualizar computador
    const [id, setId] = useState('')
    const [patrimonio, setPatrimonio] = useState('')
    const [marca, setMarca] = useState('')
    const [modelo, setModelo] = useState('')
    const [numero_serie, setNS] = useState('')
    const [status, setStatus] = useState('')
    const [unidade, setUnidade] = useState('')
    const [localizacao, setLocalizacao] = useState('')


    const [item, setItem] = useState([]);
    const [itemPesquisa, setItemPesquisa] = useState([]);
    const [pesquisa, setPesquisa] = useState('');
    let listaItens = [];

    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(5);

    const [msg, setMsg] = useState('')

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
    

    /*function criarManutencao(id) {
        const dados = {
            id_equipamento : id,
            tipo: 'computador',
            aberto: 1,
            status: 'Aberto',
            defeito: defeito,
            detalhes: detalhes,
            chamado: chamado,
            responsavel: usuario,
            data_inicio: new Date().toISOString()
        }
        try{
            api.post(`/manutencoes-novo`, dados)
            .then(response => {
                loadData()
                setMsg('sucesso')
            })
        }catch(err){
            alert(err)
        }
    }*/


    function buscarDados(id){
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
        } catch(err){
            alert(err)
        }
    }

    function atualizar(id){
        const dados = {patrimonio, marca, modelo, numero_serie, status, unidade, localizacao}
        try{
            api.post(`/computadores-update/${id}`, dados)
            .then(async (response) => {
                loadData()
                setMsg('sucesso')
            })
        }catch(err) {
            alert('erro ao atualizar')
        }
    }

    function nextPage() {
        setPage(page + 1)
    }

    function prevPage() {
        setPage(page - 1)
    }

    
    
    useEffect(() => {
        try {
            console.log(moment())
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
            <h1>CATI - {item.length}</h1>
                <select class="custom-select" onChange={(e) => setLimit(e.target.value)}>
                    <option value="5" selected disabled>Quantidade de Resultados...</option>
                    <option value="5">5</option>
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
            <table className="table table-chamados table-striped table-dark table-bordered table-responsive-md font-weight-bold mr-0">
            <thead>
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
                <th scope="row">{item.chamado}</th>
                <td>{item.tipo}</td>
                <td>{item.status}</td>
                <td>{item.responsavel}</td>
                <td>{item.defeito}</td>
                <td>{moment(item.data_inicio).format('L')}</td>
                <td><button onClick={() => setId(item.id)} type="button" className="btn btn-success" data-toggle="modal" data-target="#exampleModal2">+ Detalhes</button></td>
            </tr>)}
            </tbody>
        </table>

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
    
        </>
    )
}

export default Home;