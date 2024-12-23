import { Link } from "react-router-dom";

const Home = () => {
    return (
        <>
            <h1>Student Portal</h1>
            <Link to="/student">
                <button data-testid="student-btn">All Student</button>
            </Link>
        </>
    );
};

export default Home;
