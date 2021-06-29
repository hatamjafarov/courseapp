import { useRouter } from "next/router";
import { useContext, useEffect, useRef, useState } from "react";
import Context from "../../../store/context";
import classes from "./Feedback.module.css";

const Feedback = () => {
    const inputRef = useRef();
    const [name, setName] = useState("");

    const router = useRouter();

    const ctx = useContext(Context);

    const subject = ctx.path;

    useEffect(() => {
        setName(ctx.username);
    }, []);

    const submitHandler = (e) => {
        e.preventDefault();

        const commentData = {
            name: name,
            comment: inputRef.current.value,
        };

        fetch(
            `https://course-app-b602d-default-rtdb.firebaseio.com/courses/${subject}/comments.json`,
            {
                method: "POST",
                body: JSON.stringify({ commentData }),
            }
        ).then((response) =>
            response.status === 200
                ? router.push(`http://localhost:3000/courses/info`)
                : null
        );
    };

    return (
        <div className={classes.feedback}>
            <h2>add your feedback</h2>

            {ctx.isLoggedin ? (
                <form onSubmit={submitHandler}>
                    <input type="text" ref={inputRef} />
                    <button>Send </button>
                </form>
            ) : (
                <h2>Login in please</h2>
            )}
        </div>
    );
};

export default Feedback;
