import ConfiguredTextAlign from './align-extension';
import {ConfiguredFontColor, ConfiguredHighlight} from './color-extension';
import {ResetMarksOnEnter, UnsetAllMarks} from './custom-create-extension';
import {
  ExtendedCodeBlockLowlight,
  ExtendedHorizontalRule,
  ExtendedSubscript,
  ExtendedSuperscript,
} from './extended-extension';
import {ConfiguredHeading} from './heading-extension';
import {ConfiguredFileHandler, ConfiguredImage} from './image-extension';
import {ConfiguredPlaceholder} from './placeholder-extension';
import {ConfiguredStarterKit} from './starterkit-extension';
import {ConfiguredTable, TableCell, TableHeader, TableRow} from './table-extension';
import {ConfiguredTaskItem, ConfiguredTaskLisk} from './task-extension';
import {TextStyle, Typography, Underline} from './tiptap-default';
import {ConfiguredLink} from './url-extension';
import {ConfiguredYoutube} from './video-extension';

interface ExtensionConfigureProps {
  placeholder: string;

  thumbnailUrl?: string;
  onThumbnailUrlChange?: (newThumbnailUrl: string) => void;
  handleServerImageUpload?: (file: File) => Promise<Record<string, string>[]>;
}

export const extensionConfigure = ({
  placeholder,
  thumbnailUrl,
  onThumbnailUrlChange,
  handleServerImageUpload,
}: ExtensionConfigureProps) => [
  // StarterKit
  ConfiguredStarterKit(),

  // Default Extension
  TextStyle,
  Typography,
  Underline,

  // Custom Extension
  UnsetAllMarks,
  ResetMarksOnEnter,

  // Custom Extend
  ExtendedSubscript,
  ExtendedSuperscript,
  ExtendedHorizontalRule,
  ExtendedCodeBlockLowlight,

  // Table
  TableRow,
  TableCell,
  TableHeader,
  ConfiguredTable(),

  ConfiguredLink(),

  ConfiguredHeading(),

  ConfiguredYoutube(),

  ConfiguredTextAlign(),

  ConfiguredTaskItem(),
  ConfiguredTaskLisk(),

  ConfiguredFontColor(),
  ConfiguredHighlight(),

  ConfiguredPlaceholder(placeholder),

  ConfiguredFileHandler({handleServerImageUpload}),
  ConfiguredImage({thumbnailUrl, onThumbnailUrlChange}),
];
