import Navbar from "./navbar";
import { Outlet } from "react-router-dom";
import HomePage from "./homePage";

export default () => {

    return (
        <>
            <Navbar></Navbar>
            <HomePage></HomePage>
            <Outlet />
        </>
    );
}
