import { token_check } from './modules/constant-token-checker.js';
import { underConstruction } from './modules/alert.js';

token_check('#', '/index.html');

const main = document.querySelector('main');
underConstruction(main);
