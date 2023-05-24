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
      <TweetsContextProvider>
        <UserContextProvider>
          <LayoutContextProvider>
              <BrowserRouter>
                  <Routes>
                    <Route path="/" element={<Form/>} />
                    <Route path="/tweeterio" element={<Tweets/>} />
                  </Routes>
              </BrowserRouter>
          </LayoutContextProvider>
        </UserContextProvider>
      </TweetsContextProvider>
    </div>
  );
}

export default App;
