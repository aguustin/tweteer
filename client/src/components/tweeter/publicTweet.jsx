import "./publicTweet.css";
import notUser from "../../imgs/notUser.jpg";
import hearth from "../../imgs/hearth.png";
import twImg from "../../imgs/photo.png";
import { useContext } from "react";
import TweetsContext from "../../context/tweetsContext";

const PublicTweet = () => {
  const { session, publicT, createTweetContext } = useContext(TweetsContext);
  let fecha = new Date();
  let day = ["Sunday", "Saturday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  let month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  const createTweet = async (e) => {
    e.preventDefault();
    const tweetDate = `${day[fecha.getDay()]}, ${fecha.getDate()} ${month[fecha.getMonth()]} - ${fecha.getHours()}:${fecha.getMinutes()}`;

    const tweetData = {
      userId: session[0]._id,
      userImg: session[0]?.userImg,
      userName: session[0].userName,
      publication: e.target.elements.publication.value,
      tweetImg: e.target.elements.tweetImg.files[0],
      tweetPrivacy: e.target.elements.privacy.value,
      tweetDate: tweetDate
    };
    await createTweetContext(tweetData);
  };

  return (
    <div>
      {publicT ? <div className="publicTweet">
        <div className="publicTweet-header">
          <p>Tweet something</p>
        </div>
        <div className="d-flex">
          {session[0]?.userImg ? <img id="public-img" src={session[0]?.userImg} alt=""></img> :  <img id="public-img" src={notUser} alt=""></img>}
          <form onSubmit={(e) => createTweet(e)} className="public-form-size align-items-center" encType="multipart/form-data">
            <textarea type="text" placeholder="What's happening?" name="publication"></textarea>
            <div className="d-flex">
              <img id="like" src={hearth} alt=""></img>
              <select className="selectPrivacyPublication" name="privacy">
                <option value="everyone">Everyone</option>
                <img src={hearth} alt=""></img>
                <option value="only">Only people who follows me</option>
              </select>
              <input id="tweetImg" className="tweetImgIn" type="file" name="tweetImg" accept="image/*"></input>
              <label for="tweetImgIn"><img src={twImg} alt=""></img></label>
              <button type="submit">Tweet</button>
            </div>
          </form>
        </div>
      </div> : ''}
    </div>
  );
};

export default PublicTweet;
