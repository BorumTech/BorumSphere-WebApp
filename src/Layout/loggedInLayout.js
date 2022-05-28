import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import Sidebar from "../Sidebar/sidebar";
import "./layout.css";
import { useCookies } from "react-cookie";

export default function LoggedInLayout(props) {
    const history = useHistory();
    const [cookies, setCookie, removeCookie] = useCookies(["id", "email", "apiKey"]);

    useEffect(() => {
        if (!cookies.apiKey) {
            window.location.href = "https://accounts.borumtech.com/login?redirect=Jot";
        }
    }, []);
    return (
        <div id="outer-container" className="container loggedInContainer">
            <Sidebar />
            <div id="page-wrap">{props.children}</div>
        </div>
    );
}