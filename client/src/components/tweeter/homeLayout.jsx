import './homeLayout.css';
import notUser from "../../imgs/notUser.jpg";
import { useContext, useState } from 'react';
import TweetsContext from '../../context/tweetsContext';
import LayoutContext from '../../context/layoutsContext';

const HomeLayout = () => {
    const [editLayout, setEditLayout] = useState(false);
    const [openFollowings, setOpenFollowings] = useState(false);
    const [openFollowers, setOpenFollowers] = useState(false);
    const {layoutHomeContext} = useContext(LayoutContext);
    const {tweets, session, checkF, changeHomeLayout, editProfileContext, followContext, unFollowContext, seeProfileContext, exploreTweetsContext} = useContext(TweetsContext);

    const editProfile = async (e) => {
        e.preventDefault();
        const editData = {
            sessionId: session[0]._id,
            userPortada: e.target.elements.userPortada.files[0],
            userImg: e.target.elements.userImg.files[0],
            userName: e.target.elements.userName.value,
            userDesc: e.target.elements.userDesc.value
        }
        await editProfileContext(editData);
        setEditLayout(false);
    }
    
    const followUser = async (e, followingId) => {
        e.preventDefault();
        await followContext(followingId);
    }

    const unFollowUser = async (e, followingId) => {
        e.preventDefault();
        await unFollowContext(followingId);
    }

    const seeProfile = async (e, userId) => {
        e.preventDefault();
        console.log(userId);
        await seeProfileContext(userId);
        layoutHomeContext(e);
    }

    const followLay = async (e) => { 
        e.preventDefault();
        setOpenFollowings(false);
        setOpenFollowers(true);
    }

    const followingLay = async (e) => { 
        e.preventDefault();
        setOpenFollowers(false);
        setOpenFollowings(true);
    }

    const exploreTweets = async (e, profileId) => {
        e.preventDefault();
        const explore = e.target.elements.explore.value;
        const exploreData = {
            explore: explore,
            profileId: profileId
        }
        await exploreTweetsContext(exploreData);
    }
    const FollowersLayout = () => {
      
        return(
            <div className='followsLayout'>
                <div className='people-header d-flex'>
                    <p>Followers</p>
                    <button onClick={() => setOpenFollowers(false)}>X</button>
                </div>
               {tweets.map((follows) => <div key={follows._id}>
               {follows.followers.map((followers) => <div key={followers._id} className='people d-flex'>
                    <button id="followsButton" onClick={(e) => seeProfile(e, followers.followerId)}>{followers?.followerImg ? <img src={followers?.followerImg} alt=""></img> : <img src={notUser} alt=""></img>}</button>
                    <div>
                        <p>{followers.followerName}</p>
                        <div className='d-flex'>
                            <label>Followers: 6</label>
                            <label>Following: 12</label>
                        </div>
                    </div>
                </div>)}
               </div>)}  
            </div>
        )
    }

    const FollowingsLayout = () => {

        return(
            <div className='followsLayout'>
                <div className='people-header d-flex'>
                    <p>Followings</p>
                    <button onClick={() => setOpenFollowings(false)}>X</button>
                </div>
               {tweets.map((follows) => <div key={follows._id}>
               {follows.following.map((followings) => <div key={followings._id} className='people d-flex'>
                    <button id="followsButton" onClick={(e) => seeProfile(e, followings.followingId)}>{followings?.followingImg ? <img src={followings?.followingImg} alt=""></img> : <img src={notUser} alt=""></img>}</button>
                    <div>
                        <p>{followings.followingName}</p>
                        <div className='d-flex'>
                            <label>Followers: 6</label>
                            <label>Following: 12</label>
                        </div>
                    </div>
               </div>)}
               </div>)} 
            </div>
        )
    }

    const EditProfile = () => {
        return(
            <div className='editProfile'>
                <form onSubmit={(e) => editProfile(e)} encType='multipart/form-data'>
                    <div className='form-group'>
                        <input type="file" name="userPortada" accept='image/*'></input>
                        <label>Profile portada</label>
                    </div>
                    <div className='form-group'>
                        <input type="file" name="userImg" accept='image/*'></input>
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
                    {profile.userPortada ? <img src={profile.userPortada} alt=""></img> : <img src={notUser} alt=""></img>}
                </div>
                <div className='profileDesc mx-auto'>
                    <div className='photoUser'>
                    {profile.userImg ? <img src={profile.userImg} alt=""></img> : <img src={notUser} alt=""></img>}
                    </div>
                    <div className='userDesc'>
                        <div className='userDesc-cont align-items-center'>
                            <h1>{profile.userName}</h1>
                            <button onClick={(e) => followLay(e, profile._id)}><label>Followers: {profile.followers?.length}</label></button>
                            <button onClick={(e) => followingLay(e, profile._id)}><label>Following: {profile.following?.length}</label></button>
                        </div>
                        <div className='description'>
                            <p>{profile.userDesc}</p>
                        </div>
                    </div>
                    {changeHomeLayout ? <button id="editLayout" onClick={() => setEditLayout(!editLayout)}>Edit Profile</button> : checkF === 1 ? <button id="editLayout" onClick={(e) => unFollowUser(e, profile._id)}>Unfollow</button> : <button id="editLayout" onClick={(e) => followUser(e, profile._id)}>Follow</button>}
                    <form className='explore' onSubmit={(e) => exploreTweets(e, profile._id)}>
                        <input name="explore" placeholder="explore tweets"></input>
                        <button type="submit"></button>
                    </form>
                </div>
                { editLayout ? <EditProfile/> : '' }
                {openFollowers ? <FollowersLayout t={profile}/> : '' }
                {openFollowings ? <FollowingsLayout t={profile}/> : ''} 
            </div>)}
        </div>
    )
}

export default HomeLayout;