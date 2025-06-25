exports.shuffle = (arr) => arr.sort(() => Math.random() - 0.5);
exports.pick = (arr, n = 20) => arr.slice(0, n);