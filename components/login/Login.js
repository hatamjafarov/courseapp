import { useContext, useRef, useState } from "react";
import classes from "./Login.module.css";
import Context from "../../store/context";
import { useRouter } from "next/router";

const Login = (props) => {
    const userRef = useRef();
    const passRef = useRef();
    const [success, setSuccess] = useState(true);
    const [login, setLogin] = useState(false);

    const router = useRouter();

    const ctx = useContext(Context);

    const SubmitLoginHandler = async (e) => {
        e.preventDefault();

        const SIGNUP_URL =
            "https://course-app-b602d-default-rtdb.firebaseio.com/accounts.json";

        const loginData = {
            username: userRef.current.value,
            pass: passRef.current.value,
        };

        const response = await fetch(SIGNUP_URL);
        const responseData = await response.json();
        const checker = Object.keys(responseData).filter(
            (elem) =>
                responseData[elem].signupData.username == loginData.username &&
                responseData[elem].signupData.pass == loginData.pass
        );
        if (checker.length === 1) {
            if (responseData[checker].signupData.image) {
                Object.keys(responseData[checker].signupData.image).map(
                    (val) => {
                        ctx.getUserImg(
                            responseData[checker].signupData.image[val].formData
                        );
                        ctx.setImgId(
                            val
                        )
                    }
                );
            }
            router.push("/");
            setSuccess(true);
            setLogin(true);
            props.handleSuccess();
            ctx.isLoggedin = true;
            ctx.loginHandler();
            ctx.userDetail(checker[0]);
        } else {
            setSuccess(false);
        }
    };

    return (
        <div className={classes.login}>
            {login ? (
                <h4>You logged in</h4>
            ) : (
                <form
                    className={classes.login_form}
                    onSubmit={SubmitLoginHandler}
                >
                    <div>
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            required
                            id="username"
                            ref={userRef}
                            autoComplete="on"
                        />
                    </div>
                    <div>
                        <label htmlFor="pass">Password</label>
                        <input
                            type="password"
                            required
                            id="pass"
                            ref={passRef}
                            autoComplete="on"
                        />
                    </div>
                    <div
                        className={
                            success ? classes.invisible : classes.visible
                        }
                    >
                        <h5>Username or Password is wrong</h5>
                    </div>

                    <div>
                        <button>Sign up!</button>
                    </div>
                </form>
            )}
        </div>
    );
};

export default Login;
