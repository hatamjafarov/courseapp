import { Fragment } from "react";
import Course from "../../../components/courses/course/course";
import CourseNavbar from "../../../components/courses/course/CourseNavbar";

const CoursPage = () => {
    return (
        <Fragment>
            <CourseNavbar />
            <Course />
        </Fragment>
    );
};
export default CoursPage;
