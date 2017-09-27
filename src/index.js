module.exports = function multiply(first, second) {
  const firstNumberAsArray = first.split('').map(customParseInt);
  const secondNumberAsArray = second.split('').map(customParseInt);
  const resultAsArray = [];
  let startResultIndex = 0;
  let bufferArray;
  let modifierThirdStage = 0;
  let moreThanTenCheckIndex;

  for(let indexSecond = second.length - 1; indexSecond >= 0; --indexSecond){
    for(let indexFirst = first.length - 1; indexFirst >= 0; --indexFirst){
      bufferArray = (firstNumberAsArray[indexFirst] * secondNumberAsArray[indexSecond]).toString().split("").map(customParseInt);//yyyy
      bufferArray.reverse();

      for (let bufferIndex = 0; bufferIndex < bufferArray.length; ++bufferIndex){
        while (resultAsArray.length < bufferIndex + 1 + startResultIndex + modifierThirdStage){
          resultAsArray.push(0);
        }
        resultAsArray[bufferIndex + startResultIndex + modifierThirdStage] += bufferArray[bufferIndex];

        moreThanTenCheckIndex = bufferIndex + startResultIndex + modifierThirdStage;
        while (resultAsArray[moreThanTenCheckIndex]/10 >= 1){
          if (resultAsArray.length < moreThanTenCheckIndex + 2){
            resultAsArray.push(0);
          }
          resultAsArray[moreThanTenCheckIndex + 1] += Math.floor(resultAsArray[moreThanTenCheckIndex]/10);
          resultAsArray[moreThanTenCheckIndex] = resultAsArray[moreThanTenCheckIndex] % 10;
          ++moreThanTenCheckIndex;
        }
      }
      ++modifierThirdStage;
    }
    modifierThirdStage = 0;
    ++startResultIndex;
  }
  resultAsArray.reverse();
  return resultAsArray.join('');
}

function customParseInt(str){
  return parseInt(str, 10);
}
