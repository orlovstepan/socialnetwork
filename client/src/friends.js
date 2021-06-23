import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    receiveFriendsAndWannabes,
    acceptFriendRequests,
    unfriend,
} from "./actions";
import { Link } from "react-router-dom";

export default function Friends() {
    const dispatch = useDispatch();
    const friends = useSelector(
        (state) =>
            state.friendsAndWannabes &&
            state.friendsAndWannabes.filter(({ accepted }) => accepted)
    );
    const wannabes = useSelector(
        (state) =>
            state.friendsAndWannabes &&
            state.friendsAndWannabes.filter(({ accepted }) => !accepted)
    );

    useEffect(() => {
        (!friends || !wannabes) && dispatch(receiveFriendsAndWannabes());
    }, []);

    return (
        <div className="friendsContainer">
            <h3>Friends</h3>
            <ul>
                {friends &&
                    friends.map((each) => (
                        <li key={each.id}>
                            <Link to={`/user/${each.id}`}>
                                <img height="100px" src={each.profile_pic} />
                                <p>
                                    {each.first} {each.last}
                                </p>
                            </Link>
                            <button
                                className="friendBtn"
                                onClick={() => dispatch(unfriend(each.id))}
                            >
                                Unfriend
                            </button>
                        </li>
                    ))}
            </ul>
            <h3>Friend requests</h3>
            <ul>
                {wannabes &&
                    wannabes.map((each) => (
                        <li key={each.id}>
                            <Link to={`/user/${each.id}`}>
                                <img height="100px" src={each.profile_pic} />
                                {each.first} {each.last}
                            </Link>
                            <button
                                onClick={() =>
                                    dispatch(acceptFriendRequests(each.id))
                                }
                            >
                                Accept friend request
                            </button>
                        </li>
                    ))}
            </ul>
        </div>
    );
}
