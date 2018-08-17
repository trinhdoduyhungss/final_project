const INITIAL_STATE = {
    // list: [{
    //     id:0,
    //     name:'T shirt 1',
    //     type:'CLOTHES',
    // },{
    //     id:1,
    //     name:'T shirt 2',
    //     type:'CLOTHES',
    // },{
    //     id:2,
    //     name:'T shirt 3',
    //     type:'CLOTHES',
    // },{
    //     id:3,
    //     name:'T shirt 4',
    //     type:'CLOTHES',
    // },{
    //     id:4,
    //     name:'T shirt 5',
    //     type:'CLOTHES',
    // }],
    login: [{
        id:0,
        user:'khongco',
        pass:'khongco'
    }]
}
export const getListProduct = () => ({
    type: 'GET_LIST'
})
export const deleteListProduct = (id) => ({
    type: 'DELETE_LIST',
    id
})
const productsReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case 'GET_LIST':
        return {
          ...state,
          type: action.type          
        }
        case 'DELETE_LIST':
        return {
            ...state,
          list: state.list.filter(product => product.id !== action.id),
          type:action.type     
        }            
      default:
        return state
    }
  }
  
export default productsReducer