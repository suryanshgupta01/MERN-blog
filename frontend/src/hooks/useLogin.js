import { useState } from "react";
import { useAuthContext } from "./useAuthcontext";

export const useLogin = () => {
    const [error, seterror] = useState(null);
    const [isloading, setisloading] = useState(null);
    const { dispatch } = useAuthContext()
    const login = async (email, password) => {
        setisloading(true)
        seterror(null)
        try {
            const res = await fetch("/api/user/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email,
                    password
                })
            })
            const data = await res.json()
            if (!res.ok) {
                // throw new Error(data.message)
                setisloading(false)
                seterror(data.error)
            }
            if (res.ok) {
                //save user to local storage
                localStorage.setItem("user", JSON.stringify(data))

                //update the auth context
                dispatch({ type: "LOGIN", payload: data })

                setisloading(false)
                seterror(null)
            }
        }
        catch (err) {
            setisloading(false)
            seterror(err.message)
        }
    }
    return { login, isloading, error }
}

// export default useLogin;
