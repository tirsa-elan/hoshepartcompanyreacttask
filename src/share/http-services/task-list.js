import api from './base-service';


export function getAllTask(search = '') {
    return api.get('/tasks', {
        params: search.trim() ? { q: search.trim() } : {}
    });
}


export function  addTasks(obj) {
    return api.post('/tasks' , obj);
}


export function getTaskdetailbyId(id){
    return api.get(`/tasks/${id}`);
}



export function updateTaskdetailbyId(id,obj){
    return api.put(`/tasks/${id}` , obj);
}

export function deleteTaskdetailbyId(id){
    return api.delete(`/tasks/${id}`);
}