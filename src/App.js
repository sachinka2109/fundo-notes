import { Toaster } from 'react-hot-toast';
import './App.css';
import store from './components/Reducer/Store';
import Router from './router/Router';
import { Provider } from 'react-redux';

function App() {
  // const [auth,setIsAuth] = useState(false);
  return (
    <Provider store={store}>
      <Router></Router>
      <Toaster />
    </Provider>
  );
}

export default App;
