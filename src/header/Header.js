import SearchIcon from '@mui/icons-material/Search';
import HomeIcon from '@mui/icons-material/Home';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import TextsmsRoundedIcon from '@mui/icons-material/TextsmsRounded';
import NotificationsRoundedIcon from '@mui/icons-material/NotificationsRounded';
import './header.css';
import HeaderOption from './HeaderOption';
import { logout, search } from '../redux/userSlice';
import { useSelector, useDispatch } from 'react-redux';
import { getAuth, signOut } from "firebase/auth";
import { selectUser } from '../redux/userSlice';
import { useState } from 'react';

const Header = ()=> {
    const [userSearch, setUserSearch] = useState("");
    const user = useSelector(selectUser);
    const dispatch = useDispatch();
    const auth = getAuth();

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

    return(
        <header className="header">
            <div className="header__left">
                <img src="https://cdn-icons-png.flaticon.com/128/3536/3536505.png" alt="" />
                <div className="header__search">
                <SearchIcon />
                    <input type="text" value={userSearch} onChange={handleSearch} />
                </div>
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
    )
}

export default Header;