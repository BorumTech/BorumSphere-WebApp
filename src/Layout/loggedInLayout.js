import { useEffect } from "react";
import { useCookies } from "react-cookie";
import Sidebar from "../Sidebar/sidebar";
import "./layout.css";

export default function LoggedInLayout(props) {
    const [cookies] = useCookies(["id", "email", "apiKey"]);

    useEffect(() => {
        if (!cookies.apiKey) {
            window.location.href = "https://accounts.borumtech.com/login?redirect=Jot";
        }
    }, [cookies.apiKey]);
    return (
        <div id="outer-container" className="container loggedInContainer">
            <Sidebar />
            <div id="page-wrap">{props.children}</div>
        </div>
    );
}