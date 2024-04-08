import { useState, useEffect } from 'react';
import './Feed.css';
import CreateIcon from '@mui/icons-material/Create';
import InputOptions from './InputOptions';
import Post from './Post';
import ImageIcon from '@mui/icons-material/Image';
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';
import CalendarViewDayIcon from '@mui/icons-material/CalendarViewDay';
import EventNoteIcon from '@mui/icons-material/EventNote';
import { db } from '../firebase';
import { selectUser } from '../redux/userSlice';
import { useSelector } from 'react-redux';
import FlipMove from 'react-flip-move';

import { query, collection, addDoc, Timestamp, onSnapshot, orderBy } from 'firebase/firestore';

const Feed = ()=>{
    const user = useSelector(selectUser);
    const [posts, setPosts] = useState([]);
    const [postInput, setPostInput] = useState('');

    const sendPost = async (e)=>{
        e.preventDefault();
        await addDoc(collection(db, "posts"), {
            displayName: user?.displayName || "",
            description: "This is test description",
            message: postInput,
            timestamp: Timestamp.now(),
            photoURL: user?.photoURL || "",
          });
          setPostInput("");
    }

    useEffect(()=>{
        
        function feedData() {
            const q = query(collection(db, "posts"), orderBy("timestamp", "desc"));
            onSnapshot(q, (snapshot) => {
                setPosts(snapshot.docs.map((doc) =>(
                    {
                        id: doc.id,
                        ...doc.data()
                    }
                )))                   
            });
                       
          };
          feedData();

    }, [])

    return(
        <div className='feed'>
            <div className='feed__inputContainer'>
                <div className='feed__input'>
                    <CreateIcon className='' />
                    <form onSubmit={ sendPost }>
                        <input type="text" value={postInput} onChange={(e)=> setPostInput(e.target.value)} />
                        <input type="text" />
                        <button type="submit">Send</button>
                    </form>
                </div>
                <div className='feed__inputOptions'>
                    <InputOptions Icon={ImageIcon} title={'Photo'} color='#70b5F9' />
                    <InputOptions Icon={CalendarViewDayIcon} title={'Calendar'} color='#7FC15E' />
                    <InputOptions Icon={SubscriptionsIcon} title={'Subscription'} color='#E7A33E' />
                    <InputOptions Icon={EventNoteIcon} title={'Event'} color='#C0CBCD' />
                </div>
            </div>
            {/* post */}
            <FlipMove>
                { posts && posts.map((post, index) => (
                    <Post key={post.id} name={post.displayName} description={post.description} url={post.photoURL} message={post.message} />
                )) }
            </FlipMove>    
            
        </div>
    )
}

export default Feed;