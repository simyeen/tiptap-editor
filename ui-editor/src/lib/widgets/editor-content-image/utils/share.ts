import {RefObject} from 'react';

import {UploadReturnType} from '../../../shared/types';
import {randomId} from '../../../shared/utils';

export const _normalizeUploadResponse = (res: UploadReturnType) => ({
  src: typeof res === 'string' ? res : res.src,
  id: typeof res === 'string' ? randomId() : res.id,
});
