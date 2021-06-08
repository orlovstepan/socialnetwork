export function Presentational({ name, surname, imgUrl }) {
    console.log("props: ", name, surname, imgUrl);
    imgUrl =
        imgUrl ||
        "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1024px-No_image_available.svg.png";
    return (
        <div>
            <h2>
                I am the presentatinoal component, {name} {surname}
            </h2>
            <img src={imgUrl} alt={name} width="100px" height="100px" />
        </div>
    );
}
