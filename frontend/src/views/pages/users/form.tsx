import React, {useContext, useEffect, useState} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import Swal from "sweetalert2";
import api from "../../../services/api";
import dayjs from "dayjs";
import {UsersContext} from "../../context/User/UsersContext";
import {MainContext} from "../../context/MainContext";

export default function UserForm() {
    const {setLoading} = useContext(MainContext)

    const { nome, setNome,
        email, setEmail,
        situacao, setSituacao,
        dataAdmissao, setDataAdmissao,
        createdAt, setCreatedAt,
        updatedAt, setUpdatedAt,
        validateUserRegister ,dispatchUsesrsObject } = useContext(UsersContext)

    const navigate = useNavigate()
    let { id} = useParams()

    useEffect(() => {
        setLoading(true)
        const fetchData = async () => {
            try {
                // if (id != undefined) {
                if (id) {
                    const resposta = await api.get(`/api/users/${id}`);
                    const users = resposta.data
                    // await api.get('/api/users/' + id).then(resposta => {

                        setNome(users?.name)
                        setEmail(users?.email)
                        setSituacao(users?.situacao.toString())
                        setDataAdmissao(users?.data_admissao)
                        setCreatedAt(dayjs(users?.created_at).format('YYYY-MM-DDTHH:mm'))
                        setUpdatedAt(dayjs(users?.updated_at).format('YYYY-MM-DDTHH:mm'))
                    // })
                }
            }catch (error) {
                console.error("Erro ao buscar usuário:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData()
    },  [id])

    const resgister = (evento: React.FormEvent<HTMLFormElement>) => {
        try {
            evento.preventDefault();
            setLoading(true)

            validateUserRegister()

            const method = id === undefined ? 'post' : 'put';
            const url = id === undefined ? '/api/users' : `/api/users/${id}`;

            api[method](url, dispatchUsesrsObject)
                .then((result) => {
                    setLoading(false)
                    Swal.fire({
                        title: 'Sucesso!',
                        text: result.data.message,
                        icon: 'success',
                        timer: 5000
                    }).then(() => navigate("/users"));
                })
                .catch(erro => {
                    setLoading(false)
                    Swal.fire({
                        title: 'Erro!',
                        text: erro.response.data.error,
                        icon: 'error',
                    });
                });

        }catch (err: any) {
            setLoading(false)
            Swal.fire({
                title: 'Atenção!',
                text: err,
                icon: 'warning',
            })
        }

    }

    return (
        <>
            <form onSubmit={resgister} autoComplete='off' className="row g-3">

                <div className="col-md-12">
                    <h1>Cadastro de usuários</h1>
                </div>

                    <div className="card-body">
                        <div className="row g-3 ">
                            <div className="col-md-6 ">
                                <div className="form-floating">
                                    <input type="text" className="form-control" id="nome"
                                           placeholder="Nome"
                                           onChange={evento => setNome(evento.target.value)} value={nome}/>
                                    <label htmlFor="nome" className="form-label">Nome <i
                                        className="text-danger"> *</i></label>
                                </div>
                            </div>

                            <div className="col-md-6">
                                <div className="form-floating">
                                    <input type="email" className="form-control" id="email"
                                           placeholder="Seu melhor E-mail"
                                           onChange={evento => setEmail(evento.target.value)} value={email}/>
                                    <label htmlFor="email" className="form-label">Email <i className="text-danger"> *</i></label>
                                </div>
                            </div>

                                <div className="col-md-3">
                                    <div className="form-floating">
                                        <select className="form-select" id="situacao" value={situacao} onChange={evento => setSituacao(evento.target.value)}>
                                            <option value="" disabled={true}>Selecione</option>
                                            <option value="1">Ativo</option>
                                            <option value="0">Inativo</option>
                                        </select>
                                        <label htmlFor="situacao">Situação <i className="text-danger"> *</i></label>
                                    </div>
                            </div>

                            <div className="col-md-3">
                                <div className="form-floating">
                                    <input type="date" className="form-control" id="data_admissao"
                                           placeholder="Data de admissão"
                                           onChange={evento => setDataAdmissao(evento.target.value)} value={dataAdmissao}/>
                                    <label htmlFor="data_admissao" className="form-label">Data Admissão <i
                                        className="text-danger"> *</i></label>
                                </div>
                            </div>

                             <div className="col-md-3">
                                <div className="form-floating">
                                <input type="datetime-local" readOnly={true} disabled={true} className="form-control" id="created_at"
                                       placeholder="Data de cadastro" value={createdAt || ''}/>
                                <label htmlFor="created_at" className="form-label">Data cadastro </label>
                            </div>
                        </div>

                             <div className="col-md-3">
                                <div className="form-floating">
                                <input type="datetime-local" readOnly={true} disabled={true} className="form-control" id="updated_at"
                                       placeholder="Data de atualização" value={updatedAt || ''}/>
                                <label htmlFor="updated_at" className="form-label">Data atualização </label>
                            </div>
                    </div>
                        </div>
                    </div>

                <div className="col-md-12">
                    <button type="submit" className="btn btn-success me-2">Salvar</button>
                    <Link to={"/users"} className="btn btn-danger">Voltar</Link>
                </div>
            </form>
        </>
    );
}

