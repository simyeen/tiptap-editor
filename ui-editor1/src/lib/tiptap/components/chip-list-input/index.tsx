import {Input} from '@kt-web-dev-package/ui-core';
import {useEffect, useRef, useState} from 'react';

import useChipList from '../../hooks/use-chip-list';
import Chip from './chip';
import AutoResizeInput from './input';

export default function ChipListInput({setTags}: {setTags?: (tags: string[]) => void}) {
  // state props
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // hooks
  const {
    selectedItems,
    removeFromSelection,
    searchQuery,
    updateSearchParams,
    isDeleting,
    handleInputKeyDown,
  } = useChipList({setTags});

  // use effects
  useEffect(() => {
    if (isFocused) {
      const input = inputRef.current;

      if (!input) return;

      input.focus();
      const len = input.value.length;
      input.setSelectionRange(len, len);
    }
  }, [isFocused]);

  return (
    <section
      className="flex h-min max-h-min w-full grow flex-wrap items-center gap-2 rounded-b-[6px] border border-border bg-red-500 bg-transparent px-5 pb-5 pt-[16px] align-top"
      onFocus={() => {
        setIsFocused(true);
      }}
      onClick={() => {
        setIsFocused(true);
      }}
      onBlur={() => {
        setIsFocused(false);
      }}
      aria-label="insert-tag-section"
    >
      {selectedItems.map((profileData, index) => (
        <Chip
          className="hover:bg-chip-hover transition-colors"
          key={profileData}
          id={profileData}
          label={profileData}
          onDismiss={removeFromSelection}
          selected={isDeleting && index === selectedItems.length - 1}
        />
      ))}

      {(isFocused || !!searchQuery.length) && (
        <AutoResizeInput
          ref={inputRef}
          value={searchQuery}
          placeholder="#"
          onChange={updateSearchParams}
          onKeyUp={handleInputKeyDown}
        />
      )}

      {!isFocused && selectedItems.length === 0 && !searchQuery.length && (
        <Input
          className="text-sz-lg-medium placeholder:text-fg-500 text-fg-900 md:text-sz-lg-medium relative inline-flex flex-grow cursor-pointer items-center gap-1 rounded-full border-0 py-[5px] pl-2.5 pr-2 align-middle focus-visible:outline-none focus-visible:ring-0"
          placeholder="#태그를 입력해주세요."
          contentEditable={false}
        />
      )}
    </section>
  );
}
