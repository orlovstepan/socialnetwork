import { useState, useEffect } from "react";
import axios from "./axios";

export default function FriendshipButton({ id }) {
    const [buttonText, setButtonText] = useState("");

    useEffect(() => {
        console.log("about to make a request to /api/friendship-status");
        axios
            .get(`/api/friendship-status/${id}`)
            .then(({ data }) => {
                if (data.requested == false) {
                    setButtonText("Send friend request");
                } else if (data.accepted == true) {
                    setButtonText("Unfriend");
                } else if (data.cancel == true) {
                    setButtonText("Cancel request");
                } else if (data.accepted == false) {
                    setButtonText("Accept friend request");
                }
            })
            .catch((e) => console.log("error in friendship status", e));
    }, []);

    //when the component mounts, useEffect to make request to the server sending along the otherId
    //the server can look up stuff in the db
    // logic can either be server side or client side
    // if it's server side, just send back the text for the button
    //if we make it a get route, we want to think about params

    //the other thing is handle what happens when someone clicks the button

    function sendRequest() {
        axios
            .post("/api/friendship-action", { buttonText, id })
            .then(({ data }) => {
                console.log("data");
                if (data.requested == false) {
                    setButtonText("Send friend request");
                } else if (data.accepted == true) {
                    setButtonText("Unfriend");
                } else if (data.cancel == true) {
                    setButtonText("Cancel request");
                } else if (data.accepted == false) {
                    setButtonText("Accept friend request");
                }
            })
            .catch((e) => console.log("error in sendRequest", e));
    }

    return <button onClick={sendRequest}>{buttonText}</button>;
}
