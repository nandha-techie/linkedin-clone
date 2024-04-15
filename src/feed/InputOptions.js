import './InputOptions.css';


const InputOptions = ({Icon, title, color, likeHandle, id, like})=>{
    return(
        <div className='inputOptions' {...(likeHandle ? { onClick: ()=>likeHandle(id)} : {} )}>
            <Icon style={{ color: color }} fontSize="small" />
            <h4>{(like !== 0 ? like : '')} { title }</h4>
        </div>
    )
}

export default InputOptions;