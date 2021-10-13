import json
import uuid
from datetime import datetime

import MySQLdb.cursors
from flask import Flask, request, jsonify, make_response, redirect
from flask_mysqldb import MySQL
from flask_cors import CORS

import validators.url as validate_url

app = Flask(__name__)

# Allowing CORS
CORS(app)

# Reading Database Configuration Properties
with open('config.json') as config_file:
    config_data = json.load(config_file)

# Setting Database Configuration Properties
app.config.update(config_data['database'])

# Initializing MySQL
mysql = MySQL(app)


# No Use For This Application, Just For Testing
@app.route("/")
def index():
    return "Hello World!"


# This API Helps to Generate Tiny URL from Original URL
@app.route("/api/generate-tiny-url", methods=['POST'])
def generate_tiny_url():
    try:
        cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
        data = request.get_json()
        original_url = data['original_url']
        if not validate_url(original_url):
            response = {
                "message": "Not a Valid URL"
            }
            return make_response(jsonify(response), 400)
        else:
            short_url = uuid.uuid4().hex[:10].upper()
            created_datetime = datetime.now()

            cursor.execute('SELECT * FROM url_map WHERE original_url = % s', (original_url,))
            data = cursor.fetchone()
            if data:
                cursor.execute('UPDATE url_map SET short_url = % s, created_datetime = % s,'
                               'hit_counter = 0 WHERE original_url = % s',
                               (short_url, created_datetime, original_url,))
                mysql.connection.commit()
            else:
                cursor.execute('INSERT INTO url_map VALUES (% s, % s, % s, %s)',
                               (original_url, short_url, 0, created_datetime))
                mysql.connection.commit()
            return jsonify({
                "short_url": short_url,
                "hit_counter": 0,
                "created_datetime": created_datetime
            })
    except Exception as ex:
        response = {
            "message": repr(ex)
        }
        return make_response(jsonify(response), 400)
    finally:
        cursor.close()


# This API Returns All The Existing Tiny URL With The Hit Counter ( Number of Times Used)
@app.route("/api/fetch-all-url", methods=['GET'])
def fetch_all_url():
    try:
        cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
        cursor.execute('SELECT short_url, hit_counter, created_datetime FROM url_map ORDER BY created_datetime DESC')
        data = cursor.fetchall()
        return jsonify({
            "data": data
        })
    except Exception as ex:
        response = {
            "message": repr(ex)
        }
        return make_response(jsonify(response), 500)
    finally:
        cursor.close()


# This API Helps Us to Retrieve Original URL From The Provided Short URL and Redirect It.
@app.route("/<short_url>")
def redirect_url(short_url):
    try:
        cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
        cursor.execute('SELECT original_url, hit_counter FROM url_map WHERE short_url = % s', (short_url, ))
        data = cursor.fetchone()
        if data:
            hit_counter = data['hit_counter'] + 1
            cursor.execute('UPDATE url_map SET hit_counter = % s WHERE original_url = % s',
                           (hit_counter, data['original_url']))
            mysql.connection.commit()
            return redirect(data['original_url'])
        else:
            return make_response("Not Found", 404)
    except Exception as ex:
        response = {
            "message": repr(ex)
        }
        return make_response(jsonify(response), 500)
    finally:
        cursor.close()


# main driver function
if __name__ == '__main__':
    app.run(host='0.0.0.0')
