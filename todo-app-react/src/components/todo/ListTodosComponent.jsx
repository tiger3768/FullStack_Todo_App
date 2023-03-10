import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { deleteTodoForUsername, retrieveTodosForUsername} from "./api/TodoApiService"
import { useAuth } from "./security/AuthContext";

export default function ListTodosComponent(){   
    const[todos, setTodos] = useState([])
    const[message, setMessage] = useState(null) 
    const {username} = useAuth()
    const navigate = useNavigate()
    useEffect (
        () => refreshTodos(), []
    )
    function refreshTodos(){
        retrieveTodosForUsername(username)
            .then(response => {
                setTodos(response.data)
            } 
            )
            .catch(error => console.log(error))
    }
    function deleteTodo(id){
        deleteTodoForUsername(username, id)
            .then(
                () => {
                    setMessage(`Deleted Todo with id:${id} successfully`)
                    refreshTodos()
                }
            )
            .catch(error => console.log(error))
    }
    function updateTodo(id){
        navigate(`/todo/${id}`)
    }
    function addNewTodo(){
        navigate(`/todo/-1`)
    }
    return(
        <div className="container">
            <h1>Things...</h1>
            {message && <div className="alert alert-warning">{message}</div>}
            <div>
                <table className="table">
                    <thead>
                        <tr>
                            <th>description</th>
                            <th>done ?</th>
                            <th>target date</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            todos.map(
                                todo=>(
                                    <tr key={todo.id}>
                                        <td>{todo.description}</td>
                                        <td>{todo.done.toString()}</td>
                                        <td>{todo.targetDate.toString()}</td>
                                        <td><button className="btn btn-warning" onClick={() => deleteTodo(todo.id)}>Delete</button></td>
                                        <td><button className="btn btn-success" onClick={() => updateTodo(todo.id)}>Update</button></td>
                                    </tr>
                                )
                            )
                        }
                    </tbody>
                </table>
                <div>
                    <button className="btn btn-success" onClick={addNewTodo}>Create</button>
                </div>
            </div>
        </div>
    )
}