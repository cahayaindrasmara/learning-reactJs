import { useEffect, useState } from "react";
import Form from "./components/Form";
import Table from "./components/Table";

const App = () => {
    const [students, setStudents] = useState(null);
    const [newData, setNewData] = useState(null);
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
                <Form setNewData={setNewData} />
                <Table students={students} setNewData={setNewData} />
            </div>
        </>
    );
};

export default App;
