import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { TweetsContextProvider } from './context/tweetsContext';
import { BrowserRouter , Routes ,Route } from 'react-router-dom';
import Nav from './components/tweeter/nav';
import Tweets from './components/tweeter/tweets';

function App() {
  return (
    <div className="App">
      <TweetsContextProvider>
      <BrowserRouter>
      <Nav/>
        <Routes>
          <Route path="/" element={<Tweets/>} />
        </Routes>
      </BrowserRouter>
      </TweetsContextProvider>
    </div>
  );
}

export default App;
