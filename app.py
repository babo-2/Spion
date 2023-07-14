from flask import Flask, render_template, request, make_response
import json
import time

app = Flask(__name__)


@app.route('/')
def index():
    return render_template("index.html")


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
    keys = list(request.cookies.keys())
    for key in keys:
        items += request.cookies.get(key).split(",")

    return render_template("game.html", groups=keys, items=items)


@app.route("/save", methods=['POST'])
def save():
    response = make_response("save data")
    data = request.get_json()
    print(data)
    for key in data:
        response.set_cookie(key, ",".join(data.get(key)))
    return response


if __name__ == '__main__':
    app.run(port=5001)
