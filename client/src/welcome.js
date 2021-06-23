import { HashRouter, Route } from "react-router-dom";
import { Registration } from "./registration";
import { Login } from "./login";
import { Reset } from "./resetPassword";

export function Welcome() {
    return (
        <div id="welcome">
            <img id="logo" src="../images/logo.png" />
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
