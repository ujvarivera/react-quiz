/*
export const categories = "Any", "General Knowledge", "Entertainment: Books", "Entertainment: Film",
    "Entertainment: Music", "Mythology", "Art", "Celebrities", "Animals"]
    */

export const categories = [
    { name: "Any", id: "" },
    { name: "General Knowledge", id: 9 },
    { name: "Entertainment: Books", id: 10 },
    { name: "Entertainment: Film", id: 11 },
    { name: "Entertainment: Music", id: 12 },
    { name: "Entertainment: Video Games", id: 15 },
    { name: "Science: Computers", id: 18 },
    { name: "Mythology", id: 20 },
    { name: "Art", id: 25 },
    { name: "Celebrities", id: 26 },
    { name: "Animals", id: 27 },
]

export const difficulties = ["easy", "medium", "hard"]

export const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" }
    return new Date(dateString).toLocaleDateString(undefined, options)
}
