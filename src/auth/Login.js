import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword , updateProfile } from "firebase/auth";
import './Login.css';
import { login, logout } from '../redux/userSlice';


const Login = ()=>{
    const [fullname, setFullname] = useState('');
    const [photoURL, setPhotoURL] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const auth = getAuth();

    const registerUser = (e)=>{
        e.preventDefault();
        if(!fullname){
            return alert('please enter full name');
        }
        
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            
            const user = userCredential.user;
            updateProfile(user, {
                displayName: fullname, photoURL: photoURL
            }).then((userDetails)=>{
                dispatch(login({
                    email: userDetails.email,
                    uid: userDetails.uid,
                    photoURL: userDetails.photoURL,
                    displayName: userDetails.displayName
                }))
            }).catch((error) =>{
                alert('error');
            });
            
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorMessage)
        });
    }

    const loginUser = (e)=>{
        e.preventDefault();

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                dispatch(login({
                    email: user.email,
                    uid: user.uid,
                    photoURL: user.photoURL,
                    displayName: user.displayName
                }))
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
            });

    }

    return(
        <div className='login'>
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/LinkedIn_Logo.svg/1280px-LinkedIn_Logo.svg.png" alt="" />
            <form>
                <input type="text" placeholder='Full name' value={fullname} onChange={ (e)=> setFullname(e.target.value) } />                
                <input type="text" placeholder='Profile picture Url' value={photoURL} onChange={ (e)=> setPhotoURL(e.target.value) } />                
                <input type="text" placeholder='email' value={email} onChange={ (e)=> setEmail(e.target.value) } />                
                <input type="password" placeholder='password' value={password} onChange={ (e)=> setPassword(e.target.value) } />  
                <button onClick={loginUser}>Sign in</button>              
            </form>
            <p>Not a member 
                <span className='login__register' onClick={registerUser}> Register now</span>
            </p>
        </div>
    )
}

export default Login; 