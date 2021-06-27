import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import Context from "../../store/context";
import classes from "./Courses.module.css";

const Courses = () => {
    const [courses, setCourses] = useState();
    const [partArray, setPartArray] = useState([]);

    const ctx = useContext(Context);

    const COURSES_URL =
        "https://course-app-b602d-default-rtdb.firebaseio.com/courses.json";

    const SIGNUP_URL =
        "https://course-app-b602d-default-rtdb.firebaseio.com/accounts.json";

    let countArray = [];
    useEffect(async () => {
        const participant = await fetch(SIGNUP_URL);
        const participantData = await participant.json();

        const checker = Object.keys(participantData).filter((elem) =>
            countArray.push(participantData[elem].signupData.subject)
        );
        setPartArray(countArray);

        const response = await fetch(COURSES_URL);
        const responseData = await response.json();
        setCourses(responseData);
    }, []);
    let num = 0;

    return (
        <div className={classes.all_courses}>
            <h2>All Courses</h2>

            <div className={classes.courses}>
                {courses
                    ? Object.keys(courses).map((course) => {
                          const getCount = () => {
                              let oldCourse;
                              partArray.forEach((v) => {
                                  v === course && num++;
                                  if (oldCourse !== course) {
                                      num = 0;
                                  }
                                  oldCourse = course;
                              });
                          };
                          getCount();
                          return (
                              <Link
                                  href={{
                                      pathname: `/courses/course`,
                                      query: { name: course },
                                  }}
                                  key={course}

                                  //   href="/courses/[course]"
                                  //   as={`/courses/${course}`}
                              >
                                  <div
                                      className={classes.course}
                                      onClick={() => {
                                          ctx.getCoursePath(course);
                                      }}
                                  >
                                      <h2>{course}</h2>
                                      <p>{courses[course].description}</p>
                                      <img src={courses[course].image} alt="" />
                                      <p>Participant: {num}</p>
                                  </div>
                              </Link>
                          );
                      })
                    : <h1>Loading...</h1>}
            </div>
        </div>
    );
};

export default Courses;
