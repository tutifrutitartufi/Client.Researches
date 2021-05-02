import { Paper } from "@material-ui/core";
import '../../Assets/Styles/Controls/REPost.scss'

export default function REPost(props){
    return (
        <Paper elevation={3} >
            <div onClick={() => props.DeleteQuestionItem(props.canvasId, props.id)} className='re_trash-bin'><img src="/trash_bin.svg" alt=""/></div>
            <div>{props.title}</div>
            <div>{props.type}</div>
        </Paper>
    )

}
