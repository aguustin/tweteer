import "./publicTweet.css";
import notUser from "../../imgs/notUser.jpg";
import hearth from "../../imgs/hearth.png";
import twImg from "../../imgs/photo.png";
import { useContext, useState } from "react";
import TweetsContext from "../../context/tweetsContext";

const PublicTweet = () => {
  const { session, publicT, createTweetContext } = useContext(TweetsContext);
  const [hashtag, setHashtag] = useState("");
  let saveHashtag = [];
  let fecha = new Date();
  let day = ["Sunday", "Saturday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  let month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  const hashtagTweet = async (e) => {
    e.preventDefault();
    console.log("rrr: ", e.target.value);
    if(e.target.value === '#'){
      setHashtag(e.target.value);
      console.log("funciona la primera condicion");
    }else if(hashtag.length <= 0){
      saveHashtag = null;
    }else if(hashtag.charAt[0] === "#"){
      setHashtag(e.target.value);
      console.log("funciona la segunda condicion");
    }else if(saveHashtag.length > 0){
      console.log("hashtag hecho", saveHashtag);
    }else if(e.target.value.includes(" ") && hashtag.length > 0){
      saveHashtag = e.target.value.trim();
      saveHashtag = saveHashtag.substring(1);
    }
    
  }


  const createTweet = async (e) => {
    e.preventDefault();
    const tweetDate = `${day[fecha.getDay()]}, ${fecha.getDate()} ${month[fecha.getMonth()]} - ${fecha.getHours()}:${fecha.getMinutes()}`;
    saveHashtag?.slice(1, -1);
    const tweetData = {
      userId: session[0]._id,
      userImg: session[0]?.userImg,
      userName: session[0].userName,
      publication: e.target.elements.publication.value,
      tweetImg: e.target.elements.tweetImg.files[0],
      tweetPrivacy: e.target.elements.privacy.value,
      tweetDate: tweetDate,
      hashtag: saveHashtag
    };

    saveHashtag = [];
    e.target.reset();
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
            <textarea type="text" placeholder="What's happening?" name="publication" onChange={hashtagTweet}></textarea>
            <div className="d-flex">
              <img id="like" src={hearth} alt=""></img>
              <select className="selectPrivacyPublication" name="privacy">
                <option value="everyone">Everyone</option>
                <img src={hearth} alt=""></img>
                <option value="only">Only people who follows me</option>
              </select>
              <input id="tweetImg" className="tweetImgIn" type="file" name="tweetImg" accept="image/*"></input>
              <label for="tweetImg"><img src={twImg} alt=""></img></label>
              <button type="submit">Tweet</button>
            </div>
          </form>
        </div>
      </div> : ''}
    </div>
  );
};

export default PublicTweet;
