import classes from "./Navigation.module.css";
import Link from "next/link";
import Context from "../../store/context";
import { Fragment, useContext, useEffect, useState } from "react";

const Navigation = () => {
    const ctx = useContext(Context);

    const [logged, setLogged] = useState(ctx.isLoggedin);
    const [username, setUsername] = useState("");
    useEffect(async () => {
        setLogged(ctx.isLoggedin);

        if (ctx.isLoggedin) {
            if (ctx.userID) {
                const SIGNUP_URL =
                    "https://course-app-b602d-default-rtdb.firebaseio.com/accounts.json";

                const response = await fetch(SIGNUP_URL);
                const responseData = await response.json();
                if (responseData) {
                    setUsername(responseData[ctx.userID].signupData.name);
                    const instantName = responseData[ctx.userID].signupData.name;
                    ctx.getName(instantName)
                }
            }
        }
    }, [ctx.isLoggedin, ctx.userID]);

    const logOut = () => {
        ctx.logoutHandler();
    };

    return (
        <div className={classes.header}>
            <div>
                <Link href="/">Course App</Link>
            </div>
            <nav>
                <ul>
                    <li>
                        <Link href="/courses">Courses</Link>
                    </li>
                    {!logged ? (
                        <Fragment>
                            <li>
                                <Link href="/login">Log in</Link>
                            </li>
                            <li>
                                <Link href="/signup">Sign Up</Link>
                            </li>
                        </Fragment>
                    ) : (
                        <Fragment>
                            <li>{username}</li>
                            <li onClick={logOut}>Log out</li>
                        </Fragment>
                    )}
                </ul>
            </nav>
        </div>
    );
};

export default Navigation;
