import classes from "./CourseNavbar.module.css";
import Link from "next/link";

const CourseNavbar = () => {
    return (
        <div className={classes.navbar}>
            <ul>
                <li>
                    <Link
                        href={{
                            pathname: `teacher`,
                        }}
                    >
                        Teachers
                    </Link>
                </li>
                <li>
                    <Link
                        href={{
                            pathname: `info`,
                        }}
                    >
                        Info
                    </Link>
                </li>
                <li>
                    <Link
                        href={{
                            pathname: `feedback`,
                        }}
                    >
                        Feedback
                    </Link>
                </li>
                <li>
                    <Link
                        href={{
                            pathname: `news`,
                        }}
                    >
                        News
                    </Link>
                </li>
            </ul>
        </div>
    );
};

export default CourseNavbar;
