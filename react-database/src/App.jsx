import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css'
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import UsersTable from './components/UsersTable.jsx';
import CreateUserForm from './components/CreateUserForm.jsx';
import UpdateUserForm from './components/UpdateUserForm.jsx';

function App() {
    return (
        <Router basename="/utility/database">
            <div className="d-flex flex-column min-vh-100">
                <Header />
                <div className="container my-4">
                    <Routes>
                        <Route path="/" element={<UsersTable />} />
                        <Route path="/create-user" element={<CreateUserForm />} />
                        <Route path="/update-user/:id" element={<UpdateUserForm />} />
                    </Routes>
                </div>
                <Footer />
            </div>
        </Router>
    );
}

export default App;