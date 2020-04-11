
const initialState = {
    darkModeColor:'#EAEAEA',
    darkModeTextColor:'#000',
    darkMode:false, 
}

const reducer = (state=initialState,actions) =>{ 

    switch(actions.type){
        case 'SETDARKMODE':
            if(actions.darkMode == true){
                return {...state,darkModeColor:'rgb(39,39,39)',darkModeTextColor:'#EAEAEA',darkMode:true}
            } else {
                return {...state,darkModeColor:'#EAEAEA',darkModeTextColor:'rgb(39,39,39)',darkMode:false}
            }
        default:
            return{...state}
    }
}

export default reducer