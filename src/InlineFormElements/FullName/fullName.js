import { useCookies } from "react-cookie";
import inlineFormElements from "../inlineFormElements.module.css";

export default function FullName(props) {
	const [cookies, setCookie] = useCookies(["id", "fullName", "apiKey"]);
	const firstName = cookies.firstName ?? "";
	const lastName = cookies.lastName ?? "";
	const fullName = firstName + " " + lastName;

	const saveNewName = () => {
		fetch("https://api.borumtech.com/api/login", {
			method: "PUT",
			headers: {
				authorization: `Basic ${cookies.apiKey}`,
				"content-type": "application/x-www-form-urlencoded",
			},
			body: `firstName=${firstName}&lastName=${lastName}`,
		})
			.then(response => response.json())
			.then(response => {
				if (
					response.statusCode < 200 ||
					response.statusCode >= 300 ||
					!response.ok
				) {
					alert(
						"Your first name and last name could not be updated because of a system error"
					);
				} else {
					setCookie("firstName", firstName);
					setCookie("lastName", lastName);
				}
			});
	};

	return (
		<div className={inlineFormElements.inlineFormElement}>
			<label>Full Name</label>
            <h2 contentEditable="true" suppressContentEditableWarning="true">{fullName}</h2>
			<button onClick={saveNewName}>Save</button>
		</div>
	);
}
