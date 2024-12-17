

function LogOut({setToken}){
    localStorage.setItem('jwt', null);
    localStorage.setItem('currentUserID', null);
    localStorage.setItem('currentUserName', null);
    return (
        <div className="log-out-container">
            <button className="log-out-btn" class="text-white font-semibold py-1 px-3 hover:bg-cyan-200" onClick={(e) => {
              e.preventDefault();
              setToken(null)}}>Log Out</button>
        </div>
    )
}

export default LogOut;