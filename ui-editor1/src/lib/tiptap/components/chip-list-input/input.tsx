import {Input, InputProps, Label} from '@kt-web-dev-package/ui-core';
import React, {forwardRef, useEffect, useRef, useState} from 'react';

interface AutoResizeInputProps extends Omit<InputProps, 'value'> {
  value: string;
}

const AutoResizeInput = forwardRef<HTMLInputElement, AutoResizeInputProps>(
  ({placeholder, value, onChange, onKeyUp}: AutoResizeInputProps, ref) => {
    const [width, setWidth] = useState(placeholder?.length || 1);
    const spanRef = useRef<HTMLLabelElement>(null);

    const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      updateWidth(value || placeholder || '');
    };

    const updateWidth = (text: string) => {
      if (spanRef.current) {
        spanRef.current.textContent = text;
        setWidth(spanRef.current.offsetWidth + 10);
      }
    };

    useEffect(() => {
      updateWidth(value || placeholder || '');
    }, [value, placeholder]);

    return (
      <div className="bg-fg-200 text-sz-lg-bold md:text-sz-lg-bold text-fg-700 relative flex items-center rounded-full py-[5px] pl-2.5 pr-2">
        <Label
          htmlFor="tag-input"
          ref={spanRef}
          className="text-sz-lg-bold md:text-sz-lg-bold invisible absolute left-0 top-0 whitespace-pre"
        />
        <span className="text-sz-lg-bold md:text-sz-lg-bold align-middle">#</span>
        <Input
          ref={ref}
          id="tag-input"
          type="text"
          autoFocus
          maxLength={20}
          value={value}
          onKeyUp={onKeyUp}
          onChange={onChange}
          placeholder={placeholder}
          onInput={handleInput}
          style={{width}}
          className="text-sz-lg-bold md:text-sz-lg-bold relative inline-flex h-7 w-auto flex-grow cursor-pointer border-0 border-transparent bg-transparent p-0 align-middle placeholder:text-transparent focus-visible:outline-none focus-visible:ring-0"
        />
      </div>
    );
  }
);

AutoResizeInput.displayName = 'AutoResizeInput';

export default AutoResizeInput;
