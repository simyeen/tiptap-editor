import * as React from 'react';

import {cn} from '@shared/ui-theme';

import {Button, Input, Label, Switch} from '../shadcn';

interface LinkEditorProps extends React.HTMLAttributes<HTMLDivElement> {
  defaultUrl?: string;
  defaultText?: string;
  defaultIsNewTab?: boolean;
  onSave: (url: string, text?: string, isNewTab?: boolean) => void;
}

export const AppLinkEditBlock = React.forwardRef<HTMLDivElement, LinkEditorProps>(
  ({onSave, defaultIsNewTab, defaultUrl, defaultText, className}, ref) => {
    const formRef = React.useRef<HTMLDivElement>(null);
    const [url, setUrl] = React.useState(defaultUrl || '');
    const [text, setText] = React.useState(defaultText || '');
    const [isNewTab, setIsNewTab] = React.useState(defaultIsNewTab || false);

    const handleSave = React.useCallback(
      (e: React.FormEvent) => {
        e.preventDefault();
        if (formRef.current) {
          const isValid = Array.from(formRef.current.querySelectorAll('input')).every((input) =>
            input.checkValidity()
          );

          if (isValid) {
            onSave(url, text, isNewTab);
          } else {
            formRef.current.querySelectorAll('input').forEach((input) => {
              if (!input.checkValidity()) {
                input.reportValidity();
              }
            });
          }
        }
      },
      [onSave, url, text, isNewTab]
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

          <div className="space-y-1">
            <Label>표시 텍스트 (선택)</Label>
            <Input
              type="text"
              placeholder="표시 텍스트를 입력하세요"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </div>

          <div className="flex items-center space-x-2">
            <Label>새로운 tab에서 열기</Label>
            <Switch checked={isNewTab} onCheckedChange={setIsNewTab} />
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

export default AppLinkEditBlock;
