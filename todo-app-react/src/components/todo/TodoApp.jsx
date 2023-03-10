import LoginComponent from "./LoginComponent";
import WelcomeComponent from "./WelcomeComponent";
import ErrorComponent from "./ErrorComponent";
import ListTodosComponent from "./ListTodosComponent";
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import HeaderComponent from "./HeaderComponent";
import FooterComponent from "./FooterComponent";
import LogOutComponent from "./LogOutComponent";
import AuthProvider, { useAuth } from "./security/AuthContext"
import TodoComponent from "./TodoComponent";

export default function TodoApp(){
    function AuthenticatedRoute({children}){
        const authContext = useAuth()
        if(authContext.isAuthenticated) return children
        return <Navigate to="/"></Navigate>
    }
    return(
        <div className="App">
            <AuthProvider>
                <BrowserRouter>
                    <HeaderComponent />
                    <Routes>
                        <Route path='/' element={<LoginComponent />}></Route>
                        <Route path='/login' element={<LoginComponent />}></Route>
                        <Route path='/welcome/:username' element={
                            <AuthenticatedRoute>
                                <WelcomeComponent />
                            </AuthenticatedRoute>
                            }>
                        </Route>
                        <Route path='/todos' element={
                            <AuthenticatedRoute>
                                <ListTodosComponent />
                            </AuthenticatedRoute>
                            }>
                        </Route>
                        <Route path='/todo/:id' element={
                            <AuthenticatedRoute>
                                <TodoComponent />
                            </AuthenticatedRoute>
                            }>
                        </Route>
                        <Route path='/*' element={<ErrorComponent />}></Route>
                        <Route path='/logout' element={
                            <AuthenticatedRoute>
                                <LogOutComponent />
                            </AuthenticatedRoute>
                            }>
                        </Route>
                    </Routes>
                    <FooterComponent />
                </BrowserRouter>
            </AuthProvider>
        </div>
    );
}