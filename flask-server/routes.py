from flask import Flask, request, jsonify
from flask_cors import CORS
import sys
import IMDB_handler as IMDB

app = Flask(__name__)
CORS(app)

@app.route('/')
def IMDB_search():
    title = request.args.get('title').replace(" ","+")
    category = request.args.get('category')
    results = IMDB.find_title([title,category])
    return jsonify(results)

@app.route('/select')
def TMDB_search():
    IMDB_ID = request.args.get('item')
    # details = IMDB.find_title([title,category])
    # return jsonify(results)
    
    
if __name__ == '__main__':
   app.run(debug=True)