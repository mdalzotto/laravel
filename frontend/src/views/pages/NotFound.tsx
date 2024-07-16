import {useNavigate} from "react-router";

export default function NotFound() {
    const navigate = useNavigate();
    return (
        <>
            <div className="row">
                <div className="col-md-12">
                    <h3 className="mb-2">
                        <button className="btn btn-danger" onClick={() => navigate(-1)}>Voltar<br/></button>
                        <div className="row">
                            <div className="container text-center">
                            <b>Pagina não encontrada</b>
                            </div>
                        </div>
                    </h3>
                </div>
            </div>

        </>
    );
}
