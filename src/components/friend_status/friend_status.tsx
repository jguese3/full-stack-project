const users = [ {
    id: "0",
    username: "lsy",
    status: "added",
    game: "God Of War",
    imageId: "oHQBJBt",
}, {
    id: "1",
    username: "jguese",
    status: "added",
    game: "Deadlock",
    imageId: "57Kxegd",
}, {
    id: "2",
    username: "cmartin",
    status: "removed",
    game: "GTA VI",
    imageId: "ZZgRrQC",
}
]

// Builds image url based on user image id
function getImageUrl(user: any) {
    return (
        "https://i.imgur.com/" +
        user.imageId +
        "s.jpg"
    );
}

const statusMessage = (status: any) =>
    status === "added" ? "to" : "from";

export function FriendStatus() {
    const listFriend = users.map(user =>
        <li key={user.id}>
            <img
                src={getImageUrl(user)}
                alt={user.username}
            />
            <p>
                <b>{user.username}</b>
                {" " + user.status + " " + 
                " " + user.game + " " +
                statusMessage(user.status) + " their library."}
            </p>
        </li>
    );
    return (
        <section className="friend-status">
    <h2 className="section-title">Friend Status</h2>
    <ul>{listFriend}</ul>
</section>
)
}