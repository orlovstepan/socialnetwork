export default function reducer(state = {}, action) {
    let newState = {};
    if (action.type == "RECEIVE_FRIENDS_WANNABES") {
        newState = {
            ...state,
            friendsAndWannabes: action.friendsAndWannabes,
        };
    } else if (action.type == "ACCEPT_FRIEND_REQUEST") {
        newState = {
            ...state,
            friendsAndWannabes: state.friendsAndWannabes.map((user) => {
                if (user.id == action.acceptedId) {
                    return {
                        ...user,
                        accepted: true,
                    };
                } else {
                    return user;
                }
            }),
        };
    } else if (action.type == "UNFRIEND") {
        newState = {
            ...state,
            friendsAndWannabes: state.friendsAndWannabes.filter((user) => {
                if (user.id !== action.unfriendId) {
                    return true;
                }
            }),
        };
    }
    return newState;
}
