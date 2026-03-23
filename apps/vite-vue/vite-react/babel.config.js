// babel.config.js

// ESM Module
export default {
  presets: [
    '@babel/preset-env',       // Transpile modern JS
    '@babel/preset-react',     // Transform JSX
    '@babel/preset-typescript' // Transform TS/TSX
  ]
};

// ['@babel/preset-react', {
    //   runtime: 'automatic'  // <-- enables new JSX transform, no need to import React on each pages
    // }],

// CommonJS
// module.exports = {
//   presets: [
//     '@babel/preset-env',
//     '@babel/preset-react',        // Enables JSX
//     '@babel/preset-typescript',   // Enables TypeScript
//   ],
// };