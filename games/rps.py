import random
from flask import Blueprint, render_template, request, jsonify

rps_bp = Blueprint('rps', __name__)

@rps_bp.route('/')
def rps():
    return render_template('rps.html')

@rps_bp.route('/play', methods=['POST'])
def play():
    player_choice = request.form['choice'].lower()
    choices = ['rock', 'paper', 'scissors']
    computer_choice = random.choice(choices)

    if player_choice == computer_choice:
        result = "Тэнцлээ!"
    elif (player_choice == 'rock' and computer_choice == 'scissors') or \
         (player_choice == 'paper' and computer_choice == 'rock') or \
         (player_choice == 'scissors' and computer_choice == 'paper'):
        result = "Та яллаа!"
    else:
        result = "Та ялагдлаа!"

    return jsonify({
        "player_choice": player_choice.capitalize(),
        "computer_choice": computer_choice.capitalize(),
        "result": result
    })