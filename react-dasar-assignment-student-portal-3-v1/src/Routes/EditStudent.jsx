import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditStudent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [student, setStudent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    fullname: "",
    profilePicture: "",
    addres: "",
    phoneNumber: "",
    birthDate: "",
    gender: "",
    programStudy: "",
    faculty: "",
  });

  //fetch data student berdasarkan ID
  useEffect(() => {
    const fetchStudent = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`http://localhost:3001/student/${id}`);
        const result = await response.json();
        setStudent(result);
        setFormData({
          fullname: result.fullname,
          profilePicture: result.profilePicture,
          addres: result.addres,
          phoneNumber: result.phoneNumber,
          birthDate: result.birthDate,
          gender: result.gender,
          programStudy: result.programStudy,
          //   faculty: result.faculty,
        });
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStudent();
  }, [id]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let faculty;
    switch (formData.programStudy) {
      case "Ekonomi":
        faculty = "Fakultas Ekonomi";
        break;
      case "Manajemen":
        faculty = "Fakultas Ekonomi";
        break;
      case "Akuntansi":
        faculty = "Fakultas Ekonomi";
        break;
      case "Administrasi Publik":
        faculty = "Fakultas Ilmu Sosial dan Politik";
        break;
      case "Administrasi Bisnis":
        faculty = "Fakultas Ilmu Sosial dan Politik";
        break;
      case "Hubungan Internasional":
        faculty = "Fakultas Ilmu Sosial dan Politik";
        break;
      case "Teknik Sipil":
        faculty = "Fakultas Teknik";
        break;
      case "Arsitektur":
        faculty = "Fakultas Teknik";
        break;
      case "Matematika":
        faculty = "Fakultas Teknologi Informasi dan Sains";
        break;
      case "Fisika":
        faculty = "Fakultas Teknologi Informasi dan Sains";
        break;
      case "Informatika":
        faculty = "Fakultas Teknologi Informasi dan Sains";
        break;
      default:
        faculty = "";
        break;
    }

    try {
      await fetch(`http://localhost:3001/student/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formData, faculty }),
      });
      navigate("/student"); // Redirect ke halaman student
    } catch (error) {
      setError(error.message);
    }
  };

    if (isLoading) {
      return <p>Loading ...</p>;
    }

    if (error) {
      return <p>Error loading data: {error}</p>;
    }

  return (
    <>
      <div className="form-container">
        <h1>Edit Student</h1>
        {isLoading ? (
          <p>Loading ...</p>
        ) : (
          <>
            <img src={student.profilePicture} alt="Profile" />
            <form onSubmit={handleSubmit} id="form-student">
              <div className="name-input">
                <label htmlFor="input-name">Fullname</label>
                <input
                  required
                  className="form-input"
                  name="fullname"
                  type="text"
                  id="input-name"
                  data-testid="name"
                  value={formData.fullname}
                  onChange={handleChange}
                />
              </div>
              <div className="addres-input">
                <label htmlFor="input-addres">Address</label>
                <input
                  required
                  className="form-input"
                  name="address"
                  type="text"
                  id="input-name"
                  data-testid="address"
                  value={formData.addres}
                  onChange={handleChange}
                />
              </div>
              <div className="phone-input">
                <label htmlFor="input-phone">Phone Number</label>
                <input
                  required
                  className="form-input"
                  name="phoneNumber"
                  type="text"
                  id="input-phone"
                  data-testid="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                />
              </div>
              <div className="date-input">
                <label htmlFor="input-date">Birth Date</label>
                <input
                  required
                  className="form-input"
                  name="birthDate"
                  type="text"
                  id="input-date"
                  data-testid="date"
                  value={formData.birthDate}
                  onChange={handleChange}
                />
              </div>
              <div className="gender-input">
                <label htmlFor="input-gender">Gender</label>
                <input
                  required
                  className="form-input"
                  name="gender"
                  type="text"
                  id="input-name"
                  data-testid="gender"
                  value={formData.gender}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="input-prody">Program Study</label>
                <select
                  required
                  className="form-input"
                  name="programStudy"
                  id="input-prody"
                  data-testid="prody"
                  value={formData.programStudy}
                  onChange={handleChange}
                >
                  <option selected>Pilih Prody</option>
                  <option value="Ekonomi">Ekonomi</option>
                  <option value="Manajemen">Manajemen</option>
                  <option value="Akuntansi">Akuntansi</option>
                  <option value="Administrasi Publik">
                    Administrasi Publik
                  </option>
                  <option value="Administrasi Bisnis">
                    Administrasi Bisnis
                  </option>
                  <option value="Hubungan Internasional">
                    Hubungan Internasional
                  </option>
                  <option value="Teknik Sipil">Teknik Sipil</option>
                  <option value="Arsitektur">Arsitektur</option>
                  <option value="Matematika">Matematika</option>
                  <option value="Fisika">Fisika</option>
                  <option value="Informatika">Informatika</option>
                </select>
              </div>
              <button data-testid="edit-btn" type="submit">
                Edit Student
              </button>
            </form>
          </>
        )}
      </div>
    </>
  );
};

export default EditStudent;