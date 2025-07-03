from flask import Blueprint, render_template

maze_bp = Blueprint('maze', __name__)

@maze_bp.route('/')
def maze():
    # Төөрдөг байшингийн логик ихэвчлэн JavaScript дээр хийгддэг тул
    # Python нь зөвхөн HTML хуудсыг буцаана.
    return render_template('maze.html')

# Энэ тоглоомд Flask-ийн route-оор дамжуулах API байхгүй.
# Бүх логик нь static/js/maze.js дотор байх болно.