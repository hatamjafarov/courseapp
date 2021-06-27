import { createContext, useState } from "react";

const Context = createContext({
    isLoggedin: false,
    loginHandler: () => {},
    logoutHandler: () => {},
    userDetail: () => {},
    userID: "",
    username: '',
    getCoursePath: () => {},
    path: "",
    getName: () => {},
});

export const ContextProvider = (props) => {
    const [log, setLog] = useState(false);
    const [user, setUser] = useState("");
    const [coursePath, setCoursePath] = useState("");
    const [uname, setUname] = useState("");
    const loginHandler = () => {
        setLog(true);
    };

    const logoutHandler = () => {
        setLog(false);
    };

    const getName = (username) => {
        setUname(username);
        console.log(uname)
    };

    const userDetail = (userId) => {
        setUser(userId);
    };

    const getCoursePath = (path) => {
        setCoursePath(path);
        console.log(path);
    };

    const contextValue = {
        isLoggedin: log,
        loginHandler: loginHandler,
        userDetail: userDetail,
        logoutHandler: logoutHandler,
        getCoursePath: getCoursePath,
        userID: user,
        username: uname,
        path: coursePath,
        getName: getName,
    };

    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    );
};

export default Context;
