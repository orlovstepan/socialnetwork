export function Presentational({ first, last, imgUrl, toggleModal }) {
    console.log("props: ", first, last, imgUrl, toggleModal);
    imgUrl =
        imgUrl ||
        "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1024px-No_image_available.svg.png";
    return (
        <div>
            <h2>
                I am the presentatinoal component, {first} {last}
            </h2>
            <img
                src={imgUrl}
                alt={first}
                width="100px"
                height="100px"
                onClick={toggleModal}
            />
        </div>
    );
}
