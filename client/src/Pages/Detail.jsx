import React from "react";
import "./style.module.css/Detail.css";
import { useState } from "react";
import axios from "axios";

import { useEffect } from "react";

export const Detail = () => {
  const [data, setData] = useState({});

  useEffect(() => {
    getupdateddate();
  }, []);
  const getupdateddate = async () => {
    axios
      .get(`https://mock-assignment.herokuapp.com/users`)
      .then((res) => {
        setData(res.data[res.data.length - 1]);
        console.log(res.data[res.data.length - 1]);
      })
      .catch((e) => console.log(e));
  };

  return (
    <div>
      <div className="table_for_students">
        <table>
          <thead>
            <tr>
              <th>Student-Name</th>
              <th>Gender</th>
              <th>Age</th>
              <th>Test-Name</th>
              <th>Subject</th>
              <th>Marks</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{data.name}</td>
              <td>{data.gender}</td>
              <td>{data.age}</td>
              <td>{data.testname}</td>
              <td>{data.subject}</td>
              <td>{data.marks}</td>
              <td>{data.date}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
