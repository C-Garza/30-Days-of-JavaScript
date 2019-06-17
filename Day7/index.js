import {createTable} from "../helper-functions/functions.js";
window.onload = function() {
  // ## Array Cardio Day 2
  const people = [
    { name: 'Wes', year: 1988 },
    { name: 'Kait', year: 1986 },
    { name: 'Irv', year: 1970 },
    { name: 'Lux', year: 2015 }
  ];
  const comments = [
    { text: 'Love this!', id: 523423 },
    { text: 'Super good', id: 823423 },
    { text: 'You are the best', id: 2039842 },
    { text: 'Ramen is my fav food ever', id: 123523 },
    { text: 'Nice Nice Nice!', id: 542328 }
  ];
  let currentYear = new Date().getFullYear();

  // Some and Every Checks
  // Array.prototype.some() // is at least one person 19 or older?
  let isOver19 = people.some((person) => {
    return currentYear - person.year >= 19;
  });
  console.log({isOver19});

  // Array.prototype.every() // is everyone 19 or older?
  let isEveryOver19 = people.every(person => {
    return currentYear - person.year >= 19;
  });
  console.log({isEveryOver19});

  // Array.prototype.find()
  // Find is like filter, but instead returns just the one you are looking for
  // find the comment with the ID of 823423
  let comment = comments.find(comment => {
    return comment.id === 823423;
  });
  console.log(comment);

  // Array.prototype.findIndex()
  // Find the comment with this ID
  // delete the comment with the ID of 823423
  let findCommentIndex = comments.findIndex(comment => {
    return comment.id === 823423;
  });
  console.log(findCommentIndex);
  // comments.splice(findCommentIndex,1);
  // console.table(comments);
  //OR ANOTHER WAY KEEPING BOTH ARRAYS INTACT (KEEPING THE COMMENTS ARRAY IMMUTABLE)
  let newComments = [
    ...comments.slice(0, findCommentIndex),
    ...comments.slice(findCommentIndex + 1)
  ];
  console.table(newComments);
  console.table(comments);

};