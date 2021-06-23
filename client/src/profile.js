import BioEditor from "./bioEditor";
import { ProfilePic } from "./profilePic";
import WallPosts from "./wallposts";

export function Profile(props) {
    const { id, first, last, imgUrl, bio, updateBio } = props;
    console.log("ID IN PROFILE -----", id);

    return (
        <>
            <div className="profileContainer">
                <div>
                    <h2>Hi, {first} </h2>
                    <img id="userPic" src={imgUrl} />
                    <BioEditor bio={bio} updateBio={updateBio} />
                </div>
                <WallPosts id={id} />
            </div>
        </>
    );
}
