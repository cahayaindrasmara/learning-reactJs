import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {v4 as uuid} from "uuid";

const AddStudent = () => {
    const navigate = useNavigate()
    const [formStudents, setFormStudents] = useState({
        fullname:"",
        profilePicture:"",
        address:"",
        phoneNumber:"",
        birthDate:"",
        gender:"",
        programStudy:"",
        faculty:""
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
            profilePicture: formStudents.profilePicture,
            address: formStudents.address,
            phoneNumber: formStudents.phoneNumber,
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
            setFormStudents({
                fullname:"",
                profilePicture:"",
                address:"",
                phoneNumber:"",
                birthDate:"",
                gender:"",
                faculty:"",
                programStudy:""
            });
            navigate("/student");
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
                    <div className="profile-input">
                        <label htmlFor="input-profile" >Profile Picture</label>
                        <input
                         required 
                         className="form-input"
                         name="profilePicture"
                         type="text" 
                         id="input-profile"     
                         data-testid="profilePicture" 
                         value={formStudents.profilePicture} 
                         onChange={handleChange}
                         />
                    </div>
                    <div className="addres-input">
                        <label htmlFor="input-addres" >Address</label>
                        <input
                         required 
                         className="form-input"
                         name="address"
                         type="text" 
                         id="input-addres"     
                         data-testid="address" 
                         value={formStudents.address} 
                         onChange={handleChange}
                         />
                    </div>
                    <div className="phone-input">
                        <label htmlFor="input-phone" >Phone Number</label>
                        <input
                         required 
                         className="form-input"
                         name="phoneNumber"
                         type="text" 
                         id="input-phone"     
                         data-testid="phoneNumber" 
                         value={formStudents.phoneNumber} 
                         onChange={handleChange}
                         />
                    </div>
                    <div className="date-input">
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
                    <div className="gender-input">
                        <label htmlFor="input-gender">Gender</label>
                        <select 
                         required 
                         className="form-input"
                         name="gender"
                         id="input-gender" 
                         data-testid="gender" 
                         value={formStudents.gender} 
                         onChange={handleChange}>
                            <option selected>Pilih Gender</option>
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
                            <option selected>Pilih Prody</option>
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
                    data-testid="add-btn"/>
                </div>
            </form>
        </>
    );
};

export default AddStudent;
