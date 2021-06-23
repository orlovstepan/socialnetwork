import { useState, useEffect, useRef } from "react";
import { socket } from "./socket";

export default function WallPosts(props) {
    const [allPosts, setallPosts] = useState([]);
    const elementRef = useRef();

    // const wallPost = useSelector((state) => state && state.wallPost);
    // console.log("wallPost:", wallPost);

    useEffect(() => {
        if (!props.id) {
            return;
        }
        socket.emit("get wall posts", props.id);

        socket.on("last10", (last10) => {
            console.log("------last 10", last10);
            setallPosts(last10);
        });
        return () => {
            socket.off("last10");
        };
    }, [props.id]);

    useEffect(() => {
        socket.on("lastWallPost", (lastPost) => {
            console.log("allPosts", allPosts);
            console.log("lastPost", lastPost);
            setallPosts([...allPosts, lastPost]);
        });
        return () => {
            socket.off("lastWallPost");
        };
    }, [allPosts]);

    useEffect(() => {
        elementRef.current.scrollTop =
            elementRef.current.scrollHeight - elementRef.current.clientHeight;
    }, [WallPosts]);

    function keyCheck(e) {
        if (e.key === "Enter") {
            // console.log("value", e.target.value);
            e.preventDefault();
            socket.emit("new wallpost", e.target.value, props.id);
            e.target.value = "";
        }
    }
    console.log("allPosts", allPosts);
    return (
        <div className="wall">
            <h1> Wall </h1>
            <div className="wall-container" ref={elementRef}>
                <ul>
                    {allPosts &&
                        allPosts.map((each, index) => (
                            <li key={index}>
                                <img
                                    className="userSEarchImg"
                                    src={each.profile_pic}
                                ></img>
                                {each.first} {each.last} wrote: &quot;
                                {each.wallpost} &quot;
                            </li>
                        ))}
                </ul>
            </div>
            <textarea
                placeholder="Write something on the wall"
                onKeyDown={keyCheck}
            ></textarea>
        </div>
    );
}
