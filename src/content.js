function rsearchChildNodesByType(node, type, include) {
  var result = [];

  if (node.childNodes.length) {
    for(var i = 0; i < node.childNodes.length; i++) {
      result = result.concat(rsearchChildNodesByType(node.childNodes[i], type, include));
    }

  } else {
    if ((node.nodeType == type) && node.nodeValue && node.nodeValue.includes(include)) {
      //console.log('HIT ' + node.nodeValue);
      result.push(node);
    } else {
      // console.log('IGN got ' + node.nodeType + ' want ' + type + ' interesting? ' + (node.nodeValue && node.nodeValue.includes(include)) + ' reason: ' + include + ' val: ' + node.nodeValue);
    }
  }
  // result.length && console.log(result);
  return result;
}

function replaceTextOnPage (from, to) {
  rsearchChildNodesByType(document, Node.TEXT_NODE, from).forEach(function (node) {
    console.log('GOT ' + node.nodeValue);
    node.nodeValue = node.nodeValue.replace(
      new RegExp('(\\b)' + quote(from) + '(\\b)', 'g'),
      '$1' + to + '$2'
    );
  });

  function quote(str){
    return (str+'').replace(/([.?*+^$[\]\\(){}|-])/g, "\\$1");
  }
}


replaceTextOnPage('AI', 'some IF statements');
replaceTextOnPage('A.I.', 'some IF statements');
replaceTextOnPage('Artificial Intelligence', 'some IF statements');
replaceTextOnPage('Artificial intelligence', 'some IF statements');
replaceTextOnPage('artificial intelligence', 'some IF statements');
replaceTextOnPage('artificial Intelligence', 'some IF statements');
replaceTextOnPage('ARTIFICIAL INTELLIGENCE', 'some IF statements');
