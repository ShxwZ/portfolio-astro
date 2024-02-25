export { renderers } from '../renderers.mjs';

const page = () => import('./pages/generic_L1FW2COi.mjs').then(n => n.g);

export { page };
