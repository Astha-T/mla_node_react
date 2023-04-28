import types from './ActionTypes'

const UserReducer = (state={},action) =>
{
    switch(action.type)
    {
        case types.TYPE_USER_LOGIN_LOGOUT: 
                    return action.payload;       
        default: return state;
    }
}

export default UserReducer;
