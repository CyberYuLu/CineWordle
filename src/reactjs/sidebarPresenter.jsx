import { observer } from "mobx-react-lite";
import { SidebarView } from "/src/views/sidebarView.jsx";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

const Sidebar = observer(function SidebarRender(props) {
    async function handleSignOut() {
        try {
            await signOut(auth);
            props.model.currentUser = null;

            
        } catch (error) {
            console.error("Error signing out:", error);
        }
    }

    return (
        <SidebarView
            user={props.model.currentUser}
            onSignOut={handleSignOut}
        />
    );
});

export { Sidebar };
