import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import classes from "./Course.module.css";

const Course = () => {
    const [load, setLoad] = useState(true);
    const [desc, setDesc] = useState("");
    const router = useRouter();

    const COURSES_URL =
        "https://course-app-b602d-default-rtdb.firebaseio.com/courses/";

    var participantData = "";

    useEffect(() => {
        const getPost = async () => {
            const path = router.query.name;

            const participant = await fetch(`${COURSES_URL}${path}.json`);
            participantData = await participant.json();
            if (participantData) {
                setDesc(participantData.description);
            }
            setLoad(false);
        };
        getPost();
    }, [router.query.name]);

    return <div className={classes.desc}>{load ? <p>Loading...</p> : <p>{desc}</p>}</div>;
};
export default Course;
