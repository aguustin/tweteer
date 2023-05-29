import './homeLayout.css';
import prueba from "../../imgs/prueba.jpg";
import notUser from "../../imgs/notUser.jpg";
import { useContext, useState } from 'react';
import TweetsContext from '../../context/tweetsContext';

const HomeLayout = () => {
    const [editLayout, setEditLayout] = useState(false);
    const {tweets, session, checkF, changeHomeLayout, editProfileContext, followContext, unFollowContext} = useContext(TweetsContext);

    const editProfile = async (e) => {
        e.preventDefault();
        const editData = {
            sessionId: session[0]._id,
            userPortada: e.target.elements.userPortada.value,
            userImg: e.target.elements.userImg.value,
            userName: e.target.elements.userName.value,
            userDesc: e.target.elements.userDesc.value
        }
        await editProfileContext(editData);
        setEditLayout(false);
    }
    console.log(checkF);
    
    const followUser = async (e, followingId) => {
        e.preventDefault();
        await followContext(followingId);
    }

    const unFollowUser = async (e, followingId) => {
        e.preventDefault();
        await unFollowContext(followingId);
    }
   

    const EditProfile = () => {
        return(
            <div className='editProfile'>
                <form onSubmit={(e) => editProfile(e)}>
                    <div className='form-group'>
                        <input type="file" name="userPortada"></input>
                        <label>Profile portada</label>
                    </div>
                    <div className='form-group'>
                        <input type="file" name="userImg"></input>
                        <label>Profile photo</label>
                    </div>
                    <div className='form-group'>
                        <input type="text" name="userName" placeholder='...'></input>
                        <label>Username</label>
                    </div>
                    <div className='form-group'>
                        <input type="text" name="userDesc" placeholder='...'></input>
                        <label>User description</label>
                    </div>
                    <div>
                        <button onClick={() => setEditLayout(false)}>Cancel</button>
                        <button type="submit">Accept</button>
                    </div>
                </form>
            </div>
        )
    }

    return(
        <div>
            {tweets.map((profile) => <div key={profile._id} className='profileInfo'>
                <div className='portadaProfile'>
                    {profile.userPortada ? <img src={notUser} alt=""></img> : <img src={prueba} alt=""></img>}
                </div>
                <div className='profileDesc d-flex mx-auto'>
                    <div className='photoUser'>
                    {profile.userImg ? <img src={notUser} alt=""></img> : <img src={prueba} alt=""></img>}
                    </div>
                    <div className='userDesc'>
                        <div className='d-flex align-items-center'>
                            <h1>{profile.userName}</h1>
                            <label>Followers: {profile.followers.length}</label>
                            <label>Following: {profile.following.length}</label>
                        </div>
                        <div className='description'>
                            <p>{profile.userDesc}</p>
                        </div>
                    </div>
                    {changeHomeLayout ? <button onClick={() => setEditLayout(!editLayout)}>Edit Description</button> : checkF === 1 ? <button onClick={(e) => unFollowUser(e, profile._id)}>Unfollow</button> : <button onClick={(e) => followUser(e, profile._id)}>Follow</button>}
                </div>
                {editLayout ? <EditProfile/> : ''}
            </div>)}
        </div>
    )
}

export default HomeLayout;