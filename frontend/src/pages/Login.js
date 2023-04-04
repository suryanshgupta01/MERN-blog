import { useState } from "react"
import { useLogin } from '../hooks/useLogin'

const Login = () => {

    const [Email, setEmail] = useState("");
    const [password, setpassword] = useState("");
    const { login, error, isloading } = useLogin()

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(Email, password)
        await login(Email, password)
    }
    return (
        <>
            <form className="login" onSubmit={handleSubmit}>

                <h3>Log in</h3>
                <label >Email:</label>
                <input type="email" value={Email} onChange={(e) => setEmail(e.target.value)} />

                <label >password:</label>
                <input type="password" value={password} onChange={(e) => setpassword(e.target.value)} />
                <button disabled={isloading}>Log in</button>
                {error && <div className="error">{error}</div>}
            </form>
        </>
    )
}
export default Login