import { createContext, useState } from "react";

const Context = createContext({
    isLoggedin: false,
    userID: "",
    username: "",
    userActivity: "",
    userImg: "",
    imgId: "",
    path: "",
    loginHandler: () => {},
    logoutHandler: () => {},
    userDetail: () => {},
    getCoursePath: () => {},
    getName: () => {},
    getActivity: () => {},
    getUserImg: () => {},
});

export const ContextProvider = (props) => {
    const [log, setLog] = useState(false);
    const [user, setUser] = useState("");
    const [coursePath, setCoursePath] = useState("");
    const [uname, setUname] = useState("");
    const [activity, setActivity] = useState("");
    const [image, setImage] = useState("");
    const [imgID, setImgID] = useState("");

    const loginHandler = () => {
        setLog(true);
    };

    const logoutHandler = () => {
        setLog(false);
        setUser("");
        setUname("");
        setActivity("");
        setImgID("");
        setImage("");
    };

    const getName = (username) => {
        setUname(username);
    };

    const getActivity = (activity) => {
        setActivity(activity);
    };

    const getUserImg = (image) => {
        setImage(image);
    };

    const setImgId = (imgId) => {
        setImgID(imgId);
    };

    const userDetail = (userId) => {
        setUser(userId);
    };

    const getCoursePath = (path) => {
        setCoursePath(path);
    };

    const contextValue = {
        isLoggedin: log,
        userID: user,
        username: uname,
        path: coursePath,
        userActivity: activity,
        userImg: image,
        imgId: imgID,
        loginHandler: loginHandler,
        userDetail: userDetail,
        logoutHandler: logoutHandler,
        getCoursePath: getCoursePath,
        getName: getName,
        getActivity: getActivity,
        getUserImg: getUserImg,
        setImgId: setImgId,
    };

    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    );
};

export default Context;
