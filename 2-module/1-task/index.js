function sumSalary(salaries) {
  let total = 0;
  let isNull = false;
  for (let key in salaries){
    let value = salaries[key];
    if(typeof value === 'number' && !isNaN(value) && isFinite(value)){
      total += value;
      isNull = true;
    }
  }
  return isNull ? total : 0;
}
