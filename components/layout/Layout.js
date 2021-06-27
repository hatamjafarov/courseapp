import Navigation from "./Navigation";
import Context from "../../store/context";
import { useContext, useEffect } from "react";

const Layout = (props) => {
    const ctx = useContext(Context);
    // console.log(ctx.isLoggedin);
    
    useEffect(() => {
        // console.log('layout works')
    }, [ctx.isLoggedin]);
    
    return (
        <div>
            <Navigation />
            <main>{props.children}</main>
        </div>
    );
};

export default Layout;
