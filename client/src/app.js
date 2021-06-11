// import { render } from "@testing-library/react";
import { BrowserRouter, Route } from "react-router-dom";
import axios from "./axios";
import { Component } from "react";
import { ProfilePic } from "./profilePic";
import Uploader from "./uploader";
import { Profile } from "./profile";
import OtherProfile from "./otherProfile";
import { findPeople } from "../../server/db/db";

export default class App extends Component {
    constructor() {
        super();
        this.state = {
            uploaderIsVisible: false,
        };
        this.toggleModal = this.toggleModal.bind(this);
        this.updateBio = this.updateBio.bind(this);
    }

    componentDidMount() {
        console.log("this before axios get", this);
        axios.get("/get-user").then(({ data }) => {
            // console.log("data in componentdidmount", data);
            // console.log("this in componentDidMount", this);
            this.setState({
                first: data[0].first,
                last: data[0].last,
                imgUrl: data[0].profile_pic,
                bio: data[0].bio,
            });
        });
    }

    toggleModal() {
        this.setState({
            uploaderIsVisible: !this.state.uploaderIsVisible,
        });
    }

    updateBio(bioText) {
        this.setState({
            bio: bioText,
        });
    }

    render() {
        console.log("this.state in the app", this.state);
        return (
            <BrowserRouter>
                <>
                    {this.state.uploaderIsVisible && <Uploader />}
                    <div className="upperBanner">
                        <img
                            src="/images/logo.png"
                            width="50px"
                            height="50px"
                            alt="logo"
                        />
                        <ProfilePic
                            first={this.state.first}
                            last={this.state.last}
                            imgUrl={this.state.imgUrl}
                            toggleModal={this.toggleModal}
                        />
                    </div>
                    <hr width="90%"></hr>

                    <Route
                        path="/"
                        exact
                        render={() => (
                            <Profile
                                first={this.state.first}
                                last={this.state.last}
                                imgUrl={this.state.imgUrl}
                                bio={this.state.bio}
                                updateBio={this.updateBio}
                            />
                        )}
                    />

                    <Route path="/user/:id" component={OtherProfile} />
                    <Route path="/users" component={findPeople} />
                </>
            </BrowserRouter>
        );
    }
}
