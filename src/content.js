function forEachChildNodeByType (node, type, regex, func, is_recursing) {
  var result = [];

  if (node.childNodes.length) {
    for (var i = 0; i < node.childNodes.length; i++) {
      result = result.concat(forEachChildNodeByType(node.childNodes[i], type, regex, func, true));
    }

  } else if ( (node.nodeType === type) && node.nodeValue && (regex.test(node.nodeValue)) ) {
    func(node);
  }

  if (is_recursing) { return result; }
}

function replaceTextOnPage (from, flag_o, to) {
  var flag = flag_o || '';
  forEachChildNodeByType(document, Node.TEXT_NODE, new RegExp(from, flag), function (node) {
    node.nodeValue = node.nodeValue.replace(
      new RegExp('(\\b)' + quote(from) + '(\\b)', 'g' + flag),
      '$1' + to + '$2'
    );
  });

  function quote (str) {
    return (str+'').replace(/([.?*+\^$\[\]\\(){}|\-])/g, '\\$1');
  }
}

(function (to) {
  [['AI'], ['A.I.'], ['artificial intelligence', 'i']].forEach( function (from) {
    replaceTextOnPage(from[0], from[1], to);
  } );
})('some IF statements');
