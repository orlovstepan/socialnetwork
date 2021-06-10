import axios from "./axios";
import { Component } from "react";

export default class BioEditor extends Component {
    constructor() {
        super();
        this.state = {
            editMode: false,
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleEditMode = this.handleEditMode.bind(this);
    }

    handleChange(e) {
        this.setState({
            editText: e.target.value,
        });
    }

    handleSubmit(e) {
        // console.log("submitting");
        // console.log("this state in handlesubmit", this.state);
        e.preventDefault();
        axios.post("/bio", this.state).then((result) => {
            console.log("result in bio", this.state);
            this.props.updateBio(this.state.editText);
            this.handleEditMode();
        });
    }

    handleEditMode() {
        this.setState({
            editMode: !this.state.editMode,
        });
    }

    render() {
        return (
            <>
                {this.state.editMode && (
                    <form>
                        <textarea
                            defaultValue={this.props.bio}
                            onChange={this.handleChange}
                        ></textarea>
                        <button onClick={this.handleSubmit}> submit </button>
                    </form>
                )}

                {!this.state.editMode && this.props.bio && (
                    <div>
                        <p>{this.props.bio}</p>
                        <button onClick={this.handleEditMode}>edit</button>
                    </div>
                )}

                {!this.state.editMode && !this.props.bio && (
                    <div>
                        <button onClick={this.handleEditMode}>
                            Add your bio
                        </button>
                    </div>
                )}
            </>
        );
    }
}
