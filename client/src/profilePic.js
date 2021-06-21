export function ProfilePic({ first, last, imgUrl, toggleModal }) {
    console.log("props: ", first, last, imgUrl, toggleModal);
    imgUrl =
        imgUrl ||
        "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1024px-No_image_available.svg.png";
    return (
        <div>
            <img
                id="profilePic"
                src={imgUrl}
                alt={first}
                onClick={toggleModal}
            />
        </div>
    );
}
