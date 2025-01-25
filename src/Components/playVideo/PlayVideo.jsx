import { useEffect, useState } from "react";
import "./PlayVideo.css";
import like from "../../Assets/like.png";
import dislike from "../../Assets/dislike.png";
import share from "../../Assets/share.png";
import save from "../../Assets/save.png";
import user from "../../Assets/user_profile.jpg";
import axios from "axios";
import moment from "moment";
import Loading from "../Loading/Loading";
import { useStore } from "../../store";
const PlayVideo = ({ videoId }) => {
  const [videoData, setVideoData] = useState(null);
  const [channelInfo, setChannelInfo] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const Key = useStore((store) => store.API_KEY);
  const valueConventer = useStore((store) => store.valueConventer);
  const videoDataApi = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=${Key} `;
  const channeDataApi =
    videoData &&
    `https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${videoData?.snippet.channelId}&key=${Key}`;

  const commentApi = `https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet%2Creplies&videoId=${videoId}&key=${Key}`;
  const fetchVideoInfo = async () => {
    await axios
      .get(videoDataApi)
      .then((response) => setVideoData(response?.data.items[0]))
      .catch(function (error) {
        console.log(error);
        setLoading(true);
      })
      .finally(function () {
        setLoading(false);
      });
  };
  const fetchChannelInfo = async () => {
    await axios
      .get(channeDataApi)
      .then((response) => setChannelInfo(response?.data.items[0]));
  };
  const fetchComments = async () => {
    await axios
      .get(commentApi)
      .then((response) => setComments(response?.data?.items));
  };

  useEffect(() => {
    fetchVideoInfo();
  }, [videoId]);
  useEffect(() => {
    if (videoData) {
      fetchChannelInfo();
      fetchComments();
    }
  }, [videoId, videoData]);
  return (
    <div className="playVideo">
      <iframe
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
        allow="accelerometer;autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
        frameBorder="0"
      ></iframe>
      <h3 className="video-title">{videoData?.snippet.title}</h3>
      <div className="play-video-info">
        <p>
          {valueConventer(videoData?.statistics.viewCount)} views &bull;{" "}
          {moment(videoData?.snippet.publishedAt).fromNow()}
        </p>
        <div>
          <span>
            <img src={like} alt="" />
            {valueConventer(videoData?.statistics.likeCount)}
          </span>
          <span>
            <img src={dislike} alt="" />
          </span>
          <span>
            <img src={share} alt="" />
            share
          </span>
          <span>
            <img src={save} alt="" />
            save
          </span>
        </div>
      </div>
      <hr />
      <div className="publisher">
        <div className="publisher-info">
          <img
            src={channelInfo && channelInfo.snippet.thumbnails.default.url}
            alt=""
          />

          <div>
            <p>{videoData?.snippet.channelTitle}</p>
            <span>
              {valueConventer(channelInfo?.statistics.subscriberCount)}{" "}
              Subscribers
            </span>
          </div>
        </div>
        <button>Subscribe</button>
      </div>
      <div className="video-description">
        <p>{videoData?.snippet.description.slice(0, 300)}</p>
        <hr />
        <h4>comment ({valueConventer(videoData?.statistics.commentCount)}) </h4>

        {comments.map((comment, index) => {
          return (
            <div className="comment" key={index}>
              <img
                src={
                  comment
                    ? comment.snippet.topLevelComment.snippet
                        .authorProfileImageUrl
                    : user
                }
                alt=""
                className="user"
              />
              <div>
                <h3>
                  {comment?.snippet.topLevelComment.snippet.authorDisplayName}
                  <span>
                    {moment(
                      comment?.snippet.topLevelComment.snippet.publishedAt
                    ).fromNow()}
                  </span>
                </h3>
                <p>{comment?.snippet.topLevelComment.snippet.textOriginal}</p>
                <div className="comment-action">
                  <img src={like} alt="" />{" "}
                  <span>
                    {valueConventer(
                      comment?.snippet.topLevelComment.snippet.likeCount
                    )}
                  </span>
                  <img src={dislike} alt="" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {loading && <Loading />}
    </div>
  );
};

export default PlayVideo;
