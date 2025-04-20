import {Youtube} from '@tiptap/extension-youtube';
import {mergeAttributes} from '@tiptap/react';

import {getEmbedUrlFromYoutubeUrl} from '../../../../shared/utils';

export const ExtendedYoutube = Youtube.extend({
  addAttributes() {
    return {
      width: {
        default: '100%',
      },
      src: {
        default: null,
      },
      start: {
        default: 0,
      },
      class: {
        default: 'aspect-video',
      },
    };
  },

  renderHTML({HTMLAttributes}) {
    const embedUrl = getEmbedUrlFromYoutubeUrl({
      url: HTMLAttributes.src,
      allowFullscreen: this.options.allowFullscreen,
      autoplay: this.options.autoplay,
      ccLanguage: this.options.ccLanguage,
      ccLoadPolicy: this.options.ccLoadPolicy,
      controls: this.options.controls,
      disableKBcontrols: this.options.disableKBcontrols,
      enableIFrameApi: this.options.enableIFrameApi,
      endTime: this.options.endTime,
      interfaceLanguage: this.options.interfaceLanguage,
      ivLoadPolicy: this.options.ivLoadPolicy,
      loop: this.options.loop,
      modestBranding: this.options.modestBranding,
      nocookie: this.options.nocookie,
      origin: this.options.origin,
      playlist: this.options.playlist,
      progressBarColor: this.options.progressBarColor,
      startAt: HTMLAttributes.start || 0,
    });

    HTMLAttributes.src = embedUrl;

    return this.editor?.isEditable
      ? [
          'div',
          {'data-youtube-video': '', draggable: this.editor?.isEditable},
          [
            'iframe',
            mergeAttributes(
              this.options.HTMLAttributes,
              {
                width: this.options.width,
                height: this.options.height,
                allowfullscreen: this.options.allowFullscreen,
                autoplay: this.options.autoplay,
                ccLanguage: this.options.ccLanguage,
                ccLoadPolicy: this.options.ccLoadPolicy,
                disableKBcontrols: this.options.disableKBcontrols,
                enableIFrameApi: this.options.enableIFrameApi,
                endTime: this.options.endTime,
                interfaceLanguage: this.options.interfaceLanguage,
                ivLoadPolicy: this.options.ivLoadPolicy,
                loop: this.options.loop,
                modestBranding: this.options.modestBranding,
                origin: this.options.origin,
                playlist: this.options.playlist,
                progressBarColor: this.options.progressBarColor,
              },
              HTMLAttributes
            ),
          ],
        ]
      : [
          'iframe',
          mergeAttributes(
            this.options.HTMLAttributes,
            {
              width: this.options.width,
              height: this.options.height,
              allowfullscreen: this.options.allowFullscreen,
              autoplay: this.options.autoplay,
              ccLanguage: this.options.ccLanguage,
              ccLoadPolicy: this.options.ccLoadPolicy,
              disableKBcontrols: this.options.disableKBcontrols,
              enableIFrameApi: this.options.enableIFrameApi,
              endTime: this.options.endTime,
              interfaceLanguage: this.options.interfaceLanguage,
              ivLoadPolicy: this.options.ivLoadPolicy,
              loop: this.options.loop,
              modestBranding: this.options.modestBranding,
              origin: this.options.origin,
              playlist: this.options.playlist,
              progressBarColor: this.options.progressBarColor,
            },
            HTMLAttributes
          ),
        ];
  },
});
