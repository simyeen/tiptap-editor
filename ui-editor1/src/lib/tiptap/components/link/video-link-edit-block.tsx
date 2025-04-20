import {Button, Input, Label, Switch, cn} from '@kt-web-dev-package/ui-core';
import * as React from 'react';

export interface VideoLinkEditorProps extends React.HTMLAttributes<HTMLDivElement> {
  defaultUrl?: string;
  onSave: (url: string, text?: string, isNewTab?: boolean) => void;
}

export const VideoLinkEditBlock = React.forwardRef<HTMLDivElement, VideoLinkEditorProps>(
  function VideoLinkEditBlock({onSave, defaultUrl, className}, ref) {
    const formRef = React.useRef<HTMLDivElement>(null);
    const [url, setUrl] = React.useState(
      defaultUrl ||
        'https://www.youtube.com/watch?v=d7mAoxDcdNo&t=1s&ab_channel=KT-%EC%BC%80%EC%9D%B4%ED%8B%B0'
    );

    const handleSave = React.useCallback(
      (e: React.FormEvent) => {
        e.preventDefault();
        if (formRef.current) {
          const isValid = Array.from(formRef.current.querySelectorAll('input')).every((input) =>
            input.checkValidity()
          );

          if (isValid) {
            onSave(url);
          } else {
            formRef.current.querySelectorAll('input').forEach((input) => {
              if (!input.checkValidity()) {
                input.reportValidity();
              }
            });
          }
        }
      },
      [onSave, url]
    );

    React.useImperativeHandle(ref, () => formRef.current as HTMLDivElement);

    return (
      <div ref={formRef}>
        <div className={cn('space-y-4', className)}>
          <div className="space-y-1">
            <Label>URL</Label>
            <Input
              type="url"
              required
              placeholder="URL을 입력하세요"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
          </div>

          <div className="flex justify-end space-x-2">
            <Button type="button" onClick={handleSave}>
              저장
            </Button>
          </div>
        </div>
      </div>
    );
  }
);

VideoLinkEditBlock.displayName = 'VideoLinkEditBlock';

export default VideoLinkEditBlock;
