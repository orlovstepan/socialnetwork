import { Component } from "react";

export default class Uploader extends Component {
    constructor() {
        super();
        this.state = {};
    }

    //here we want to send an image to the server

    //we want onChange listener on the input field
    //formData stuff
    //unlike the imageboard, we dont need to send along extra data

    //somewhere in here we will make a post request to /upload
    //then we get a response back

    render() {
        return (
            <>
                <h3> Change your profile picture </h3>
                <form>
                    <input
                        name={"profile-pic"}
                        type={"file"}
                        accept="image/*"
                        onChange={this.handleChange}
                    ></input>
                    <button type={"submit"}>Change my profile picture</button>
                </form>
            </>
        );
    }
}
