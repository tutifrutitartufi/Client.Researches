import { Paper } from "@material-ui/core";
import '../../Assets/Styles/Controls/REPost.scss'

export default function REPost(props){
    return (
        <Paper elevation={3} >
            <div onClick={() => props.DeletePostItem(props.id)} className='re_trash-bin'><img src="/trash_bin.svg" alt=""/></div>
            <div>{props.content}</div>
            <div>Likes: {props.likes && props.likes.length}</div>
            <div>Dislikes: {props.dislikes && props.dislikes.length}</div>
        </Paper>
    )

}
