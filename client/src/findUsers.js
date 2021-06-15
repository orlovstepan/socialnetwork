import { useEffect, useState } from "react";
import axios from "./axios";
import { Link } from "react-router-dom";

export default function FindUsers() {
    const [usersArray, setUsersArray] = useState([]);
    const [users, setUsers] = useState([]);
    const [user, setUser] = useState("");

    useEffect(() => {
        axios
            .get("/api/users")
            .then(({ data }) => {
                setUsers(data);
                setUsersArray(data);
            })
            .catch((e) => console.log("error in useEffect", e));
    }, []);

    useEffect(() => {
        if (!user) {
            setUsers(usersArray);
            return;
        }
        let abort;

        axios
            .get(`/api/findusers/${user}`)
            .then(({ data }) => {
                if (!abort) {
                    setUsers(data);
                }
            })
            .catch((e) => console.log("error in useEffect2", e));

        return () => {
            abort = true;
        };
    }, [user]);

    return (
        <div className="usersContainer">
            <input
                onChange={(e) => setUser(e.target.value)}
                placeholder="Find user"
            ></input>

            <ul>
                {users.map((each) => (
                    <li key={each.id}>
                        <Link to={`/user/${each.id}`}>
                            <img src={each.profile_pic} />
                            {each.first} {each.last}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}
