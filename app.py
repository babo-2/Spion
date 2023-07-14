from flask import Flask, render_template, request, make_response
import json
import os

app = Flask(__name__)

default_data = [
    {
        "name": 'Ort',
        "items": ['Bauernhof', 'Parkplatz', 'Baustelle'],
        "activated": False,
    },
    {
        "name": 'Land',
        "items": ['Deutschland', 'Frankreich', 'Russland'],
        "activated": False,
    },
    {
        "name": 'Stadt',
        "items": ['München', 'Paris', 'Washington'],
        "activated": False,
    },
    {
        "name": 'Person',
        "items": ['John Cina', 'Scholz something', 'Washington I-forgot'],
        "activated": False,
    }
]


@app.route('/')
def index():
    data = []
    if "data" not in request.cookies.keys():
        data = default_data
    else:
        data = request.cookies.get("data")

    return render_template("index.html", data=data)


@app.route("/ready")
def ready():
    return render_template("ready.html")


@app.route("/game")
def game():
    if "players" not in request.args.keys() or "spies" not in request.args.keys():
        return render_template("ready.html")
    players = request.args.get("players")
    spies = request.args.get("spies")
    if spies >= players:
        return render_template("ready.html")

    items = []
    groups = []
    data = []
    if "data" not in request.cookies.keys():
        data = default_data
    else:
        data = json.loads(request.cookies.get("data"))

    for key in data:

        if key["activated"]:
            groups.append(key["name"])
            items += key["items"]

    return render_template("game.html", groups=groups, items=items)


@app.route("/save", methods=['POST'])
def save():
    response = make_response("save data")
    data = request.get_json()

    response.set_cookie("data", json.dumps(data))

    return response


if __name__ == '__main__':
    app.run(debug=False, host="0.0.0.0", port=os.getenv("PORT", default=3891))
