import "./Recommended.css";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useStore } from "../../store";
const Recommended = () => {
  const { categoryId, videoId } = useParams();
  const [recommended, setRecommended] = useState([]);
  const Key = useStore((store) => store.API_KEY);
  const valueConventer = useStore((store) => store.valueConventer);
  const recommendedApi = ` https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&maxResults=40&chart=mostPopular&regionCode=US&videoCategoryId=${categoryId}&key=${Key}`;
  const randomData = useStore((store) => store.randomData);

  const fetchRecommended = async () => {
    await axios
      .get(recommendedApi)
      .then((response) => setRecommended(randomData(response?.data.items)));
  };
  useEffect(() => {
    fetchRecommended();
  }, [videoId]);
  return (
    <div className="recommended">
      {recommended.map((recommend, index) => {
        return (
          <Link
            to={`/video/${recommend?.snippet.categoryId}/${recommend?.id}`}
            className="recommended-side-video"
            key={index}
          >
            <img src={recommend?.snippet.thumbnails.medium.url} alt="" />
            <div className="video-info">
              <h4>{recommend?.snippet.title}</h4>
              <p>{recommend?.snippet.channelTitle}</p>
              <p>{valueConventer(recommend?.statistics.viewCount)} Views</p>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default Recommended;
