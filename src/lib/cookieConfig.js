import { live } from "./states";

const config = { 
    path: '/', 
    domain: live ? 'borumtech.com' : 'localhost', 
    sameSite: 'lax',
    secure: true
};

export default config;