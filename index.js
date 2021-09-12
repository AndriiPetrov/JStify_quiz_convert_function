const conv = (funcString) => {
  // Solution was done only using string functions
  let newFuncString = '';

  if (funcString.startsWith('function')) {
    if (funcString.substring('function'.length + 1).startsWith('(')) {
      newFuncString += `() => ${funcString.slice(funcString.indexOf('{'))}`;
    } else {
      newFuncString += `const ${funcString.substring('function'.length + 1, funcString.indexOf('('))} = ${funcString.substring(funcString.indexOf('('), funcString.indexOf(')') + 1)} => ${funcString.slice(funcString.indexOf('{'))}`;
    }
  } else {
    if (funcString.startsWith('(')) {
      newFuncString += 'function () ' + funcString.slice(funcString.indexOf('{'));
    } else if(funcString.startsWith('const') || funcString.startsWith('let') || funcString.startsWith('var')) {
      newFuncString += 'function ' + funcString.substring(funcString.indexOf(' '), funcString.indexOf('=') - 1) + funcString.slice(funcString.indexOf('('), funcString.indexOf(')') + 1) + ' ' + funcString.slice(funcString.indexOf('{'));
    } else {
      newFuncString += 'function ' + funcString.substring(0, funcString.indexOf('=') - 1) + funcString.slice(funcString.indexOf('('), funcString.indexOf(')') + 1) + ' ' + funcString.slice(funcString.indexOf('{'));
    }
  }

  return newFuncString;
}

conv("function () {}"); // "() => {}"
conv("function jstify() {}" ); // "const jstify = () => {}"
conv("function jstify(str) { console.log(str); }"); // "const jstify = (str) => { console.log(str); }"
conv("() => {}"); // "function () {}"
conv("const jstify = () => {}"); // "function jstify() {}"
conv("let jstify = (str) => { console.log(str); }"); // "function jstify(str) { console.log(str); }"
conv("var jstify = (str) => { console.log(str); }"); // "function jstify(str) { console.log(str); }"
conv("jstify = (str) => { console.log(str); }"); // "function jstify(str) { console.log(str); }"
