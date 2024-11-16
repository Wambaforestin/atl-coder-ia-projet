# Défis de Codage avec IA
# Créez une fonction de tri et laissez l’IA proposer différentes méthodes

def trier_donnees(donnees, colonne, ordre):
    """
    Trie les données en fonction de la colonne spécifiée et de l'ordre de tri.
    
    Args:
    donnees (list): Liste des données à trier.
    colonne (str): Nom de la colonne à utiliser pour le tri.
    ordre (str): Ordre de tri ('asc' pour croissant, 'desc' pour décroissant).
    
    Returns:
    list: Liste des données triées.
    """
    return sorted(donnees, key=lambda x: x[colonne], reverse=(ordre == 'desc'))

# Exemple d'utilisation
donnees = [
    {'nom': 'Alice', 'age': 25},
    {'nom': 'Bob', 'age': 30},
    {'nom': 'Charlie', 'age': 20}
]

donnees_triees = trier_donnees(donnees, 'age', 'asc')
print(donnees_triees) 