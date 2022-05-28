import FormField from "../FormField/formField";
import { useState } from "react";
import changePassword from "../AccountForm/accountForm.module.css";
import { setFormElement } from "../reactExtensions";
import { useCookies } from "react-cookie";

export default function ChangePassword(props) {
	const [currentPassword, setCurrentPassword] = useState("");
	const [newPassword, setNewPassword] = useState("");
	const [confirmNewPassword, setConfirmNewPassword] = useState("");
	const [cookies] = useCookies(["id", "email", "apiKey"]);

	const handleChangePasswordClick = e => {
		e.preventDefault();

		fetch("https://api.borumtech.com/api/login", {
			method: "PUT",
			headers: {
				"content-type": "application/x-www-form-urlencoded",
				authorization: "Basic " + cookies.apiKey,
			},
			body: `old_password=${currentPassword}&new_password=${newPassword}`,
		})
			.then(response => response.json()).then(response => {
				if (response.statusCode >= 200 && response.statusCode < 300)	
					return response;
				
				throw new Error(response.error.message);
			})
			.then(response => {
				alert("Password changed successfully");
			})
			.catch(e => {
				console.error(e);
				alert(e);
			});
	};

	return (
		<form
			style={{ width: "auto" }}
			onSubmit={handleChangePasswordClick}
			className={changePassword.form}
		>
			<FormField
				labelContent="Current Password"
				label="currpass"
				format="password"
				required
				value={currentPassword}
				onChange={setFormElement(setCurrentPassword)}
			/>
			<FormField
				labelContent="New Password"
				label="newpass"
				format="password"
				required
				value={newPassword}
				onChange={setFormElement(setNewPassword)}
			/>
			<FormField
				labelContent="Confirm New Password"
				label="confnewpass"
				format="password"
				required
				value={confirmNewPassword}
				onChange={setFormElement(setConfirmNewPassword)}
			/>

			<button type="submit" className={changePassword.card}>
				Change my Password
			</button>
		</form>
	);
}
