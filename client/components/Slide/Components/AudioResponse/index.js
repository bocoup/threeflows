import { type } from './type';
export { type };
export const defaultValue = () => ({
    type,
    prompt: 'Audio Recording Prompt'
});

export { default as Display } from './Display';
export { default as Editor } from './Editor';
export { default as Card } from './Card';
