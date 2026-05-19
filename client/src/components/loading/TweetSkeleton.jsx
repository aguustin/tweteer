import "./TweetSkeleton.css";

const TweetSkeleton = () => (
    <div className="tweet-skeleton">
        <div className="sk-avatar"></div>
        <div className="sk-content">
            <div className="sk-line sk-name"></div>
            <div className="sk-line sk-text"></div>
            <div className="sk-line sk-text sk-short"></div>
        </div>
    </div>
);

export default TweetSkeleton;
