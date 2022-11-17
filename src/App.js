import {BrowserRouter , Route ,Routes} from 'react-router-dom';
import Book from './components/Book';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import AddBook from './components/AddBook';

function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path='/' element = {<Home/>} />
          <Route path='/book/:id' element = {<Book/>}/>
          <Route path='/addbook' element = {<AddBook/>}/> 
          <Route path='/login' element = {<Login/>}/>
          <Route path='/signup' element = {<Signup/>}/>
        </Routes>
    </BrowserRouter>
  );
};

export default App;