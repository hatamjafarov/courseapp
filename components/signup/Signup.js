import { useRef, useState } from "react";
import classes from "./Signup.module.css";
import Link from "next/link";

const Register = () => {
    const [sending, setSending] = useState(false);
    const [passValid, setPassValid] = useState(true);
    const [allowSignUp, setAllowSignUp] = useState(true);
    const [existName, setExistName] = useState("");
    const [success, setSuccess] = useState(false);

    const SIGNUP_URL =
        "https://course-app-b602d-default-rtdb.firebaseio.com/accounts.json";

    const isValid = (value) => value.trim().length > 3;
    const checker = [];
    var statusOK = false;

    const nameRef = useRef();
    const surnameRef = useRef();
    const userRef = useRef();
    const passRef = useRef();
    const subjetRef = useRef();
    const genderRef = useRef();
    const acitivityRef = useRef();

    const tryAgain = () => {
        setSending(false);
    };

    const SubmitHandler = async (e) => {
        e.preventDefault();

        const signupData = {
            name: nameRef.current.value,
            surname: surnameRef.current.value,
            username: userRef.current.value,
            pass: passRef.current.value,
            subject: subjetRef.current.value,
            gender: genderRef.current.value,
            acitivity: acitivityRef.current.value,
        };

        const nameIsValid = isValid(nameRef.current.value);

        if (!nameIsValid) {
            setSending(false);
            setPassValid(false);
            return;
        }

        const response = await fetch(SIGNUP_URL);
        const responseData = await response.json();

        const checker = Object.keys(responseData).filter(
            (elem) =>
                responseData[elem].signupData.username == signupData.username
        );
        setExistName(signupData.username);

        setAllowSignUp(false);
        if (responseData) {
            if (checker.length === 0) {
                setSending(true);
                setAllowSignUp(true);
                setExistName("");

                await fetch(SIGNUP_URL, {
                    method: "POST",
                    body: JSON.stringify({ signupData }),
                }).then((response) =>
                    response.status === 200
                        ? (statusOK = true)
                        : (statusOK = false)
                );
            }
        }
        if (statusOK === true) {
            setSuccess(true);
        } else {
            setSuccess(false);
            setSending(false);
        }


        setPassValid(true);
    };

    const ChangeHandler = () => {
        if (existName !== userRef.current.value) {
            setAllowSignUp(true);
        } else {
            setAllowSignUp(false);
        }
    };

    return (
        <div className={classes.signup}>
            {!sending ? (
                <form className={classes.signup_form} onSubmit={SubmitHandler}>
                    <div>
                        <label htmlFor="name">Name</label>
                        <input type="text" required id="name" ref={nameRef} />
                        <h2
                            className={
                                passValid ? classes.invisible : classes.visible
                            }
                        >
                            pass not valid
                        </h2>
                    </div>
                    <div>
                        <label htmlFor="surname">Surname</label>
                        <input
                            type="text"
                            required
                            id="surname"
                            ref={surnameRef}
                        />
                    </div>
                    <div>
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            required
                            id="username"
                            ref={userRef}
                            onChange={ChangeHandler}
                        />
                        <h2
                            className={
                                !allowSignUp
                                    ? classes.visible
                                    : classes.invisible
                            }
                        >
                            this username already exist
                        </h2>
                    </div>
                    <div>
                        <label htmlFor="pass">Password</label>
                        <input
                            type="password"
                            required
                            id="pass"
                            ref={passRef}
                        />
                    </div>
                    <div>
                        <label htmlFor="subject">Subject</label>
                        <select ref={subjetRef}>
                            <option value="Math">Math</option>
                            <option value="React">React</option>
                            <option value="Vue">Vue</option>
                            <option value="Angular">Angular</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="gender">Gender</label>
                        <select ref={genderRef}>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="activity">Activity</label>
                        <select ref={acitivityRef}>
                            <option value="student">Student</option>
                            <option value="teacher">Teacher</option>
                        </select>
                    </div>
                    <div>
                        <button>Sign up!</button>
                    </div>
                </form>
            ) : success ? (
                <div>
                    <h2>you have successfully registered</h2>
                    <Link href="/login">Log in</Link>
                </div>
            ) : (
                <div>
                    <h2>smth went wrong</h2>
                    <h2 onClick={tryAgain}>try again</h2>
                </div>
            )}
        </div>
    );
};

export default Register;
