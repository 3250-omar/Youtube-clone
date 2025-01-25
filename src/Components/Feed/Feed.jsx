import "./Feed.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import moment from "moment";
import Loading from "../Loading/Loading";
import { useStore } from "../../store";
const Feed = () => {
  const [loading, setLoading] = useState(true);
  const category = useStore((store) => store.category);
  const Key = useStore((store) => store.API_KEY);
  const valueConventer = useStore((store) => store.valueConventer);
  const randomData = useStore((store) => store.randomData);
  const searchData = useStore((store) => store.searchData);
  const data = useStore((store) => store.data);
  const setData = useStore((store) => store.setData);
  
  const fetchData = async () => {
    const videoData_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=500&regionCode=EG&videoCategoryId=${category}&key=${Key}`;
    await axios
      .get(videoData_url)
      .then((response) => setData(randomData(response.data.items)))
      .catch(function (error) {
        console.log(error.response);
        setLoading(true);
      })
      .finally(function () {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, [category]);
  const FullData = searchData?.length ? searchData : data;
  return (
    <div className="feed">
      {FullData?.map((item, index) => {
        return (
          <Link
            to={`/video/${item.snippet?.categoryId}/${
              item.id.videoId ? item.id.videoId : item.id
            }`}
            className="card"
            key={index}
          >
            <img
              src={item.snippet.thumbnails.medium.url}
              alt=""
              loading="lazy"
            />
            <h2>{item.snippet.title}</h2>
            <h3>{item.snippet.channelTitle}</h3>
            <p>
              {valueConventer(item.statistics?.viewCount)} views &bull;
              {moment(item.snippet.publishedAt).fromNow()}
            </p>
          </Link>
        );
      })}
      {loading && <Loading />}
    </div>
  );
};

export default Feed;
