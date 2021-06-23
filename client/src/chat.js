import { useEffect, useRef } from "react";
import { socket } from "./socket";
import { useSelector } from "react-redux";

export default function Chat() {
    const elementRef = useRef();

    const chatMessages = useSelector((state) => state && state.chatMessages);
    console.log("chatmessages:", chatMessages);

    useEffect(() => {
        // console.log("moun");
        // console.log("elementRef.current", elementRef.current);
        // console.log(
        //     "elementRef.current.scrollHeight",
        //     elementRef.current.scrollHeight
        // );
        // console.log(
        //     "elementRef.current.client",
        //     elementRef.current.clientHeight
        // );

        elementRef.current.scrollTop =
            elementRef.current.scrollHeight - elementRef.current.clientHeight;
    }, [chatMessages]);

    function keyCheck(e) {
        if (e.key === "Enter") {
            console.log("value", e.target.value);
            e.preventDefault();
            socket.emit("new chat message", e.target.value);
            e.target.value = "";
        }
    }

    return (
        <div className="chat">
            <h1> Forum </h1>
            <div className="chat-container" ref={elementRef}>
                <ul>
                    {chatMessages &&
                        chatMessages.map((each, index) => (
                            <li key={index}>
                                <img
                                    className="userSEarchImg"
                                    src={each.profile_pic}
                                ></img>
                                {each.first} {each.last} wrote: &quot;
                                {each.message} &quot;
                            </li>
                        ))}
                </ul>
            </div>
            <textarea
                id="chatInput"
                placeholder="Say something"
                onKeyDown={keyCheck}
            ></textarea>
        </div>
    );
}
