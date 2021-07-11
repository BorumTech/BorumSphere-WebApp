import { useEffect, useState } from "react";
import Layout from "../Layout/layout";
import Sidebar from "../Sidebar/sidebar";
import activatedAppsList from "./activatedAppsList.module.css";

export default function ActivatedAppsList() {
    const [activatedApps, setActivatedApps] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:8400/login`, {
            headers: {
                authorization: `Basic ${localStorage.getItem('apiKey')}`
            }
        }).then(response => {
            if (response.ok && response.status !== 204) {
                return response.json();
            }
        }).then(response => {
            setActivatedApps(response.data.filter(item => item.activated));
        });

        document.title = "Activated Apps - Borum Sphere";
    }, []);

    return (
        <Layout sidebar={<Sidebar />}>
            <main className={activatedAppsList.container}>
                <h2>Activated Borum Apps</h2>
                <p>{activatedApps.length} Activated Borum Apps</p>
                <ul>
                    {activatedApps.map(item => <li key={item.name.replace(/\s/g, "")}><img width={50} src={item.logoSrc} alt={`${item.name} Logo`} />{item.name}</li>)}
                </ul>
            </main>            
        </Layout>

    );
}