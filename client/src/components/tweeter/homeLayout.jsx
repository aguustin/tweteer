import './homeLayout.css';
import notUser from "../../imgs/notUser.jpg";
import { useContext, useState } from 'react';
import TweetsContext from '../../context/tweetsContext';
import LayoutContext from '../../context/layoutsContext';

const HomeLayout = () => {
    const [editLayout, setEditLayout] = useState(false);
    const [openFollows, setOpenFollows] = useState(false);
    const {layoutHomeContext} = useContext(LayoutContext);
    const {tweets, session, checkF, changeHomeLayout, editProfileContext, followContext, unFollowContext, seeProfileContext} = useContext(TweetsContext);

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
        await seeProfileContext(userId);
        layoutHomeContext(e);
    }

    const followLay = async (e, userId) => { //traer los seguidores del usuario con su id y mapearlos en FollowLayout
        e.preventDefault();
        await getFollowers(userId);
        setOpenFollows(true);
    }

    const followingLay = async (e, userId) => { //traer los seguidores del usuario con su id y mapearlos en FollowLayout
        e.preventDefault();
        await getFollowings(userId);
        setOpenFollows(true);
    }
   
    const FollowsLayout = () => {
        return(
            <div className='followsLayout'>
                <div className='people d-flex'>
                    <button onClick={(e) => seeProfile(e)}><img src={notUser} alt=""></img></button>
                    <div>
                        <p>Username lastname</p>
                        <div className='d-flex'>
                            <label>Followers: 6</label>
                            <label>Following: 12</label>
                        </div>
                    </div>
                </div>
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
                <div className='profileDesc d-flex mx-auto'>
                    <div className='photoUser'>
                    {profile.userImg ? <img src={profile.userImg} alt=""></img> : <img src={notUser} alt=""></img>}
                    </div>
                    <div className='userDesc'>
                        <div className='d-flex align-items-center'>
                            <h1>{profile.userName}</h1>
                            <button onClick={(e) => followLay(e, profile._id)}><label>Followers: {profile.followers?.length}</label></button>
                            <button onClick={(e) => followingLay(e, profile._id)}><label>Following: {profile.following?.length}</label></button>
                        </div>
                        <div className='description'>
                            <p>{profile.userDesc}</p>
                        </div>
                    </div>
                    {changeHomeLayout ? <button onClick={() => setEditLayout(!editLayout)}>Edit Profile</button> : checkF === 1 ? <button onClick={(e) => unFollowUser(e, profile._id)}>Unfollow</button> : <button onClick={(e) => followUser(e, profile._id)}>Follow</button>}
                </div>
                { editLayout ? <EditProfile/> : '' }
            </div>)}
            { openFollows ? <FollowsLayout/> : '' }
        </div>
    )
}

export default HomeLayout;