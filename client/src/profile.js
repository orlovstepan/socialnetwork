import BioEditor from "./bioEditor";
import { ProfilePic } from "./profilePic";

export function Profile(props) {
    const { id, first, last, imgUrl, bio, updateBio } = props;

    return (
        <>
            <h2>Hi, {first} </h2>
            <ProfilePic id={id} first={first} last={last} imgUrl={imgUrl} />
            <BioEditor bio={bio} updateBio={updateBio} />
        </>
    );
}
