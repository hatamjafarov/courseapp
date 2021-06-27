import { useContext, useEffect, useState } from "react";
import Context from "../../../store/context";
import classes from "./Info.module.css";

const Info = () => {
    const ctx = useContext(Context);
    const [about, setAbout] = useState();
    const [comments, setComments] = useState();

    let participantData = "";
    let comm = "";

    const COURSES_URL =
        "https://course-app-b602d-default-rtdb.firebaseio.com/courses/";

    useEffect(async () => {
        const participant = await fetch(`${COURSES_URL}${ctx.path}.json`);
        participantData = await participant.json();
        if (participantData) {
            setAbout(participantData.about);
        }

        const commentsData = await fetch(
            `${COURSES_URL}${ctx.path}/comments.json`
        );
        comm = await commentsData.json();
        setComments(comm);
    }, []);

    return (
        <div className={classes.section}>
            <h2>About Course</h2>
            <div>{about}</div>
            <div>
                <h4>Comments:</h4>
                <div className={classes.commentSection}>
                    {comments ? (
                        Object.keys(comments).map((val) => (
                            <div key={val} className={classes.comment_section}>
                                <h5>{comments[val].commentData.name}</h5>
                                <h2>{comments[val].commentData.comment}</h2>
                            </div>
                        ))
                    ) : (
                        <h2>no comments available</h2>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Info;
