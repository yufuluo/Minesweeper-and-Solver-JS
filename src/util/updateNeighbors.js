const updateNeighbors = (node, n, func) => {
  const x = node.row;
  const y = node.col;
  if (x > 0 && y > 0) {
    func(node, x - 1, y - 1);
  }
  if (x > 0) {
    func(node, x - 1, y);
  }
  if (x > 0 && y < n - 1) {
    func(node, x - 1, y + 1);
  }
  if (y > 0) {
    func(node, x, y - 1);
  }
  if (y < n - 1) {
    func(node, x, y + 1);
  }
  if (x < n - 1 && y > 0) {
    func(node, x + 1, y - 1);
  }
  if (x < n - 1) {
    func(node, x + 1, y);
  }
  if (x < n - 1 && y < n - 1) {
    func(node, x + 1, y + 1);
  }
};

export default updateNeighbors;
