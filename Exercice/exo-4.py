# Personnalisation des Snippets
# Dans chaque outil, créez des snippets personnalisés pour les besoins de l'équipe et ajustez les paramètres IA pour les conventions de code

# Premier snippet : Exemple de Snippet pour Python - Création d'un Graphique avec Matplotlib
# Code Snippet
{
    "code": {
        "language": "python",
        "content": [
            "import matplotlib.pyplot as plt",
            "import numpy as np",
            "",
            "x = np.linspace(0, 10, 100)",
            "y = np.sin(x)",
            "",
            "plt.plot(x, y)",
            "plt.xlabel('x')",
            "plt.ylabel('sin(x)')",
            "plt.title('Graphique de sin(x)')",
            "plt.show()"
        ]
    }
}

# Deuxième snippet : Exemple de Snippet pour Python - Création d'un DataFrame avec Pandas
# Code Snippet
{
    "code": {
        "language": "python",
        "content": [
            "import pandas as pd",
            "",
            "data = {",
            "    'Nom': ['Alice', 'Bob', 'Charlie'],",
            "    'Age': [25, 30, 20]",
            "}",
            "",
            "df = pd.DataFrame(data)",
            "print(df)"
        ]
    }
}