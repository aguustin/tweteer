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

            <div className="sidebar-card trends">
                <div className="sidebar-card-header">
                    <p>Tendencias para ti</p>
                </div>
                {topTrends.length > 0 ? (
                    topTrends.map((tend, index) => (
                        <div
                            key={index}
                            className="trendsDivs"
                            onClick={(e) => getTendencie(e, tend._id)}
                            role="button"
                            tabIndex={0}
                            onKeyPress={(e) => { if (e.key === 'Enter') getTendencie(e, tend._id); }}
                        >
                            <p>#{tend._id}</p>
                            <label>{tend.count} {tend.count === 1 ? 'Tweet' : 'Tweets'}</label>
                        </div>
                    ))
                ) : (
                    <div className="sidebar-empty">
                        <p>Sin tendencias en las últimas 24hs</p>
                    </div>
                )}
            </div>

            <div className="sidebar-card people-section">
                <div className="sidebar-card-header">
                    <p>A quién seguir</p>
                </div>
                {suggestedUsers.map((user) => (
                    <div key={user._id} className="people-item">
                        <img
                            className="people-avatar"
                            src={user.userImg || notUser}
                            alt={user.userName}
                        />
                        <div className="people-info">
                            <span className="people-name">{user.userName}</span>
                            <span className="people-meta">{user.followers?.length || 0} seguidores</span>
                        </div>
                        {user._id === session[0]?._id ? (
                            <button className="profile-btn profile-btn--mine" onClick={myProfile}>
                                Mi perfil
                            </button>
                        ) : (
                            <button className="profile-btn" onClick={(e) => seeProfile(e, user._id)}>
                                Ver perfil
                            </button>
                        )}
                    </div>
                ))}
            </div>

        </div>
    );
};

export default TrendAndPeople;
