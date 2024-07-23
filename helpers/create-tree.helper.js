// Khi export thì đệ quy không thể hoạt động do không thể gọi lại

const createTree = (array, parentId = "") => {
  const tree = [];
  array.forEach(item => {
    if(item.parent_id === parentId) {
      const newItem = item;
      const children = createTree(array, item.id);
      if(children.length > 0) {
        newItem.children = children;
      }
      tree.push(newItem);
    }      
  });
  return tree;
}

module.exports = (array) => {
  // Do parentId đã là default nên không cần truyền vào
  const tree = createTree(array);
  return tree;
}