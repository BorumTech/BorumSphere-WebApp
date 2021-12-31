import { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import AccountForm from "../AccountForm/accountForm";
import login from "../AccountForm/accountForm.module.css";
import FormField from "../FormField/formField";
import Layout from "../Layout/layout";
import { CONFIRMED_STATE } from "../lib/states";
import { useCookies } from "react-cookie";
import config from "../lib/cookieConfig";

export default function Login() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const setCookie = useCookies(['id', 'email', 'apiKey'])[1];

	const history = useHistory("");

	const urlParams = new URLSearchParams(window.location.search);

	useEffect(() => {
		document.title = "Login - Borum Sphere";
	}, []);

	const handleLogin = (e, setConfirmed, setErrorMessage) => {
		fetch("https://api.borumtech.com/api/login", {
			method: "POST",
			headers: {
				"content-type": "application/x-www-form-urlencoded",
			},
			body: `email=${email}&password=${password}`,
		})
			.then(response => {
				if (response.ok) {
					return response.json();
				} else if (response.status === 401) {
					throw new Error(
						"The email or password you entered was incorrect. Please try again."
					);
				} else {
					throw new Error(
						"A system error occurred and you could not be logged in at this time"
					);
				}
			})
			.then(response => {

				const storeUserInfo = (name, value) => {
					localStorage.setItem(name, value);
					setCookie(name, value, config);
				};

				setConfirmed(CONFIRMED_STATE.SUCCESS);
				storeUserInfo("id", response.data.id);
				storeUserInfo("email", email);
				localStorage.setItem("firstName", response.data.first_name);
				localStorage.setItem("lastName", response.data.last_name);
				storeUserInfo("apiKey", response.data.api_key);
				
				// Redirect for SSO
				urlParams.has("redirect") ? history.push(urlParams.get("redirect")) : history.push("/account");
			})
			.catch(err => {
				let { message } = err;

				if (err.name !== 'Error') {
					message =
						"A system error occurred and you could not be logged in at this time. Please try again another time.";
				}

				console.error(err);
				setErrorMessage(message);
				setConfirmed(CONFIRMED_STATE.FAILURE);
			});
	};

	return (
		<Layout>
			<AccountForm
				heading="Login into Borum"
				formProps={{ method: "post" }}
				handleSubmit={handleLogin}
				failedAction=" and you could not be logged in"
			>
				<FormField
					autofocus
					label="email"
					format="email"
					required
					value={email}
					onChange={e => setEmail(e.target.value)}
				/>
				<FormField
					label="password"
					format="password"
					required
					value={password}
					onChange={e => setPassword(e.target.value)}
				/>
				<a target="_blank" rel="noreferrer" href="/forgot-password">
					Forgot password? Reset it
				</a>
				<Link to={"/signup" + (urlParams.has("redirect") ? `?redirect=${urlParams.get("redirect")}` : "")}>Don't have an account yet? Register</Link>
				<button type="submit" className={login.card}>
					Login
				</button>
			</AccountForm>
		</Layout>
	);
}
