import { Component } from "react";
import axios from "./axios";
import FriendshipButton from "./friendshipButton";

export default class OtherProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userExists: true,
        };
    }
    componentDidMount() {
        // console.log("Other profiles component mounted");
        const id = this.props.match.params.id;
        axios
            .get(`/api/user/${id}`)
            .then(({ data }) => {
                // console.log("data in otheruser", data);
                if (data.sameUser) {
                    this.props.history.replace("/");
                } else if (!data.sameUser) {
                    // console.log("data in not the same user", data);
                    this.setState(data[0]);
                    // console.log("this.state in user", this.state);
                } else {
                    this.setState({
                        userExists: false,
                    });
                }
            })
            .catch((e) => console.log("error in otherProfile", e));
    }

    render() {
        return (
            <div className="otherProfileContainer">
                <img id="otherProfilePic" src={this.state.profile_pic} />
                <h2>
                    {this.state.first} {this.state.last}
                </h2>

                <h3> About {this.state.first} :</h3>

                <h5> {this.state.bio}</h5>
                <FriendshipButton id={this.props.match.params.id} />
            </div>
        );
    }
}
