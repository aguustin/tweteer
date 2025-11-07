import './homeLayout.css';
import notUser from "../../imgs/notUser.jpg";
import { useContext, useState, useEffect } from 'react';
import TweetsContext from '../../context/tweetsContext';
import LayoutContext from '../../context/layoutsContext';

const HomeLayout = () => {
    const [editLayout, setEditLayout] = useState(false);
    const [openFollowings, setOpenFollowings] = useState(false);
    const [openFollowers, setOpenFollowers] = useState(false);
    const { layoutHomeContext } = useContext(LayoutContext);
    const { tweets, session, checkF, changeHomeLayout, editProfileContext, followContext, unFollowContext, seeProfileContext, exploreTweetsContext } = useContext(TweetsContext);

    // Cerrar modales con ESC
    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape') {
                setEditLayout(false);
                setOpenFollowings(false);
                setOpenFollowers(false);
            }
        };

        document.addEventListener('keydown', handleEscape);
        return () => document.removeEventListener('keydown', handleEscape);
    }, []);

    const editProfile = async (e) => {
        e.preventDefault();
        const editData = {
            sessionId: session[0]._id,
            userPortada: e.target.elements.userPortada.files[0],
            userImg: e.target.elements.userImg.files[0],
            userName: e.target.elements.userName.value,
            userDesc: e.target.elements.userDesc.value
        };
        await editProfileContext(editData);
        setEditLayout(false);
    };
    
    const followUser = async (e, followingId) => {
        e.preventDefault();
        await followContext(followingId);
    };

    const unFollowUser = async (e, followingId) => {
        e.preventDefault();
        await unFollowContext(followingId);
    };

    const seeProfile = async (e, userId) => {
        e.preventDefault();
        await seeProfileContext(userId);
        layoutHomeContext(e);
        setOpenFollowers(false);
        setOpenFollowings(false);
    };

    const followLay = async (e) => { 
        e.preventDefault();
        setOpenFollowings(false);
        setOpenFollowers(true);
    };

    const followingLay = async (e) => { 
        e.preventDefault();
        setOpenFollowers(false);
        setOpenFollowings(true);
    };

    const exploreTweets = async (e, profileId) => {
        e.preventDefault();
        const explore = e.target.elements.explore.value;
        if (!explore.trim()) return;
        
        const exploreData = {
            explore: explore,
            profileId: profileId
        };
        await exploreTweetsContext(exploreData);
        e.target.reset();
    };

    const closeModal = (setter) => {
        setter(false);
    };

    const FollowersLayout = () => {
        return (
            <div className='followsLayout'>
                <div className='people-header d-flex'>
                    <p>Seguidores</p>
                    <button onClick={() => closeModal(setOpenFollowers)}>×</button>
                </div>
                {tweets.map((follows) => (
                    <div key={follows._id}>
                        {follows.followers.map((followers) => (
                            <div key={followers._id} className='people d-flex'>
                                <button 
                                    id="followsButton" 
                                    onClick={(e) => seeProfile(e, followers.followerId)}
                                    aria-label={`Ver perfil de ${followers.followerName}`}
                                >
                                    <img 
                                        src={followers?.followerImg || notUser} 
                                        alt={`${followers.followerName}'s profile`}
                                    />
                                </button>
                                <div>
                                    <p>{followers.followerName}</p>
                                    <div className='d-flex'>
                                        <label>Seguidores: {follows.followers?.length || 0}</label>
                                        <label>Siguiendo: {follows.following?.length || 0}</label>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ))}  
            </div>
        );
    };

    const FollowingsLayout = () => {
        return (
            <div className='followsLayout'>
                <div className='people-header d-flex'>
                    <p>Siguiendo</p>
                    <button onClick={() => closeModal(setOpenFollowings)}>×</button>
                </div>
                {tweets.map((follows) => (
                    <div key={follows._id}>
                        {follows.following.map((followings) => (
                            <div key={followings._id} className='people d-flex'>
                                <button 
                                    id="followsButton" 
                                    onClick={(e) => seeProfile(e, followings.followingId)}
                                    aria-label={`Ver perfil de ${followings.followingName}`}
                                >
                                    <img 
                                        src={followings?.followingImg || notUser} 
                                        alt={`${followings.followingName}'s profile`}
                                    />
                                </button>
                                <div>
                                    <p>{followings.followingName}</p>
                                    <div className='d-flex'>
                                        <label>Seguidores: {follows.followers?.length || 0}</label>
                                        <label>Siguiendo: {follows.following?.length || 0}</label>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ))} 
            </div>
        );
    };

    const EditProfile = () => {
        return (
            <div className='editProfile'>
                <form onSubmit={editProfile} encType='multipart/form-data'>
                    <div className='form-group'>
                        <label>Imagen de portada</label>
                        <input type="file" name="userPortada" accept='image/*' />
                    </div>
                    <div className='form-group'>
                        <label>Foto de perfil</label>
                        <input type="file" name="userImg" accept='image/*' />
                    </div>
                    <div className='form-group'>
                        <label>Nombre de usuario</label>
                        <input 
                            type="text" 
                            name="userName" 
                            placeholder='Ingresa tu nombre...'
                            maxLength="50"
                        />
                    </div>
                    <div className='form-group'>
                        <label>Descripción</label>
                        <input 
                            type="text" 
                            name="userDesc" 
                            placeholder='Cuéntanos sobre ti...'
                            maxLength="160"
                        />
                    </div>
                    <div>
                        <button type="button" onClick={() => closeModal(setEditLayout)}>
                            Cancelar
                        </button>
                        <button type="submit">Guardar cambios</button>
                    </div>
                </form>
            </div>
        );
    };

    return (
        <div>
            {(editLayout || openFollowers || openFollowings) && <div className='back' onClick={() => {
                setEditLayout(false);
                setOpenFollowers(false);
                setOpenFollowings(false);
            }}></div>}
            
            {tweets.map((profile) => (
                <div key={profile._id} className='profileInfo'>
                    <div className='portadaProfile'>
                        <img 
                            src={profile.userPortada || notUser} 
                            alt="Imagen de portada"
                        />
                    </div>
                    
                    <div className='profileDesc mx-auto'>
                        <div className='photoUser'>
                            <img 
                                src={profile.userImg || notUser} 
                                alt={`${profile.userName}'s profile`}
                            />
                        </div>
                        
                        <div className='userDesc'>
                            <div className='userDesc-cont align-items-center'>
                                <div>
                                    <h1>{profile.userName}</h1>
                                </div>
                                <div> 
                                    <button onClick={(e) => followLay(e, profile._id)}>
                                        <label>Seguidores: {profile.followers?.length || 0}</label>
                                    </button>
                                    <button onClick={(e) => followingLay(e, profile._id)}>
                                        <label>Siguiendo: {profile.following?.length || 0}</label>
                                    </button>
                                </div>
                            </div>
                            
                            <div className='description'>
                                <p>{profile.userDesc || 'Sin descripción'}</p>
                            </div>
                        </div>
                        
                        {changeHomeLayout ? (
                            <button id="editLayout" onClick={() => setEditLayout(!editLayout)}>
                                Editar Perfil
                            </button>
                        ) : checkF === 1 ? (
                            <button id="editLayout" onClick={(e) => unFollowUser(e, profile._id)}>
                                Dejar de seguir
                            </button>
                        ) : (
                            <button id="editLayout" onClick={(e) => followUser(e, profile._id)}>
                                Seguir
                            </button>
                        )}
                        
                        <form className='explore' onSubmit={(e) => exploreTweets(e, profile._id)}>
                            <input 
                                name="explore" 
                                placeholder="Buscar en los tweets de este perfil..."
                                maxLength="100"
                            />
                            <button type="submit" aria-label="Buscar"></button>
                        </form>
                    </div>
                    
                    {editLayout && <EditProfile />}
                    {openFollowers && <FollowersLayout />}
                    {openFollowings && <FollowingsLayout />} 
                </div>
            ))}
        </div>
    );
};

export default HomeLayout;