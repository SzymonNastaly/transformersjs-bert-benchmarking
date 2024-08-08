import {defineConfig} from 'wxt';

// See https://wxt.dev/api/config.html
export default defineConfig({
    manifest: {
        name: 'BERT Benchmark',
        description: 'Benchmarking BERT on Transformers.js',
        version: '0.0.1',
        content_security_policy: {
            extension_pages: 'script-src \'self\' \'wasm-unsafe-eval\'; object-src \'self\';',
        },
    }
});
