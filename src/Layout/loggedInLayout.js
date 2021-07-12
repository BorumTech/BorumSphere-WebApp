import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import Sidebar from "../Sidebar/sidebar";
import layout from "./layout.module.css";

export default function LoggedInLayout(props) {
    const history = useHistory();

    useEffect(() => {
        if (!localStorage.getItem('apiKey')) {
            history.push('/login');
        }
    }, [history]);
    return (
        <div id="outer-container" className={`${layout.container} ${layout.loggedInContainer}`}>
            <Sidebar />
            <div id="page-wrap">{props.children}</div>
        </div>
    );
}