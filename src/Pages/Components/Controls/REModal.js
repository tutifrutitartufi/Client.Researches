import '../../Assets/Styles/Controls/REModal.scss';
import REButton from "./REButton";

export default function REModal(props){
    return (
        <div className='re_modal_wrapper'>
            <div className='re_modal_container'>
                <div className='re_modal_card'>
                    <div className='re_modal_card_wrapper'>
                        <div className='re_modal_question'>Do you want to delete ?</div>
                        <div className='re_modal_action'>
                            <REButton value='Yes' onClick={props.Action}/>
                            <REButton value='No' onClick={() => props.Close(false)}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
