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
          <Route path='/' element = {<Home/> } />
          <Route path='/book/:id' element = {localStorage.getItem('token') !== null ? <Book/> : <Login/> }/>
          <Route path='/addbook' element = {localStorage.getItem('token') !== null ? <AddBook/>  : <Login/>}/> 
          <Route path='/login' element = {<Login/>}/>
          <Route path='/signup' element = {<Signup/>}/>
        </Routes>
    </BrowserRouter>
  );
};

export default App;