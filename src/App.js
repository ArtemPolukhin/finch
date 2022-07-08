import './styles/main.scss'
import { Field } from "./components/Field";
import { useEffect, useState } from 'react';
import { getRandomNumbers } from './helpers/getRandomNumbers'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWandMagicSparkles } from '@fortawesome/free-solid-svg-icons';
import { useFetch } from './helpers/hooks';


export default function App() {
  const [ randomNumbersFirst, setRandomNumbersFirst ] = useState([])
  const [ randomNumbersSecond, setRandomNumbersSecond ] = useState([])
  const [ matchedNumbersFirst, setMatchedNumbersFirst ] = useState([])
  const [ matchedNumbersSecond, setMatchedNumbersSecond ] = useState([])
  const [ 
    randomlySelectedCellsFirst, 
    setRandomlySelectedCellsFirst 
  ] = useState([])
  const [ 
    randomlySelectedCellsSecond, 
    setRandomlySelectedCellsSecond 
  ] = useState([])
  const [ triggerFetch, { status, isError } ] = useFetch()
  const [ timer, setTimer ] = useState(0)
  const [ timerId, setTimerId ] = useState(0)
  const [ isTicketWon, setIsTicketWon ] = useState(false)
  const [ isFirstClick, setIsFirstClick ] = useState(false)
  const [ isResultGotten, setIsResultGotten ] = useState(false)
  
  useEffect(() => {
    if (timer > 0 && timer < 3) {
      triggerFetch({
        isTicketWon,
        selectedNumber: {
          firstField: matchedNumbersFirst,
          secondField: matchedNumbersSecond
        }
      })
    }

    if (timer === 3) {
      clearInterval(timerId)
      setTimer(0)
    }
  }, [timer, isTicketWon, matchedNumbersFirst, matchedNumbersSecond])


  useEffect(() => {
    if ((isError || status > 399)) {
      setTimerId(
        setInterval(() => {
          setTimer((prev) => prev + 1)
        }, 2000)
      )
    } else {
      clearInterval(timerId)
    }
  }, [status, isError])

  const fields = {
    first: {
      cellsQuantity: 19,
      maxSelectedCells: 8,
    },
    second: {
      cellsQuantity: 2,
      maxSelectedCells: 1,
    }
  }

  useEffect(() => {
    if (!isFirstClick) return

    console.log('sended')

    /**
     * Вызывает определенный набор функций и данных при нажатии на
     * кнопку "Показать результат"
     * @param {boolean} status 
     */
    const send = (status) => {
      setIsTicketWon(status)
      triggerFetch({
        isTicketWon: status,
        selectedNumber: {
          firstField: matchedNumbersFirst,
          secondField: matchedNumbersSecond
        }
      })
      setRandomNumbersFirst([])
      setRandomNumbersSecond([])
      setIsResultGotten(true)
    }

    const firstFieldWon = matchedNumbersFirst.length >= 4
    const secondFieldWon = (
      matchedNumbersFirst.length >= 3
      && matchedNumbersSecond.length > 0
    )

    send(firstFieldWon || secondFieldWon)
  }, [matchedNumbersFirst, matchedNumbersSecond])


  const handleClickGetResult = async () => {
    setRandomNumbersFirst(getRandomNumbers(
      fields.first.maxSelectedCells, 
      [1, fields.first.cellsQuantity]
    ))
    setRandomNumbersSecond(getRandomNumbers(
      fields.second.maxSelectedCells, 
      [1, fields.second.cellsQuantity]
    ))

    setIsFirstClick(true)
  }

  const handleClickWand = () => {
    setRandomlySelectedCellsFirst(getRandomNumbers(
      fields.first.maxSelectedCells, 
      [1, fields.first.cellsQuantity]
    ))
    setRandomlySelectedCellsSecond(getRandomNumbers(
      fields.second.maxSelectedCells, 
      [1, fields.second.cellsQuantity]
    ))
  }

  return (
    <div className="App">
      <header>
        <h1>Билет</h1>
        {!isResultGotten && 
          <div 
            className="wand"
            onClick={handleClickWand}
            >
            <FontAwesomeIcon icon={faWandMagicSparkles} />
          </div>
        }
      </header>
      
      {!isResultGotten &&
        <div className="wrapper">
          <Field 
            title={'1'}
            cellsNumber={fields.first.cellsQuantity} 
            randomNumbers={randomNumbersFirst} 
            action={setMatchedNumbersFirst} 
            maxSize={fields.first.maxSelectedCells}
            randomCells={randomlySelectedCellsFirst}  
            />

          <Field 
            title={'2'}
            cellsNumber={fields.second.cellsQuantity} 
            randomNumbers={randomNumbersSecond} 
            action={setMatchedNumbersSecond}
            maxSize={fields.second.maxSelectedCells}
            randomCells={randomlySelectedCellsSecond}
            />

          <button onClick={handleClickGetResult}>
            Показать результат
          </button>
        </div>
      }

      {isTicketWon && isResultGotten && <p>Поздравляем! Вы выиграли!</p>}
      {!isTicketWon && isResultGotten && <p>Не повезло!</p>}
      
      {(timer > 0 || status > 399) && <h4>Повторный запрос: {timer} </h4>}

      {(isError && timer === 0) && isResultGotten && <h4>Ошибка!</h4>}
    </div>
  );
}
