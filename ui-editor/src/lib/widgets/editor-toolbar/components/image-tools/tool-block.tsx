import {ChangeEvent, FormEvent, useCallback, useRef, useState} from 'react';

import type {Editor} from '@tiptap/react';

import {Button, Input, Label} from '../../../../shared/shadcn';
import {filterFiles, randomId} from '../../../../shared/utils';

interface ImageEditBlockProps {
  editor: Editor;
  close: () => void;
  handleServerImageUpload?: (file: File) => Promise<Record<string, string>[]>;
}

const baseOption = {
  allowBase64: true,
  allowedMimeTypes: ['image/*'],
  maxFileSize: 5 * 1024 * 1024,
};

export default function ToolBlock({editor, close, handleServerImageUpload}: ImageEditBlockProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [link, setLink] = useState('');

  // file upload
  const handleFile = useCallback(
    async (e: ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      if (!files?.length) return;

      const imgFile = files[0];

      if (imgFile.size > 50 * 1024 * 1024) {
        alert('파일 크기는 최대 50MB까지 허용됩니다.');
        return;
      }

      if (handleServerImageUpload) {
        try {
          const data = await handleServerImageUpload(imgFile);

          if (data.length) {
            const imgFile = data[0];

            editor.commands.addImageWithThumb({
              id: imgFile.id,
              src: imgFile.file_url,
              custom_thumbnail_url: imgFile.thumbnail_url,
            });
          }
        } catch {
          /* empty */
        }
      }

      close();
    },
    [editor, close, handleServerImageUpload]
  );

  // link upload
  const handleSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      e.stopPropagation();

      const [validFiles, errors] = filterFiles([{src: link}], baseOption);

      if (errors.length > 0 || !validFiles.length) {
        alert('적절한 형식의 파일이 아닙니다.');
        return;
      }

      if (validFiles.length > 0 && handleServerImageUpload) {
        const cdnPatterns = [
          {
            regex:
              /https:\/\/pe-cdn-az01-dev-kttech-01-asd6a0aagkhwefcv\.a02\.azurefd\.net\/images\//i,
            thumbPrefix:
              'https://pe-cdn-az01-dev-kttech-01-asd6a0aagkhwefcv.a02.azurefd.net/images/thumb_',
          },
          {
            regex:
              /https:\/\/pe-cdn-az01-prd-kttech-01-cqbsbha3ebaxf5bj\.a01\.azurefd\.net\/images\//i,
            thumbPrefix:
              'https://pe-cdn-az01-prd-kttech-01-cqbsbha3ebaxf5bj.a01.azurefd.net/images/thumb_',
          },
          {
            regex: /https:\/\/innovate-inside\.kt\.co\.kr\/images\//i,
            thumbPrefix: 'https://innovate-inside.kt.co.kr/images/thumb_',
          },
        ];

        validFiles.forEach(async (file) => {
          const matchedPattern = cdnPatterns.find((pattern) => file.src.match(pattern.regex));

          const customThumbnailUrl = matchedPattern
            ? file.src.match(/\/thumb_/)
              ? file.src
              : file.src.replace(matchedPattern.regex, matchedPattern.thumbPrefix)
            : file.src;

          editor.commands.addImageWithThumb({
            id: randomId(),
            src: file.src,
            custom_thumbnail_url: customThumbnailUrl,
          });
        });

        close();
      }
    },
    [editor, link, close, handleServerImageUpload]
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-1">
        <Label htmlFor="image-link">이미지 링크 입력</Label>
        <div className="flex">
          <Input
            id="image-link"
            type="url"
            required
            placeholder="https://example.com"
            value={link}
            className="grow"
            onChange={(e: ChangeEvent<HTMLInputElement>) => setLink(e.target.value)}
          />

          <Button type="submit" className="ml-2">
            제출
          </Button>
        </div>
      </div>

      <Button
        type="button"
        className="w-full"
        onClick={() => {
          fileInputRef.current?.click();
        }}
      >
        파일 업로드
      </Button>

      <input
        className="hidden"
        type="file"
        accept=".jpg,.jpeg,.png,.bmg,.gif"
        ref={fileInputRef}
        multiple
        onChange={handleFile}
      />
    </form>
  );
}
