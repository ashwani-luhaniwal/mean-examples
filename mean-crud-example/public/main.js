// main.js
// let update = document.getElementById("update");
// console.log(update);

updateComment = () => {
    fetch("quotes", {
        method: "put",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            "name": "Ashwani Kumar Luhaniwal",
            "quote": "I have updated my previous comment."
        })
    }).then(res => {
        if (res.ok) return res.json();
    }).then(data => {
        console.log(data);
        window.location.reload(true);
    })
};

// delete the comment
deleteComment = () => {
    fetch("quotes", {
        method: "delete",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "name": "Ashwani Kumar Luhaniwal"
        })
    })
    .then(res => {
        if (res.ok) return res.json();
    })
    .then(data => {
        console.log(data);
        window.location.reload();
    })
};

/*update.addEventListener("click", () => {
    fetch("quotes", {
        method: "put",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            "name": "Ashwani Kumar Luhaniwal",
            "quote": "I have updated my previous comment."
        })
    })
});*/