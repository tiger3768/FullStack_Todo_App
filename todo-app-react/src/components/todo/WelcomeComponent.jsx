import {Link} from "react-router-dom";
import { useAuth } from "./security/AuthContext";

export default function WelcomeComponent(){
    const {username} =  useAuth()
    return(
        <div className="welcome">
            <h1>Welcome {username}</h1>
            <div>
                <Link to='/todos'>Your Todos.</Link>
            </div>
        </div>   
    )
}