import { useEffect, useState } from 'react';
import Header from './header/Header';
import Sidebar from './sidebar/Sidebar';
import Widgets from './widgets/Widgets';
import Feed from './feed/Feed';
import './App.css';
import Login from './auth/Login';
import { useSelector, useDispatch } from 'react-redux';
import { selectUser } from './redux/userSlice';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { login, logout } from './redux/userSlice';

function App() {

  const user = useSelector(selectUser);
  const auth = getAuth();
  const dispatch = useDispatch();
  const [sidebarStatus, setSidebarStatus] = useState(false);
  const [messagebarStatus, setMessagebarStatus] = useState(false);
  const sidebarHandler = ()=>{
    setSidebarStatus(!sidebarStatus);
    setMessagebarStatus(false);
  }

  const messageHandler = ()=>{
    setMessagebarStatus(!messagebarStatus);
    setSidebarStatus(false);
  }

  useEffect(()=>{

    onAuthStateChanged(auth, (userAuth) => {
      if (userAuth) {

        dispatch(login({
          email: userAuth.email,
          uid: userAuth.uid,
          photoURL: userAuth.photoURL,
          displayName: userAuth.displayName
        }))
        
      } else {
        dispatch(logout())
      }
    });

  },[])

  return (
    <div className="app">
      <Header sidebarHandler={sidebarHandler} messageHandler={messageHandler} />
      {!user ? ( <Login /> ) : (

        <div className='app_body'>
            {/* sidebar */}
            <Sidebar sidebarStatus={sidebarStatus} />
            {/* feed */}
            <Feed />
            {/* widget */} 
            <Widgets messagebarStatus={messagebarStatus} />          
        </div>
      )}

    </div>
  );
}

export default App;
