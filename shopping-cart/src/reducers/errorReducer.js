import { GET_ERRORS,CLEAR_ERRORS } from "../types";

const initialState = {
    msg:'',
    status:'',
    id:null
}

export default function(state=initialState,action){
switch(action.type){
    case GET_ERRORS:
        return {
            msg:action.payload.type,
            status:action.payload.status,
            id:action.payload.id
        };
        case CLEAR_ERRORS:
            return {
                msg:'',
                status:'',
                id:null
            };
        default:
            return state;
    
}
}
