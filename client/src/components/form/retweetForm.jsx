import notUser from "../../imgs/notUser.jpg";
import { useContext, useEffect } from 'react';
import './retweetForm.css';
import TweetsContext from '../../context/tweetsContext';
import LayoutContext from "../../context/layoutsContext";

const RetweetLayout = () => {
    const { session, retweet, setRetweetLayout, saveRetweetContext } = useContext(TweetsContext);
    const { black, setBlackLayout } = useContext(LayoutContext);
    
    useEffect(() => {
        setBlackLayout(true);
        
        // Cleanup al desmontar
        return () => {
            setBlackLayout(false);
        };
    }, [setBlackLayout]);

    const saveRetweet = async (e, userId, tweetProfileImg, retweetedUserName, retweetedPublication, retweetedImg) => {
        e.preventDefault();
        const tweetPublication = e.target.elements.retweetedComment.value;

        const retweetedData = {
            userId: userId,
            tweetPublication: tweetPublication,
            profileRetweetedImg: tweetProfileImg,
            retweetedUserName: retweetedUserName,
            retweetedPublication: retweetedPublication,
            retweetedImg: retweetedImg
        };
        
        await saveRetweetContext(retweetedData);
        closeRetweetLayout(e);
    };

    const closeRetweetLayout = (e) => {
        e.preventDefault();
        setRetweetLayout(false);
        setBlackLayout(false);
    };

    // Cerrar modal al presionar ESC
    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape') {
                setRetweetLayout(false);
                setBlackLayout(false);
            }
        };

        document.addEventListener('keydown', handleEscape);
        return () => document.removeEventListener('keydown', handleEscape);
    }, [setRetweetLayout, setBlackLayout]);

    return (
        <div>
            {black && <div className='i' onClick={closeRetweetLayout}></div>}
            {retweet[0].tweets.map((re) => (
                <div key={re._id} className="retweetLayout">
                    <div className="d-flex">
                        <div className='retweet-info'>
                            <img 
                                src={re.tweetProfileImg || notUser} 
                                alt={`${re.tweetUsername}'s profile`}
                            />
                        </div>
                        <div className="retweetUsername">
                            <p>{re.tweetUsername}</p>
                            <p>{re.tweetPublication}</p>
                        </div>
                    </div>
                    
                    <form onSubmit={(e) => saveRetweet(
                        e, 
                        session[0]._id, 
                        re.tweetProfileImg, 
                        re.tweetUsername, 
                        re.tweetPublication, 
                        re.tweetImg
                    )}>
                        <div className='form-group-retweet'>
                            <textarea 
                                name="retweetedComment" 
                                placeholder='Agrega un comentario...'
                                maxLength="280"
                            />
                        </div>
                        
                        {re.tweetImg && (
                            <div className='form-group-retweet-img'>
                                <img src={re.tweetImg} alt="Tweet content" />
                            </div>
                        )}
                        
                        <div className="retB d-flex justify-content-between">
                            <button type="button" onClick={closeRetweetLayout}>
                                Cancelar
                            </button>
                            <button type="submit">
                                Publicar retweet
                            </button>
                        </div>
                    </form>
                </div>
            ))}
        </div>
    );
};

export default RetweetLayout;