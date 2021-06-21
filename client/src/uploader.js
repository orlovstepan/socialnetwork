import axios from "./axios";
import { Component } from "react";

export default class Uploader extends Component {
    constructor() {
        super();
        this.state = {};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    //here we want to send an image to the server

    //we want onChange listener on the input field
    //formData stuff
    //unlike the imageboard, we dont need to send along extra data

    //somewhere in here we will make a post request to /upload
    //then we get a response back

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.files[0],
        });
    }

    handleSubmit(event) {
        console.log("data in handlesubmit", this.state);
        event.preventDefault();
        const data = new FormData();
        data.append("image", this.state.profilePic);
        axios.post("/update-profile-pic", data);
    }

    render() {
        return (
            <div id="uploader">
                <h3> Change your profile picture </h3>
                <form id="uploaderForm">
                    <label id="profilePicLabel" htmlFor="profilePicUploader">
                        select Image
                    </label>
                    <input
                        style={{ visibility: "hidden" }}
                        id="profilePicUploader"
                        name="profilePic"
                        type="file"
                        accept="image/*"
                        onChange={this.handleChange}
                    ></input>
                </form>
                <button
                    id="changeProfilePicBtn"
                    type={"submit"}
                    onClick={this.handleSubmit}
                >
                    Change my profile picture
                </button>
            </div>
        );
    }
}
