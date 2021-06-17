import ReactDOM from "react-dom";
import { Welcome } from "./welcome.js";
import axios from "axios";
import App from "./app.js";
import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { Provider } from "react-redux";
import reduxPromise from "redux-promise";
import reducer from "./reducers";

const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(reduxPromise))
);
// ReactDOM.render(<Welcome />, document.querySelector("main"));

axios.get("/user/id.json").then(function ({ data }) {
    console.log(data);
    if (!data.userId) {
        ReactDOM.render(<Welcome />, document.querySelector("main"));
    } else {
        ReactDOM.render(
            <Provider store={store}>
                <App />
            </Provider>,
            document.querySelector("main")
        );
    }
});
