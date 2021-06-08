import { HashRouter, Route } from "react-router-dom";
import { Registration } from "./registration";
import { Login } from "./login";
import { Reset } from "./resetPassword";

export function Welcome() {
    return (
        <div id="welcome">
            <img src="../images/logo.png" width="50px" height="50px" />
            <HashRouter>
                <div>
                    <Route exact path="/" component={Registration} />
                    <Route path="/login" component={Login} />
                    <Route path="/reset-password" component={Reset} />
                </div>
            </HashRouter>
        </div>
    );
}
