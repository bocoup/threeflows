import { type, name, description } from './meta';
export { type, name, description };
export { default as Display } from './Display';
export { default as Editor } from './Editor';
export { default as Card } from './Card';
export const defaultValue = ({ responseId }) => ({
  header: '',
  id: '',
  buttons: [
    {
      display: '',
      value: ''
    }
  ],
  persona: null,
  recallId: '',
  required: true,
  responseId,
  timeout: 0,
  type
});
