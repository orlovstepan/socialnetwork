import axios from "./axios";

export async function receiveFriendsAndWannabes() {
    const { data } = await axios.get("/api/friends");
    console.log("data in actions", data);
    return {
        type: "RECEIVE_FRIENDS_WANNABES",
        friendsAndWannabes: data,
    };
}

export async function acceptFriendRequests(id) {
    console.log("id in accept friend request: ", id);
    let buttonText = "Accept friend request";
    const { data } = await axios.post("/api/friendship-action", {
        buttonText,
        id,
    });
    // console.log("DATA IN ACCEPT FRIEND: ", data);
    return {
        type: "ACCEPT_FRIEND_REQUEST",
        acceptedId: id,
    };
}

export async function unfriend(id) {
    let buttonText = "Unfriend";
    const { data } = await axios.post("/api/friendship-action", {
        buttonText,
        id,
    });
    // console.log("DATA IN UNFRIEND: ", data);
    return {
        type: "UNFRIEND",
        unfriendId: id,
    };
}

export function chatMessages(msgs) {
    // console.log("last 10 messages in ACTION", msgs);
    return {
        type: "RECEIVE_LAST_10_MESSAGES",
        chatMessages: msgs,
    };
}
export function chatMessage(msg) {
    // console.log("last 10 messages in ACTION", msgs);
    return {
        type: "NEW_CHAT_MESSAGE",
        chatMessage: msg,
    };
}
