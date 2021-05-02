import { Paper } from "@material-ui/core";
import '../../Assets/Styles/Controls/REPost.scss'

import QuestionListing from '../QuestionListing';

export default function RECanvas(props){
    return (
        <Paper elevation={3} >
            <div onClick={() => props.DeleteCanvasItem(props.id)} className='re_trash-bin'><img src="/trash_bin.svg" alt=""/></div>
            <div>{props.title}</div>
            <QuestionListing canvasId={props.id}/>
        </Paper>
    )
}
