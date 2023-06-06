const equation = document.querySelector('.equation-input')
const equationCheck = document.querySelector('.equation-check')
const step = document.querySelector('.step-input')
const [from, to] = document.querySelectorAll('.interval-input')
const variable = document.querySelector('.variable-input')
const btn = document.querySelector('.decide')
const table = document.querySelector('table')
const methods = document.querySelector('.methods')
const rs = document.querySelector('#rs')

const equatCheck = () => {
  equation.addEventListener('keydown', (e) => {
    console.log(e.target);
  })
}
equatCheck()

const createTableRowHeader = (dy) => {
  table.id = 'table'
  const headerRow = document.createElement('tr')

  const iHeader = document.createElement('th')
  iHeader.textContent = 'i'
  headerRow.appendChild(iHeader)

  const xHeader = document.createElement('th')
  xHeader.textContent = 'x(i)'
  headerRow.appendChild(xHeader)

  const yHeader = document.createElement('th')
  yHeader.textContent = 'y(i)'
  headerRow.appendChild(yHeader)

  if (dy) {
    const deltaYHeader = document.createElement('th')
    deltaYHeader.textContent = 'dy(i)'
    headerRow.appendChild(deltaYHeader)
  }

  table.appendChild(headerRow)
}

const createTableRow = (i, x, y, dy) => {
  const row = document.createElement('tr')

  const iCell = document.createElement('td')
  iCell.textContent = i
  row.appendChild(iCell)

  const xCell = document.createElement('td')
  xCell.textContent = x
  row.appendChild(xCell)

  const yCell = document.createElement('td')
  yCell.textContent = y
  row.appendChild(yCell)

  if (dy) {
    const deltaYCell = document.createElement('td')
    deltaYCell.textContent = dy
    row.appendChild(deltaYCell)
  }

  table.appendChild(row)
}

equation.value = equation.value.replace(/,/g, '.')
step.value = step.value.replace(/,/g, '.')
from.value = from.value.replace(/,/g, '.')
to.value = to.value.replace(/,/g, '.')
variable.value = variable.value.replace(/,/g, '.')

const equationTransfrom = (equation) => {
  equation = equation.replace(/Math./gi, '')
  equation = equation.replace(/pow/gi, 'Math.pow')
  
  equation = equation.replace(/sin/gi, 'Math.sin')
  equation = equation.replace(/cos/gi, 'Math.cos')
  equation = equation.replace(/tan|tg/gi, 'Math.tan')
  equation = equation.replace(/cot|ctg/gi, '1 / Math.tan')
  equation = equation.replace(/sec/gi, '1 / Math.cos')
  equation = equation.replace(/cosec|csc/gi, '1 / Math.sin')

  equation = equation.replace(/arcsin/gi, 'Math.asin')
  equation = equation.replace(/arccos/gi, 'Math.acos')
  equation = equation.replace(/arctan|arctg/gi, 'Math.atan')
  equation = equation.replace(/arccot|arcctg/gi, '1 / Math.atan')
  equation = equation.replace(/arcsec/gi, '1 / Math.acos')
  equation = equation.replace(/arccosec|arccsc/gi, '1 / Math.asin')

  equation = equation.replace(/([A-z])(\^)(\d+)/gi, 'Math.pow($1, $3)')
  equation = equation.replace(/(\d+)([A-z])/gi, '$1 * $2')

  return equation
}

const f = (x, y) => {
  return eval(equationTransfrom(equation.value))
}

const getId = (a, b, h) => {
  const i = Math.floor((b - a) / h) + 1;

  return { i }
}

const rungeKutte = (f, x0, y0, h, end) => {
  let x = x0
  let y = y0

  createTableRowHeader()
  createTableRow(0, x, y)

  for (let i = 1; i < getId(x0, end, h).i; i++) {
    let r1 = h * f(x, y)
    let r2 = h * f(x + h / 2, y + r1 / 2)
    let r3 = h * f(x + h / 2, y + r2 / 2)
    let r4 = h * f(x + h, y + r3)

    r1 = parseFloat(r1.toFixed(3))
    r2 = parseFloat(r2.toFixed(3))
    r3 = parseFloat(r3.toFixed(3))
    r4 = parseFloat(r4.toFixed(3))

    y += h / 6 * (r1 + 2 * r2 + 2 * r3 + r4)
    x += h

    x = parseFloat(x.toFixed(1))
    y = parseFloat(y.toFixed(3))

    createTableRow(i, x, y)

    const r = document.createElement('p')
    r.innerHTML = `
    ${i} итерация: <br>
    r(1) = ${r1} <br>
    r(2) = ${r2} <br>
    r(3) = ${r3} <br>
    r(4) = ${r4} <br>
    <br>
    `
    rs.appendChild(r)
  }

  return { y }
}

const euler = (f, x0, y0, h, end) => {
  let x = x0
  let y = y0

  let dy = f(x, y) * h
  dy = parseFloat(dy.toFixed(3))

  createTableRowHeader(dy)
  createTableRow(0, x, y, dy)

  y += dy
  x += h

  for (let i = 1; i < getId(x0, end, h).i; i++) {
    dy = f(x, y) * h
    dy = parseFloat(dy.toFixed(3))

    createTableRow(i, x, y, dy)

    y += dy
    x += h

    x = parseFloat(x.toFixed(1))
    y = parseFloat(y.toFixed(3))
  }

  return { y }
}

const modificEuler = (f, x0, y0, h, end) => {
  let x = x0
  let y = y0
  let yArr = [y0]

  createTableRowHeader()
  createTableRow(0, x, y)

  let y0_5 = y0 + h / 2 * f(x, y0)
  let x0_5 = x + h / 2
  y0_5 = parseFloat(y0_5.toFixed(3))
  createTableRow(0.5, x0_5, y0_5)

  let y1 = y0 + h * f(x0_5, y0_5)
  x += h
  x = parseFloat(x.toFixed(1))
  y1 = parseFloat(y1.toFixed(3))
  createTableRow(1, x, y1)

  let y2 = y0 + 2 * h * f(x, y1)
  x += h
  x = parseFloat(x.toFixed(1))
  y2 = parseFloat(y2.toFixed(3))
  createTableRow(2, x, y2)

  yArr.push(y1)
  yArr.push(y2)

  for (let i = 3; i < getId(x0, end, h).i; i++) {
    let y = yArr[i - 2] + 2 * h * f(x, yArr[i - 1])
    x += h
    yArr.push(y)

    x = parseFloat(x.toFixed(1))
    y = parseFloat(y.toFixed(3))

    createTableRow(i, x, y)
  }

  return { y }
}

btn.addEventListener('click', () => {
  if (methods.value === 'euler') {
    if (table.hasChildNodes()) {
      table.innerHTML = ''
    }
    if (rs.hasChildNodes()) {
      rs.innerHTML = ''
    }
    euler(f, Number(from.value), Number(variable.value), Number(step.value), Number(to.value))
    return
  }

  if (methods.value === 'euler-modific') {
    if (table.hasChildNodes()) {
      table.innerHTML = ''
    }
    if (rs.hasChildNodes()) {
      rs.innerHTML = ''
    }
    modificEuler(f, Number(from.value), Number(variable.value), Number(step.value), Number(to.value))
    return
  }

  if (methods.value === 'rugne-kutte') {
    if (table.hasChildNodes()) {
      table.innerHTML = ''
    }
    if (rs.hasChildNodes()) {
      rs.innerHTML = ''
    }
    rungeKutte(f, Number(from.value), Number(variable.value), Number(step.value), Number(to.value))
    return
  }
})