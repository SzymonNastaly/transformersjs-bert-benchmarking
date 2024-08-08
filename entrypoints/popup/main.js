import './style.css';
import {setupBenchmark} from '@/components/benchmark.js';

document.querySelector('#app').innerHTML = `
  <div>
    <h1>Benchmark</h1>
    <div class="card">
      <button id="benchmark1" type="button">Start Benchmark 1</button>
    </div>
  </div>
`;

setupBenchmark(document.querySelector('#benchmark1'), 'benchmark1');
