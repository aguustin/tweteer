import './homeLayout.css';
import prueba from "../../imgs/prueba.jpg";
const HomeLayout = () => {
    return(
        <div className='profileInfo'>
            <div className='portadaProfile'>
                <img src={prueba} alt=""></img>
            </div>
            <div className='profileDesc d-flex'>
                <div className='photoUser'>
                    <img src={prueba} alt=""></img>
                </div>
                <div className='userDesc'>
                    <div className='d-flex align-items-center'>
                        <h1>Username Lastname</h1>
                        <label>2031 following</label>
                        <label>2031 followers</label>
                    </div>
                    <div className='description'>
                        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. 
                            Ut architecto temporibus quae, dolorum eaque id nostrum vero repudiandae est alias.
                         Dignissimos voluptas saepe earum hic iste distinctio itaque ex repellendus?</p>
                    </div>
                </div>
                <button>Follow</button>
            </div>
        </div>
    )
}

export default HomeLayout;