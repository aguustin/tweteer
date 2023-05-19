import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { UserContextProvider } from './context/usersContext';
import { TweetsContextProvider } from './context/tweetsContext';
import { LayoutContextProvider } from './context/layoutsContext';
import { BrowserRouter , Routes ,Route } from 'react-router-dom';
import Tweets from './components/tweeter/tweets';
import Form from './components/form/form';

function App() {
  return (
    <div className="App">
      <UserContextProvider>
        <LayoutContextProvider>
          <TweetsContextProvider>
            <BrowserRouter>
                <Routes>
                  <Route path="/" element={<Form/>}></Route>
                  <Route path="/tweeterio" element={<Tweets/>} />
                </Routes>
            </BrowserRouter>
          </TweetsContextProvider>
        </LayoutContextProvider>
      </UserContextProvider>
    </div>
  );
}

export default App;
