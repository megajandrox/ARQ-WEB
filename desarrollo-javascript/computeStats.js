const statsCalculator = {
    values: [],
   
    add(value) {
      if (typeof value !== 'number' || isNaN(value)) {
        throw new Error('Solo se aceptan valores numéricos');
      }
      this.values.push(value);
      let stats = this.calculate();
      updateUI(stats);
      return stats;
    },
   
    calculate() {
      if (this.values.length === 0) {
        return {
          values: [],
          sum: 0,
          count: 0,
          average: 0,
          max: 0,
          min: 0
        };
      }
      
      const sum = this.values.reduce((acc, val) => acc + val, 0);
      const count = this.values.length;
      const average = sum / count;
      const max = Math.max(...this.values);
      const min = Math.min(...this.values);
      
      return {
        values: [...this.values],
        sum: parseFloat(sum.toFixed(2)),
        count,
        average: parseFloat(average.toFixed(2)),
        max,
        min
      };
    },
    
    reset() {
      this.values = [];
      return this.calculate();
    }
};

function registerValue() {
    let element = document.getElementById('valueInput');
    const value = parseFloat(element.value);
    if (isNaN(value) || value < 0) {
        alert('Invalid input! Please enter a valid number.');
        return;
    }
    const stats = statsCalculator.add(value);
    localStorage.setItem('stats', JSON.stringify(stats));
}

function reset() {
    let stats = statsCalculator.reset();
    localStorage.removeItem('stats');
    updateUI(stats);
}

const countElement = document.getElementById('Cantidad');
const averageElement = document.getElementById('Promedio');
const maxElement = document.getElementById('Mayor');
const minElement = document.getElementById('Menor');

function updateUI(stats) {
    countElement.value = stats.count;
    averageElement.value = stats.average;
    maxElement.value = stats.max;
    minElement.value = stats.min;
}

window.onload = function() {
    const storedStats = JSON.parse(localStorage.getItem('stats'));
    if (storedStats) {
        statsCalculator.values = storedStats.values;
        updateUI(statsCalculator.calculate());
    }
}