import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { NewCanvas, GetCanvasses } from "../../Actions";
import '../Assets/Styles/PostListing.scss';
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import REButton from "./Controls/REButton";
import RECanvas from "./Controls/RECanvas";

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ NewCanvas, GetCanvasses }, dispatch);
}
function CanvasListing({NewCanvas, GetCanvasses}) {
    const [Canvasses, SetCanvasses] = useState([]);
    let { id } = useParams();


    useEffect(() => {
        GetCanvasses(id).then(res => {
            if (res && res.payload && res.payload.data) {
                SetCanvasses(res.payload.data);
            }
        })
    })

    return (
        <>
            { Canvasses.map((canvas, index) => <RECanvas key={"_" + index} {...canvas}/>) }
            <div className='re_post-listing-action-wrapper'>
                <REButton value='Add canvas'/>
            </div>
        </>
    );
}

export default connect(null, mapDispatchToProps)(CanvasListing);
