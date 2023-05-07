const arr1 = [] 
const arr2 = []
for (let i = 0; i < 100000; i++) {
  arr1.push(Math.random())
  arr2.push(Math.random())
}

console.time('spread')
const spreadResult = [...arr1, ...arr2]
console.timeEnd('spread')

console.time('concat')
const concatResult = arr1.concat(arr2)
console.timeEnd('concat')