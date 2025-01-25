import { useParams } from "react-router-dom";
import PlayVideo from "../../Components/playVideo/PlayVideo";
import Recommended from "../../Components/Recommended/Recommended";
import "./Video.css";
import { useStore } from "../../store";
const Video = () => {
  const { categoryId, videoId } = useParams();
  const randomData = useStore((store) => store.randomData);
  return (
    <div className="play-container">
      <PlayVideo videoId={videoId} />
      <Recommended categoryId={categoryId} randomData={randomData} />
    </div>
  );
};

export default Video;
