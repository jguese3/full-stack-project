// Builds image url based on user image id
function getImageUrl(user) {
    return (
        "https://i.imgur.com/" +
        user.imageId +
        "s.jpg"
    );
}

