import '../../Assets/Styles/Controls/REAction.scss'
import REButton from "./REButton";
import { useHistory, useParams } from "react-router-dom";

export default function REAction(props){
    let history = useHistory();
    let param = useParams();
    return (
        <div className='re_action_wrapper'>
            <REButton
                value='Back'
                onClick={() => history.push(`/users`)}
            />
            <REButton
                value='Edit'
                onClick={() => history.push(`/users/edit/${param.id}`)}
            />
        </div>
    )
}
