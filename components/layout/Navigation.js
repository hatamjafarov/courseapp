import classes from "./Navigation.module.css";
import Link from "next/link";
import Context from "../../store/context";
import { Fragment, useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import userImage from "../../assets/image/user.png";

const Navigation = () => {
    const ctx = useContext(Context);

    const router = useRouter();

    const [logged, setLogged] = useState(ctx.isLoggedin);
    const [username, setUsername] = useState("");
    const [image, setImage] = useState("");

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
                    const instantName =
                        responseData[ctx.userID].signupData.name;
                    const instantActivity =
                        responseData[ctx.userID].signupData.acitivity;
                    ctx.getName(instantName);
                    ctx.getActivity(instantActivity);
                }
                setImage(ctx.userImg);
            }
        }
    }, [ctx.isLoggedin, ctx.userID]);

    const logOut = () => {
        ctx.logoutHandler();
        router.push("/login");
    };

    const handleFile = async (e) => {
        let img = e.target.files[0];
        let formData = {};
        const toBase64 = (file) =>
            new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = () => resolve(reader.result);
                reader.onerror = (error) => reject(error);
            });

        formData = await toBase64(img);

        await fetch(
            `https://course-app-b602d-default-rtdb.firebaseio.com/accounts/${ctx.userID}/signupData/image.json`,
            {
                method: "DELETE",
                body: JSON.stringify({ formData }),
            }
        );

        await fetch(
            `https://course-app-b602d-default-rtdb.firebaseio.com/accounts/${ctx.userID}/signupData/image.json`,
            {
                method: "POST",
                body: JSON.stringify({ formData }),
            }
        );

        setImage(formData);
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
                            <li>
                                <form>
                                    <div className={classes.image_upload}>
                                        <label htmlFor="file-input">
                                            <img
                                                src={
                                                    image
                                                        ? image
                                                        : "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/1024px-User-avatar.svg.png"
                                                }
                                                alt=""
                                            />
                                            {username}
                                        </label>

                                        <input
                                            id="file-input"
                                            type="file"
                                            name="file"
                                            onChange={handleFile}
                                        />
                                    </div>
                                </form>
                            </li>
                            <li></li>
                            <li onClick={logOut}>Log out</li>
                        </Fragment>
                    )}
                </ul>
            </nav>
        </div>
    );
};

export default Navigation;
