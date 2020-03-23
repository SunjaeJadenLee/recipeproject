import {createStore,combineReducers,applyMiddleware} from 'redux'
import reducer from './reducer'
import thunk from 'redux-thunk'
import categoryReducer from './categoryReducer'
import {setInitialCategory} from './categoryActions'

const store = createStore(combineReducers({darkMode:reducer,category:categoryReducer}),applyMiddleware(thunk)) 


const setInitCategory = () => {
    return function (dispatch) { 
        let headers = new Headers();
        headers.append('Content-Type', 'json/application')
        fetch('http://localhost:5000/', {
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
// store.subscribe(()=>console.log(store.getState()));
store.dispatch(setInitCategory());
export default store