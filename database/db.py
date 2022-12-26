import sqlite3
from flask import Flask, jsonify, request, abort
from argparse import ArgumentParser


DB = 'db.sqlite'

# For Movies


def get_row_as_dict(row):
    row_dict = {
        'movie_id': row[0],
        'name': row[1],
        'poster': row[2],
    }

    return row_dict

# For Bookings


def get_row_as_dict2(row):
    row_dict = {
        'booking_id': row[0],
        'name': row[1],
        'date': row[2],
        'time': row[3],
        'amount': row[4],
        'poster': row[5],
    }

    return row_dict

# For ComingSoon


def get_row_as_dict3(row):
    row_dict = {
        'comingsoon_id': row[0],
        'name': row[1],
        'poster': row[2],
        'description': row[3],
        'date': row[4],
    }

    return row_dict


app = Flask(__name__)


@app.route('/api/movies', methods=['GET'])
def index():
    db = sqlite3.connect(DB)
    cursor = db.cursor()
    cursor.execute('SELECT * FROM movies ORDER BY movie_id')
    rows = cursor.fetchall()

    print(rows)

    db.close()

    rows_as_dict = []
    for row in rows:
        row_as_dict = get_row_as_dict(row)
        rows_as_dict.append(row_as_dict)

    return jsonify(rows_as_dict), 200


@app.route('/api/comingsoon', methods=['GET'])
def comingsoon():
    db = sqlite3.connect(DB)
    cursor = db.cursor()
    cursor.execute('SELECT * FROM comingsoon ORDER BY comingsoon_id')
    rows = cursor.fetchall()

    print(rows)

    db.close()

    rows_as_dict = []
    for row in rows:
        row_as_dict = get_row_as_dict3(row)
        rows_as_dict.append(row_as_dict)

    return jsonify(rows_as_dict), 200


@app.route('/api/booking', methods=['GET'])
def booking():
    db = sqlite3.connect(DB)
    cursor = db.cursor()
    cursor.execute('SELECT * FROM booking ORDER BY booking_id DESC')
    rows = cursor.fetchall()

    print(rows)

    db.close()

    rows_as_dict = []
    for row in rows:
        row_as_dict = get_row_as_dict2(row)
        rows_as_dict.append(row_as_dict)

    return jsonify(rows_as_dict), 200


@app.route('/api/booking/<int:booking>', methods=['GET'])
def show(booking):
    db = sqlite3.connect(DB)
    cursor = db.cursor()
    cursor.execute(
        'SELECT * FROM booking WHERE booking_id=? ORDER BY booking_id DESC; ', (str(booking),))
    row = cursor.fetchone()
    db.close()

    if row:
        row_as_dict = get_row_as_dict2(row)
        return jsonify(row_as_dict), 200
    else:
        return jsonify(None), 200


@app.route('/api/booking', methods=['POST'])
def store():
    if not request.json:
        abort(404)

    new_booking = (
        request.json['name'],
        request.json['date'],
        request.json['time'],
        request.json['amount'],
        request.json['poster'],
    )

    db = sqlite3.connect(DB)
    cursor = db.cursor()

    cursor.execute('''
        INSERT INTO booking(name,date,time,amount,poster)
        VALUES(?,?,?,?,?)
    ''', new_booking)

    booking_id = cursor.lastrowid

    db.commit()

    response = {
        'booking_id': booking_id,
        'affected': db.total_changes,
    }

    db.close()

    return jsonify(response), 201


@app.route('/api/booking/<int:booking>', methods=['PUT'])
def update(booking):
    if not request.json:
        abort(400)

    if 'booking_id' not in request.json:
        abort(400)

    if int(request.json['booking_id']) != booking:
        abort(400)

    update_booking = (
        request.json['date'],
        request.json['time'],
        request.json['amount'],
        str(booking),
    )

    db = sqlite3.connect(DB)
    cursor = db.cursor()

    cursor.execute('''
        UPDATE booking SET
            date=?,time=?,amount=?
        WHERE booking_id=?
    ''', update_booking)

    db.commit()

    response = {
        'booking_id': booking,
        'affected': db.total_changes,
    }

    db.close()

    return jsonify(response), 201


@app.route('/api/booking/<int:booking>', methods=['DELETE'])
def delete(booking):
    if not request.json:
        abort(400)

    if 'booking_id' not in request.json:
        abort(400)

    if int(request.json['booking_id']) != booking:
        abort(400)

    db = sqlite3.connect(DB)
    cursor = db.cursor()

    cursor.execute('DELETE FROM booking WHERE booking_id=?', (str(booking),))

    db.commit()

    response = {
        'booking_id': booking,
        'affected': db.total_changes,
    }

    db.close()

    return jsonify(response), 201


if __name__ == '__main__':
    parser = ArgumentParser()
    parser.add_argument('-p', '--port', default=5000,
                        type=int, help='port to listen on')
    args = parser.parse_args()
    port = args.port

    app.run(host='0.0.0.0', port=port)
