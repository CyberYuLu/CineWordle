import { observer } from "mobx-react-lite";
import { ProfileView } from "../views/profileView.jsx";

const ProfilePresenter = observer(function ProfilePresenter({ model }) {
    return <ProfileView user={model.currentUser} />;
});

export { ProfilePresenter };