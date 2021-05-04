import '../../Assets/Styles/Controls/RELoader.scss'
import { CircularProgress } from "@material-ui/core";

export default function RELoader(){
    return (
        <div className='re_loader_container'>
            <div className='re_loader_wrapper'>
                <CircularProgress className='re_loader' disableShrink />
            </div>
        </div>
    )
}
