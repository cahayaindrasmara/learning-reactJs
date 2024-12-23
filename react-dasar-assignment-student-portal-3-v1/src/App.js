import React from "react";
import { Routes, Route } from 'react-router-dom';
import Home from "./Routes/Home";
import AddStudent from "./Routes/AddStudent";
import Student from "./Routes/Student";
import EditStudent from "./Routes/EditStudent";
import NotFound from "./Routes/NotFound";
import NavBar from "./components/Navbar";

const App = () => {
    return (
        <div >
            <h1>Welcome to Student Portal</h1>
            <NavBar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/add" element={<AddStudent />} />
                <Route path="/student" element={<Student />} />
                <Route path="/student/:id" element={<EditStudent />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </div>

    );
};

export default App;
