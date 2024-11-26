import { useState } from "react";

function LogIn({setToken, setMapSize, setShowLogIn, BASE_URL}){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const logInUser = async () => {
        const user = 
            {
             email: email,
             password: password
            }

        const response = await fetch(
            BASE_URL + '/login', {
                method: 'POST',
                headers: {'Content-type': 'application/json'},
                body: JSON.stringify(user)
            }
        );
        if(response.status === 201){
            await setToken(response.json())
            alert("Succesfully logged in.");
            await setShowLogIn(false)
            await setMapSize(["95vw", "75vh"])
        }else {
            alert("Failed to login, status code = " + response.status);
        }
    }

    return (
        <>
            <h3 className="log-in-title">Log In</h3>
            <div className="log-in-container">
                <label>Email:<br></br>
                    <input
                        type="text"
                        placeholder="Enter your email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}/>
                </label>
                <label>Password:<br></br>
                    <input
                        className="post-text"
                        placeholder="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}/>
                </label>
                <button className="log-in-btn" onClick={logInUser}>Log In</button>
            </div>
        </>
    )
}

export default LogIn;