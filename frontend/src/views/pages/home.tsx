import React, {useContext, useEffect, useState} from "react";
import Chart from 'react-apexcharts';
import {Link} from "react-router-dom";
import api from "../../services/api";
import Pusher from "pusher-js";
import {MainContext} from "../context/MainContext";


export default function Home() {
    const [infos, setInfos] = useState<any>({})
    const {setLoading} = useContext(MainContext)

    const options: any = {
        chart: {
            type: 'bar',
            height: 350
        },
        xaxis: {
            categories: ['Usuários']
        }
    };

    const series = [{
        name: 'Ativos',
        data: [infos.ativos || 0]
    }, {
        name: 'Inativos',
        data: [infos.inativos || 0]
    }];


    useEffect(() => {
        setLoading(true)
        const pusher = new Pusher(`${process.env.REACT_APP_PUSHER_APP_KEY}`, {
            cluster: `${process.env.REACT_APP_PUSHER_CLUSTER}`,
        });

        const channel = pusher.subscribe('teste');
        channel.bind('App\\Events\\AtualizaUsuarios', function (data: any) {
            fetchData()
        });

        const fetchData = async () => {
            await getDataDashboard()
        };

        fetchData()

        return () => {
            pusher.unsubscribe('teste');
        };
    }, []);

    async function getDataDashboard() {
        await api.post('/api/dashboard').then((response) => {
            setInfos(response.data)
        }).catch((error) => {
            console.error("Erro ao buscar dados do dashboard:", error);
        }).finally(() => {
            setLoading(false);
        });
    }

    return (
        <section>

            <div className="col-lg-12 mt-3">
                <div className="col">
                    <h1>Início</h1>

                    <div className="card">
                        <h5 className="card-header">Usuarios</h5>
                        <div className="card-body">
                            <h1 className="card-title text-success bi bi-person"><span>{infos.total || 0}</span></h1>
                            <Chart options={options} series={series} type="bar" height={350}/>

                            <Link to="/users" className="btn btn-primary">Acessar</Link>
                        </div>
                    </div>


                </div>
            </div>

        </section>
    );
}