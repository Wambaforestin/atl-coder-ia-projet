from flask import Flask, render_template
import pandas as pd
import os

app = Flask(__name__)

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
CSV_PATH = os.path.join(BASE_DIR, 'data', 'users_data.csv')

@app.route('/')
def dashboard():
    users_data = pd.read_csv(CSV_PATH)
    users_data_json = users_data.to_dict(orient='records')
    return render_template('index.html', users_data=users_data_json)

if __name__ == '__main__':
    app.run(debug=True)

"""
Cette application Flask :
1. Charge les données utilisateur à partir d'un fichier CSV.
2. Convertit les données en format JSON pour une utilisation côté client.
3. Rend le template HTML avec les données utilisateur.

Le tableau de bord résultant affiche diverses visualisations D3.js
pour analyser les données utilisateur de manière intuitive et attrayante.
"""