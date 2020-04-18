import {Platform,AsyncStorage} from 'react-native';

const initialState = {
    userinfo: null
}

const reducer = (state=initialState,actions) =>{
    switch(actions.type){
        case 'SETUSERINFO': 
            return {...state,userinfo:actions.userinfo}

        default:
            return {...state}
    }
}

export default reducer;