import axios from "./axios";
import React from "react";
import { Link } from "react-router-dom"; //for creating links

export class Login extends React.Component {
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
        // console.log("SUBMIT", this.state);
        axios
            .post("/login", this.state)
            .then(({ data }) => {
                console.log(data);
                if (!data.success) {
                    console.log("data.errormsg", data.errorMsg);
                    this.setState({
                        error: true,
                        errorMsg: data.errorMsg,
                    });
                } else {
                    this.setState({
                        errorMsg: data.errorMsg,
                    });
                    location.reload();
                }
            })
            .catch((err) => {
                console.log("error in handlesubmit", err);
            });
    }

    render() {
        return (
            <div className="login">
                {this.state.error && <p>{this.state.errorMsg}</p>}
                <form onSubmit={(e) => this.handleSubmit(e)}>
                    <h3>Please login </h3>
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
                <h5>
                    <Link to="/"> Register here </Link> <br></br> or <br></br>
                    <Link to="/reset-password"> reset your password </Link>
                </h5>
            </div>
        );
    }
}
