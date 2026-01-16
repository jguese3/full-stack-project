const users = [ {
    id: "0",
    username: "lsy",
    status: "added",
    game: "God Of War",
    imageId: "",
}, {
    id: "1",
    username: "jguese",
    status: "added",
    game: "Deadlock",
    imageId: "",
}, {
    id: "2",
    username: "cmartin",
    status: "removed",
    game: "GTA VI",
    imageId: "",
}
]

// Builds image url based on user image id
function getImageUrl(user) {
    return (
        "https://i.imgur.com/" +
        user.imageId +
        "s.jpg"
    );
}

export function FriendStatus() {
    const listFriend = 
}