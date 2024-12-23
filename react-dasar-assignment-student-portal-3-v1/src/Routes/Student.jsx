import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


const Student = () => {
    const navigate = useNavigate()
    const [students, setStudents] = useState([]);
    const [newData, setNewData] = useState(null);
    const [filter, setFilter] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const response = await fetch(`http://localhost:3001/student`);
                const result = await response.json();
                console.log(result);

                setStudents(result);
            } catch (error) {
                setError(error.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData()
    }, [newData])

    function deleteStudents(id) {
        fetch(`http://localhost:3001/student/${id}`,{
            method : "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        })
        .then((response) => response.json())
        .then((data) => setNewData(data))
        .catch((error) => console.log(error.message));
    }

    //fungsi untuk filter student berdasarkan fakultas
    const handleFilterChange = (event) =>{
        setFilter(event.target.value);
    }

    //filter data student berdasarkan fakultas
    const filteredStudents = students.filter(student => 
        filter === "All" ||  filter === null || student.faculty === filter
    )

    if (error) {
        console.log(error);
        return <p>Error loading data: {error}</p>
    }

    if (isLoading) {
        return <p>Loading ...</p>
    }

    if (!students) {
        return null
    }

    return (
        <>
            <div className="container">
                <h2 className="title">Student Portal</h2>
                <div className="role-image-container">
                    <h4 className="title">Admin</h4>
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTV2X-3p5kycV3EhWaZVUd5ev-nNKfMeuoUelGbEtvv_JRmG3VB"
                        alt=""
                        className="circle-image "
                    />
                </div>
            </div>
            <div className="form-container">
                <h1>Student List</h1>
                <select data-testid="filter" onChange={handleFilterChange}>
                    <option value="All">All</option>
                    <option value="Fakultas Ekonomi">Fakultas Ekonomi</option>
                    <option value="Fakultas Ilmu Sosial dan Politik">Fakultas Ilmu Sosial dan Politik</option>
                    <option value="Fakultas Teknik">Fakultas Teknik</option>
                    <option value="Fakultas Teknologi Informasi dan Sains">Fakultas Teknologi Informasi dan Sains</option>
                </select>
                <table id="table-student">
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Full Name</th>
                            <th>Faculty</th>
                            <th>Program Study</th>
                            <th>Option</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredStudents.map((student, index) => (
                            <tr key={student.id} className="student-data-row">
                                <td>{index + 1}</td>
                                <td onClick={() => navigate(`/student/${student.id}`)}>
                                    {student.fullname}
                                </td>
                                <td>{student.faculty}</td>
                                <td>{student.programStudy}</td>
                                <td>
                                    <button 
                                        data-testid={`delete-${student.id}`} 
                                        onClick={() => deleteStudents(student.id)}>
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default Student;
