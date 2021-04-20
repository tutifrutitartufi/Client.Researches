import { Select, MenuItem, InputLabel } from '@material-ui/core';

const RoleOptions = [
    { name: 'Member', value:0 },
    { name: 'Moderator', value:1 },
    { name: 'Admin', value:2 }
]



export default function RESelect( props ) {

    const RenderOptions = () => {
        switch (props.label) {
            case 'Role':
                return RoleOptions.map((role, index) => <MenuItem key={'_' + index} value={role.value}> {role.name} </MenuItem>)
            default:
                return props.options.map((user, index) => <MenuItem key={'_' + index} value={user.id}>{user.firstName + ' ' + user.lastName}</MenuItem>)
        }
    }

    return (
        <>
        <InputLabel id="re_select">{props.label}</InputLabel>
        <Select
            labelId="re_select"
            value={props.value}
            onChange={props.onChange}
            multiple={props.multiple}
        >
            { RenderOptions() }
        </Select>
        </>
    )
}
