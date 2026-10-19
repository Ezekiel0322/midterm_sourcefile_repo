'use strict';

// Show the program title
console.log('CAMPUS IT SUPPORT REQUEST MANAGER');

// ================================================================
// PART A: STACK (last in, first out)
// ================================================================

// Stack class: the last item added is the first one removed
class Stack {
  // Create the storage for the stack
  constructor() {
    this.items = [];
  }

  // Add an item on top
  push(element) {
    this.items.push(element);
  }

  // Remove and return the top item
  pop() {
    return this.items.pop();
  }

  // Look at the top item without removing it
  peek() {
    return this.items[this.items.length - 1];
  }

  // Return true if there are no items
  isEmpty() {
    return this.items.length === 0;
  }

  // Return the number of items
  size() {
    return this.items.length;
  }

  // Return all items as text
  toString() {
    return this.items.join(', ');
  }
}

console.log('\nPART A: UNDO HISTORY');

// Create the stack that keeps the actions
const actionHistory = new Stack();

// Push the three actions in order
actionHistory.push('Opened Ticket #101');
actionHistory.push('Assigned Ticket #101');
actionHistory.push('Closed Ticket #101');

// Show the top action, undo it, then show what is left
console.log('Top Action: ' + actionHistory.peek());
console.log('Undo Action: ' + actionHistory.pop());
console.log('Remaining Actions: ' + actionHistory.toString());
console.log('Stack Size: ' + actionHistory.size());

// ================================================================
// PART B: QUEUE (first in, first out)
// ================================================================

// Queue class: the first item added is the first one removed
class Queue {
  // Create the storage for the queue
  constructor() {
    this.items = [];
  }

  // Add an item at the back
  enqueue(element) {
    this.items.push(element);
  }

  // Remove and return the front item
  dequeue() {
    return this.items.shift();
  }

  // Look at the front item without removing it
  front() {
    return this.items[0];
  }

  // Return true if there are no items
  isEmpty() {
    return this.items.length === 0;
  }

  // Return the number of items
  size() {
    return this.items.length;
  }

  // Return all items as text
  toString() {
    return this.items.join(', ');
  }
}

console.log('\nPART B: WAITING REQUESTS');

// Create the queue that keeps the waiting requests
const waitingRequests = new Queue();

// Add the four requests in arrival order
waitingRequests.enqueue('Ticket #201 - Password Reset');
waitingRequests.enqueue('Ticket #202 - No Internet');
waitingRequests.enqueue('Ticket #203 - Printer Problem');
waitingRequests.enqueue('Ticket #204 - Software Installation');

// Show the request at the front
console.log('Next Request: ' + waitingRequests.front());

// Process two requests
console.log('Processed: ' + waitingRequests.dequeue());
console.log('Processed: ' + waitingRequests.dequeue());

// Show the remaining requests and the queue size
console.log('Remaining Requests: ' + waitingRequests.toString());
console.log('Queue Size: ' + waitingRequests.size());

// ================================================================
// PART C: PRIORITY QUEUE
// (smaller number = more urgent: 1 is the most urgent)
// ================================================================

// PriorityQueue class: urgent requests go before normal requests
class PriorityQueue {
  // Start with no items
  constructor() {
    this.head = null; // the first item
    this.length = 0;
  }

  // Add a request in the right place based on its priority
  enqueue(request, priority) {
    // Each item keeps the request, its priority, and the next item in the line
    const newNode = { request: request, priority: priority, next: null };

    if (this.head === null || priority < this.head.priority) {
      // The new item goes first
      newNode.next = this.head;
      this.head = newNode;
    } else {
      // Move forward until we find the right spot
      // (same priority stays in arrival order)
      let current = this.head;
      while (current.next !== null && current.next.priority <= priority) {
        current = current.next;
      }
      newNode.next = current.next;
      current.next = newNode;
    }

    this.length++;
  }

  // Remove and return the first item
  dequeue() {
    if (this.head === null) {
      return undefined;
    }
    const removed = this.head;
    this.head = this.head.next;
    this.length--;
    return removed;
  }

  // Return the number of items
  size() {
    return this.length;
  }

  // Show every request and its priority, from first to last
  print() {
    let current = this.head;
    while (current !== null) {
      console.log(current.request + ', Priority ' + current.priority);
      current = current.next;
    }
  }
}

console.log('\nPART C: URGENT REQUESTS');

// Create the priority queue for urgent requests
const urgentRequests = new PriorityQueue();

