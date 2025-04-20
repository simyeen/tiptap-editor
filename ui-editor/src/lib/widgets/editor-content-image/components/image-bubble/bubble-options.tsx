import {
  AlignCenterIcon,
  AlignLeftIcon,
  AlignRightIcon,
  ClipboardCopyIcon,
  DownloadIcon,
  LinkIcon,
  Maximize2Icon,
} from 'lucide-react';

type BubbleKey =
  | 'onView'
  | 'onDownload'
  | 'onCopy'
  | 'onCopyLink'
  | 'onAlignLeft'
  | 'onAlignCenter'
  | 'onAlignRight';

export const BubbleOptions: Array<{
  key: BubbleKey;
  icon: React.ReactNode;
  tooltip: string;
  isLink?: boolean;
  editable?: boolean;
}> = [
  // {key: 'onView', icon: <Maximize2Icon className="size-4" />, tooltip: '사진 보기'},
  // {key: 'onDownload', icon: <DownloadIcon className="size-4" />, tooltip: '사진 다운로드'},
  // {
  //   key: 'onCopy',
  //   icon: <ClipboardCopyIcon className="size-4" />,
  //   tooltip: '클립보드에 사진복사',
  // },
  // {
  //   key: 'onCopyLink',
  //   icon: <LinkIcon className="size-4" />,
  //   tooltip: '사진 링크 복사',
  //   isLink: true,
  // },
  {
    key: 'onAlignLeft',
    icon: <AlignLeftIcon className="size-4" />,
    tooltip: '왼쪽 정렬',
    editable: true,
  },
  {
    key: 'onAlignCenter',
    icon: <AlignCenterIcon className="size-4" />,
    tooltip: '가운데 정렬',
    editable: true,
  },
  {
    key: 'onAlignRight',
    icon: <AlignRightIcon className="size-4" />,
    tooltip: '오른쪽 정렬',
    editable: true,
  },
];
