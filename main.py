from cs50 import SQL
from flask import Flask, redirect, render_template, request, json
from werkzeug.exceptions import default_exceptions, HTTPException, InternalServerError

# Configure application
app = Flask(__name__)

# Ensure templates are auto-reloaded
app.config["TEMPLATES_AUTO_RELOAD"] = True

# Database dir
db = SQL("sqlite:///GuenshinGuessr/locations.db")

# Auto redirect http to https
@app.before_request
def before_request():
    if not request.is_secure:
        url = request.url.replace('http://', 'https://', 1)
        code = 301
        return redirect(url, code=code)

# Ensure responses aren't cached
@app.after_request
def after_request(response):
    response.headers["Cache-Control"] = "no-cache, no-store, must-revalidate"
    response.headers["Expires"] = 0
    response.headers["Pragma"] = "no-cache"
    return response

@app.route("/")
def index():
    return render_template('index.html')

@app.route("/play", methods=["GET", "POST"])
def game():
    if request.method == 'GET':
        return redirect('/')
    else:
        user = request.form.get('username')

        if not user:
            user = 'User'

        return render_template('play.html', user=user)


@app.route("/teste")
def teste():
    return render_template('teste.html')


@app.route("/getlocations", methods=['POST'])
def getlocations():
    if not request.form.get('action'):
        locations = db.execute('SELECT * FROM locations ORDER BY RANDOM() LIMIT 5')
        response = app.response_class(
            response = json.dumps(locations),
            status = 200,
            mimetype = 'application/json'
        )
        return response
    elif request.form.get('action') == 'getCoord':
        if not request.form.get('id'):
            return app.response_class(
            response = 'Missing ID',
            status = 400,
            mimetype = 'application/json'
        )

        location = db.execute('SELECT lat, long FROM locations where id = ?', request.form.get('id'))
        response = app.response_class(
            response = json.dumps(location),
            status = 200,
            mimetype = 'application/json'
        )
        return response


def errorhandler(e):
    """Handle error"""
    if not isinstance(e, HTTPException):
        e = InternalServerError()
    return e


# Listen for errors
for code in default_exceptions:
    app.errorhandler(code)(errorhandler)
