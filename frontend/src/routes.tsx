import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from "./views/layout/layout";
import NotFound from "./views/pages/NotFound";
import Home from "./views/pages/home";
import UserForm from "./views/pages/users/form";
import ListingUsers from "./views/pages/users/listing";
import {UsersProvider} from "./views/context/User/UsersContext";
export default function AppRouter() {

    return (
    <div className="App">

            <Router>
                <Routes>
                    <Route path='' element={ <Layout />}>
                        <Route path='*' element={<NotFound />} />
                        <Route path='/' element={<Home />} />

                            <Route path='users'>
                                <Route path='' element={<ListingUsers />} />
                                    <Route path='create' element={ <UsersProvider> <UserForm/> </UsersProvider>} />
                                    <Route path='update/:id' element={<UsersProvider><UserForm/></UsersProvider>} />
                            </Route>
                    </Route>
                </Routes>
            </Router>
        </div>
    )
}