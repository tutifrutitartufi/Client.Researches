export const formatDateTimeList = (input) =>{
    if(input){
        const dateTime = input.split("T");
        const date = dateTime[0].split('-');
        const time = dateTime[1].split(':');
        return `${date[2]}/${date[1]}/${date[0]}`
    }
    return '';
}

export const formatDateTimeEdit = (input) =>{
    if(input){
        const dateTime = input.split("T");
        const date = dateTime[0].split('-');
        const time = dateTime[1].split(':');
        return `${date[0]}-${date[1]}-${date[2]}`
    }
    return '';
}

export const formatRole = (input) =>{
    switch (input){
        case 0:
            return 'Member';
        case 1:
            return 'Moderator';
        case 2:
            return 'Admin'
    }
}
