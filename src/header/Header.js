import SearchIcon from '@mui/icons-material/Search';
import HomeIcon from '@mui/icons-material/Home';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import TextsmsRoundedIcon from '@mui/icons-material/TextsmsRounded';
import NotificationsRoundedIcon from '@mui/icons-material/NotificationsRounded';
import { Avatar } from '@mui/material';
import MessageIcon from '@mui/icons-material/Message';
import './header.css';
import HeaderOption from './HeaderOption';
import { logout, search } from '../redux/userSlice';
import { useSelector, useDispatch } from 'react-redux';
import { getAuth, signOut } from "firebase/auth";
import { selectUser } from '../redux/userSlice';
import { useState, useRef  } from 'react';

const Header = ({sidebarHandler, messageHandler})=> {
    const [userSearch, setUserSearch] = useState("");
    const user = useSelector(selectUser);
    const dispatch = useDispatch();
    const auth = getAuth();
    const navmenu = useRef();

    const logoutUser = ()=> {
        signOut(auth).then(() => {
            dispatch(logout());
        }).catch((error) => {
            // An error happened.
        });
    }

    const handleSearch = (e)=>{
        setUserSearch(e.target.value);
        dispatch(search(e.target.value.trim(userSearch)));
    }

    const scrollUp = "scroll_up";
    const scrollDown = "scroll_down";
    let lastScroll = 0;

    window.addEventListener("scroll", () => {
    const currentScroll = window.pageYOffset;
    if (currentScroll <= 0) {
        navmenu.current.classList.remove(scrollUp);
        return;
    }

    if (currentScroll > lastScroll && !navmenu.current.classList.contains(scrollDown)) {
        navmenu.current.classList.remove(scrollUp);
        navmenu.current.classList.add(scrollDown);
    } else if (
        currentScroll < lastScroll &&
        navmenu.current.classList.contains(scrollDown)
    ) {
        navmenu.current.classList.remove(scrollDown);
        navmenu.current.classList.add(scrollUp);
    }
    lastScroll = currentScroll;
    });

    return(
        <>
            <header className="header">
                <div className="header__left">
                    <Avatar className='header__profile' onClick={()=> sidebarHandler()} />
                    <img src="https://cdn-icons-png.flaticon.com/128/3536/3536505.png" alt="" />
                    <div className="header__search">
                    <SearchIcon />
                        <input type="text" value={userSearch} onChange={handleSearch} />
                    </div>
                    <MessageIcon className='header__message' fontSize="large" onClick={()=> messageHandler() } />
                </div>
                <div className="header__right">
                    <HeaderOption Icon={HomeIcon} title="Home" />
                    <HeaderOption Icon={SupervisorAccountIcon} title="My Network" />
                    <HeaderOption Icon={BusinessCenterIcon} title="Job" />
                    <HeaderOption Icon={TextsmsRoundedIcon} title="Messaging" />
                    <HeaderOption Icon={NotificationsRoundedIcon} title="Notifications" />
                    <HeaderOption onClick={logoutUser} user={user} avatar={user?.photoURL} title={user?.displayName} />
                </div>
            </header>
            <nav className="mobile_menu" ref={navmenu}>
                <HeaderOption Icon={HomeIcon} title="Home" />
                <HeaderOption Icon={SupervisorAccountIcon} title="My Network" />
                <HeaderOption Icon={BusinessCenterIcon} title="post" />
                <HeaderOption onClick={logoutUser} user={user} avatar={user?.photoURL} title={user?.displayName} />
            </nav>
        </>
    )
}

export default Header;