import { useState } from "react";

function SignUp({setShowSignUp, setShowLogIn, BASE_URL}){
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
            <div className="signup-container" class='relative bg-white py-5 px-5 rounded-lg shadow-lg w-1/2'>
                <h3 className="signup-title" class="font-semibold text-center text-2xl mt-1 mb-2">Sign Up</h3>
                <label class="block text-gray-700 font-semibold mb-2">Email:<br></br>
                    <input
                        type="email"
                        placeholder="Enter your email"
                        class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        value={email}
                        onChange={e => setEmail(e.target.value)}/>
                </label>
                <label class="block text-gray-700 font-semibold mb-2">First Name:<br></br>
                    <input
                        type="text"
                        placeholder="Enter your first name"
                        class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        value={f_name}
                        onChange={e => setFName(e.target.value)}/>
                </label>
                <label class="block text-gray-700 font-semibold mb-2">Last Name:<br></br>
                    <input
                        type="text"
                        placeholder="Enter your last name"
                        class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        value={l_name}
                        onChange={e => setLName(e.target.value)}/>
                </label>
                <label class="block text-gray-700 font-semibold mb-2">Create a user name:<br></br>
                    <input
                        type="text"
                        placeholder="username"
                        class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        value={user_name}
                        onChange={e => setUserName(e.target.value)}/>
                </label>
                <label class="block text-gray-700 font-semibold mb-2">Create a password:<br></br>
                    <input
                        className="text"
                        type="password"
                        placeholder="password"
                        class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        value={password}
                        onChange={e => setPassword(e.target.value)}/>
                </label>
                <button className="sign-up-btn" class="w-full py-3 mt-4 bg-blue-500 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-300 transition duration-300" onClick={createUser}>Create</button>
            </div>
        </>
    )
}

export default SignUp;