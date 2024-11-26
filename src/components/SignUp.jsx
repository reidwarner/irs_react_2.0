import { useState } from "react";

function SignUp({setMapSize, setShowSignUp, setShowLogIn, BASE_URL}){
    const [email, setEmail] = useState('');
    const [f_name, setFName] = useState('');
    const [l_name, setLName] = useState('');
    const [user_name, setUserName] = useState('');
    const [password, setPassword] = useState('');

    const createUser = async () => {
        const newUser = 
            {
             email: email,
             f_name: f_name,
             l_name: l_name,
             user_name: user_name,
             password: password
            }

        const response = await fetch(
            BASE_URL + '/signup', {
                method: 'POST',
                headers: {'Content-type': 'application/json'},
                body: JSON.stringify(newUser)
            }
        );
        if(response.status === 201){
            alert("Succesfully created new user");
            await setShowSignUp(false)
            await setShowLogIn(true)
        }else {
            alert("Failed to add user, status code = " + response.status);
        }
    }

    return (
        <>
            <h3 className="signup-title">Sign Up</h3>
            <div className="signup-container">
                <label>Email:<br></br>
                    <input
                        type="text"
                        placeholder="Enter your email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}/>
                </label>
                <label>First Name:<br></br>
                    <input
                        type="text"
                        placeholder="Enter your first name"
                        value={f_name}
                        onChange={e => setFName(e.target.value)}/>
                </label>
                <label>Last Name:<br></br>
                    <input
                        type="text"
                        placeholder="Enter your last name"
                        value={l_name}
                        onChange={e => setLName(e.target.value)}/>
                </label>
                <label>Create a user name:<br></br>
                    <input
                        type="text"
                        placeholder="username"
                        value={user_name}
                        onChange={e => setUserName(e.target.value)}/>
                </label>
                <label>Create a password:<br></br>
                    <input
                        className="text"
                        placeholder="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}/>
                </label>
                <button className="sign-up-btn" onClick={createUser}>Create</button>
            </div>
        </>
    )
}

export default SignUp;