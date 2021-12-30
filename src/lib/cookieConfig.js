import { live } from "./states";

const config = { 
    path: '/', 
    domain: live ? '.borumtech.com' : 'localhost', 
    sameSite: 'strict'
};

export default config;