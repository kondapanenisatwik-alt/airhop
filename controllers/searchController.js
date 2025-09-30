const Search = require('../models/Search');

// Simple Dijkstra implementation
function dijkstra(graph, start, target) {
  const distances = {};
  const prev = {};
  const pq = new Set();

  Object.keys(graph).forEach(node => {
    distances[node] = Infinity;
    prev[node] = null;
    pq.add(node);
  });
  distances[start] = 0;

  while (pq.size) {
    let u = null;
    let minDist = Infinity;
    for (let n of pq) {
      if (distances[n] < minDist) {
        minDist = distances[n];
        u = n;
      }
    }
    if (u === null) break;
    pq.delete(u);

    if (u === target) break;

    const neighbors = graph[u] || [];
    for (let { node: v, weight } of neighbors) {
      const alt = distances[u] + weight;
      if (alt < distances[v]) {
        distances[v] = alt;
        prev[v] = u;
      }
    }
  }

  const path = [];
  let curr = target;
  if (prev[curr] === null && curr !== start && distances[curr] === Infinity) return null;
  while (curr) {
    path.unshift(curr);
    if (curr === start) break;
    curr = prev[curr];
  }
  return { path, distance: distances[target] };
}

// Example graph
const sampleGraph = {
  A: [{ node: 'B', weight: 2 }, { node: 'C', weight: 5 }],
  B: [{ node: 'A', weight: 2 }, { node: 'C', weight: 2 }, { node: 'D', weight: 4 }],
  C: [{ node: 'A', weight: 5 }, { node: 'B', weight: 2 }, { node: 'D', weight: 1 }],
  D: [{ node: 'B', weight: 4 }, { node: 'C', weight: 1 }]
};

const searchRoute = async (req, res) => {
  try {
    const { start = 'A', target = 'D' } = req.query;

    const result = dijkstra(sampleGraph, start, target);
    if (!result) return res.status(404).json({ message: 'Path not found' });

    const aqi = 50; // mock AQI

    // ✅ Save search to MongoDB if user is logged in
    if (req.user) {
      const newSearch = new Search({
        user: req.user.userId,
        start,
        target,
        path: result.path,
        distance: result.distance,
        aqi
      });
      await newSearch.save();
    }

    res.json({
      path: result.path,
      distance: result.distance,
      aqi
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { searchRoute };

