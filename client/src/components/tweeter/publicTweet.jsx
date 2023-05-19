import './publicTweet.css';
import prueba from "../../imgs/prueba.jpg";
import hearth from "../../imgs/hearth.png";

const PublicTweet = () => {
    return(
        <div className='publicTweet'>
                <div className='publicTweet-header'>
                    <p>Tweet something</p>
                </div>
                <div className="d-flex">
                    <img id="public-img" src={prueba} alt=""></img>
                    <form className='public-form-size align-items-center'>
                        <textarea type="text" placeholder="What's happening?"></textarea>
                        <div className="d-flex">
                        <img src={hearth} alt=""></img>
                            <select className="selectPrivacyPublication">
                                <option value="everyone">Everyone</option>
                                <img src={hearth} alt=""></img><option value="only">Only people who follows me</option>
                            </select>
                            <button>Tweet</button>
                        </div>
                    </form>
                </div>
        </div>
    )
}

export default PublicTweet;