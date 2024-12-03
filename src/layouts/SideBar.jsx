import Logo from "../components/logo/Logo";
import SidebarMenu from "../components/sidebar/SidebarMenu";
import SidebarTraffic from "../components/sidebar/SidebarTraffic";

const SideBar = () => {
  return (
    <div>
      <div className="flex flex-col gap-5 mb-5">
        <SidebarTraffic></SidebarTraffic>
        <Logo></Logo>
        <SidebarMenu></SidebarMenu>
      </div>
    </div>
  );
};

export default SideBar;
