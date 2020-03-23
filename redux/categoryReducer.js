import {Animated,Easing,Dimensions} from 'react-native'

const REM = Dimensions.get('window').width / 375

const initialState = { 
    initialIngCategory:[],
    secondIngCategory:[],
    thirdIngCategory:[],
    selected_category:[],
    category_ingredient:['야채','과일','고기','해산물','곡물','조미료','파우더','기름'],
    category_type:['밥','면','국','빵','스프','고기','스프','디저트','기타'],
    category_type_detail:[],
    category_calorie:0,
    category_page: 0,
    category_pageRef: undefined
}

const reducer = (state=initialState,actions) =>{  

    switch(actions.type){
        case 'SETINITAILCATEGORY':
            return {...state,initialIngCategory:actions.initialIngCategory}
        case 'SETSECONDCATEGORY':
            return { ...state, secondIngCategory: actions.secondIngCategory }
        case 'SETTHIRDCATEGORY':
            return { ...state, thirdIngCategory: actions.thirdIngCategory }
        case 'SETINGCATEGORY': 
            if(!state.selected_category.includes(actions.category)){
                return {...state,selected_category:[...state.selected_category,actions.category]}
            } else {
                return {...state,selected_category:state.selected_category.filter(e=>e!==actions.category)}
            }
        
        case 'SETCATEGORYPAGE':
           return {...state,category_page:actions.category_page};
        case 'SETCATEGORYPAGEREF':
            return {...state,category_pageRef:actions.category_pageRef}
        default:
            return{...state}
    }
}

export default reducer