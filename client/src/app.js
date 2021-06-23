// import { render } from "@testing-library/react";
import { BrowserRouter, Route, Link } from "react-router-dom";
import axios from "./axios";
import { Component } from "react";
import { ProfilePic } from "./profilePic";
import Uploader from "./uploader";
import { Profile } from "./profile";
import OtherProfile from "./otherProfile";
// import { findPeople } from "../../server/db/db";
import FindUsers from "./findUsers";
import Friends from "./friends";
import Chat from "./chat";

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
            console.log("ID IN COMPONENT MOUNTED", data[0].id);

            this.setState({
                first: data[0].first,
                last: data[0].last,
                imgUrl: data[0].profile_pic,
                bio: data[0].bio,
                id: data[0].id,
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
                    <div className="upperBanner">
                        <img id="logo" src="/images/logo.png" alt="logo" />
                        <div>
                            <Link to="/">My profile </Link>
                        </div>
                        <div>
                            <Link to="/users"> Search users</Link>
                        </div>
                        <div>
                            <Link to="/friends"> Friends</Link>
                        </div>
                        <div>
                            <Link to="/chat"> Forum </Link>
                        </div>
                        <div>
                            <a href="/logout"> Log out </a>
                        </div>

                        <ProfilePic
                            first={this.state.first}
                            last={this.state.last}
                            imgUrl={this.state.imgUrl}
                            toggleModal={this.toggleModal}
                        />
                    </div>
                    <div className="uploader">
                        {this.state.uploaderIsVisible && <Uploader />}
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
                                id={this.state.id}
                            />
                        )}
                    />

                    <Route path="/user/:id" component={OtherProfile} />
                    <Route path="/friends" component={Friends} />
                    <Route path="/users" component={FindUsers} />
                    <Route path="/chat" component={Chat} />
                </>
            </BrowserRouter>
        );
    }
}
