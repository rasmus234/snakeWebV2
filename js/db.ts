export async function sendScore(username: string, score: number) {
    console.log("sending score")
    try {
        if (username && score) {
            await fetch("https://snakewebapi.herokuapp.com" +"/scores", {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                "body": JSON.stringify({username: username, score: score})

            }).then(res => console.log(res));
        }

    } catch (e) {
        console.error(e);
    }
}

export async function getScores(): Promise<any[]>{
    console.log("getting scores")
    let scores
    try {
        await fetch("https://snakewebapi.herokuapp.com" +"/scores", {
            method: "GET",
            headers: {
                "content-type": "application/json"
            },
        }).then(res => res.json())
            .then(data => scores = data)
    } catch (e) {
        console.log(e)
    }
    return scores


}