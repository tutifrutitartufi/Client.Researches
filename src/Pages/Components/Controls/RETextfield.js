import { TextField } from '@material-ui/core'

export default function RETextfield(props){
    return <TextField
        type={props.label === 'Password' ? 'password' : 'text'}
        label={props.label}
        value={props.children}
        onChange={props.onChange}
    />
}
