import Login from "../components/login/Login";

const LoginPage = (props) => {
    return <Login handleSuccess={props.handleSuccess} />;
};

export default LoginPage;
