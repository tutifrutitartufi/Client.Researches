import { TextField } from '@material-ui/core'

export default function REDatepicker(props){
    return <TextField
        id="date"
        type="date"
        label={props.label}
        value={props.value}
        onChange={props.onChange}
        InputLabelProps={{
            shrink: true
        }}
    />
}
