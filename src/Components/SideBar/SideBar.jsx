import { sideLinks, supscriped } from "../../Constants";
import { useStore } from "../../store";
import "./SideBar.css";
const SideBar = () => {
  const sideBar = useStore((store) => store.sideBar);
  const category = useStore((store) => store.category);
  const setCategory = useStore((store) => store.setCategory);
  return (
    <div className={`sideBar ${sideBar ? "" : "small-sideBar"}`}>
      <div className="short-links">
        <h3>Category</h3>
        {sideLinks.map((link, index) => {
          return (
            <div
              className={`side-link ${
                category === link.categoryId && "active"
              }`}
              key={index}
              onClick={() => setCategory(link.categoryId)}
            >
              <img src={link.image} alt={link.title} />
              <p>{link.title}</p>
            </div>
          );
        })}
      </div>
      <hr />
      <div className="subscription">
        <h3>Subscribed</h3>
        {supscriped.map((sub, index) => {
          return (
            <div className="sub-channel" key={index}>
              <img src={sub.image} alt={sub.title} />
              <p>{sub.title}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SideBar;
