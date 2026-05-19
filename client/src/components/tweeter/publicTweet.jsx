import "./publicTweet.css";
import notUser from "../../imgs/notUser.jpg";
import twImg from "../../imgs/photo.png";
import { useContext, useState, useRef } from "react";
import TweetsContext from "../../context/tweetsContext";

const PublicTweet = () => {
  const { session, publicT, createTweetContext, allUsers } = useContext(TweetsContext);

  const [charCount, setCharCount] = useState(0);
  const [saveHashtag, setSaveHashtag] = useState([]);
  const [hashtag, setHashtag] = useState("");
  const [mentionQuery, setMentionQuery] = useState("");
  const [showMentions, setShowMentions] = useState(false);
  const [mentionStart, setMentionStart] = useState(-1);
  const textareaRef = useRef(null);

  const maxChars = 280;

  const handleTextChange = (e) => {
    const text = e.target.value;
    setCharCount(text.length);

    // hashtag tracking (existing logic)
    if (text === "#") {
      setHashtag(text);
    } else if (hashtag.length <= 0) {
      setSaveHashtag([]);
    } else if (hashtag.charAt(0) === "#") {
      setHashtag(text);
    } else if (text.includes(" ") && hashtag.length > 0) {
      let cleaned = text.trim().substring(1);
      setSaveHashtag((prev) => [...prev, cleaned]);
    }

    // @mention detection
    const cursor = e.target.selectionStart;
    const textUpToCursor = text.slice(0, cursor);
    const atMatch = textUpToCursor.match(/@(\w*)$/);
    if (atMatch) {
      setMentionQuery(atMatch[1]);
      setMentionStart(cursor - atMatch[0].length);
      setShowMentions(true);
    } else {
      setShowMentions(false);
      setMentionQuery("");
    }
  };

  const filteredUsers = mentionQuery
    ? allUsers.filter(u =>
        u.userName?.toLowerCase().includes(mentionQuery.toLowerCase()) &&
        u._id !== session[0]?._id
      ).slice(0, 5)
    : [];

  const insertMention = (userName) => {
    const textarea = textareaRef.current;
    const text = textarea.value;
    const before = text.slice(0, mentionStart);
    const after = text.slice(mentionStart + mentionQuery.length + 1);
    const newText = `${before}@${userName} ${after}`;
    textarea.value = newText;
    setCharCount(newText.length);
    setShowMentions(false);
    setMentionQuery("");
    textarea.focus();
  };

  const createTweet = async (e) => {
    e.preventDefault();
    const tweetData = {
      userId: session[0]?._id,
      userImg: session[0]?.userImg,
      userName: session[0]?.userName,
      publication: e.target.elements.publication.value,
      tweetImg: e.target.elements.tweetImg.files[0],
      tweetPrivacy: e.target.elements.privacy.value,
      tweetDate: new Date().toISOString(),
      hashtag: saveHashtag,
    };
    await createTweetContext(tweetData);
    e.target.reset();
    setCharCount(0);
    setSaveHashtag([]);
    setHashtag("");
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
              alt={session?.[0]?.userName ? `${session[0].userName}'s profile` : "Profile"}
            />

            <form
              onSubmit={createTweet}
              className="public-form-size align-items-center"
              encType="multipart/form-data"
            >
              <div style={{ position: "relative", width: "100%" }}>
                <textarea
                  ref={textareaRef}
                  placeholder="¿Qué está pasando?"
                  name="publication"
                  onChange={handleTextChange}
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

                {showMentions && filteredUsers.length > 0 && (
                  <div className="mention-dropdown">
                    {filteredUsers.map(u => (
                      <div
                        key={u._id}
                        className="mention-item"
                        onMouseDown={(e) => { e.preventDefault(); insertMention(u.userName); }}
                      >
                        <img src={u.userImg || notUser} alt="" />
                        <span>@{u.userName}</span>
                      </div>
                    ))}
                  </div>
                )}
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
