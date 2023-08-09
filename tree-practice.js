const { BinarySearchTree, TreeNode } = require("./binary-search-tree.js");
// Before starting, copy and paste your guided practice work into the copy
// of `binary-search-tree.js` in this folder

// Practice problems on binary trees

function findMinBST(rootNode) {
  if (!rootNode) return null;

  let min = rootNode;

  while (min.left) min = min.left;
  return min.val;
}

function findMaxBST(rootNode) {
  if (!rootNode) return null;

  let max = rootNode;

  while (max.right) max = max.right;
  return max.val;
}

function findMinBT(rootNode) {
  if (!rootNode) return null;

  let min = rootNode.val;
  let queue = [rootNode];

  while (queue.length > 0) {
    let shifted = queue.shift();

    if (shifted.val < min) min = shifted.val;

    if (shifted.left) queue.push(shifted.left);
    if (shifted.right) queue.push(shifted.right);
  }

  return min;
}

function findMaxBT(rootNode) {
  if (!rootNode) return null;

  let max = rootNode.val;
  let queue = [rootNode];

  while (queue.length > 0) {
    let shifted = queue.shift();

    if (shifted.val > max) max = shifted.val;

    if (shifted.left) queue.push(shifted.left);
    if (shifted.right) queue.push(shifted.right);
  }

  return max;
}

function getHeight(rootNode) {
  if (!rootNode) return -1;

  if (!rootNode.left && !rootNode.right) return 0;

  let height = 1;
  let left = getHeight(rootNode.left);
  let right = getHeight(rootNode.right);
  let max = Math.max(left, right);
  height += max;

  return height;
}

function balancedTree(rootNode) {
  if (!rootNode) return true;

  if (!rootNode.left && !rootNode.right) return true;

  let left = rootNode.left;
  let right = rootNode.right;
  let lh = getHeight(left);
  let rh = getHeight(right);

  if (Math.abs(lh - rh) <= 1) {
    if (balancedTree(left) && balancedTree(right)) {
      return true;
    }
  }
  return false;
}

function countNodes(rootNode) {
  if (!rootNode) return 0;

  if (!rootNode.left && !rootNode.right) return 1;

  let left = countNodes(rootNode.left);
  let right = countNodes(rootNode.right);

  return left + right + 1;
}

function getParentNode(rootNode, target) {
  if (!rootNode) return undefined;

  if (rootNode.val === target) return null;

  let left = rootNode.left;
  let right = rootNode.right;

  if (left) {
    if (left.val === target) return rootNode;
  }

  if (right) {
    if (right.val === target) return rootNode;
  }

  return getParentNode(left, target) || getParentNode(right, target);
}

function inOrderPredecessor(rootNode, target) {
  if (!rootNode) return null;

  if (rootNode.val >= target) {
    return inOrderPredecessor(rootNode.left, target);
  } else {
    let pre = inOrderPredecessor(rootNode.right, target);

    if (pre) {
      return pre;
    } else {
      return rootNode.val;
    }
  }
}

function findNode(rootNode, target) {
  let stack = [rootNode];

  while (stack.length > 0) {
    let popped = stack.pop();

    if (popped.val === target) return popped;

    if (popped.right) stack.push(popped.right);
    if (popped.left) stack.push(popped.left);
  }
  return null;
}

function deleteNodeBST(rootNode, target) {
  // Do a traversal to find the node. Keep track of the parent
  let node = findNode(rootNode, target);
  // Undefined if the target cannot be found
  if (!node) return undefined;
  // Set target based on parent
  let parentNode = getParentNode(rootNode, target);
  let childNodes = 0;

  if (node.left) childNodes++;
  if (node.right) childNodes++;
  // Case 0: Zero children and no parent:
  //   return null
  if (!childNodes) {
    if (!parentNode) return null;
    // Case 1: Zero children:
    //   Set the parent that points to it to null
    else {
      if (parentNode.val < node.val) parentNode.right = null;
      else parentNode.left = null;
    }
  }

  // Case 2: Two children:
  if (childNodes === 2) {
    //  Set the value to its in-order predecessor, then delete the predecessor
    let pre = inOrderPredecessor(rootNode, target);
    node.val = pre;

    //  Replace target node with the left most child on its right side,
    //  or the right most child on its left side.
    //  Then delete the child that it was replaced with.

    let preParent = getParentNode(node.left, node.val);
    if (!preParent) node.left = null;
    else preParent.right = null;
  }
  // Case 3: One child:
  //   Make the parent point to the child
  if (childNodes === 1) {
    let child;

    if (node.left) child = node.left;
    else child = node.right;

    if (parentNode.val > node.val) parentNode.left = child;
    else parentNode.right = child;
  }
}

module.exports = {
  findMinBST,
  findMaxBST,
  findMinBT,
  findMaxBT,
  getHeight,
  countNodes,
  balancedTree,
  getParentNode,
  inOrderPredecessor,
  deleteNodeBST,
};
