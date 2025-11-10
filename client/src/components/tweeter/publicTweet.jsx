import "./publicTweet.css";
import notUser from "../../imgs/notUser.jpg";
import twImg from "../../imgs/photo.png";
import { useContext, useState } from "react";
import TweetsContext from "../../context/tweetsContext";

const PublicTweet = () => {
  const { session, publicT, createTweetContext } = useContext(TweetsContext);

  // Estados
  const [hashtag, setHashtag] = useState("");
  const [charCount, setCharCount] = useState(0);
  const [saveHashtag, setSaveHashtag] = useState([]); // ✅ ahora se mantiene entre renders

  const maxChars = 280;

  // Fechas
  const fecha = new Date();
  const day = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]; // ✅ corregido el orden
  const month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  const hashtagTweet = (e) => {
    
    const text = e.target.value;
    setCharCount(text.length);

    if (text === "#") {
      setHashtag(text);
    } else if (hashtag.length <= 0) {
      setSaveHashtag([]);
    } else if (hashtag.charAt(0) === "#") { 
      setHashtag(text);
    } else if (saveHashtag.length > 0) {
      console.log(""); 
    } else if (text.includes(" ") && hashtag.length > 0) {
      let cleaned = text.trim().substring(1);
      setSaveHashtag((prev) => [...prev, cleaned]);
    }
  };


  const createTweet = async (e) => {
    e.preventDefault();

    const tweetDate = `${day[fecha.getDay()]}, ${fecha.getDate()} ${
      month[fecha.getMonth()]
    } - ${fecha.getHours()}:${fecha.getMinutes()}`;

    const tweetData = {
      userId: session[0]?._id,
      userImg: session[0]?.userImg,
      userName: session[0]?.userName,
      publication: e.target.elements.publication.value,
      tweetImg: e.target.elements.tweetImg.files[0],
      tweetPrivacy: e.target.elements.privacy.value,
      tweetDate: tweetDate,
      hashtag: saveHashtag,
    };

    await createTweetContext(tweetData);
  
    e.target.reset();
    setCharCount(0);
    setSaveHashtag([]);
  };

  return (
    <>
      {publicT ? (
        <div className="publicTweet">
          <div className="publicTweet-header">
            <p>¿Qué está pasando?</p>
          </div>

          <div className="d-flex">
            <img
              id="public-img"
              src={session && session[0]?.userImg ? session[0].userImg : notUser}
              alt={
                session && session[0]?.userName
                  ? `${session[0].userName}'s profile`
                  : "Profile"
              }
            />

            <form
              onSubmit={createTweet}
              className="public-form-size align-items-center"
              encType="multipart/form-data"
            >
              <div style={{ position: "relative", width: "100%" }}>
                <textarea
                  type="text"
                  placeholder="¿Qué está pasando?"
                  name="publication"
                  onChange={hashtagTweet}
                  maxLength={maxChars}
                  aria-label="Escribe tu tweet"
                />

                <div
                  style={{
                    position: "absolute",
                    bottom: "10px",
                    right: "15px",
                    fontSize: "13px",
                    color: charCount > maxChars * 0.9 ? "#dc3545" : "#999",
                    fontWeight: charCount > maxChars * 0.9 ? "600" : "400",
                  }}
                >
                  {charCount}/{maxChars}
                </div>
              </div>

              <div className="abc d-flex">
                <select
                  className="selectPrivacyPublication"
                  name="privacy"
                  aria-label="Selecciona quién puede ver tu tweet"
                >
                  <option value="everyone">🌍 Todos pueden ver</option>
                  <option value="only">👥 Solo seguidores</option>
                </select>

                <input
                  id="tweetImg"
                  className="tweetImgIn"
                  type="file"
                  name="tweetImg"
                  accept="image/*"
                />
                <label htmlFor="tweetImg" aria-label="Adjuntar imagen">
                  <img src={twImg} alt="" />
                </label>

                <button
                  id="publicTweet"
                  type="submit"
                  disabled={charCount === 0}
                  style={{
                    opacity: charCount === 0 ? 0.6 : 1,
                    cursor: charCount === 0 ? "not-allowed" : "pointer",
                  }}
                >
                  Twittear
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default PublicTweet;
