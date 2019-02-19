export const DEFAULT_BREAKPOINTS = {
  xs: 'screen and (min-width: 0px) and (max-width: 599.99px)',
  sm: 'screen and (min-width: 600px) and (max-width: 959.99px)',
  md: 'screen and (min-width: 960px) and (max-width: 1279.99px)',
  lg: 'screen and (min-width: 1280px) and (max-width: 1919.99px)',
  xl: 'screen and (min-width: 1920px) and (max-width: 4999.99px)',
  'lt-sm': 'screen and (max-width: 599.99px)',
  'lt-md': 'screen and (max-width: 959.99px)',
  'lt-lg': 'screen and (max-width: 1279.99px)',
  'lt-xl': 'screen and (max-width: 1919.99px)',
  'gt-xs': 'screen and (min-width: 600px)',
  'gt-sm': 'screen and (min-width: 960px)',
  'gt-md': 'screen and (min-width: 1280px)',
  'gt-lg': 'screen and (min-width: 1920px)',
  h:
    '(max-width: 599.99px) and (orientation: portrait), ' +
    '(max-width: 959.99px) and (orientation: landscape)',
  t:
    '(min-width: 600px) and (max-width: 839.99px) and (orientation: portrait), ' +
    '(min-width: 960px) and (max-width: 1279.99px) and (orientation: landscape)',
  w:
    '(min-width: 840px) and (orientation: portrait), ' +
    '(min-width: 1280px) and (orientation: landscape)',

  'h-p': '(max-width: 599.99px) and (orientation: portrait)',
  't-p': '(min-width: 600px) and (max-width: 839.99px) and (orientation: portrait)',
  'w-p': '(min-width: 840px) and (orientation: portrait)',

  'h-l': '(max-width: 959.99px) and (orientation: landscape)',
  't-l': '(min-width: 960px) and (max-width: 1279.99px) and (orientation: landscape)',
  'w-l': '(min-width: 1280px) and (orientation: landscape)'
}
