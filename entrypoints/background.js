import {classifyAll} from '@/components/benchmark';

export default defineBackground(() => {
  browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message === 'benchmark1') {
      console.log('RCV message for benchmark1 in background');
      (async () => {
        await classifyAll();
        console.log('FINISHED inside the background');
      })();
    }
  });
});