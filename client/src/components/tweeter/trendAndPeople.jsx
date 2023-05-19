import './trendAndPeople.css';
import prueba from "../../imgs/prueba.jpg";
import hearth from "../../imgs/hearth.png";

const TrendAndPeople = () => {
    return(
        <div className="trendAndPeople">
            <div className="trends">
                <div className='trends-header'>
                    <p>Trends for you</p>
                </div>
                <div>
                    <li>
                        <p>#programming</p>
                        <label>231k Tweets</label>
                    </li>
                    <li>
                        <p>#devChallenge</p>
                        <label>231k Tweets</label>
                    </li>
                    <li>
                        <p>#trendOne</p>
                        <label>231k Tweets</label>
                    </li>
                    <li>
                        <p>#frontend</p>
                        <label>231k Tweets</label>
                    </li>
                    <li>
                        <p>#backend</p>
                        <label>231k Tweets</label>
                    </li>
                    <li>
                        <p>#tweeterio</p>
                        <label>231k Tweets</label>
                    </li>
                </div>
            </div>
            <div className="people">
                <div className='mx-auto'>
                    <div className='trends-header'>
                        <label>Who to follow</label>
                    </div>
                    <div className="people-body d-flex">
                        <img id="peopleImg" src={prueba} alt=""></img>
                        <div className='user-followers'>
                            <p>userName Lastname</p>
                            <label>230k Followers</label>
                        </div>
                        <button><img src={hearth} alt=""></img>Follow</button>
                    </div>
                    <div className='peopleHobbies'>
                        <label>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae, illo! A saepe earum magnam fugiat.</label>
                    </div>
                    <div className='peoplePortada text-center'>
                        <img src={prueba} alt=""></img>
                    </div>
                    <div className="people-body d-flex">
                        <img id="peopleImg" src={prueba} alt=""></img>
                        <div className='user-followers'>
                            <p>userName Lastname</p>
                            <label>230k Followers</label>
                        </div>
                        <button><img src={hearth} alt=""></img>Follow</button>
                    </div>
                    <div className='peopleHobbies'>
                        <label>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae, illo! A saepe earum magnam fugiat.</label>
                    </div>
                    <div className='peoplePortada text-center'>
                        <img src={prueba} alt=""></img>
                    </div>
                </div>
                
            </div>
            
        </div>
    )
}

export default TrendAndPeople;