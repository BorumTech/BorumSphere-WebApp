import { useEffect, useState } from "react";
import { setFormElement } from "../../reactExtensions";
import inlineFormElements from "../inlineFormElements.module.css";
import { useCookies } from "react-cookie";
import config from "../../lib/cookieConfig";

export default function Email(props) {
	const [email, setEmail] = useState("");
	const setCookie = useCookies(["email"])[1]

	useEffect(() => {
		setEmail(localStorage.getItem("email"));
	}, []);

	const onEmailSaveClick = e => {
		fetch("https://api.borumtech.com/api/login", {
			method: "PUT",
			headers: {
				"content-type": "application/x-www-form-urlencoded",
				"authorization": "Basic " + localStorage.getItem("apiKey")
			},
			body: `email=${email}`,
		}).then(response => {
			if (response.ok) {
				localStorage.setItem("email", email);
				setCookie("email", email, config)
			} else 
				alert("A system error occurred and the email could not be changed. We apologize for the inconvenience.");
		})
	};

	return (
		<div className={inlineFormElements.inlineFormElement}>
			<label htmlFor="email">Email</label>
			<input id="email" value={email} contentEditable="true" onChange={setFormElement(setEmail)} />
            <button onClick={onEmailSaveClick}>Save</button>
		</div>
	);
}
