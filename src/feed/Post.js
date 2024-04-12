import InputOptions from './InputOptions';
import './Post.css';
import { Avatar } from '@mui/material';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import React, { forwardRef } from 'react';


const Post = forwardRef(({ id, name, message, url, likeHandle, likecount }, ref)=>{

    return(
        <div className='post' ref={ref}>
            <div className='post__header'>
                <Avatar src={url} />
                <div className='post__info'>
                    <h2>{name}</h2>
                    <p>Description</p>
                </div>
            </div>
            <div className='post__body'>
                <p>{ message }</p>
            </div>
            <div className='post__buttons'>
                <InputOptions like={likecount.length} Icon={ThumbUpAltIcon} title='Like'likeHandle={likeHandle} id={id}  color='gray' />
                <InputOptions Icon={ChatOutlinedIcon} title='Comment' color='gray' />
                <InputOptions Icon={ShareOutlinedIcon} title='Share' color='gray' />
                <InputOptions Icon={SendOutlinedIcon} title='Send' color='gray' />
            </div>
        </div>
    )
    })

export default Post;