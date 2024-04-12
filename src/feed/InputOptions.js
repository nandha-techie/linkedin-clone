import './InputOptions.css';


const InputOptions = ({Icon, title, color, likeHandle, id, like})=>{
    return(
        <div className='inputOptions' onClick={()=>likeHandle(id)}>
            <Icon style={{ color: color }} />
            <h4>{(like !== 0 ? like : '')} { title }</h4>
        </div>
    )
}

export default InputOptions;