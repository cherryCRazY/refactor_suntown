const initialState = {
  isRu: false
};

export const languageReducer = (state = initialState, action) => {
  switch(action.type){
    case 'CHANGE_TO_RU':
      return{
        ...state,
        isRu: true
      }
    case 'CHANGE_TO_UA':
    return{
      ...state,
      isRu: false
    }
    default: return state
  }
}
