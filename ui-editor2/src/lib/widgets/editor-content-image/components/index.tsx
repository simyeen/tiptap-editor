import {debounce} from 'lodash';
import {InfoIcon, TrashIcon} from 'lucide-react';
import {
  PointerEvent,
  SyntheticEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {Controlled as ControlledZoom} from 'react-medium-image-zoom';

import {cn} from '@shared/ui-theme';
import {type NodeViewProps, NodeViewWrapper} from '@tiptap/react';

import {Spinner} from '../../../shared/shadcn';
import {AppImageBubbleButton, AppImageBubbleWrapper} from '../../../shared/ui';
import {useDragResize} from '../hooks/use-drag-resize';
import {useImageActions} from '../hooks/use-image-actions';
import {ElementDimensions, ImageState} from '../type/share';
import {ImageBubble} from './image-bubble';
import {ImageLoading} from './image-loading';
import {ImageSizeHandler} from './image-size-handler';
import {ImageThumbnailButton} from './image-thumbnail-button';

export default function Components({editor, node, selected, updateAttributes}: NodeViewProps) {
  const MIN_HEIGHT = 200;
  const MIN_WIDTH = 200;

  const editable = editor.options.editable;
  const containerRef = useRef<HTMLDivElement>(null);
  const [targetMaxWidth, setTargetMaxWidth] = useState(Infinity);

  const imageExtension = editor.options.extensions.find((ext) => ext.name === 'image');
  const {onThumbnailUrl} = imageExtension?.options ?? {};

  // Attr from the custom-method of image and file-handler
  const {
    src: initialSrc,
    custom_thumbnail_url: initialCustomThumbnailUrl,
    width: initialWidth,
    height: initialHeight,
    align: initialAlign,
  } = node.attrs;

  const initSrc = typeof initialSrc === 'string' ? initialSrc : initialSrc.src;

  const [contentImageState, setContentImageState] = useState<ImageState>({
    src: initSrc,
    align: initialAlign,
    error: false,
    isZoomed: false,
    imageLoaded: false,
    isServerUploading: false,

    custom_thumbnail_url: initialCustomThumbnailUrl,
    naturalSize: {width: initialWidth, height: initialHeight},
  });

  const [activeResizeHandle, setActiveResizeHandle] = useState<'left' | 'right' | null>(null);

  const {isLink, onView, onDownload, onCopy, onCopyLink, onRemoveImg} = useImageActions({
    node,
    editor,
    src: contentImageState.src,
    onViewClick: (isZoomed) => setContentImageState((prev) => ({...prev, isZoomed})),
  });

  const {currentWidth, currentHeight, updateDimensions, initiateResize, isResizing} = useDragResize(
    {
      gridInterval: 0.1,
      minWidth: MIN_WIDTH,
      minHeight: MIN_HEIGHT,
      maxWidth: targetMaxWidth,
      contentWidth: contentImageState.naturalSize.width,
      contentHeight: contentImageState.naturalSize.height,
      initialWidth: initialWidth ?? contentImageState.naturalSize.width,
      initialHeight: initialHeight ?? contentImageState.naturalSize.height,
      onDimensionsChange: ({width, height}: ElementDimensions) => {
        updateAttributes({width, height});
      },
    }
  );

  const shouldMerge = useMemo(() => currentWidth <= 180, [currentWidth]);

  const _handleImageLoad = (ev: SyntheticEvent<HTMLImageElement>) => {
    const img = ev.target as HTMLImageElement;
    const newNaturalSize = {
      width: img.naturalWidth,
      height: img.naturalHeight,
    };

    updateAttributes({
      alt: img.alt,
      title: img.title,
      // width: img.width || newNaturalSize.width,
      // height: img.height || newNaturalSize.height,
    });

    setContentImageState((prev) => ({
      ...prev,
      imageLoaded: true,
      naturalSize: newNaturalSize,
    }));

    if (!initialWidth) {
      updateDimensions((state) => ({...state, width: newNaturalSize.width}));
    }
  };

  const _handleResizeEnd = useCallback(() => {
    setActiveResizeHandle(null);
  }, [setActiveResizeHandle]);

  useEffect(() => {
    // control image max size
    const adjustMaxWidth = debounce(() => {
      if (!containerRef.current) return;

      const containerWidth = parseFloat(
        getComputedStyle(containerRef.current).getPropertyValue('width')
      );

      setTargetMaxWidth(Math.max(containerWidth - 2, 0));
    }, 200);

    queueMicrotask(adjustMaxWidth);
    window.addEventListener('resize', adjustMaxWidth);

    return () => {
      window.removeEventListener('resize', adjustMaxWidth);
    };
  }, []);

  useEffect(() => {
    if (!isResizing) {
      _handleResizeEnd();
    }
  }, [isResizing, _handleResizeEnd]);

  // 이미지 정렬 속성 업데이트
  useEffect(() => {
    setTimeout(() => {
      updateAttributes({
        align: contentImageState.align,
        width: currentWidth,
        height: currentHeight,
      });
    }, 0);
  }, [contentImageState.align, currentWidth, currentHeight, updateAttributes]);

  const _handleImageError = () => {
    setContentImageState((prev) => ({...prev, error: true, imageLoaded: true}));
  };

  const _handleResizeStart =
    (direction: 'left' | 'right') => (event: PointerEvent<HTMLDivElement>) => {
      setActiveResizeHandle(direction);
      initiateResize(direction)(event);
    };

  return (
    <NodeViewWrapper
      ref={containerRef}
      data-drag-handle
      data-testid="node-view-wrapper"
      className="relative text-center leading-none"
    >
      <div
        className={cn('group/node-image relative rounded-md object-contain', {
          'mx-auto': node.attrs.align === 'center',
          'mr-auto': node.attrs.align === 'left',
          'ml-auto': node.attrs.align === 'right',
        })}
        style={{
          maxWidth: `min(${targetMaxWidth}px, 100%)`,
          width: node.attrs.width,
          aspectRatio: `${contentImageState.naturalSize.width} / ${contentImageState.naturalSize.height}`,
        }}
      >
        <div
          className={cn('relative flex h-full cursor-default flex-col items-center gap-2 rounded', {
            'outline outline-2 outline-offset-1 outline-primary':
              editable && (selected || isResizing),
          })}
        >
          <div className="h-full contain-paint">
            <div className="group relative h-full">
              {contentImageState.isServerUploading && !contentImageState.error && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <Spinner className="size-7" />
                </div>
              )}

              {contentImageState.error && (
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <InfoIcon className="size-8 text-destructive" />
                  <p className="mt-2 text-sm text-muted-foreground">Failed to load image</p>
                </div>
              )}

              <ControlledZoom
                isZoomed={contentImageState.isZoomed}
                onZoomChange={() => setContentImageState((prev) => ({...prev, isZoomed: false}))}
              >
                <img
                  className={cn('h-auto rounded object-contain transition-shadow', {
                    'opacity-0': !contentImageState.imageLoaded || contentImageState.error,
                  })}
                  style={{
                    maxWidth: `min(100%, ${targetMaxWidth}px)`,
                    minWidth: `${MIN_WIDTH}px`,
                  }}
                  id={node.attrs.id}
                  alt={node.attrs.alt || ''}
                  src={contentImageState.src}
                  title={node.attrs.title || ''}
                  width={node.attrs.width}
                  height={node.attrs.height}
                  onLoad={_handleImageLoad}
                  onError={_handleImageError}
                />

                {editable && (
                  <ImageThumbnailButton {...{editor, contentImageState, onThumbnailUrl}} />
                )}
              </ControlledZoom>
            </div>

            {contentImageState.isServerUploading && <ImageLoading />}

            {contentImageState.error && editable && (
              <AppImageBubbleWrapper>
                <AppImageBubbleButton
                  icon={<TrashIcon className="size-4" />}
                  tooltip="Remove image"
                  onClick={onRemoveImg}
                />
              </AppImageBubbleWrapper>
            )}

            {editable &&
              !isResizing &&
              !contentImageState.error &&
              !contentImageState.isServerUploading && (
                <ImageBubble
                  shouldMerge={shouldMerge}
                  isLink={isLink}
                  onView={onView}
                  onDownload={onDownload}
                  onCopy={onCopy}
                  onCopyLink={onCopyLink}
                  onAlignCenter={() =>
                    setContentImageState({...contentImageState, align: 'center'})
                  }
                  onAlignLeft={() => setContentImageState({...contentImageState, align: 'left'})}
                  onAlignRight={() => setContentImageState({...contentImageState, align: 'right'})}
                  editable={editable}
                />
              )}

            {editor.isEditable &&
              contentImageState.imageLoaded &&
              !contentImageState.error &&
              !contentImageState.isServerUploading && (
                <>
                  <ImageSizeHandler
                    onPointerDown={_handleResizeStart('left')}
                    className={cn('left-1', {
                      hidden:
                        contentImageState.align === 'left' ||
                        (isResizing && activeResizeHandle === 'right'),
                    })}
                    isResizing={isResizing && activeResizeHandle === 'left'}
                  />
                  <ImageSizeHandler
                    onPointerDown={_handleResizeStart('right')}
                    className={cn('right-1', {
                      hidden:
                        contentImageState.align === 'right' ||
                        (isResizing && activeResizeHandle === 'left'),
                    })}
                    isResizing={isResizing && activeResizeHandle === 'right'}
                  />
                </>
              )}
          </div>
        </div>
      </div>
    </NodeViewWrapper>
  );
}
