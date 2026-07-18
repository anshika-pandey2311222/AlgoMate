const notesData = {
  Array: [
    {
      title: "Introduction",
      content:
        "Arrays store elements of the same type in contiguous memory locations. They allow constant time access using indices.",
    },
    {
      title: "Traversal",
      content:
        "Traverse arrays using for loop, while loop or for...of loop. Time Complexity: O(n).",
    },
    {
      title: "Insertion",
      content:
        "Insertion at the end is O(1), while insertion at the beginning or middle requires shifting elements, making it O(n).",
    },
    {
      title: "Deletion",
      content:
        "Deleting an element from the middle requires shifting remaining elements. Time Complexity: O(n).",
    },
    {
      title: "Common Problems",
      content:
        "Two Sum, Kadane's Algorithm, Product Except Self, Merge Intervals, Rotate Array, Majority Element.",
    },
  ],

  LinkedList: [
    {
      title: "Introduction",
      content:
        "A Linked List consists of nodes where each node stores data and a pointer to the next node.",
    },
    {
      title: "Types",
      content:
        "Singly Linked List, Doubly Linked List, Circular Linked List and Circular Doubly Linked List.",
    },
    {
      title: "Insertion",
      content:
        "Insertion at head is O(1). Tail insertion depends on whether a tail pointer exists.",
    },
    {
      title: "Deletion",
      content:
        "Delete by changing links instead of shifting elements like arrays.",
    },
    {
      title: "Important Problems",
      content:
        "Reverse Linked List, Detect Cycle, Merge Two Sorted Lists, Middle of Linked List, Remove Nth Node.",
    },
  ],

  Stack: [
    {
      title: "Introduction",
      content:
        "Stack follows Last In First Out (LIFO).",
    },
    {
      title: "Operations",
      content:
        "push(), pop(), peek(), isEmpty().",
    },
    {
      title: "Applications",
      content:
        "Undo feature, Browser History, Expression Evaluation, DFS.",
    },
    {
      title: "Complexity",
      content:
        "Push and Pop operations take O(1) time.",
    },
    {
      title: "Problems",
      content:
        "Valid Parentheses, Min Stack, Next Greater Element, Largest Rectangle Histogram.",
    },
  ],

  Queue: [
    {
      title: "Introduction",
      content:
        "Queue follows First In First Out (FIFO).",
    },
    {
      title: "Types",
      content:
        "Simple Queue, Circular Queue, Priority Queue, Deque.",
    },
    {
      title: "Applications",
      content:
        "Scheduling, BFS Traversal, Printer Queue, CPU Scheduling.",
    },
    {
      title: "Complexity",
      content:
        "Enqueue and Dequeue operations are O(1).",
    },
    {
      title: "Problems",
      content:
        "Implement Queue using Stacks, Rotten Oranges, Sliding Window Maximum.",
    },
  ],

  Tree: [
    {
      title: "Introduction",
      content:
        "Trees are hierarchical data structures consisting of nodes connected by edges.",
    },
    {
      title: "Binary Tree",
      content:
        "Each node has at most two children called left and right.",
    },
    {
      title: "Traversals",
      content:
        "Inorder, Preorder, Postorder and Level Order Traversal.",
    },
    {
      title: "Binary Search Tree",
      content:
        "Left subtree values are smaller and right subtree values are greater.",
    },
    {
      title: "Problems",
      content:
        "Maximum Depth, Diameter, LCA, Validate BST, Serialize and Deserialize Tree.",
    },
  ],

  Graph: [
    {
      title: "Introduction",
      content:
        "Graphs consist of vertices connected by edges.",
    },
    {
      title: "Representation",
      content:
        "Adjacency List and Adjacency Matrix.",
    },
    {
      title: "Traversal",
      content:
        "Breadth First Search (BFS) and Depth First Search (DFS).",
    },
    {
      title: "Algorithms",
      content:
        "Dijkstra, Bellman Ford, Floyd Warshall, Prim's, Kruskal's.",
    },
    {
      title: "Problems",
      content:
        "Number of Islands, Clone Graph, Course Schedule, Network Delay Time.",
    },
  ],

  Hashing: [
    {
      title: "Introduction",
      content:
        "Hashing maps keys to values using hash functions.",
    },
    {
      title: "Data Structures",
      content:
        "HashMap stores key-value pairs while HashSet stores unique values.",
    },
    {
      title: "Applications",
      content:
        "Frequency Counting, Duplicate Detection, Fast Lookup.",
    },
    {
      title: "Complexity",
      content:
        "Average lookup, insertion and deletion are O(1).",
    },
    {
      title: "Problems",
      content:
        "Two Sum, Group Anagrams, Longest Consecutive Sequence, Top K Frequent Elements.",
    },
  ],

  DynamicProgramming: [
    {
      title: "Introduction",
      content:
        "Dynamic Programming solves overlapping subproblems by storing previous results.",
    },
    {
      title: "Types",
      content:
        "Memoization (Top Down) and Tabulation (Bottom Up).",
    },
    {
      title: "When to Use",
      content:
        "Use DP when a problem has overlapping subproblems and optimal substructure.",
    },
    {
      title: "Classic Problems",
      content:
        "Climbing Stairs, House Robber, Coin Change, Longest Increasing Subsequence.",
    },
    {
      title: "Advanced",
      content:
        "0/1 Knapsack, Matrix Chain Multiplication, Edit Distance.",
    },
  ],

  BinarySearch: [
    {
      title: "Introduction",
      content:
        "Binary Search works only on sorted data and repeatedly halves the search space.",
    },
    {
      title: "Complexity",
      content:
        "Time Complexity: O(log n).",
    },
    {
      title: "Applications",
      content:
        "Finding elements, Lower Bound, Upper Bound, Peak Element.",
    },
    {
      title: "Patterns",
      content:
        "Binary Search on Answer is commonly used in interview problems.",
    },
    {
      title: "Problems",
      content:
        "Search in Rotated Sorted Array, Koko Eating Bananas, Capacity to Ship Packages.",
    },
  ],

  Recursion: [
    {
      title: "Introduction",
      content:
        "A recursive function calls itself until a base condition is met.",
    },
    {
      title: "Base Case",
      content:
        "Every recursive function must have a stopping condition.",
    },
    {
      title: "Applications",
      content:
        "Factorial, Fibonacci, Tree Traversals, Backtracking.",
    },
    {
      title: "Backtracking",
      content:
        "Used for N-Queens, Sudoku Solver, Permutations and Combinations.",
    },
    {
      title: "Complexity",
      content:
        "Depends on recursion depth and branching factor.",
    },
  ],
};

export default notesData;
