export const LoginStart = (userCredentials) => ({
    type:'LOGIN-START',
});

export const LoginSuccess = (user) => ({
    type:'LOGIN-SUCCESS',
    payload:user,
});

export const LoginFailure = (err) => ({
    type:'LOGIN-FAILURE',
    payload:err,
});

export const follow = (userId) =>({
    type:"FOLLOW",
    payload:userId,
});

export const unfollow = (userId) =>({
    type:"UNFOLLOW",
    payload:userId,
});
