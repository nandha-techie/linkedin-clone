import { Avatar } from '@mui/material';
import './HeaderOption.css'

const HeaderOption = ({Icon, title, avatar, onClick, user})=>{
    return <div className="headerOption">
        { Icon && <Icon className="headerOption__icon" /> }
        { avatar ? (<Avatar className="headerOption__icon" src={avatar} onClick={onClick} />) : (
            (user && (<p onClick={onClick}> Logout</p>) )
        ) }
        <h4 className="headerOption__title">{ title }</h4>
    </div>;
}

export default HeaderOption;