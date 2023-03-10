import axios from "axios";
export const apiClient = axios.create(
    {
        baseURL:'http://localhost:8080'
    }
)
export function getAuthenticated(username, password){
    return apiClient.post(`/authenticate`, {username, password})
}
export function retrieveTodosForUsername(username){
    return apiClient.get(`users/${username}/todos`)
}
export function retrieveTodoForUsername(username, id){
    return apiClient.get(`users/${username}/todos/${id}`)
}
export function deleteTodoForUsername(username, id){
    return apiClient.delete(`users/${username}/todos/${id}`)
}
export function updateTodoForUsername(username, id, todo){
    return apiClient.put(`users/${username}/todos/${id}`, todo)
}
export function createTodoForUsername(username, todo){
    return apiClient.post(`users/${username}/todos`, todo)  
}
