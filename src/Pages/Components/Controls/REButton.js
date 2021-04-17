import { Button }  from '@material-ui/core'

export default function REButton(props){
    return <Button color="primary" variant='contained' onClick={props.onClick}>{props.value}</Button>
}
