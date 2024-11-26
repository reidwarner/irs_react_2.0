

function LogOut({setToken}){
    return (
        <div className="log-out-container">
            <button className="log-out-btn" onClick={setToken(null)}>Log In</button>
        </div>
    )
}

export default LogOut;