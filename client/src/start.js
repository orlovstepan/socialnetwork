import ReactDOM from "react-dom";
import { Welcome } from "./welcome.js";
import axios from "axios";
import App from "./app.js";
// ReactDOM.render(<Welcome />, document.querySelector("main"));

axios.get("/user/id.json").then(function ({ data }) {
    console.log(data);
    if (!data.userId) {
        ReactDOM.render(<Welcome />, document.querySelector("main"));
    } else {
        ReactDOM.render(<App />, document.querySelector("main"));
    }
});
