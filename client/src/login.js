import axios from "./axios";
import React from "react";

export class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value,
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        // console.log("SUBMIT", this.state);
        axios
            .post("/login", this.state)
            .then(({ data }) => {
                // console.log(data);
                if (!data.success) {
                    this.setState({
                        error: true,
                    });
                } else {
                    location.reload();
                }
            })
            .catch((err) => {
                console.log("error in handlesubmit", err);
            });
    }

    render() {
        return (
            <>
                {this.state.error && (
                    <p>Something went wrong, please try again</p>
                )}
                <form onSubmit={(e) => this.handleSubmit(e)}>
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
                    <button type={"submit"}>Log in</button>
                </form>
            </>
        );
    }
}
