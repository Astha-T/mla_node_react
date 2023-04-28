import types from '../ActionTypes'

export const ACTION_USER_LOGIN_LOGOUT = {
    type: types.TYPE_USER_LOGIN_LOGOUT,
    payload: {
        token: '',
        block_id: undefined,
        mandal_id: undefined,
        sector_id: undefined,
        booth_id: undefined,
        caste_id: '',
        blockquantity: '',
        block_name: '',
        mandal_name: '', 
        sector_name: '', 
        booth_name: '',
        displaystatus: 0,
        option:'', 
        url:''
    }
}
