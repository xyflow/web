import { type PropsTableProps } from 'xy-shared';

export const signature: PropsTableProps = {
  props: [
    {
      name: 'keyCode',
      type: 'string | string[] | null',
      description: `A string can be used to represent both a single key code like
      "Space" or a combination of keys like "Meta+s". If you pass in an array of
      strings, multiple key codes can be used to toggle the hook.`,
    },
    { name: 'options', type: 'object' },
    {
      name: 'options.target',
      type: 'Window | Document | HTMLElement | ShadowRoot | null',
      description: `You may want to listen to key presses on a specific element.
      This field lets you configure that!`,
    },
    {
      name: 'options.actInsideInputWithModifier',
      type: 'boolean',
      description: `You can use this flag to prevent triggering the key press hook when an input field is focused.`,
      default: 'true',
    },
    { name: 'Returns' },
    { name: '', type: 'boolean' },
  ],
};
