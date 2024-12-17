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
            let data = await response.json();
            console.log(data.user);
            setToken(data.token);
            localStorage.setItem('jwt', data.token);
            localStorage.setItem('currentUserID', data.user.id);
            localStorage.setItem('currentUserName', data.user.name);
            alert("Succesfully logged in.");
            await setShowLogIn(false)
            window.location.href = '/';
        }else {
            alert("Failed to login, status code = " + response.status);
        }
    }

    return (
        <>
            <div className="log-in-container" class='bg-white py-3 px-5 rounded-lg shadow-lg w-1/2 h-2/5'>
            <h3 className="log-in-title" class="font-semibold text-center text-2xl">Log In</h3>
                <label class="block text-gray-700 font-semibold mb-2">Email:<br></br>
                    <input
                        type="email"
                        placeholder="Enter your email"
                        class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        value={email}
                        required
                        onChange={e => setEmail(e.target.value)}/>
                </label>
                <label class="block text-gray-700 font-semibold mb-2">Password:<br></br>
                    <input
                        className="post-text"
                        placeholder="password"
                        type="password"
                        class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        value={password}
                        required
                        onChange={e => setPassword(e.target.value)}/>
                </label>
                <button className="log-in-btn" class="w-full py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-300 transition duration-300" onClick={logInUser}>Click To Log In</button>
            </div>
        </>
    )
}

export default LogIn;