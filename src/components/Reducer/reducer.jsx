
const initialState = {
    title: 'Keep'
}

const reducer = (state=initialState, action) => {
    switch(action.type) {
        case 'Notes' :
            return {...state,title: 'Keep'}
        case 'Archive':
            return {...state,title: 'Archive'}
        case 'Trash':
            return {...state,title: 'Trash'}
        default:
            return state
    }
}

export default reducer