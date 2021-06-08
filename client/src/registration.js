import axios from "./axios";
import React from "react";
import { Link } from "react-router-dom"; //for creating links

export class Registration extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value,
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        console.log("SUBMIT", this.state);
        axios
            .post("/register", this.state)
            .then(({ data }) => {
                console.log(data);
                if (!data.success) {
                    this.setState({
                        error: true,
                    });
                } else {
                    location.reload();
                }
            })
            .catch((err) => {
                console.log("error in handlesubmit register", err);
            });
    }

    render() {
        return (
            <>
                <h1>Welcome!</h1>
                {this.state.error && (
                    <p>Something went wrong, please try again</p>
                )}
                <form onSubmit={(e) => this.handleSubmit(e)}>
                    <input
                        name={"firstname"}
                        placeholder={"First Name"}
                        required
                        onChange={this.handleChange}
                    ></input>
                    <input
                        name={"lastname"}
                        placeholder={"Last Name"}
                        required
                        onChange={this.handleChange}
                    ></input>
                    <input
                        name={"email"}
                        placeholder={"Email"}
                        required
                        type={"email"}
                        onChange={this.handleChange}
                    ></input>
                    <input
                        name={"password"}
                        placeholder={"Password"}
                        required
                        type={"password"}
                        onChange={this.handleChange}
                    ></input>
                    <button type={"submit"}>Submit</button>
                </form>
                <h5>
                    Or login <Link to="/login"> here</Link>
                </h5>
            </>
        );
    }
}
