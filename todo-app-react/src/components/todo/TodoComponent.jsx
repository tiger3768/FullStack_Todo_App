import { Formik, Form , Field, ErrorMessage } from "formik"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { createTodoForUsername, retrieveTodoForUsername, updateTodoForUsername } from "./api/TodoApiService"
import { useAuth } from "./security/AuthContext"

export default function TodoComponent(){
    const {username} = useAuth()
    const {id} = useParams()
    const[description, setDescription] = useState('')
    const[targetDate, setTargetDate] = useState('')
    const navigate = useNavigate()
    useEffect(
        () => retrieveTodo, [id]
    )
    function retrieveTodo(){    
        if(id != -1){
            retrieveTodoForUsername(username, id)
                .then(response => {
                    setDescription(response.data.description)
                    setTargetDate(response.data.targetDate)
                })
                .catch(error => console.log(error))
        }
    }
    function onSubmit(values){
        let todo
        if(id == -1){
            todo = {
                username, description:values.description, targetDate:values.targetDate, done:false
            } 
            createTodoForUsername(username, todo)
                .then(() => navigate(`/todos`))
                .catch(error => console.log(error))
        }
        else{
            todo = {
                id, username, description:values.description, targetDate:values.targetDate, done:false
            }  
            updateTodoForUsername(username, id, todo)
                .then( () => navigate(`/todos`))
                .catch(error => console.log(error))
        }
        
    }
    function validate(values){
        let errors = {}
        if(values.description.length < 5) {errors.description = 'Enter atleast 5 characters'}   
        if(new Date(values.targetDate.split('-')[0], values.targetDate.split('-')[1], values.targetDate.split('-')[2]) < new Date()) {
            errors.targetDate = 'Enter a target date in future'
        }
        if(values.targetDate==null || values.targetDate=='') errors.targetDate = 'Enter a target date'
        return errors;
    }
    return(
        <div className="container">
            <h1>Enter Todo Details</h1>
            <div>
                <Formik initialValues={{description, targetDate}}
                    enableReinitialize = {true}
                    onSubmit = {onSubmit}
                    validate = {validate}
                    validateOnBlur = {false}
                    validateOnChange = {false}
                >
                {
                    (props) => (
                        <Form>
                            <ErrorMessage
                                name="description"
                                component="div"
                                className="alert alert-warning"
                            />
                            <ErrorMessage
                                name="targetDate"
                                component="div"
                                className="alert alert-warning"
                            />
                            <fieldset className="form-group">
                                <label>Description</label>
                                <Field type="text" className="form-control" name="description" />
                            </fieldset>
                            <fieldset className="form-group">
                                <label>Target Date</label>
                                <Field type="date" className="form-control" name="targetDate"/>
                            </fieldset>
                            <div>
                                <button className="btn btn-success m-3" type="submit">Save</button>
                            </div>
                        </Form>
                    )
                }
                </Formik>
            </div>
        </div>
    )
}