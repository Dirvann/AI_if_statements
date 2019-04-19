function replaceTextOnPage(from, to){
  getAllTextNodes().forEach(function(node){
    node.nodeValue = node.nodeValue.replace(new RegExp(quote(from), 'g'), to);
  });

  function getAllTextNodes(){
    var result = [];

    (function scanSubTree(node){
      if(node.childNodes.length) 
        for(var i = 0; i < node.childNodes.length; i++) 
          scanSubTree(node.childNodes[i]);
      else if(node.nodeType == Node.TEXT_NODE) 
        result.push(node);
    })(document);

    return result;
  }

  function quote(str){
    return (str+'').replace(/([.?*+^$[\]\\(){}|-])/g, "\\$1");
  }
}


replaceTextOnPage('AI', 'some IF statements');
replaceTextOnPage('A.I.', 'some IF statements');
replaceTextOnPage('Artificial Intelligence', 'some IF statements');
replaceTextOnPage('artificial intelligence', 'some IF statements');
replaceTextOnPage('Artificial intelligence', 'some IF statements');
