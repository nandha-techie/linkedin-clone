import { Avatar } from '@mui/material';
import { useSelector } from 'react-redux';
import { selectUser } from '../redux/userSlice';
import './Sidebar.css';


const Sidebar = ()=>{
    const user = useSelector(selectUser);
    const recentItem = (topic)=>{
        return <div className='sidebar__recentItem'> 
                    <span className='sidebar__hashtag'>#</span>
                    <p>{topic}</p>
                </div>;
    }

    return(
        <div className="sidebar">
            <div className="sidebar__top">
                <img src="https://plus.unsplash.com/premium_photo-1670768401521-fc2fc532f4ca?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="bg" />
                <Avatar src={user.photoURL} className="sidebar__avatar" />
                <h3>{user.displayName}</h3>
                <h4>nandhawebapps@gmail.com</h4>
            </div>
            <div className='sidebar__stats'>
                <div className='sidebar__stat'>
                    <p>Who viewed you</p>
                    <p className='sidebar__statNumber'>2,340</p>
                </div>
                <div className='sidebar__stat'>
                    <p>Who viewed you</p>
                    <p className='sidebar__statNumber'>2,340</p>
                </div>
            </div>
            <div className='sidebar__bottom'>
                <h4>Recent</h4>
                {recentItem('reactjs')}
                {recentItem('programming')}
                {recentItem('software tester')}
                {recentItem('ui developer')}
                {recentItem('angularjs')}
            </div>
        </div>
    )
}

export default Sidebar;