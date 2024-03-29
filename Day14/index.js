window.onload = function() {
  // start with strings, numbers and booleans
  let age = 100;
  let age2 = age;
  console.log(age, age2);
  age = 200;
  console.log(age, age2);

  let name = "Chris";
  let name2 = name;
  console.log(name, name2);
  name = "Wes";
  console.log(name, name2);

  // Let's say we have an array
  const players = ['Wes', 'Sarah', 'Ryan', 'Poppy'];

  // and we want to make a copy of it.
  let team = players;
  console.log(players, team);

  // You might think we can just do something like this:
  team[3] = "Lux";
  console.log(team);
  console.log(players);

  // however what happens when we update that array?

  // now here is the problem!

  // oh no - we have edited the original array too!

  // Why? It's because that is an array reference, not an array copy. They both point to the same array!

  // So, how do we fix this? We take a copy instead!

  // one way
  let team2 = players.slice();
  console.log(team2);

  // or create a new array and concat the old one in
  let team3 = [].concat(players);
  console.log(team3);

  // or use the new ES6 Spread
  let team4 = [...players];
  console.log(team4);
  team4[3] = "Chris";
  console.log(team4);
  console.log(players);

  let team5 = Array.from(players);
  console.log(team5);

  // now when we update it, the original one isn't changed

  // The same thing goes for objects, let's say we have a person object

  // with Objects
  const person = {
    name: 'Wes Bos',
    age: 80
  };
  console.log(person);

  // and think we make a copy:
  let captain = person;
  captain.number = 99;
  console.log(captain);
  console.log(person);

  // how do we take a copy instead?
  let cap2 = Object.assign({}, person, {number2: 99, age: 12});
  console.log(cap2);
  console.log(person);

  // We will hopefully soon see the object ...spread
  // let cap3 = {...person};

  // Things to note - this is only 1 level deep - both for Arrays and Objects. lodash has a cloneDeep method, but you should think twice before using it.
  let chris = {
    name: "Chris",
    age: 100,
    social: {
      twitter: "@Handle",
      facebook: "Chris.facebook"
    }
  };
  console.log(chris);
  let dev = Object.assign({}, chris);
  console.log(dev);
  dev.name = "Wesley";
  console.log(chris);
  console.log(dev);
  dev.social.twitter = "@coolman";
  console.log(dev.social);
  console.log(chris.social);

  let dev2 = JSON.parse(JSON.stringify(chris));
  console.log(dev2);
  dev2.social.twitter = "@coolman2";
  console.log(dev2.social);
  console.log(chris.social);
};