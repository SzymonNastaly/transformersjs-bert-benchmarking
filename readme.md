# BERT Model Benchmark in Chrome Extension

## Why?

Benchmarking a BERT model running in a Chrome extension using Transformers.js. 
It's part of my thesis work on CookieAudit.

## Key Features

- Uses Transformers.js for in-browser inference
- Tests a BERT model for text classification
- Processes 1187 sentences from real cookie notices
- Includes a warm-up phase for more accurate timing
- Runs in a Chrome extension background script

## How it works

1. Initializes the `PurposePipelineSingleton`
2. Loads sentences from `notice_sentences.txt`
3. Warms up the model (30 iterations)
4. Times the classification of each sentence
5. Calculates and logs the average execution time

## How to Run it

1. Clone the repo
2. Run `npm install`
3. Build with `wxt build -b chrome --mv3`
4. Load as an unpacked extension in Chrome
5. Click "Start Benchmark 1" in the extension popup

## Results

- 209ms average execution time per sentence
