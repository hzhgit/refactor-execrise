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

function renderText(invoice, plays){
  let result = `Statement for ${invoice.customer}\n`;
  for (let perf of invoice.performances) {
    const play = plays[perf.playID];
    result += ` ${play.name}: ${usd(amountFor(perf, play))} (${perf.audience} seats)\n`;
  }

  result += `Amount owed is ${usd(getTotalAmount(invoice, plays))}\n`;
  result += `You earned ${volumeCredits(invoice, plays)} credits \n`;
  return result;
}

function renderHtml(){
  return null;
}

function statement(invoice, plays) {
  return renderText(invoice, plays)
}

function statementHtml(invoice, plays) {
  return renderHtml(invoice, plays);
}

module.exports = {
  statement,
  statementHtml
};
