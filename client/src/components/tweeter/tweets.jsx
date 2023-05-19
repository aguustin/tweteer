import './tweets.css';
import HomeLayout from './homeLayout';
import ListLayout from './listsLayout';
import PublicTweet from './publicTweet';
import TrendAndPeople from './trendAndPeople';
import prueba from '../../imgs/prueba.jpg';
import test from '../../imgs/test.png';
import hearth from "../../imgs/hearth.png";
import { useContext } from 'react';
import LayoutContext from '../../context/layoutsContext';
import Nav from './nav';
import UserContext from '../../context/usersContext';

const Tweets = () => {

    const {homeLayout, listsLayout, searching} = useContext(LayoutContext);
    const {session} = useContext(UserContext);

    const Search = () => {
        return(
            <div className='search'>
                <form className='d-flex'>
                    <input type="text" name="search" placeholder='search'></input>
                    <button>Search</button>
                </form>
            </div>
        )
    }
console.log(session);
    return(
        <div>
            <Nav/>
            <div className='tweets'>
                {searching ? <Search/> : ''}
                {homeLayout ? <HomeLayout/> : ''}
                <div className='lists-publications-container d-flex mx-auto'>
                    {listsLayout ? <ListLayout/> : '' }
                        <div className='publications'>
                        {homeLayout ? <PublicTweet/> : ''}
                            <div className='imgProfile d-flex'>
                                <img src={prueba} alt=""></img>
                                <div>
                                    {session.map((s) => <p>{s.userName}</p>)}
                                    <label>24 August at 20:56</label>
                                </div>
                            </div>
                            <div className='tweetDesc-img'>
                                <p>Traveling - it leaves you speechies, then turn you into a storyteller</p>
                                <img src={test} alt=""></img>
                                <li className='d-flex'>
                                    <button><img src={hearth} alt=""></img>Comments</button>
                                    <button><img src={hearth} alt=""></img>Retweets</button>
                                    <button><img src={hearth} alt=""></img>Like</button>
                                    <button><img src={hearth} alt=""></img>Save</button>
                                </li>
                            </div>
                            <div>
                                <form className='comments-form d-flex mt-2' encType='multipart/form-data'>
                                    <img src={prueba} alt=""></img>
                                    <input type="text" name="respondTweet" placeholder='Tweet your reply'></input>
                                </form>
                            </div>
                            <div className='comments-container d-flex mt-3 '>
                                <img id="comment-image-profile" src={prueba} alt=""></img>
                                <div>
                                    <div className='comment'>
                                        <div className='d-flex'>
                                            <p>Username lastName</p>
                                            <label>21 August at 20:41</label>
                                        </div>
                                        <div>
                                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam maxime doloremque 
                                                consequuntur reiciendis quas molestias hic eveniet iste, ullam quam, similique eos reprehenderit voluptate, 
                                                maiores accusantium corrupti dolores. Ratione, qui!
                                            </p>
                                        </div>
                                    </div>
                                    <div className='mt-2'>
                                            <button id="like-comment"><img src={hearth} alt=""></img>Like</button>
                                            <label>213 Likes</label>
                                    </div>
                                </div>
                            </div>
                            <div className='comments-container d-flex mt-3 '>
                                <img id="comment-image-profile" src={prueba} alt=""></img>
                                <div>
                                    <div className='comment'>
                                        <div className='d-flex'>
                                            <p>Username lastName</p>
                                            <label>21 August at 20:41</label>
                                        </div>
                                        <div>
                                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam maxime doloremque 
                                                consequuntur reiciendis quas molestias hic eveniet iste, ullam quam, similique eos reprehenderit voluptate, 
                                                maiores accusantium corrupti dolores. Ratione, qui!
                                            </p>
                                        </div>
                                    </div>
                                    <div className='mt-2'>
                                            <button id="like-comment"><img src={hearth} alt=""></img>Like</button>
                                            <label>213 Likes</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {listsLayout ? '' : <TrendAndPeople/>}
                </div>
            </div>
            </div>
    )
}

export default Tweets;