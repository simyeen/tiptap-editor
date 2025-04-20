import '@testing-library/jest-dom';
import {render, screen} from '@testing-library/react';

import {PostEditor} from './index';

describe('ui-editor', () => {
  it('should render', () => {
    const content = 'Post Editor';

    render(<PostEditor editable={false} content={content} />);
    expect(screen.getByText(content)).toBeInTheDocument();
  });
});
