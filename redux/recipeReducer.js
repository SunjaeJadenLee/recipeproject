import {Animated,Easing,Dimensions} from 'react-native'

const REM = Dimensions.get('window').width / 375

const initialState = {
  selected_add_category: [],
  myRecipes: []
}

const reducer = (state = initialState, actions) => {


  switch (actions.type) {
    case 'SETSELECTEDADDCATEGORY':
      if (!state.selected_add_category.includes(actions.category)) {
        return { ...state, selected_add_category: [...state.selected_add_category, actions.category] }
      } else {
        return { ...state, selected_add_category: state.selected_add_category.filter(e => e !== actions.category) }
      }
    case 'GETMYRECIPE':
      let headers = new Headers();
      let form = new FormData();
      headers.append('Content-Type', 'multipart/form-data');
      headers.append('Accept', 'application/json')
      form.append('userid', actions.userid);
      form.append('id','asd');
      console.log('@getmyrecipe@@@@@@@@@@@@@@@@@@@@@@@@')
      new Promise((resolve, reject) => {
        fetch('http://localhost:5000/getMyRecipe', {
          method: 'POST',
          headers: headers,
          body: form
        }).then(res => {
          console.log(res)
          if (res.status == 200) {
            res.json().then(resJson => {
              console.log('resJson@@@@@@@@@@@@@@@@@@')
              console.log(resJson)
              resolve(resJson)
              return { ...state, myRecipes: resJson }
            })
          } else {
            return false
          }

        }).catch(err => console.log(err))
      })


    default:
      return { ...state }
  }
}

export default reducer