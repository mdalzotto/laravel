import { Link } from 'react-router-dom'
import React, {useContext, useEffect, useState} from 'react'
import api from "../../../services/api";
import { DataTableOptions } from '../../components/dataTableOptions'
import MUIDataTable from "mui-datatables";
import dayjs from "dayjs";
import {MainContext} from "../../context/MainContext";
import Swal from "sweetalert2";
import Pusher from 'pusher-js';

export default function ListingUsers() {
    const {setLoading} = useContext(MainContext)

    const [users, setUsers] = useState<any>([])

    const getUsers = async () => {
        await api.get('/api/users').then((response) => {
            setUsers(response.data)
        })
    }

    const deleteUser = async (id:string) => {
        Swal.fire({
            title: "Atenção",
            text: "Tem certeza que deseja deletar?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#198754",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sim",
            cancelButtonText: "Não"
        }).then((result) => {
            if (result.isConfirmed) {
                 api.delete(`/api/users/${id}`).then((response) => {
                    Swal.fire({
                        title: "Sucesso!",
                        text: "Deletado com sucesso.",
                        icon: "success"
                    }).then(()=> getUsers());
                 })
            }
        });

    }

    useEffect(() => {
        setLoading(true)

        const pusher = new Pusher(`${process.env.REACT_APP_PUSHER_APP_KEY}`, {
            cluster: `${process.env.REACT_APP_PUSHER_CLUSTER}`,
        });

        const channel = pusher.subscribe('teste');
        channel.bind('App\\Events\\AtualizaUsuarios', function(data:any) {
            fetchData()
        });
        const fetchData = async () => {
            await getUsers()
        };

        fetchData().then(setLoading(false))

        return () => {
            pusher.unsubscribe('teste');
        };
    }, [])

    const columns: any = [
        {
            name: 'id', label: 'ID', options: {
                filter: false,
                sort: true,
            },
        },{
            name: 'name', label: 'Nome', options: {
                filter: false,
                sort: true,
            },
        },
        {
            name: 'email', label: 'E-mail', options: {
                filter: false,
                sort: true,
            },
        },{
            name: 'situacao', label: 'Situação', options: {
                filter: false,
                sort: true,
                customBodyRender: (value:any) => value ? 'Ativo':'Inativo',
            },
        },{
            name: 'data_admissao', label: 'Data admissão', options: {
                filter: false,
                sort: true,
                customBodyRender: (value:any) => dayjs(value).format('DD/MM/YYYY'),
            },
        },{
            name: 'created_at', label: 'Data cadastro', options: {
                filter: false,
                sort: true,
                customBodyRender: (value:any) => dayjs(value).format('DD/MM/YYYY HH:mm'),
            },
        },
        {
            name: 'updated_at', label: 'Data atualização', options: {
                filter: false,
                sort: true,
                customBodyRender: (value:any) => dayjs(value).format('DD/MM/YYYY HH:mm'),
            },
        },
        {
            name: '', label: '', options: {
                filter: false,
                false: true,
                customBodyRenderLite: (index: string | number) => {return (
                    <>
                        <div className="col">
                            <Link className='btn btn-sm btn-warning me-2' to={`/users/update/${users[index]?.id}`} title="Editar"><i className="bi bi-pencil" aria-hidden="true"></i> </Link>
                            <button type={'button'} onClick={() => deleteUser(users[index]?.id)} className='btn btn-sm btn-danger' title="Excluir"><i className="bi bi-x-lg" aria-hidden="true"></i> </button>
                        </div>
                    </>
                )
                },
            },
        },
    ]

    const options: any = DataTableOptions

    return (
        <>
            <div className='mb-4'>
                <Link className='btn btn-success mb-3' to='/users/create'><i className="bi bi-plus-circle">&nbsp;</i> Adicionar Usuário</Link>

                <MUIDataTable
                    title={''}
                    data={users}
                    columns={columns}
                    options={options}
                />
            </div>
        </>
    )
}