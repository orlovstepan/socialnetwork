import { useEffect, useState } from "react";
import axios from "./axios";

export default function FindUsers() {
    const [users, setUsers] = useState([]);
    const [user, setUser] = useState("");

    useEffect(() => {
        axios
            .get("/api/users")
            .then(({ data }) => {
                setUsers(data);
            })
            .catch((e) => console.log("error in useEffect", e));
    }, []);

    useEffect(() => {
        if (!user) {
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
                        <img src={each.profile_pic} />
                        {each.first} {each.last}
                    </li>
                ))}
            </ul>
        </div>
    );
}
