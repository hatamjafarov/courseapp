import { useContext, useEffect, useState } from "react";
import Context from "../../../store/context";

import classes from "./Teacher.module.css";

const Teacher = () => {
    const ctx = useContext(Context);

    const [teachers, setTeachers] = useState([]);

    let people = [];

    const SIGNUP_URL =
        "https://course-app-b602d-default-rtdb.firebaseio.com/accounts.json";

    useEffect(async () => {
        const participant = await fetch(SIGNUP_URL);
        const participantData = await participant.json();
        Object.keys(participantData).map((v) => {
            if (
                participantData[v].signupData.acitivity === "teacher" &&
                participantData[v].signupData.subject === ctx.path
            ) {
                people.push(participantData[v].signupData);
            }
        });
        setTeachers(people);
    }, []);

    return (
        <div className={classes.teacherPage}>
            <h2>Teacher</h2>
            <div className={classes.teachers}>
                {teachers ? (
                    teachers.map((teacher) => (
                        <div className={classes.teacher} key={teacher.username}>
                            <h2>Name: {teacher.name}</h2>
                            <p>Surname: {teacher.surname}</p>
                            <img src={teacher.image} alt="" />
                        </div>
                    ))
                ) : (
                    <h2>loading</h2>
                )}
            </div>
        </div>
    );
};

export default Teacher;
