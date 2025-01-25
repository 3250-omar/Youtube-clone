import Feed from "../../Components/Feed/Feed";
import SideBar from "../../Components/SideBar/SideBar";
import "./Home.css";
const Home = () => {
  return (
    <div className="Home">
      <SideBar />
      <div className="container">
        <Feed  />
      </div>
    </div>
  );
};

export default Home;
