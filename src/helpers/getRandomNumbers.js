/**
 * Создает массив указанной длины. 
 * Числа в массиве случайные и уникальные. 
 * Величина каждого числа лежит в указанных границах.
 * @param {number} maxSize - максимальная длина массива
 * @param {number[]} range - массив, определяющий границы диапазона 
 * @returns {number[]} массив с числами
 */
export const getRandomNumbers = (maxSize, [ min, max ]) => {
  const uniquesNumbers = new Set()

  do { 
    uniquesNumbers.add(
      Math.round(Math.random() * (max - min) + min)
    ) 
  } while (uniquesNumbers.size < maxSize)

  return [ ...uniquesNumbers.values() ]
}