import {
  FormEvent,
  HTMLAttributes,
  forwardRef,
  useCallback,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';

import {cn} from '@shared/ui-theme';

import {Button, Input, Label} from '../../../../shared/shadcn';

interface EditBlockProps extends HTMLAttributes<HTMLDivElement> {
  defaultUrl?: string;
  onSave: (url: string, text?: string, isNewTab?: boolean) => void;
}

export const ToolBlock = forwardRef<HTMLDivElement, EditBlockProps>(function VideoLinkEditBlock(
  {onSave, defaultUrl, className},
  ref
) {
  const formRef = useRef<HTMLDivElement>(null);
  const [url, setUrl] = useState(defaultUrl || '');

  const handleSave = useCallback(
    (e: FormEvent) => {
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

  useImperativeHandle(ref, () => formRef.current as HTMLDivElement);

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
});
