import {Link, Outlet} from "react-router-dom";

export default function Layout() {
    return (
        <>
            <nav className="navbar  navbar-expand-lg bg-body-tertiary " data-bs-theme="dark">
                <div className="container-fluid">
                    <div className="navbar-brand">
                    </div>

                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                            data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false"
                            aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavDropdown">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link to={"/"} className="nav-link active" aria-current="page">
                                    <span className="bi bi-house">&nbsp;</span><span>Início</span>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to={"/users"} className="nav-link">
                                    <span className="bi bi-person">&nbsp;</span><span>Usuarios</span>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            <main>
                <div className="overflow-hidden p-3 p-md-5 m-md-3">
                    <div className="container">
                        <Outlet/>
                    </div>
                </div>
            </main>
        </>
    );
}