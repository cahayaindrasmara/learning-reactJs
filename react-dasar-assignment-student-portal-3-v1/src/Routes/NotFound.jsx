import { useNavigate } from "react-router-dom";

const NotFound = () => {
    const navigate = useNavigate();

    const handleBack = () => {
        navigate (-1);
    }

    return (
        <>
            <p>404|Not Found</p>
            <button data-testid="back" onClick={handleBack}>Take Me Back</button>
        </>
    );
};

export default NotFound;
