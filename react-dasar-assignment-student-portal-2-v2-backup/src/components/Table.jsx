const Table = (props) => {
    // const { students = [] } = props;

    function deleteStudents(id) {
        fetch(`http://localhost:3001/student/${id}`,{
            method : "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        })
        .then((response) => response.json())
        .then((data) => props.setNewData(data))
        .catch((error) => console.log(error.message));
    }

    const trows_students = (props.students || []).map((student, index) => {
        return(
            <tr key={index}>
                        <td>{index+1}</td>
                        <td>{student.fullname}</td>
                        <td>{student.birthDate}</td>
                        <td>{student.gender}</td>
                        <td>{student.faculty}</td>
                        <td>{student.programStudy}</td>
                        <td>
                            <button type='button'
                            className='delete-btn'
                            onClick={() => deleteStudents(student.id)}
                            data-testid={`delete-${student.id}`}>
                                Delete
                            </button>
                        </td>
                    </tr>
        )
    })

    return (
        <table id="table-student">
            <thead>
                <tr>
                    <th>No</th>
                    <th>Full Name</th>
                    <th>Birth Date</th>
                    <th>Gender</th>
                    <th>Faculty</th>
                    <th>Program Study</th>
                    <th>Option</th>
                </tr>
            </thead>
            <tbody>
                {trows_students}
            </tbody>
        </table>
    );
};

export default Table;