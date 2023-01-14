const AuthReducer = (state,action) => {
    switch(action.type){
        case "LOGIN-START":
            return{
                user:null,
                isFetching:true,
                err:false,
            };
            case "LOGIN-SUCCESS":
                return{
                    user:action.payload,
                    isFetching:false,
                    err:false,
                };
            case "LOGIN-FAILURE":
                return{
                    user:null,
                    isFetching:false,
                    err:action.payload,
                };
            case "FOLLOW":
                return{
                    ...state,
                    user:{
                        ...state.user,
                        following: [...state.user.following,action.payload],
                    },
                };
            case "UNFOLLOW":
                return{
                    ...state,
                    user:{
                        ...state.user,
                        following: state.user.following.filter(follow=>{
                            return follow !== action.payload}
                        ),
                    },
                    };
            default:
                return state;
    }
};

export default AuthReducer;
