// home page
import React from "react";
// import navbar
import Navbar from "../../components/Navbar/Navbar";
// import background image
import wallpaper from "../../wallpaperflare.com_wallpaper.jpg";
// import useAuth hook
import UseAuth from "../../hooks/UseAuth";
// import sidebar
import SidebarComponent from "../../components/Sidebar/SidebarComponent";

function Home(props) {
  const { isAuthenticated } = UseAuth();
  const myStyle = {
    backgroundImage: `url(${wallpaper})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    height: "100vh",
    width: "100vw",
    position: "absolute",
    zIndex: "-1",
  };
  return (
    <div>
      {/* add background image from url on whole site, but behind components */}
      <div className="background-image">
        <div style={myStyle}></div>
        {isAuthenticated ? (
          <Navbar start="2" end="4" />
        ) : (
          <Navbar start="0" end="2" />
        )}
        {/* here go children props */}
        {props.children}
      </div>
    </div>
  );
}

export default Home;
