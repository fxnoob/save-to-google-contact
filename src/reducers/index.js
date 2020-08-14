const initialState = {
  selectedText: "",
  isOpen: false
};
const rootReducer = (state = initialState, action) => {
  if (action.type === "SHOW_POPOVER") {
    return Object.assign({}, state, action.payload);
  }
};
export default rootReducer;
