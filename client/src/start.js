import ReactDOM from "react-dom";
import { Welcome } from "./welcome.js";
import axios from "axios";
// ReactDOM.render(<Welcome />, document.querySelector("main"));

axios.get("/user/id.json").then(function ({ data }) {
    console.log(data);
    if (!data.userId) {
        ReactDOM.render(<Welcome />, document.querySelector("main"));
    } else {
        ReactDOM.render(
            <img src="/logo.gif" alt="logo" />,
            document.querySelector("main")
        );
    }
});
