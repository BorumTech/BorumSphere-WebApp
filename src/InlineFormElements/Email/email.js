import { useState } from "react";
import { useCookies } from "react-cookie";
import config from "../../lib/cookieConfig";
import { setFormElement } from "../../reactExtensions";
import inlineFormElements from "../inlineFormElements.module.css";

export default function Email(props) {
	const [cookies, setCookie] = useCookies(["id", "email", "apiKey"]);
	const [email, setEmail] = useState(cookies.email);

	const onEmailSaveClick = e => {
		fetch("https://api.borumtech.com/api/login", {
			method: "PUT",
			headers: {
				"content-type": "application/x-www-form-urlencoded",
				"authorization": "Basic " + cookies.apiKey
			},
			body: `email=${email}`,
		}).then(response => {
			if (response.ok) {
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
