const equation = document.querySelector('.equation-input')
const step = document.querySelector('.step-input')
const [ from, to ] = document.querySelectorAll('.interval-input')
const variable = document.querySelector('.variable-input')
const btn = document.querySelector('.decide')
const table = document.querySelector('table');

const createTableRowHeader = () => {
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

  table.appendChild(headerRow)
}

const createTableRow = (i, x, y) => {
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

  table.appendChild(row)
}

const f = (x, y) => {
  return eval(equation.value)
}

const getId = (a, b, h) => {
  let i = 0

  while (a < b) {
    a += h
    i++
  }

  return { i }
}

const rungeKutte = (f, x0, y0, h, end) => {
  let x = x0
  let y = y0

  createTableRowHeader()
  createTableRow(0, x, y)

  for (let i = 1; i <= getId(x0, end, h).i; i++) {
    let r1 = f(x, y)
    let r2 = f(x + h / 2, y + r1 / 2)
    let r3 = f(x + h / 2, y + r2 / 2)
    let r4 = f(x + h, y + r3)

    r1 = parseFloat(r1.toFixed(3))
    r2 = parseFloat(r2.toFixed(3))
    r3 = parseFloat(r3.toFixed(3))
    r4 = parseFloat(r4.toFixed(3))

    y += h / 6 * (r1 + 2 * r2 + 2* r3 + r4)
    x += h
    x = parseFloat(x.toFixed(1))
    y = parseFloat(y.toFixed(3))

    console.log(r1 + '\n', r2 + '\n', r3 + '\n', r4 + '\n');
    createTableRow(i, x, y)
  }

  return { y }
}

btn.addEventListener('click', () => {
  const result = rungeKutte(f, Number(from.value), Number(variable.value), Number(step.value), Number(to.value))
  console.log(result.y);
})