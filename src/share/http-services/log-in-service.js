
import api from './base-service'; 

export function logInProject(obj) {
    return api.post('/auth/login', obj);
}

export function getCaptcha() {
    return api.get('/auth/login');
}
