import {Platform,AsyncStorage} from 'react-native';

const initialState = {
    dialogueMove:null,
    dialogueType:null,
}

const reducer = (state=initialState,actions) =>{
    switch(actions.type){
        case 'SETDIALOGUE':  
        console.log('setdialogue@@@@@@@@@@@@@@@@@@@@@@')
        console.log(actions.dialogueType)
            return {...state,dialogueMove:actions.move,dialogueType:actions.dialogueType}
        default:
            return {...state}
    }
}

export default reducer;