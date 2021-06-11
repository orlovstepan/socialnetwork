import { Component } from "react";
import axios from "./axios";

export default class OtherProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userExists: true,
        };
    }
    componentDidMount() {
        console.log("Other profiles component mounted");
        const id = this.props.match.params.id;
        axios
            .get(`/api/user/${id}`)
            .then(({ data }) => {
                console.log("data in otheruser", data);
                if (data.sameUser) {
                    this.props.history.replace("/");
                } else if (!data.sameUser) {
                    console.log("data in not the same user", data);
                    this.setState(data[0]);
                    console.log("this.state in user", this.state);
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
            <>
                <img src={this.state.profile_pic} />
                <h2>{this.state.first}</h2>
                <h2>{this.state.last}</h2>
                <h5>{this.state.bio}</h5>
            </>
        );
    }
}
