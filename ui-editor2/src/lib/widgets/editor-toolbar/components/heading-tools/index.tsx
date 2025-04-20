import type {VariantProps} from 'class-variance-authority';
import {
  CheckIcon,
  ChevronDownIcon,
  Heading1Icon,
  Heading2Icon,
  Heading3Icon,
  Heading4Icon,
  Heading5Icon,
  Heading6Icon,
} from 'lucide-react';

import {cn} from '@shared/ui-theme';
import {type Editor, useEditorState} from '@tiptap/react';

import {
  DropdownMenu,
  DropdownMenuContent as MenuContent,
  DropdownMenuItem as MenuItem,
  DropdownMenuTrigger as MenuTrigger,
  type toggleVariants,
} from '../../../../shared/shadcn';
import {AppToolbarButton} from '../../../../shared/ui';
import {TextStyle} from '../../types/share';

interface SectionHeadingProps extends VariantProps<typeof toggleVariants> {
  editor: Editor;
}

export default function HeadingTools({editor, size, variant}: SectionHeadingProps) {
  const {
    isActiveHeading,
    isActiveParagraph,
    isActiveH1,
    isActiveH2,
    isActiveH3,
    isActiveH4,
    isActiveH5,
    isActiveH6,
    isActiveCodeBlock,
  } = useEditorState({
    editor,
    selector: ({editor}: {editor: Editor}) => ({
      isActiveHeading: editor.isActive('heading'),
      isActiveH1: editor.isActive('heading', {level: 1}),
      isActiveH2: editor.isActive('heading', {level: 2}),
      isActiveH3: editor.isActive('heading', {level: 3}),
      isActiveH4: editor.isActive('heading', {level: 4}),
      isActiveH5: editor.isActive('heading', {level: 5}),
      isActiveH6: editor.isActive('heading', {level: 6}),
      isActiveParagraph: editor.isActive('paragraph'),
      isActiveCodeBlock: editor.isActive('codeBlock'),
    }),
  });

  const headingOptions: TextStyle[] = [
    {
      label: '일반 텍스트',
      icon: <span className="text-fg-system">일반 텍스트</span>,
      action: () => editor.chain().focus().setParagraph().run(),
      isActive: isActiveParagraph,
      shortcuts: ['mod', 'alt', '0'],
      element: 'span',
      className: 'grow',
    },
    {
      label: 'H1',
      icon: <Heading1Icon />,
      action: () => editor.chain().focus().toggleHeading({level: 1}).run(),
      isActive: isActiveH1,
      shortcuts: ['mod', 'alt', '1'],
      element: 'h1',
      level: 1,
      className: 'm-0 grow text-2xl font-extrabold',
    },
    {
      label: 'H2',
      icon: <Heading2Icon />,
      action: () => editor.chain().focus().toggleHeading({level: 2}).run(),
      isActive: isActiveH2,
      shortcuts: ['mod', 'alt', '2'],
      element: 'h2',
      level: 2,
      className: 'm-0 grow text-xl font-bold',
    },
    {
      label: 'H3',
      icon: <Heading3Icon />,
      action: () => editor.chain().focus().toggleHeading({level: 3}).run(),
      isActive: isActiveH3,
      shortcuts: ['mod', 'alt', '3'],
      element: 'h3',
      level: 3,
      className: 'm-0 grow text-lg font-semibold',
    },
    {
      label: 'H4',
      icon: <Heading4Icon />,
      action: () => editor.chain().focus().toggleHeading({level: 4}).run(),
      isActive: isActiveH4,
      shortcuts: ['mod', 'alt', '4'],
      element: 'h4',
      level: 4,
      className: 'm-0 grow text-base font-semibold',
    },
    {
      label: 'H5',
      icon: <Heading5Icon />,
      action: () => editor.chain().focus().toggleHeading({level: 5}).run(),
      isActive: isActiveH5,
      shortcuts: ['mod', 'alt', '5'],
      element: 'h5',
      level: 5,
      className: 'm-0 grow text-sm font-normal',
    },
    {
      label: 'H6',
      icon: <Heading6Icon />,
      action: () => editor.chain().focus().toggleHeading({level: 6}).run(),
      isActive: isActiveH6,
      shortcuts: ['mod', 'alt', '6'],
      element: 'h6',
      level: 6,
      className: 'm-0 grow text-sm font-normal',
    },
  ];

  return (
    <DropdownMenu>
      <MenuTrigger asChild>
        <AppToolbarButton
          tooltip="글자 서식"
          aria-label="Text styles"
          pressed={isActiveHeading}
          className="mr-3 flex min-w-[85px] justify-between gap-0"
          disabled={isActiveCodeBlock}
          size={size}
          variant={variant}
        >
          {headingOptions.filter(({isActive}) => isActive).at(0)?.icon || '속성 없음'}
          <ChevronDownIcon className="stroke-fg-600" />
        </AppToolbarButton>
      </MenuTrigger>

      <MenuContent align="start" className="w-full min-w-min">
        {headingOptions.map(({label, element: Element, className, isActive, action}) => (
          <MenuItem
            key={label}
            onClick={action}
            className={cn('flex flex-row items-center justify-between gap-4 hover:bg-fg-100', {
              'text-fg-point': isActive,
            })}
            aria-label={label}
          >
            <Element className={cn(className)}>{label}</Element>
            {isActive && <CheckIcon className="size-5 text-fg-point" />}
            {/* <ShortcutKey keys={shortcuts} /> */}
          </MenuItem>
        ))}
      </MenuContent>
    </DropdownMenu>
  );
}
