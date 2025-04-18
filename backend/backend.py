from flask import Flask, jsonify, request
from flask_cors import CORS

import string
import random

from datetime import date, datetime


app = Flask(__name__)


CORS(app)


example_word = "began"


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

    for i in range(len(guess)):
        # In the correct spot
        if guess[i] == word[i]:
            stats[i] = "c"
            letter_counts[guess[i]] -= 1

        # In the word but not the correct spot
        elif guess[i] in word:
            if guess[i] in letter_counts and letter_counts[guess[i]] > 0:
                letter_counts[guess[i]] -= 1
                stats[i] = "p"
            # The letter is in the word but the guess contains too many copies
            else:
                stats[i] = "r"

        else:
            stats[i] = "r"

    return stats

    # return ["c", "p", "r", "r", "r"]


@app.route("/guess", methods=["POST"])
def guess():
    guess = request.args.get("guess")

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

    # return jsonify({"error": "Not implemented yet"}), 405


if __name__ == "__main__":
    app.run(debug=True)
