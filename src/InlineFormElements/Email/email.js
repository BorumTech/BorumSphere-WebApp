import { useState } from "react";
import { setFormElement } from "../../reactExtensions";
import inlineFormElements from "../inlineFormElements.module.css";

export default function Email(props) {
	const [email, setEmail] = useState(sessionStorage.getItem("email"));

	const onEmailSaveClick = e => {
		fetch("https://api.bforborum.com/api/login", {
			method: "PUT",
			headers: {
				"content-type": "application/x-www-form-urlencoded",
				"authorization": "Basic " + sessionStorage.getItem("apiKey")
			},
			body: `email=${email}`,
		}).then(response => response.json()).then(response => {
			if (!response.ok) {
				alert("A system error occurred and the email could not be changed. We apologize for the inconvenience.");
			}
		})
	};

	return (
		<div className={inlineFormElements.inlineFormElement}>
			<label>Email</label>
			<p contentEditable="true" onChange={setFormElement(setEmail)}>{email}</p>
            <button onClick={onEmailSaveClick}>Save</button>
		</div>
	);
}
