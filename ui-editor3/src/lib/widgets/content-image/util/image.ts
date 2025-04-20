import {AlignType, JustifyType} from '../type';

// default center
export const alignToJustify = (align: AlignType): JustifyType => {
  return align === 'left' ? 'start' : align === 'right' ? 'end' : 'center';
};
