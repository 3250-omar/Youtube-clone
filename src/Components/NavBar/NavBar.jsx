import "./NavBar.css";
import menu from "../../Assets/menu.png";
import logo from "../../Assets/logo.png";
import search from "../../Assets/search.png";
import upload from "../../Assets/upload.png";
import profile from "../../Assets/jack.png";
import notification from "../../Assets/notification.png";
import more from "../../Assets/more.png";
import { Link, useNavigate } from "react-router-dom";
import { useStore } from "../../store";
import { useState } from "react";
import axios from "axios";
const NavBar = () => {
  const toggleSideBar = useStore((state) => state.toggleSideBar);
  const setSearchData = useStore((state) => state.setSearchData);
  const Key = useStore((state) => state.API_KEY);
  const [text, setText] = useState("");
  const navigate = useNavigate();
  const searchFunction = async () => {
    await axios
      .get(
        `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=40&q=${text}&key=${Key}&type=video`
      )
      .then((response) => setSearchData(response?.data?.items))
      .catch((error) => {
        console.log(error);
      });
    navigate("/");
  };
  const handleClick = (event) => {
    if (event.key === "Enter") {
      searchFunction();
    }
  };
  return (
    <nav className="flex-div">
      <div className="left-nav flex-div">
        <img src={menu} alt="" className="menu-icon" onClick={toggleSideBar} />
        <Link to="/" reloadDocument>
          <img src={logo} alt="" className="logo-icon" />
        </Link>
      </div>
      <div className="middle-div flex-div">
        <input
          type="text"
          placeholder="Search"
          onChange={(e) => setText(e.target.value)}
          value={text}
          onKeyDown={(e) => handleClick(e)}
        />
        <img src={search} alt="" onClick={text ? searchFunction : () => {}} />
      </div>

      <div className="right-nav flex-div">
        <img src={upload} alt="" />
        <img src={more} alt="" />
        <img src={notification} alt="" />
        <img src={profile} alt="" className="user-icon" />
      </div>
    </nav>
  );
};

export default NavBar;
