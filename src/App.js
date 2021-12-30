import Register from "./Register/register";
import Login from "./Login/login";
import Logout from "./Logout/logout";
import "./App.css";
import { Route, BrowserRouter, Switch, Redirect } from "react-router-dom";
import ForgotPassword from "./ForgotPassword/forgotPassword";
import ResetPassword from "./ResetPassword/resetPassword";
import AccountSettings from "./AccountSettings/accountSettings";
import ActivatedAppsList from "./ActivatedAppsList/activatedAppsList";

function App() {
	return (
		<BrowserRouter>
			<Switch>
				<Route exact path="/">
					<Redirect to={localStorage.getItem('apiKey') ? '/account' : '/login'} />
				</Route>
				<Route path="/account">
					<AccountSettings />
				</Route>
				<Route path="/apps">
					<ActivatedAppsList />
				</Route>
				<Route path="/signup">
					<Register />
				</Route>
				<Route path="/login">
					<Login />
				</Route>
				<Route path="/logout">
					<Logout />
				</Route>
				<Route path="/forgot-password">
					<ForgotPassword />
				</Route>
				<Route path="/reset-password">
					<ResetPassword />
				</Route>
			</Switch>
		</BrowserRouter>
	);
}

export default App;



/* 
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppWithRouterAccess from './AppWithRouterAccess/AppWithRouterAccess';

const App = () => (
  <Router>
    <AppWithRouterAccess/>
  </Router>
);
export default App;

 */