// Enqueue the four required requests.
urgentRequests.enqueue('Ticket #301 - Install Browser', 3);
urgentRequests.enqueue('Ticket #302 - Server Offline', 1);
urgentRequests.enqueue('Ticket #303 - Faculty PC Failure', 2);
urgentRequests.enqueue('Ticket #304 - Internet Laboratory Down', 1);

// Print the initial priority order.
console.log('Initial Priority Order:');
urgentRequests.print();

// Process the first request
const processedUrgent = urgentRequests.dequeue();
console.log(
  'Processed Priority Request: ' +
    processedUrgent.request +
    ', Priority ' +
    processedUrgent.priority
);

// Show the remaining requests
console.log('Remaining Priority Requests:');
urgentRequests.print();

// ================================================================
// PART D: LINKED LIST
// ================================================================

// Node class: one node in the linked list
class Node {
  // Store the element and set next to null
  constructor(element) {
    this.element = element;
    this.next = null; // the next node
  }
}

// LinkedList class: nodes connected one after another
class LinkedList {
  // Start with no nodes
  constructor() {
    this.head = null; // the first node
    this.length = 0;
  }

  // Add an element at the end
  append(element) {
    const newNode = new Node(element);

    if (this.head === null) {
      this.head = newNode;
    } else {
      // Go to the last node, then connect the new node
      let current = this.head;
      while (current.next !== null) {
        current = current.next;
      }
      current.next = newNode;
    }

    this.length++;
  }

  // Add an element at a position
  // Returns true if it worked, false if the position is not valid
  insert(position, element) {
    if (position < 0 || position > this.length) {
      return false;
    }

    const newNode = new Node(element);

    if (position === 0) {
      // Add at the beginning
      newNode.next = this.head;
      this.head = newNode;
    } else {
      // Go to the node before the position
      let previous = this.head;
      for (let i = 0; i < position - 1; i++) {
        previous = previous.next;
      }
      newNode.next = previous.next;
      previous.next = newNode;
    }

    this.length++;
    return true;
  }

  // Remove the element at a position and return it
  // Returns null if the position is not valid
  removeAt(position) {
    if (position < 0 || position >= this.length) {
      return null;
    }

    let removed;

    if (position === 0) {
      // Remove the first node
      removed = this.head;
      this.head = this.head.next;
    } else {
      // Go to the node before the one we want to remove
      let previous = this.head;
      for (let i = 0; i < position - 1; i++) {
        previous = previous.next;
      }
      removed = previous.next;
      previous.next = removed.next;
    }

    this.length--;
    return removed.element;
  }

  // Find the position of an element (-1 if not found)
  indexOf(element) {
    let current = this.head;
    let index = 0;

    while (current !== null) {
      if (current.element === element) {
        return index;
      }
      current = current.next;
      index++;
    }

    return -1;
  }

  // Remove an element by its value
  // Returns null if it is not found
  remove(element) {
    const index = this.indexOf(element);
    if (index === -1) {
      return null;
    }
    return this.removeAt(index);
  }

  // Return true if there are no nodes
  isEmpty() {
    return this.length === 0;
  }

  // Return the number of nodes
  size() {
    return this.length;
  }

  // Return all elements as text, with a separator between them
  toString(separator = ', ') {
    let text = '';
    let current = this.head;

    while (current !== null) {
      text += current.element;
      if (current.next !== null) {
        text += separator;
      }
      current = current.next;
    }

    return text;
  }
}

console.log('\nPART D: COMPLETED REQUESTS');

// Create the linked list for completed requests
const completedRequests = new LinkedList();

// Add the first three requests at the end
completedRequests.append('Ticket #401 - Account Activated');
completedRequests.append('Ticket #402 - Printer Connected');
completedRequests.append('Ticket #403 - Antivirus Updated');

// Add Ticket #400 at the beginning
completedRequests.insert(0, 'Ticket #400 - Computer Diagnosed');

// Add Ticket #405 at the end using insert()
completedRequests.insert(completedRequests.size(), 'Ticket #405 - Browser Updated');

// Show the complete list
console.log('Complete List:');
console.log(completedRequests.toString('\n'));

// Find the position of Ticket #402
console.log(
  'Index of Ticket #402: ' +
    completedRequests.indexOf('Ticket #402 - Printer Connected')
);

// Remove the item at position 1 using removeAt()
console.log('Removed at Position 1: ' + completedRequests.removeAt(1));

// Remove Ticket #403 by value using remove()
console.log(
  'Removed by Value: ' +
    completedRequests.remove('Ticket #403 - Antivirus Updated')
);

// Show the final list and its size
console.log('Final List:');
console.log(completedRequests.toString('\n'));
console.log('Final Size: ' + completedRequests.size());
