import "./App.css";
import cw from "./assets/cw.svg";
import man from "./assets/man.svg";
import woman from "./assets/woman.svg";
import phoneicon from "./assets/phone.svg";
import growingMan from "./assets/growing-up-man.svg";
import growingWoman from "./assets/growing-up-woman.svg";
import mail from "./assets/mail.svg";
import map from "./assets/map.svg";
import padlock from "./assets/padlock.svg";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [gender, setGender] = useState("");
  const [userPic, setUserPic] = useState("");
  const [variables, setVariables] = useState([
    {
      name: "",
      email: "",
      age: "",
      location: "",
      phone: "",
      password: "",
    },
  ]);
  const [title, setTitle] = useState("");
  const [values, setValues] = useState("");
  const [people, setPeople] = useState([]);
  const [table, setTable] = useState(false);
  const newPerson = async () => {
    try {
      await axios.get(`https://randomuser.me/api/`).then((res) => {
        const persons = res.data.results;
        const name = persons[0].name.first + " " + persons[0].name.last;
        const gender = persons[0].gender;
        const age = persons[0].dob.age;
        const location =
          persons[0].location.street.number +
          " " +
          persons[0].location.street.name;
        const email = persons[0].email;
        const phone = persons[0].phone;
        const password = persons[0].login.password;
        const userpic = persons[0].picture.large;
        setGender(gender);
        setUserPic(userpic);
        setVariables({
          name: name,
          email: email,
          age: age,
          location: location,
          phone: phone,
          password: password,
        });

      });
    } catch (err) {
      // Handle Error Here
      console.error(err);
    }
  };
  useEffect(() => {
    newPerson();
  }, []);

  const handleHuman = (e) => {
    const humanKeyArray = Object.keys(variables);
    const humanValueArray = Object.values(variables);
    // console.log(humanKeyArray);
    // console.log(humanValueArray);
    if (e.target.name === "name") {
      setTitle(humanKeyArray[0]);
      setValues(humanValueArray[0]);
    } else if (e.target.name === "email") {
      setTitle(humanKeyArray[1]);
      setValues(humanValueArray[1]);
    } else if (e.target.name === "age") {
      setTitle(humanKeyArray[2]);
      setValues(humanValueArray[2]);
    } else if (e.target.name === "location") {
      setTitle(humanKeyArray[3]);
      setValues(humanValueArray[3]);
    } else if (e.target.name === "phone") {
      setTitle(humanKeyArray[4]);
      setValues(humanValueArray[4]);
    } else if (e.target.name === "password") {
      setTitle(humanKeyArray[5]);
      setValues(humanValueArray[5]);
    }
  };

  const addPerson = () => {
    setTable(true);
  };

  return (
    <div className="App">
      <img className="cw" src={cw} alt="clarusway" />
      <div className="card">
        <div className="card-begin"></div>
        <div className="card-container">
          <img
            src={userPic}
            alt="person"
            className="card-container-img"
          />
          <p>My {title} is</p>
          <p>{values}</p>
        </div>
        <div className="card-icons">
          <img
            src={gender === "male" ? man : woman}
            alt="human"
            onMouseOver={handleHuman}
            name="name"
          />
          <img src={mail} alt="mail" onMouseOver={handleHuman} name="email" />
          <img
            src={gender === "male" ? growingMan : growingWoman}
            alt="growing human"
            onMouseOver={handleHuman}
            name="age"
          />
          <img src={map} alt="map" onMouseOver={handleHuman} name="location" />
          <img
            src={phoneicon}
            alt="phone"
            onMouseOver={handleHuman}
            name="phone"
          />
          <img
            src={padlock}
            alt="lock"
            onMouseOver={handleHuman}
            name="password"
          />
        </div>
        <div className="card-buttons">
          <button>NEW USER</button>
          <button onClick={addPerson}>ADD USER</button>
        </div>
        <table className={table ? "card-table" : "card-table-first"}>
          <thead>
            <th>Firstname</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Age</th>
          </thead>
          <tbody>
            <td>{variables.name}</td>
            <td>{variables.email}</td>
            <td>{variables.phone}</td>
            <td>{variables.age}</td>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
