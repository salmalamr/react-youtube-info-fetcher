import React, { useEffect, useState } from "react";
import axios from "axios";

function Integration() {
  const [link, setLink] = useState("");
  const [videoId, setVideoId] = useState("");
  const [miniature, setMiniature] = useState("exemple.jpg");
  const [datePub, setDatePub] = useState("");
  const [titre, setTitre] = useState("le titre du vedeo");
  const [profile, setProfile] = useState("profil.png");
  const [nomC, setNomC] = useState("");
  const [abonnes, setAbonnes] = useState("nb d'abonnes : ");
  const [vues, setVues] = useState("");
  const [likes, setLikes] = useState("");
  const [commentaire, setCommentaire] = useState("");

  const getYoutubeVideoId = (link) => {
    try {
      const urlObject = new URL(link);
      const searchParams = new URLSearchParams(urlObject.search);

      if (
        urlObject.hostname === "www.youtube.com" &&
        urlObject.pathname === "/watch"
      ) {
        return searchParams.get("v");
      } else if (
        urlObject.hostname === "youtu.be" &&
        urlObject.pathname.length > 1
      ) {
        return urlObject.pathname.substring(1);
      } else {
        return null;
      }
    } catch (error) {
      console.error("Invalid URL:", error);
      return null;
    }
  };

  useEffect(() => {
    const apiyoutube = async () => {
      if (videoId) {
        const options = {
          method: "GET",
          url: "https://youtube-v31.p.rapidapi.com/videos",
          params: {
            part: "contentDetails,snippet,statistics",
            id: videoId,
          },
          headers: {
            "X-RapidAPI-Key":
              "6b4cc0cb12msh01c213e3d734610p1eab83jsn868d817f9f5f",
            "X-RapidAPI-Host": "youtube-v31.p.rapidapi.com",
          },
        };

        const response = await axios.request(options);

        const options2 = {
          method: "GET",
          url: "https://youtube-v31.p.rapidapi.com/channels",
          params: {
            part: "snippet,statistics",
            id: response.data.items[0].snippet.channelId,
          },
          headers: {
            "X-RapidAPI-Key":
              "6b4cc0cb12msh01c213e3d734610p1eab83jsn868d817f9f5f",
            "X-RapidAPI-Host": "youtube-v31.p.rapidapi.com",
          },
        };
        const response2 = await axios.request(options2);

        try {
          console.log(response.data);
          console.log(response2.data);
          setMiniature(response.data.items[0].snippet.thumbnails.medium.url);
          setDatePub(response.data.items[0].snippet.publishedAt);
          setTitre(response.data.items[0].snippet.localized.title);
          setProfile(response2.data.items[0].snippet.thumbnails.default.url);
          setNomC(response.data.items[0].snippet.channelTitle);
          setAbonnes(response2.data.items[0].statistics.subscriberCount);
          setVues(response.data.items[0].statistics.viewCount);
          setLikes(response.data.items[0].statistics.likeCount);
          setCommentaire(response.data.items[0].statistics.commentCount);
        } catch (error) {
          console.error(error);
        }
      }
    };
    apiyoutube();
  }, [videoId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newVideoId = getYoutubeVideoId(link);
    setVideoId(newVideoId);
  };
  return (
    <>
      <form onSubmit={(e) => handleSubmit(e)}>
        <img src="utpng.png" alt="youtube" width="20%" height="10%" />
        <a href={link}>details youtube</a>
        <input
          type="text"
          name="link"
          id="link"
          placeholder="Enter your link"
          value={link}
          onChange={(e) => setLink(e.target.value)}
        />
        <button type="submit">rechercher</button>
      </form>

      <br />
      <div>
        <img src={miniature} alt={"miniature"} />
        <br />
        <b>Date de publication ( {datePub} )</b>
        <h1>le titre : {titre}</h1>
        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <img
            src={profile}
            alt="profile du chaine"
            width={50}
            height={50}
            style={{ borderRadius: "100%" }}
          />
          <div>
            <b>{nomC}</b>
            <br />
            <b>{abonnes} Abonnés</b>
          </div>
          <button>S'abonner</button>
        </div>
        <h1>Statistiques</h1>
        <b>Vues : {vues}</b>
        <br />
        <b>Likes : {likes}</b>
        <br />
        <b>Commentaires : {commentaire}</b>
      </div>
    </>
  );
}

export default Integration;
