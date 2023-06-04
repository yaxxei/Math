const f = (x, y) => {
  return Math.cos(y) + 3 * x
}

const getId = (a, b, h) => {
  let i = 0

  while (a < b) {
    a += h
    i++
  }

  return { i }
}

const count = (a, b, h) => {
  const count = Math.floor((b - a) / h) + 1;

  return { count }
}

const advancedEuler = (f, x0, y0, h, end) => {
  let x = x0
  let yArr = [y0]
  console.log(x + ' : ' + y0);

  let y0_5 = y0 + h / 2 * f(x, y0)
  let x0_5 = x + h / 2
  x = parseFloat(x.toFixed(1))
  y0_5 = parseFloat(y0_5.toFixed(3))
  console.log(x0_5 + ' : ' + y0_5);

  let y1 = y0 + h * f(x0_5, y0_5)
  x += h
  x = parseFloat(x.toFixed(1))
  y1 = parseFloat(y1.toFixed(3))
  console.log(x + ' : ' + y1);

  let y2 = y0 + 2 * h * f(x, y1)
  x += h
  x = parseFloat(x.toFixed(1))
  y2 = parseFloat(y2.toFixed(3))
  console.log(x + ' : ' + y2);

  yArr.push(y1)
  yArr.push(y2)

  for (let i = 3; i < count(x0, end, h).count; i++) {
    let y = yArr[i - 2] + 2 * h * f(x, yArr[i - 1])
    x += h
    x = parseFloat(x.toFixed(1))
    y = parseFloat(y.toFixed(3))
    yArr.push(y)

    console.log(x + ' : ' + y);
  }

  return { yArr }
}
advancedEuler(f, 0, 1.3, 0.2, 1)