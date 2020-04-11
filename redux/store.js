import {createStore,combineReducers,applyMiddleware} from 'redux'
import reducer from './reducer'
import thunk from 'redux-thunk'
import categoryReducer from './categoryReducer'
import recipeReducer from './recipeReducer'
import authReducer from './authReducer'
import {setInitialCategory,setIngredientCategoryDatail} from './categoryActions'

const store = createStore(combineReducers({darkMode:reducer,category:categoryReducer,recipe:recipeReducer,auth:authReducer}),applyMiddleware(thunk)) 


const setInitCategory = () => {
    return function (dispatch) { 
        let headers = new Headers();
        headers.append('Content-Type', 'json/application')
        fetch('http://localhost:5000/ingredient_category', {
            headers: headers,
            method: 'GET',
            credentials: 'include',
        }).then(res => {
            res.json().then(resJson => {  
                dispatch(setInitialCategory(resJson));
            })
        }).catch(err => console.log(err))
    }
}

const setInitCategoryDetail = () => {
    return function (dispatch) { 
        let headers = new Headers();
        headers.append('Content-Type', 'json/application')
        fetch('http://localhost:5000/ingredient_category_detail', {
            headers: headers,
            method: 'GET',
            credentials: 'include',
        }).then(res => {
            res.json().then(resJson => {  
                dispatch(setIngredientCategoryDatail(resJson));
            })
        }).catch(err => console.log(err))
    }
}
// store.subscribe(()=>console.log(store.getState()));
store.dispatch(setInitCategory());
store.dispatch(setInitCategoryDetail());
export default store