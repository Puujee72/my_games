import random
from flask import Blueprint, render_template, request, jsonify, session, url_for

guess_image_bp = Blueprint('guess_image', __name__)

# Зургуудын нэрс болон хариултуудыг энд тодорхойлно (static/images доторх зурагтай таарч байх ёстой)
IMAGES_DATA = {
    "apple.jpg": "алим",
    "car.png": "машин",
    "sun.jpg": "нар",
    "flower.png": "цэцэг",
    "mountain.jpg": "уул"
}

@guess_image_bp.route('/')
def guess_image():
    image_filenames = list(IMAGES_DATA.keys())
    random_image_filename = random.choice(image_filenames)
    session['correct_answer_image'] = IMAGES_DATA[random_image_filename]
    image_path = url_for('static', filename=f'images/{random_image_filename}')

    return render_template('guess_image.html', image_path=image_path)

@guess_image_bp.route('/check', methods=['POST'])
def check():
    user_guess = request.form['guess'].lower().strip()
    correct_answer = session.get('correct_answer_image')

    if user_guess == correct_answer:
        message = "Баяр хүргэе! Зөв таалаа."
        is_correct = True
    else:
        message = f"Харамсалтай байна! Буруу байна. Зөв хариулт нь '{correct_answer.capitalize()}' байсан."
        is_correct = False
    return jsonify({"message": message, "is_correct": is_correct})