// import { render } from "@testing-library/react";
import axios from "./axios";
import { Component } from "react";
import { Presentational } from "./profilePic";
import Uploader from "./uploader";

export default class App extends Component {
    constructor() {
        super();
        this.state = {
            first: "Stepan",
            last: "Orlov",
            imgUrl: "",
            uploaderIsVisible: false,
        };
        this.toggleModal = this.toggleModal.bind(this);
    }

    componentDidMount() {
        axios.get("/user/id.json").then(function ({ data }) {
            console.log("data in componentdidmount", data);
        });
    }

    toggleModal() {
        this.setState({
            uploaderIsVisible: !this.state.uploaderIsVisible,
        });
    }

    render() {
        console.log("this.state in the app", this.state);
        return (
            <>
                <h1 onClick={this.toggleModal}>I am the app</h1>
                {this.state.uploaderIsVisible && <Uploader />}

                <img
                    src="/images/logo.png"
                    width="50px"
                    height="50px"
                    alt="logo"
                />
                <Presentational
                    name={this.state.first}
                    surname={this.state.last}
                    imgUrl={this.state.imgUrl}
                />
            </>
        );
    }
}
