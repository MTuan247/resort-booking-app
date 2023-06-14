export const useTree = () => {

  function toTree(list, idField, parentIdFIeld) {
    var map = {}, node, roots = [], i;
    
    for (i = 0; i < list.length; i += 1) {
      map[list[i][idField]] = i; // initialize the map
      list[i]._children = []; // initialize the _children
      list[i]._isParent = false;
      list[i]._grade = 1;
    }
    
    for (i = 0; i < list.length; i += 1) {
      node = list[i];
      if (node[parentIdFIeld] && list[map[node[parentIdFIeld]]]) {
        // if you have dangling branches check that map[node[parentIdFIeld]] exists
        list[map[node[parentIdFIeld]]]._children.push(node);
        list[map[node[parentIdFIeld]]]._isParent = true;
        node._grade = list[map[node[parentIdFIeld]]]._grade + 1;
      } else {
        roots.push(node);
      }
    }
    return roots;
  }

  return {
    toTree
  }
}
