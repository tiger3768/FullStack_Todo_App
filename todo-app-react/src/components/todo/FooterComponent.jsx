import { useAuth } from "./security/AuthContext"

export default function FooterComponent(){
    const authContext = useAuth()
    return(
        <footer className="footer">
            <div className="container">
                <hr />Footer
            </div>
        </footer>
    )
}