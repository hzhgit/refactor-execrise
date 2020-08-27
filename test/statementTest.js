const test = require('ava');
const {statement} = require('../src/statement');

// test('Sample test', t => {
//   t.true(true);
//   t.is(1, 1);
//   t.deepEqual({a: 1}, {a: 1});
// });

// test('Sample test', t => {
//   //given
//   const invoice = {};
//   const plays = [];

//   const result = statement(invoice, plays);

//   t.is(result, '');
// });

test('statement case1:customer without performance',t => {
  //given
  const invoice = {
    'customer': 'BigCo',
    'performances': []
  };

  //when
  const result = statement(invoice,plays)

  //then
  t.is(result,'Statement for BigCo\nAmount owed is $0.00\nYou earned 0 credits \n')
})

test('statement case2:customer BigCo Buy Tickets', t => {
  //given
  const invoice = {
      'customer': 'BigCo',
      'performances': [
          {
              'playID': 'hamlet',
              'audience': 55,
          },
          {
              'playID': 'as-like',
              'audience': 35,
          },
          {
              'playID': 'othello',
              'audience': 40,
          },
      ],
  };
  //when
  const result = statement(invoice, plays);
  const expectResult = 'Statement for BigCo\n'
      + ` Hamlet: $650.00 (55 seats)\n`
      + ` As You Like It: $580.00 (35 seats)\n`
      + ` Othello: $500.00 (40 seats)\n`
      + `Amount owed is $1,730.00\n`
      + `You earned 47 credits \n`;
  //then
  t.is(result, expectResult);
});

test('statement case3:customer BigCo Buy Tickets', t => {
  //given
  const invoice = {
      'customer': 'BigCo',
      'performances': [
          {
              'playID': 'hamlet',
              'audience': 29,
          },
          {
              'playID': 'as-like',
              'audience': 25,
          },
          {
              'playID': 'othello',
              'audience': 21,
          },
      ],
  };
  //when
  const result = statement(invoice, plays);
  const expectResult = 'Statement for BigCo\n'
      + ` Hamlet: $400.00 (29 seats)\n`
      + ` As You Like It: $500.00 (25 seats)\n`
      + ` Othello: $400.00 (21 seats)\n`
      + `Amount owed is $1,300.00\n`
      + `You earned 5 credits \n`;
  //then
  t.is(result, expectResult);
});





const invoice = {
  'customer': 'BigCo',
  'performances': [
    {
      'playID': 'hamlet',
      'audience': 55,
    },
    {
      'playID': 'as-like',
      'audience': 35,
    },
    {
      'playID': 'othello',
      'audience': 40,
    },
  ],
};


const plays = {
  'hamlet': {
    'name': 'Hamlet',
    'type': 'tragedy',
  },
  'as-like': {
    'name': 'As You Like It',
    'type': 'comedy',
  },
  'othello': {
    'name': 'Othello',
    'type': 'tragedy',
  },
};