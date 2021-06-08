import axios from "./axios";
import React from "react";
import { Link } from "react-router-dom";

export class Reset extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            view: 1,
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value,
        });
        console.log("running handleChange", this.state);
    }

    handleSubmit(event) {
        event.preventDefault();
        console.log("SUBMIT", this.state);
        axios
            .post("/reset-password", this.state)
            .then(({ data }) => {
                console.log(data);
                if (!data.success) {
                    this.setState({
                        error: true,
                    });
                } else {
                    this.setState({
                        view: 2,
                    });
                }
            })
            .catch((err) => {
                console.log("error in reset-password", err);
            });
    }

    handleVerify(event) {
        event.preventDefault();
        axios
            .post("/reset-password-verify", this.state)
            .then(({ data }) => {
                // console.log(data);
                if (!data.success) {
                    this.setState({
                        error: true,
                        errorMsg: data.errorMsg,
                    });
                } else {
                    this.setState({
                        view: 3,
                    });
                }
            })
            .catch((err) => {
                console.log("error in reset-password step 2", err);
            });
    }

    determineViewToRender() {
        if (this.state.view === 1) {
            return (
                <>
                    {this.state.error && <p>{this.state.errorMsg}</p>}
                    <form onSubmit={(e) => this.handleSubmit(e)}>
                        <p>Please enter your email</p>
                        <input
                            name={"email"}
                            placeholder={"Email"}
                            required
                            type={"email"}
                            onChange={this.handleChange}
                        ></input>
                        <button type={"submit"}>Send me the code</button>
                    </form>
                    <h5>
                        Or register <Link to="/"> here</Link>
                    </h5>
                </>
            );
        }
        if (this.state.view === 2) {
            return (
                <>
                    {this.state.error && <p>{this.state.errorMsg}</p>}
                    <form onSubmit={(e) => this.handleVerify(e)}>
                        <input
                            name={"code"}
                            placeholder={"Verification Code"}
                            required
                            type={"code"}
                            onChange={this.handleChange}
                        ></input>
                        <input
                            name={"newpass"}
                            placeholder={"New Password"}
                            required
                            type={"password"}
                            onChange={this.handleChange}
                        ></input>
                        <button type={"submit"}>Reset my password</button>
                    </form>
                </>
            );
        }
        if (this.state.view === 3) {
            return (
                <>
                    {this.state.error && <p>{this.state.errorMsg}</p>}
                    <h3>
                        Your password was successfully reset! You can{" "}
                        <Link to="/login">login</Link> now
                    </h3>
                </>
            );
        }
    }

    render() {
        return <div>{this.determineViewToRender()}</div>;
    }
}
