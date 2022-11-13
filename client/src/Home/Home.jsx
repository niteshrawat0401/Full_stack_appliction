import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./Home.module.css"

let initialdata = {
  name: "",
  gender: "",
  age: 0,
  testname: "",
  subject: "",
  marks: 0,
  date: "",
};

export const Home = () => {
  const [signupdata, setSignupdata] = useState(initialdata);
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const [sorted, setSorted] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filtered, setFiltered] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignupdata({ ...signupdata, [name]: value });
  };

  useEffect(() => {
    getdata();
  }, []);

  const submit = (e) => {
    e.preventDefault();
    let pvtroute = JSON.parse(localStorage.getItem("pvtroute"));
    let userid = pvtroute.userid;
    console.log(pvtroute);

    axios
      .post(`http://localhost:8080/user/${userid}/student`, {
        ...signupdata,
        userid,
      })
      .then((res) => {
        getdata();
        setSignupdata({ ...initialdata });
      })
      .catch((e) => console.log(e));
  };

  // get request
  function getdata() {
    let pvtroute = JSON.parse(localStorage.getItem("pvtroute")) || [];
    let id = pvtroute.userid;
    axios
      .get(`http://localhost:8080/user/${id}/student?userid=${id}`)
      .then((res) => {
        setData(res.data);
        console.log("productArr", res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }
  // delete req
  function deleteData(proid) {
    let pvtroute = JSON.parse(localStorage.getItem("pvtroute")) || [];
    let id = pvtroute.userid;
    axios
      .delete(`http://localhost:8080/user/${id}/student/${proid}`)
      .then((res) => {
        getdata();
        console.log("deleted", res);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // sort
  function handleSort(e) {
    setSorted(e.target.value);
    let sortvalue = e.target.value;
    if (sortvalue === "") {
      setData(data);
    } else {
      if (sortvalue === "l2h") {
        let arr = data.sort((a, b) => Number(a.age) - Number(b.age));
        setData(arr);
      }
      if (sortvalue === "h2l") {
        let arr1 = data.sort((a, b) => Number(b.age) - Number(a.age));
        setData(arr1);
      }
    }
  }
  useEffect(() => {}, [sorted]);

  // filtered
  function filtervalue(e) {
    let pvtroute = JSON.parse(localStorage.getItem("pvtroute")) || [];
    let id = pvtroute.userid;
    axios
      .get(
        `https://rahulsingh-mockapi.herokuapp.com/user/${id}/student?gender=${e.target.value}`
      )
      .then((res) => {
        setData(res.data);

        setFiltered(e.target.value);
        console.log(res.data);
      })
      .catch((e) => console.log(e));
  }
  useEffect(() => {}, [filtered]);

  // Detail
  function details(e){
    axios.post(`https://mock-assignment.herokuapp.com/users`, e)
    .then((res)=>{
      navigate("/detail")
    })
    .catch((e)=>{
      console.log(e.message);
    })

  }

  return (
    <>
      <div className={styles.whole_container}>
        <form onSubmit={submit} className="signup_form">
          <h5>Student Name</h5>
          <input
            type="text"
            placeholder="Student Name..."
            name="name"
            value={signupdata.name}
            onChange={handleChange}
            required
          />
          <br />
          <h5>Gender</h5>
          <select
            name="gender"
            value={signupdata.gender}
            onChange={handleChange}
          >
            <option>Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Unspecified">Unspecified</option>
          </select>
          <br />
          <h5>Age</h5>
          <input
            type="number"
            placeholder="Age..."
            name="age"
            value={signupdata.age}
            onChange={handleChange}
            required
          />
          <br />
          <h5>Test Name</h5>
          <input
            type="text"
            placeholder="Testname..."
            name="testname"
            value={signupdata.testname}
            onChange={handleChange}
            required
          />
          <br />
          <h5>Subject</h5>
          <input
            type="text"
            placeholder="Subject..."
            name="subject"
            value={signupdata.subject}
            onChange={handleChange}
            required
          />
          <br />
          <h5>marks</h5>
          <input
            type="number"
            placeholder="Marks..."
            name="marks"
            value={signupdata.marks}
            onChange={handleChange}
            required
          />

          <br />
          <h5>Date</h5>
          <input
            type="date"
            placeholder="Date..."
            name="date"
            value={signupdata.date}
            onChange={handleChange}
            required
          />
          <br />
          <input className={styles.signupbutton} type="submit" value="Submit" />
        </form>
      </div>
      <div className={styles.sort_filter}>
      <div className={styles.sortDiv}>
        <select className={styles.sort}
          style={{ width: "170px", height: "40px", borderRadius: "8px" }}
          id="sortvalue"
          onChange={handleSort}
        >
          <option value="">Sort by age</option>
          <option value="l2h">Low to High</option>
          <option value="h2l">High to Low</option>
        </select>
      </div>
      <div className="sortDiv">
        <select
          style={{ width: "170px", height: "40px", borderRadius: "8px", background:"#b5bfbf",}}
          id="sortvalue"
          onChange={filtervalue}
        >
          <option>Filter by gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Unspecified">Unspecified</option>
        </select>
      </div>
      </div>
      <div className="mapdiv" >
        {data.map((ele) => (
          <div className="card" key={ele._id}>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWKKLQgDiE8Oth8mH061jIZydyHoEj0jEpfQ&usqp=CAU" />
            <h3>Name : {ele.name}</h3>
            <h3>Gender : {ele.gender}</h3>
            <h3>Age : {ele.age}</h3>
            <button style={{marginRight: "70px"}} onClick={() => deleteData(ele._id)}>Remove</button>
            <button onClick={()=>details(ele)}>Details</button>
          </div>
        ))}
      </div>
    </>
  );
};
