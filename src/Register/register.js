import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import AccountForm from "../AccountForm/accountForm";
import accountForm from "../AccountForm/accountForm.module.css";
import FormField from "../FormField/formField";
import Layout from "../Layout/layout";
import { CONFIRMED_STATE } from "../lib/states";
import { useCookies } from "react-cookie";
import config from "../lib/cookieConfig";

export default function Register() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");

	const history = useHistory();
	const setCookie = useCookies(["id", "email", "apiKey"])[1];

	const handleEmailChange = e => setEmail(e.target.value);
	const handlePasswordChange = e => setPassword(e.target.value);
	const handleConfirmPasswordChange = e => setConfirmPassword(e.target.value);
	const handleFirstNameChange = e => setFirstName(e.target.value);
	const handleLastNameChange = e => setLastName(e.target.value);

	const handleRegister = (e, setConfirmed, setErrorMessage) => {
		fetch("https://api.borumtech.com/api/register", {
			method: "POST",
			headers: {
				"content-type": "application/x-www-form-urlencoded",
			},
			body: `email=${email}&password=${password}&first_name=${firstName}&last_name=${lastName}`,
		})
			.then(response => {
				if (response.ok) {
					return response.json();
				} else {
					throw new Error(
						"A system error occurred and you could not be logged in at this time. Please try again another time."
					);
				}
			})
			.then(response => {
				setConfirmed(CONFIRMED_STATE.SUCCESS);

				setEmail("");
				setPassword("");
				setConfirmPassword("");
				setFirstName("");
				setLastName("");

				const storeUserInfo = (name, value) => {
					localStorage.setItem(name, value);
					setCookie(name, value, config);
				};

				storeUserInfo("email", email);
				storeUserInfo("id", response.data.id);
				localStorage.setItem("firstName", firstName);
				localStorage.setItem("lastName", lastName);
				storeUserInfo("apiKey", response.data.api_key);
				

				history.push("/");
			})
			.catch(err => {
				let { message } = err;
				if (err.name !== "Error") {
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
				heading="Register for Borum"
				formProps={{
					onSubmit: handleRegister,
					method: "post",
				}}
				failedAction=" and you could not be registered"
				handleSubmit={handleRegister}
			>
				<FormField
					required
					onChange={handleEmailChange}
					value={email}
					focus
					format="email"
					label="Email"
				/>
				<FormField
					required
					onChange={handleFirstNameChange}
					value={firstName}
					focus
					format="text"
					label="First Name"
				/>
				<FormField
					required
					onChange={handleLastNameChange}
					value={lastName}
					focus
					format="text"
					label="Last Name"
				/>
				<FormField
					required
					onChange={handlePasswordChange}
					value={password}
					format="password"
					label="Password"
				/>
				<FormField
					required
					onChange={handleConfirmPasswordChange}
					value={confirmPassword}
					format="password"
					label="Confirm Password"
				/>
				<Link to="/login">Already have an account? Login</Link>
				<button type="submit" className={accountForm.card}>
					Register
				</button>
			</AccountForm>
		</Layout>
	);
}
