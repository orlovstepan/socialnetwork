import { useState, useEffect } from "react";

import axios from "./axios";

export default function FriendshipButton({ id }) {
    const [buttonText, setButtonText] = useState("Make Friend Request");

    useEffect(() => {
        console.log("about to make a request to /api/friendship-status");
        axios
            .get(`/api/friendship-status/${id}`)
            .then(({ data }) => {
                console.log("data in friendship useEffect ", data);
            })
            .catch((e) => console.log("error in friendship status", e));
    }, []);

    //when the component mounts, useEffect to make request to the server sending along the otherId
    //the server can look up stuff in the db
    // logic can either be server side or client side
    // if it's server side, just send back the text for the button
    //if we make it a get route, we want to think about params

    //the other thing is handle what happens when someone clicks the button

    return <button onClick={() => setButtonText("WOW")}>{buttonText}</button>;
}
