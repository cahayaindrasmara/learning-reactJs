const Table = (props) => {
    const { students = [] } = props;


    const trows_students = (props.students || []).map((student, index) => {
        return(
            <tr key={index}>
                        <td>{student.id}</td>
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
                {students.map((student, index) => {
                    <tr key={index}>
                        <td>{student.id}</td>
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
                })}
            </tbody>
        </table>
    );
};

export default Table;