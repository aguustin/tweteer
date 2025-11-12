import './trendAndPeople.css';
import notUser from "../../imgs/notUser.jpg";
import { useContext } from 'react';
import TweetsContext from '../../context/tweetsContext';
import LayoutContext from '../../context/layoutsContext';

const TrendAndPeople = () => {
    const { allUsers, tendencies, getTendenciesContext, session, seeProfileContext, getProfileInformationContext } = useContext(TweetsContext);
    const { layoutSearchContext, layoutHomeContext } = useContext(LayoutContext);

    const seeProfile = async (e, userId) => {
        e.preventDefault();
        await seeProfileContext(userId);
        layoutHomeContext(e);
    };

    const myProfile = async (e) => {
        e.preventDefault();
        await getProfileInformationContext(session[0]._id);
        await layoutHomeContext(e);
    };
    
    const getTendencie = async (e, tendencie) => {
        e.preventDefault();
        await layoutSearchContext();
        await getTendenciesContext(tendencie);
    };

    const topTrends = tendencies.slice(0, 7);
    const suggestedUsers = allUsers.slice(0, 4);

    return (
        <div className="trendAndPeople">
            <div className="trends">
                <div className='trends-header p-2'>
                    <p>Tendencias para ti</p>
                </div>
                <div>
    {topTrends && topTrends.some(tend => 
        tend?._id?.some(t => t?.word && t.word.trim().length > 0)
    ) ? (
        topTrends.map((tend, index) => (
            <span key={index}>
                {tend?._id?.map((t, i) => (
                    t?.word && t.word.trim().length > 0 && ( 
                        <span key={i}>
                            <div 
                                className='trendsDivs'
                                onClick={(e) => getTendencie(e, t.word)}
                                role="button"
                                tabIndex={0}
                                onKeyPress={(e) => {
                                    if (e.key === 'Enter') getTendencie(e, t.word);
                                }}
                            >
                                <p>#{t.word}</p>
                                <label>{t?.countH || 0} Tweets</label>
                            </div>
                        </span>
                    )
                ))}
            </span>
        ))
    ) : (
        <div style={{ padding: '20px', textAlign: 'center', color: '#999' }}>
            <p>No hay tendencias disponibles</p>
        </div>
    )}
</div>

            </div>

            {suggestedUsers.map((user) => (
                <div key={user._id} className="people">
                    <div className='mx-auto'>
                        <div className='trends-header'>
                            <label>👥 A quién seguir</label>
                        </div>
                        
                        <div className="people-body d-flex">
                            <div>
                                <img 
                                    id="peopleImg" 
                                    src={user.userImg || notUser} 
                                    alt={`${user.userName}'s profile`}
                                />
                            </div>
                            <div className='user-followers'>
                                <p>{user.userName}</p>
                                <label>👤 {user.followers?.length || 0} Seguidores</label>
                                <label>🔗 {user.following?.length || 0} Siguiendo</label>
                            </div>
                        </div>
                        
                        <div className='peoplePortada text-center'>
                            <img 
                                src={user.userPortada || notUser} 
                                alt={`${user.userName}'s cover`}
                            />
                        </div>
                        
                        <div>
                            {user._id === session[0]?._id ? (
                                <button onClick={myProfile}>
                                    Ver mi perfil
                                </button>
                            ) : (
                                <button onClick={(e) => seeProfile(e, user._id)}>
                                    Ver perfil
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default TrendAndPeople;