import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { NewCanvas, GetCanvasses, DeleteCanvas } from "../../Actions";
import '../Assets/Styles/PostListing.scss';
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import REButton from "./Controls/REButton";
import RECanvas from "./Controls/RECanvas";
import { Paper } from "@material-ui/core";
import {toast} from "react-toastify";

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ NewCanvas, GetCanvasses, DeleteCanvas }, dispatch);
}
function CanvasListing({NewCanvas, GetCanvasses, DeleteCanvas}) {
    const [Canvasses, SetCanvasses] = useState([]);
    const [ NewCanvasState, SetNewCanvasState ] = useState(false);
    const [ NewCanvasTitle, SetNewCanvasTitle ] = useState('');
    let { id } = useParams();


    useEffect(() => {
        GetCanvasItems();
    },[])

    const GetCanvasItems = () => {
        GetCanvasses(id).then(res => {
            if (res && res.payload && res.payload.data) {
                SetCanvasses(res.payload.data);
            }
        })
    }

    const DeleteCanvasItem = (canvasId) => {
        DeleteCanvas(id, canvasId).then(res => {
            if(res && res.payload && res.payload.data) {
                GetCanvasItems();
                toast.success('Success');
            }
        })
    }

    const SaveNewCanvas = () => {
        NewCanvas(id, {title: NewCanvasTitle}).then(res => {
            if (res && res.payload && res.payload.data) {
                toast.success('Success');
                GetCanvasItems();
                SetNewCanvasTitle('');
                SetNewCanvasState(false);
            }
        })
    }

    const RenderNewCanvas = () => {
        return (
            <Paper className='re_new-post-wrapper' elevation={3}>
                <textarea autoFocus onChange={(e) => SetNewCanvasTitle(e.target.value)}/>
                <div className='re_new-canvas-question-wrapper'>

                </div>
                <div className='re_new-post-action'>
                    <REButton value='Save' onClick={() => SaveNewCanvas()}/>
                    <REButton value='Delete' onClick={() => RemoveNewCanvas()}/>
                </div>
            </Paper>
        )
    }

    const RemoveNewCanvas = () => {
        SetNewCanvasTitle('');
        SetNewCanvasState(false);
    }

    return (
        <>
            { Canvasses.map((canvas, index) => <RECanvas key={"_" + index} DeleteCanvasItem={DeleteCanvasItem} {...canvas}/>) }
            <div className='re_post-listing-action-wrapper'>
                { NewCanvasState && RenderNewCanvas() }
                <REButton value='Add canvas' onClick={() => SetNewCanvasState(true)}/>
            </div>
        </>
    );
}

export default connect(null, mapDispatchToProps)(CanvasListing);
