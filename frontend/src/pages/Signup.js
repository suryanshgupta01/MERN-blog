import { useState } from "react"
import useSignup from "../hooks/useSignup";
const Signup = () => {
    const [Email, setEmail] = useState("");
    const [password, setpassword] = useState("");
    const { signup, error, isloading } = useSignup()
    const handleSubmit = async (e) => {
        e.preventDefault()
        // console.log(Email, password)
        await signup(Email, password)

    }
    return (
        <>
            <form className="signup" onSubmit={handleSubmit}>

                <h3>Sign up</h3>
                <label >Email:</label>
                <input type="email" value={Email} onChange={(e) => setEmail(e.target.value)} />

                <label >password:</label>
                <input type="password" value={password} onChange={(e) => setpassword(e.target.value)} />
                <button disabled={isloading}>Submit</button>
                {error && <div className="error">{error}</div>}
            </form>
        </>
    )
}
export default Signup