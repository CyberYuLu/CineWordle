import '../styles/navbar.css';
import '../styles/general.css';



export function SidebarView(props) {
    const { user, onSignOut } = props;

    return (
        <nav className="navbar">
            <div className="navbar-left">
                <button onClick={handleGitHubRedirectClickACB }     style={{ background: 'none', border: 'none'  }}>
                        <img
                            src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
                            alt="GitHub"
                            style={{ width: '40px', height: '40px', borderRadius: '50%' }}
                        />
                </button>
                <button onClick={handleUserMainClickACB}>Main Menu</button>
                <button onClick={handleUserLeaderboardClickACB}>Leaderboard</button>
                
            </div>
            <div className="navbar-right">
                {user ? (
                    <>
                        <button onClick={handleUserProfileClickACB}>Profile</button>
                        <button onClick={onSignOut}>Sign Out</button>
                    </>
                ) : (
                    <>
                        <button onClick={handleUserLoginClickACB}>Login</button>
                        <button onClick={handleUserRegisterClickACB}>Create Account</button>
                    </>
                )}
            </div>
        </nav>
    );


    function handleUserRegisterClickACB(evt) {
        window.location.hash = "#/register";
    }

    function handleUserLoginClickACB(evt) {
        window.location.hash = "#/login";
    }

    function handleUserLeaderboardClickACB(evt) {
        window.location.hash = "#/leaderboard";
    }

    function handleUserMainClickACB(evt) {
        window.location.hash = "#/game";
    }

    function handleUserProfileClickACB(evt) {
        window.location.hash = "#/profile";
    }

    function handleGitHubRedirectClickACB(evt) {
        window.open("https://gits-15.sys.kth.se/iprog-students/boabdlc-lovego-tmelm-yul7-vt25-Project", "_blank");
    }
}
