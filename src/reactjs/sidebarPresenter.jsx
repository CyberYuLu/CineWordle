import { observer } from "mobx-react-lite";
import { SidebarView } from "/src/views/sidebarView.jsx";

const Sidebar = observer(          
    function SidebarRender(props){
        return <SidebarView/>;
    }
);

export { Sidebar };
