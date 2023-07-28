import './loading.css';
import { Spinner } from "reactstrap";

const Loading = () => {
    return(
        <div className='loading d-flex'>
            <div className='loading-child'>
                <Spinner color="primary"></Spinner>
            </div>
        </div>
    )
}

export default Loading;