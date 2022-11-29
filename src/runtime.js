function stdout(...args) {
  console.log(...args);
}

function sum(...args) {
  return args.reduce((sum, num) => sum + num, 0);
}

function mod(x, y) {
  return x % y;
}

function pow(n, m) {
  return Math.pow(n, m);
}

function max(...args) {
  return Math.max(...args);
}

function min(...args) {
  return Math.min(...args);
}

function len(input) {
  return input.length;
}

