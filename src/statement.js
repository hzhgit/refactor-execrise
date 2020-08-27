function usd(amout) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format(amout / 100);
}

function amountFor(aPerformance, play) {
  let thisAmount = 0;
  switch (play.type) {
    case 'tragedy':
      thisAmount = 40000;
      if (aPerformance.audience > 30) {
        thisAmount += 1000 * (aPerformance.audience - 30);
      }
      break;
    case 'comedy':
      thisAmount = 30000;
      if (aPerformance.audience > 20) {
        thisAmount += 10000 + 500 * (aPerformance.audience - 20);
      }
      thisAmount += 300 * aPerformance.audience;
      break;
    default:
      throw new Error(`unknown type: ${play.type}`);
  }
  return thisAmount;
}

function getTotalAmount(invoice, plays) {
  let totalAmount = 0;
  for (let perf of invoice.performances) {
    const play = plays[perf.playID];
    totalAmount += amountFor(perf, play);
  }
  return totalAmount
}

function volumeCredits(invoice, plays) {
  let volumeCredits = 0;
  for (let perf of invoice.performances) {
    const play = plays[perf.playID];
    volumeCredits += Math.max(perf.audience - 30, 0);
    if ('comedy' === play.type) volumeCredits += Math.floor(perf.audience / 5);
  }
  return volumeCredits
}

function renderText(data) {
  let result = `Statement for ${data.customer}\n`;
  for (let perf of data.performances) {
    result += ` ${perf.name}: ${perf.thisAmount} (${perf.audience} seats)\n`;
  }

  result += `Amount owed is ${data.totalAmount}\n`;
  result += `You earned ${data.volumeCredits} credits \n`;
  return result;
}

function renderHtml(data) {
  let result = `<h1>Statement for ${data.customer}</h1>\n`
  result += '<table>\n'
  result += '<tr><th>play</th><th>seats</th><th>cost</th></tr>'
  for (let perf of data.performances) {
    result += ` <tr><td>${perf.name}</td><td>${perf.audience}</td><td>${perf.thisAmount}</td></tr>\n`;
  }
  result += '</table>\n'
  result += `<p>Amount owed is <em>${data.totalAmount}</em></p>\n`
  result += `<p>You earned <em>${data.volumeCredits}</em> credits</p>\n`
  return result;
}

function getData(invoice, plays){
    let data = {
        customer:'',
        totalAmount:'',
        volumeCredits:'',
        performances:[]
    }
    data.customer = invoice.customer
    data.totalAmount = usd(getTotalAmount(invoice, plays))
    data.volumeCredits = volumeCredits(invoice, plays)
    for (let perf of invoice.performances) {
        const play = plays[perf.playID];
        data.performances.push({
            name:play.name,
            thisAmount:usd(amountFor(perf, play)),
            audience:perf.audience
        });
    }
    return data
}

function statement(invoice, plays) {
  return renderText(getData(invoice, plays))
}

function statementHtml(invoice, plays) {
  return renderHtml(getData(invoice, plays));
}

module.exports = {
  statement,
  statementHtml
};
