// Charger les données JSON
const data = JSON.parse(document.getElementById('data-json').textContent);

// Fonction pour mettre à jour les statistiques
function updateStats() {
    document.getElementById('total-users').textContent = data.length;
    document.getElementById('average-age').textContent = (data.reduce((sum, user) => sum + user.age, 0) / data.length).toFixed(1);
    document.getElementById('total-purchases').textContent = data.reduce((sum, user) => sum + user.purchases, 0);
    document.getElementById('unique-countries').textContent = new Set(data.map(user => user.country)).size;
}

// Fonction pour créer un graphique à barres
function createBarChart(selector, data, xKey, yKey, color) {
    const margin = { top: 20, right: 20, bottom: 30, left: 40 };
    const width = 400 - margin.left - margin.right;
    const height = 300 - margin.top - margin.bottom;

    const svg = d3.select(selector)
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

    const x = d3.scaleBand()
        .range([0, width])
        .padding(0.1);

    const y = d3.scaleLinear()
        .range([height, 0]);

    x.domain(data.map(d => d[xKey]));
    y.domain([0, d3.max(data, d => d[yKey])]);

    svg.selectAll(".bar")
        .data(data)
        .enter().append("rect")
        .attr("class", "bar")
        .attr("x", d => x(d[xKey]))
        .attr("width", x.bandwidth())
        .attr("y", d => y(d[yKey]))
        .attr("height", d => height - y(d[yKey]))
        .attr("fill", color);

    svg.append("g")
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisBottom(x));

    svg.append("g")
        .call(d3.axisLeft(y));
}

// Fonction pour créer un graphique circulaire
function createPieChart(selector, data, key) {
    const width = 400;
    const height = 300;
    const radius = Math.min(width, height) / 2;

    const color = d3.scaleOrdinal(d3.schemeCategory10);

    const svg = d3.select(selector)
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", `translate(${width / 2},${height / 2})`);

    const pie = d3.pie()
        .value(d => d.value);

    const arc = d3.arc()
        .innerRadius(0)
        .outerRadius(radius);

    const pieData = d3.rollup(data, v => v.length, d => d[key]);
    const arcs = pie(Array.from(pieData, ([key, value]) => ({ key, value })));

    svg.selectAll("path")
        .data(arcs)
        .enter()
        .append("path")
        .attr("d", arc)
        .attr("fill", d => color(d.data.key))
        .attr("stroke", "white")
        .style("stroke-width", "2px");

    svg.selectAll("text")
        .data(arcs)
        .enter()
        .append("text")
        .attr("transform", d => `translate(${arc.centroid(d)})`)
        .attr("dy", "0.35em")
        .text(d => d.data.key)
        .style("text-anchor", "middle")
        .style("font-size", "12px")
        .style("fill", "white");
}

// Fonction pour créer un nuage de mots
function createWordCloud(selector, data, key) {
    const width = 400;
    const height = 300;

    const wordCounts = d3.rollup(data, v => v.length, d => d[key]);
    const words = Array.from(wordCounts, ([text, size]) => ({ text, size }));

    const layout = d3.layout.cloud()
        .size([width, height])
        .words(words)
        .padding(5)
        .rotate(() => ~~(Math.random() * 2) * 90)
        .font("Arial")
        .fontSize(d => Math.sqrt(d.size) * 10)
        .on("end", draw);

    layout.start();

    function draw(words) {
        d3.select(selector).append("svg")
            .attr("width", layout.size()[0])
            .attr("height", layout.size()[1])
            .append("g")
            .attr("transform", `translate(${layout.size()[0] / 2},${layout.size()[1] / 2})`)
            .selectAll("text")
            .data(words)
            .enter().append("text")
            .style("font-size", d => `${d.size}px`)
            .style("font-family", "Arial")
            .attr("text-anchor", "middle")
            .attr("transform", d => `translate(${d.x},${d.y})rotate(${d.rotate})`)
            .text(d => d.text);
    }
}

// Créer les visualisations
window.onload = function () {
    updateStats();

    // Répartition par âge
    const ageDistribution = d3.rollup(data, v => v.length, d => Math.floor(d.age / 10) * 10);
    const ageData = Array.from(ageDistribution, ([key, value]) => ({ age: `${key}-${key + 9}`, count: value }));
    createBarChart("#age-distribution-chart", ageData, "age", "count", "#8A3FFC");

    // Achats par pays
    const purchasesByCountry = d3.rollup(data, v => d3.sum(v, d => d.purchases), d => d.country);
    const purchaseData = Array.from(purchasesByCountry, ([key, value]) => ({ country: key, purchases: value }))
        .sort((a, b) => b.purchases - a.purchases)
        .slice(0, 10);
    createBarChart("#purchases-by-country-chart", purchaseData, "country", "purchases", "#FF4088");

    // Répartition par genre
    createPieChart("#gender-distribution-chart", data, "gender");

    // Nuage de mots des pays
    createWordCloud("#country-wordcloud-chart", data, "country");

    // Achats par genre
    const purchasesByGender = d3.rollup(data, v => d3.sum(v, d => d.purchases), d => d.gender);
    const purchaseDataGender = Array.from(purchasesByGender, ([key, value]) => ({ gender: key, purchases: value }))
        .sort((a, b) => b.purchases - a.purchases)
        .slice(0, 10);
    createBarChart("#purchases-by-gender-chart", purchaseDataGender, "gender", "purchases", "#FF4088");

};

/*
 * Ce script crée un tableau de bord interactif avec D3.js :
 * 1. Il charge les données JSON et met à jour les statistiques générales.
 * 2. Il crée un graphique à barres pour la répartition par âge.
 * 3. Il crée un graphique à barres pour les achats par pays (top 10).
 * 4. Il crée un graphique circulaire pour la répartition par genre.
 * 5. Il crée un nuage de mots pour visualiser la fréquence des pays.
 *
 * Les fonctions sont réutilisables et peuvent être adaptées pour d'autres visualisations.
 * Le code utilise des couleurs définies dans le CSS pour une cohérence visuelle.
 */