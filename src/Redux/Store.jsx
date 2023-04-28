import { createStore, combineReducers } from "redux"
import UserReducer from './UserReducer'

const store = createStore(combineReducers({
    user: UserReducer,

}, {
    user: {
        token: '',
        block_id: undefined, mandal_id: undefined, sector_id: undefined, booth_id: undefined, caste_id: '', blockquantity: '', 
        block_name: '', mandal_name: '', sector_name: '', booth_name: '', displaystatus: '', option:'', url:''
    },
}))

export default store;