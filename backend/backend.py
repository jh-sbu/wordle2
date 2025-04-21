from flask import Flask, jsonify, request
from flask_cors import CORS

import string
import random
import os

from datetime import datetime


app = Flask(__name__)
env_config = os.getenv("APP_SETTINGS", "config.DevelopmentConfig")
app.config.from_object(env_config)


CORS(app)


# example_word = "began"


def get_words(filename: str):
    words = []

    with open(filename, "r") as f:
        for line in f:
            words.append(line.strip())

    return words


words = get_words("words.txt")


def get_word_of_day():
    today_seed = int(datetime.today().strftime("%Y%m%d"))

    rng = random.Random(today_seed)

    index = rng.randint(0, len(words))

    return words[index]


def check_word(guess: str, word: str) -> list[str]:
    stats: list[str] = ["u"] * 5

    letter_counts = {}

    for c in word:
        if c in letter_counts:
            letter_counts[c] += 1
        else:
            letter_counts[c] = 1

    # In the correct spot
    for i in range(len(word)):
        if guess[i] == word[i]:
            stats[i] = "c"
            letter_counts[guess[i]] -= 1

    # In the word but not the correct spot
    for i in range(len(guess)):
        if stats[i] != "c" and guess[i] in word and letter_counts[guess[i]] > 0:
            letter_counts[guess[i]] -= 1
            stats[i] = "p"

    # Everything else
    for i in range(len(guess)):
        if stats[i] == "u":
            stats[i] = "r"

    return stats


@app.route("/api/guess", methods=["POST"])
def guess():
    data = request.get_json()

    guess = data.get("guess")

    if guess is None:
        return jsonify({"error": "Requests must include the user's guess"}), 400

    # Case is not important in wordle
    guess = guess.lower()

    if len(guess) != 5:
        return jsonify({"error": "Guesses should be 5 letters long"}), 400

    for c in guess:
        if c not in string.ascii_letters:
            return jsonify({"error": "Only ascii characters are supported"}), 400

    if guess not in words:
        return jsonify({"error": "Word not found in word list"}), 400

    word = get_word_of_day()

    results = check_word(guess, word)

    return jsonify({"results": results})


# Get the answer after failing to guess
@app.route("/api/answer", methods=["GET"])
def answer():
    word = get_word_of_day()
    print(f"Sending word {word} to the client")
    return jsonify({"results": word})


if __name__ == "__main__":
    app.run()
