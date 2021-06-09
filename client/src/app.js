// import { render } from "@testing-library/react";
import axios from "./axios";
import { Component } from "react";
import { Presentational } from "./profilePic";
import Uploader from "./uploader";
import Profile from "./profile";

export default class App extends Component {
    constructor() {
        super();
        this.state = {
            first: "",
            last: "",
            imgUrl: "",
            uploaderIsVisible: false,
        };
        this.toggleModal = this.toggleModal.bind(this);
    }

    componentDidMount() {
        console.log("this before axios get", this);
        axios.get("/get-user").then(({ data }) => {
            console.log("data in componentdidmount", data);
            console.log("this in componentDidMount", this);
            this.setState({
                first: data[0].first,
                last: data[0].last,
                imgUrl: data[0].profile_pic,
            });
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

                {/* <Profile /> */}

                <Presentational
                    first={this.state.first}
                    last={this.state.last}
                    imgUrl={this.state.imgUrl}
                    toggleModal={this.toggleModal}
                />
            </>
        );
    }
}
