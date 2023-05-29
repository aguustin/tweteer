import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { LayoutContextProvider } from './context/layoutsContext';
import { BrowserRouter , Routes ,Route } from 'react-router-dom';
import Tweets from './components/tweeter/tweets';
import Form from './components/form/form';
import { TweetsContextProvider } from './context/tweetsContext';

function App() {
  return (
    <div className="App">
      <TweetsContextProvider>
          <LayoutContextProvider>
              <BrowserRouter>
                  <Routes>
                    <Route path="/" element={<Form/>} />
                    <Route path="/tweeterio" element={<Tweets/>} />
                  </Routes>
              </BrowserRouter>
          </LayoutContextProvider>
      </TweetsContextProvider>
    </div>
  );
}

export default App;
