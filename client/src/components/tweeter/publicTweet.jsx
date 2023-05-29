import './publicTweet.css';
import prueba from "../../imgs/prueba.jpg";
import hearth from "../../imgs/hearth.png";
import { useContext } from 'react';
import TweetsContext from '../../context/tweetsContext';

const PublicTweet = () => {
    const {session, createTweetContext} = useContext(TweetsContext);

    const createTweet = async (e) => {
        e.preventDefault();

        const tweetData = {
            userId: session[0]._id,
            photo:  session[0]?.photo,
            userName:  session[0].userName,
            publication: e.target.elements.publication.value,
            tweetImg: e.target.elements.tweetImg.value,
            tweetPrivacy: e.target.elements.privacy.value
        }

        await createTweetContext(tweetData);
      
    }

    return(
        <div className='publicTweet'>
                <div className='publicTweet-header'>
                    <p>Tweet something</p>
                </div>
                <div className="d-flex">
                    <img id="public-img" src={prueba} alt=""></img>
                    <form onSubmit={(e) => createTweet(e)} className='public-form-size align-items-center'>
                        <textarea type="text" placeholder="What's happening?" name="publication"></textarea>
                        <div className="d-flex">
                        <img src={hearth} alt=""></img>
                            <select className="selectPrivacyPublication" name="privacy">
                                <option value="everyone">Everyone</option>
                                <img src={hearth} alt=""></img><option value="only">Only people who follows me</option>
                            </select>
                            <input type="file" name="tweetImg"></input>
                            <button type="submit">Tweet</button>
                        </div>
                    </form>
                </div>
        </div>
    )
}

export default PublicTweet;