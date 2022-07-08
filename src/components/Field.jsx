import { useEffect, useState } from "react"
import { nanoid } from "nanoid"

export const Field = ({ 
  title,
  cellsNumber, 
  randomNumbers, 
  maxSize,
  randomCells, 
  action: setMatchedNumbers 
}) => {
  const [ cells, setCells ] = useState([])

  useEffect(() => {
    setCells(new Array(cellsNumber)
      .fill(null)
      .map((_, i) => ({
        id: nanoid(), 
        selected: false,
        title: i + 1
      }))
    )
  }, [cellsNumber])

  useEffect(() => {
    if (randomCells.length === 0) return

    const sortedCells = [ ...randomCells ]

    sortedCells.sort((a, b) => a - b)

    setCells((cells) => cells.map((cell) => ({
      ...cell,
      selected: sortedCells.includes(cell.title)
    })))

  }, [randomCells])

  useEffect(() => {
    if (randomNumbers.length === 0) return

    setMatchedNumbers(
      randomNumbers.filter((n) => {
        return getSelected(cells)
          .map(({ title }) => title)
          .includes(n)
      })
    )
  }, [cells, randomNumbers])

  const handleSelectCell = ({ target }) => {
    const maxCellsSelected = maxSize === getSelected(cells)
      .map(({ id }) => id)
      .length

    setCells((prev) => {
      return prev.map((cell) => {
        if (cell.id === target.dataset.id) {
          return {
            ...cell,
            selected: maxCellsSelected ? false : !cell.selected
          }
        }

        return cell
      })
    })
  }

  const addSelectedClass = ({ selected }) => {
    return selected ? 'cell__selected' : ''
  }

  /**
   * Фильтрует массив ячеек
   * @param {object[]} cells - ячейки для выбора
   * @returns массив выбранных ячеек
   */
  const getSelected = (cells) => {
    return cells.filter(({ selected }) => selected)
  }


  return (
    <div className="field">
      <header>
        <h3>Поле {title}</h3>
        <h3>
          <span>Отметьте</span>
          <span>{maxSize}{maxSize < 5 ? ' число' : ' чисел'}</span>
          <span>(Выбрано {getSelected(cells).length})</span>
        </h3>
      </header>
      <div className="cells">
        {cells.map((cell) => {
          return (
            <div key={cell.id} 
              className={`cell ${addSelectedClass(cell)}`} 
              data-id={cell.id}
              onClick={handleSelectCell}
            >
              {cell.title}
            </div>
          )
        })}
      </div>
    </div>
  )
}