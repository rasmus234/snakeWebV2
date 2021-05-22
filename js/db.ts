export async function sendScore(username, score: number) {
    try {
        if (username && score) {
            await fetch("http://localhost:3000/scores", {
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
    let scores
    try {
        await fetch("http://localhost:3000/scores", {
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