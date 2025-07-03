import random
from flask import Blueprint, render_template, request, jsonify, session

guess_number_bp = Blueprint('guess_number', __name__)

@guess_number_bp.route('/')
def guess_number():
    session['secret_number'] = random.randint(1, 100)
    session['attempts'] = 0
    return render_template('guess_number.html')

@guess_number_bp.route('/play', methods=['POST'])
def play():
    user_guess = int(request.form['guess'])
    secret_number = session.get('secret_number')
    session['attempts'] += 1

    if user_guess < secret_number:
        message = "Бага байна! Дээшлүүлнэ үү."
        status = "low"
    elif user_guess > secret_number:
        message = "Их байна! Доошлуулна уу."
        status = "high"
    else:
        message = f"Баяр хүргэе! Та {session['attempts']} оролдлогоор зөв таалаа!"
        status = "correct"
        session.pop('secret_number', None)

    return jsonify({"message": message, "status": status})