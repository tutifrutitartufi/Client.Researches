import {Select, MenuItem} from '@material-ui/core';


const options = [
    { value: 2, label: 'Admin' },
    { value: 1, label: 'Moderator' },
    { value: 0, label: 'Member' }
]

export default function RESelect(props){
    return <Select
        label={props.label}
        options={options}
        value={props.value}
        onChange={props.onChange}
    >
        <MenuItem value={0}>Member</MenuItem>
        <MenuItem value={1}>Moderator</MenuItem>
        <MenuItem value={2}>Admin</MenuItem>
    </Select>
}
