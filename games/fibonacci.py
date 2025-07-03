import random
from flask import Blueprint, render_template, request, jsonify, session

fibonacci_bp = Blueprint('fibonacci', __name__)

@fibonacci_bp.route('/')
def fibonacci():
    a, b = 0, 1
    fib_sequence = [a, b]
    for _ in range(random.randint(5, 8)): # 5-8 нэмэлт тоог дарааллыг үүсгэх
        next_fib = a + b
        fib_sequence.append(next_fib)
        a, b = b, next_fib

    correct_next_number = fib_sequence[-1] + fib_sequence[-2]
    session['correct_fib_answer'] = correct_next_number

    return render_template('fibonacci.html', sequence=fib_sequence)

@fibonacci_bp.route('/check', methods=['POST'])
def check():
    user_guess = int(request.form['guess'])
    correct_answer = session.get('correct_fib_answer')

    if user_guess == correct_answer:
        message = "Баяр хүргэе! Зөв таалаа."
        is_correct = True
    else:
        message = f"Харамсалтай байна! Буруу байна. Зөв хариулт нь '{correct_answer}' байсан."
        is_correct = False
    return jsonify({"message": message, "is_correct": is_correct})