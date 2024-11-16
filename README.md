# Dashboard Analytique Utilisateur (Altelier coder avec IA EPSI)

## Objectif

Ce projet vise à développer un tableau de bord analytique interactif pour visualiser et analyser des données utilisateur. Il offre une interface intuitive et des visualisations dynamiques pour explorer les tendances et les insights des données.

## Technologies Utilisées

| Catégorie | Technologies |
|-----------|--------------|
| Backend   | Python (Flask, Pandas) |
| Frontend  | HTML, CSS, JavaScript (D3.js) |
| Base de données | CSV (pour ce prototype) |

## Structure du Projet

| Dossier/Fichier | Description |
|-----------------|-------------|
| `app.py`        | Script principal Flask pour le backend |
| `data/`         | Contient le fichier CSV des données utilisateur |
| `static/`       | Fichiers statiques (CSS, JavaScript) |
| `templates/`    | Templates HTML |
| `requirements.txt` | Liste des dépendances Python |

## Installation et Configuration

### Étapes d'Installation

1. Cloner le dépôt :

   ```bash
   git clone <URL_DU_DEPOT>
   cd dashboard-analytique-utilisateur
   ```

2. Créer et activer un environnement virtuel :

   ```bash
   python -m venv env

   # Sur Windows
   .\env\Scripts\activate

   # Sur macOS et Linux
   source env/bin/activate
   ```

3. Installer les dépendances :

   ```bash
   pip install -r requirements.txt
   
   note: note : rassurez-vous d'étre dans le repertoire dashboard-analytique pour lancer la commande 
   ```

4. Lancer l'application :

   ```bash
   python app.py
   ```

5. Ouvrir un navigateur et accéder à `http://localhost:5000`

## Utilisation

Une fois l'application lancée, vous verrez un tableau de bord interactif avec plusieurs visualisations :

1. **Statistiques Générales** : Nombre total d'utilisateurs, âge moyen, achats totaux, et nombre de pays uniques.
2. **Répartition par Âge** : Un graphique à barres montrant la distribution des âges des utilisateurs.
3. **Achats par Pays** : Un graphique à barres des 10 premiers pays en termes d'achats.
4. **Répartition par Genre** : Un graphique circulaire montrant la distribution des genres.
5. **Nuage de Mots des Pays** : Une visualisation des pays les plus représentés dans la base de données.

### Captures d'écran

![Dashboard Overview](/dashboard-analytique/dashboard_overview.png)
*Vue d'ensemble du tableau de bord*
