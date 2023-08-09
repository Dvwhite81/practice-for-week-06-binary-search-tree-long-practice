// Before starting, copy and paste your guided practice work from
// `binary-search-tree.js` into this file

class TreeNode {
    constructor(val) {
      this.val = val;
      this.left = null;
      this.right = null;
    }
  }

  class BinarySearchTree {

    constructor() {
      this.root = null;
    }

    insert(val, currentNode=this.root) {
      const newNode = new TreeNode(val);

      if (!currentNode) {
        currentNode = newNode;
        this.root = newNode;
        return;
      }

      while (currentNode) {
        if (newNode.val < currentNode.val) {
          if (!currentNode.left) {
            currentNode.left = newNode;
            currentNode = currentNode.left;
            return;
          } else {
            currentNode = currentNode.left;
          }
        } else {
          if (!currentNode.right) {
            currentNode.right = newNode;
            currentNode = currentNode.right;
            return;
          } else {
            currentNode = currentNode.right;
          }
        }
      }
    }

    search(val, currentNode = this.root) {
      if (currentNode === null) return false;

      if (val === currentNode.val) return true;

      if (val < currentNode.val) return this.search(val, currentNode.left);
      else return this.search(val, currentNode.right);
    }


    preOrderTraversal(currentNode = this.root) {
      console.log(currentNode.val);

      if (currentNode.left) {
        this.preOrderTraversal(currentNode.left);
      }

      if (currentNode.right) {
        this.preOrderTraversal(currentNode.right);
      }
    }


    inOrderTraversal(currentNode = this.root) {
      if (currentNode.left) {
        this.inOrderTraversal(currentNode.left);
      }

      console.log(currentNode.val);

      if (currentNode.right) {
        this.inOrderTraversal(currentNode.right);
      }
    }


    postOrderTraversal(currentNode = this.root) {
      if (currentNode.left) {
        this.postOrderTraversal(currentNode.left);
      }

      if (currentNode.right) {
        this.postOrderTraversal(currentNode.right);
      }

      console.log(currentNode.val);
    }

      // Breadth First Traversal - Iterative
    breadthFirstTraversal() {
      let queue = [];
      queue.push(this.root);

      while (queue.length > 0) {
        let currentNode = queue.shift();
        console.log(currentNode.val);

        if (currentNode.left) queue.push(currentNode.left);

        if (currentNode.right) queue.push(currentNode.right);
      }
    }

    // Depth First Traversal - Iterative
    depthFirstTraversal() {
      let stack = [];
      stack.push(this.root);

      while (stack.length > 0) {
        let currentNode = stack.pop();
        console.log(currentNode.val);

        if (currentNode.left) stack.push(currentNode.left);

        if (currentNode.right) stack.push(currentNode.right);
      }
  }
  }

  module.exports = { BinarySearchTree, TreeNode };
