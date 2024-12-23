import { useState } from "react";
import {v4 as uuid} from "uuid";

const Form = (props) => {
    const [formStudents, setFormStudents] = useState({
        fullname:"",
        birthDate:"",
        gender:"",
        programStudy:"",
    });

    function handleChange(event) {
        const {name, value} = event.target;
        setFormStudents((prevStudents) => {
            let faculty = prevStudents.programStudy;
            if (name === "programStudy") {
                if (value === "Ekonomi" || value === "Manajemen" || value === "Akuntansi") {
                    faculty = "Fakultas Ekonomi";
                } else if (value === "Administrasi Publik" || value === "Administrasi Bisnis" || value === "Hubungan Internasional") {
                    faculty = "Fakultas Ilmu Sosial dan Politik";
                } else if (value === "Teknik Sipil" || value === "Arsitektur"){
                    faculty = "Fakultas Teknik";
                } else if (value === "Matematika" || value === "Fisika" || value === "Informatika"){
                    faculty = "Fakultas Teknologi Informasi dan Sains";
                } 
            }

            return {
                ...prevStudents,
                [name]: value,
                faculty: faculty,
            };
        });
    }

    function handleSubmit(event) {
        event.preventDefault();

        const studentsData = {
            No: uuid(),
            fullname: formStudents.fullname,
            birthDate: formStudents.birthDate,
            gender: formStudents.gender,
            faculty: formStudents.faculty,
            programStudy: formStudents.programStudy,
        };

        fetch("http://localhost:3001/student", {
            method : "POST",
            headers :{
                "Content-Type" : "application/json"
            },
            body : JSON.stringify(studentsData)
        })
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            props.setNewData(data);
            setFormStudents({
                fullname:"",
                birthDate:"",
                gender:"",
                faculty:"",
                programStudy:""
            });
        })
        .catch((error) => {
            console.error("Error:", error);
            
        })
    }

    return (
        <>
            <form action="" id="form-student" onSubmit={handleSubmit}>
                <div className="form">
                    <div className="name-input">
                        <label htmlFor="input-name" >Fullname</label>
                        <input
                         required 
                         className="form-input"
                         name="fullname"
                         type="text" 
                         id="input-name"     
                         data-testid="name" 
                         value={formStudents.fullname} 
                         onChange={handleChange}
                         />
                    </div>
                    <div>
                        <label htmlFor="input-date">Birth Date</label>
                        <input  
                         required 
                         className="form-input"
                         name="birthDate"
                         type="date"
                         id="input-date"  
                         data-testid="date" 
                         value={formStudents.birthDate} 
                         onChange={handleChange}/>
                    </div>
                    <div>
                        <label htmlFor="input-gender">Gender</label>
                        <select 
                         required 
                         className="form-input"
                         name="gender"
                         id="input-gender" 
                         data-testid="gender" 
                         value={formStudents.gender} 
                         onChange={handleChange}>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="input-prody">Program Study</label>
                        <select 
                         required
                         className="form-input"
                         name="programStudy" 
                         id="input-prody" 
                         data-testid="prody" 
                         value={formStudents.programStudy} 
                         onChange={handleChange}>
                            <option value="Ekonomi">Ekonomi</option>
                            <option value="Manajemen">Manajemen</option>
                            <option value="Akuntansi">Akuntansi</option>
                            <option value="Administrasi Publik">Administrasi Publik</option>
                            <option value="Administrasi Bisnis">Administrasi Bisnis</option>
                            <option value="Hubungan Internasional">Hubungan Internasional</option>
                            <option value="Teknik Sipil">Teknik Sipil</option>
                            <option value="Arsitektur">Arsitektur</option>
                            <option value="Matematika">Matematika</option>
                            <option value="Fisika">Fisika</option>
                            <option value="Informatika">Informatika</option>
                        </select>
                    </div>
                    <input
                    className="add-students-button" 
                    type="submit" 
                    value="Add Students" 
                    id="add-btn" 
                    data-testid="submit"/>
                </div>
            </form>
        </>
    );
};

export default Form;
