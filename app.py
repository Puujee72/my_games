from flask import Flask, render_template
import os

# Flask апп үүсгэх
app = Flask(__name__)

# Сешн ашиглахын тулд secret_key заавал хэрэгтэй
# Үүнийг аюулгүй байлгахын тулд орчин (env) хувьсагчаар авах нь зөв
app.secret_key = os.environ.get('SECRET_KEY', 'your_very_secure_and_random_secret_key_here_12345')

# Games package дотроос blueprint-үүдийг импортлох
from games.guess_number import guess_number_bp
from games.rps import rps_bp
from games.guess_image import guess_image_bp
from games.fibonacci import fibonacci_bp
from games.maze import maze_bp

# Blueprint-үүдийг үндсэн апп-д бүртгэх
app.register_blueprint(guess_number_bp, url_prefix='/guess_number')
app.register_blueprint(rps_bp, url_prefix='/rps')
app.register_blueprint(guess_image_bp, url_prefix='/guess_image')
app.register_blueprint(fibonacci_bp, url_prefix='/fibonacci')
app.register_blueprint(maze_bp, url_prefix='/maze')

# Үндсэн хуудас - тоглоомуудын жагсаалт
@app.route('/')
def index():
    games = [
        {"name": "1. Санасан Тоог Таах", "url": "/guess_number"},
        {"name": "2. Хайч, Чулуу, Даавуу", "url": "/rps"},
        {"name": "3. Зураг Таах", "url": "/guess_image"},
        {"name": "4. Фибоначчийн Таавар", "url": "/fibonacci"},
        {"name": "5. Төөрдөг Байшин", "url": "/maze"},
    ]
    return render_template('index.html', games=games)

# Локал хөгжүүлэлтийн үед ажиллах
if __name__ == '__main__':
    app.run(debug=True)
