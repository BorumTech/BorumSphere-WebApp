import { Link } from "react-router-dom";
import Layout from "../Layout/layout";
import logout from "./logout.module.css";
import { useCookies } from "react-cookie";

export default function Logout() {
	const removeCookie = useCookies(["id", "email", "apiKey"])[2];

    localStorage.clear();
	removeCookie('id'); 
	removeCookie('email'); 
	removeCookie('apiKey');
    
	return (
		<Layout>
			<main className={logout.page}>
				<p className={logout.logout}>You've successfully logged out!</p>
				<Link to="/login">Log In</Link>
				<Link to="/signup">Sign Up</Link>
			</main>
		</Layout>
	);
}
