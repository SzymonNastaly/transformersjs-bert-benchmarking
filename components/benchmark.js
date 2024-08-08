import noticeContent from '@/assets/notice_sentences.txt?raw';
import {env, pipeline} from '@xenova/transformers';

async function purposeProgress(args) {
  if (args.status !== 'progress') return;
  console.log(`progress: ${Math.trunc(args.progress)}`);
}

class PurposePipelineSingleton {
  static instance = null;

  /**
   * @param quantized
   * @return {Promise<function(string): Promise<Array<{label: string}>>>}
   */
  static async getInstance(quantized = false) {
    if (this.instance === null) {
      this.instance = pipeline('text-classification',
          'snastal/purpose_detection_model', {
            quantized: quantized,
          });
    }
    return this.instance;
  }
}

/**
 * Processes the imported text content and returns an array of sentences.
 * Each line in the text is considered a separate sentence.
 * Empty lines are ignored.
 *
 * @returns {string[]} An array of sentences, where each sentence is a string.
 */
export function getSentences() {
  // Split the content into an array by newline
  const sentences = noticeContent.split('\n');

  // Remove any empty lines
  return sentences.filter(sentence => sentence.trim() !== '');
}

export async function classifyAll() {
  // configuration and initialization
  env.allowLocalModels = false;
  env.backends.onnx.wasm.numThreads = 1;
  const purposeClassifier = await PurposePipelineSingleton.getInstance(false);
  console.log('Purpose classifier received.');
  const sentences = getSentences();
  console.log("sentences.length = ", sentences.length);

  // warm-up
  for (let i=0; i<30; i++) {
    await purposeClassifier(sentences[i]);
  }

  /** @type {number[]} */
  const times = [];
  for (const sentence of sentences) {
    const start = performance.now();
    await purposeClassifier(sentence);
    const end = performance.now();
    times.push(end - start);
  }

  const average = times.reduce((sum, time) => sum + time, 0) / times.length;
  console.log(`Average execution time: ${average.toFixed(6)} ms`);
}

export async function setupBenchmark(element, name) {
  element.addEventListener('click', () => browser.runtime.sendMessage(name));
}
