import React, { useRef, useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/core';

type HTMLInputProps = React.InputHTMLAttributes<HTMLInputElement>;
type Props = HTMLInputProps & {
  id?: string;
  size?: string;
  defaultValue?: string;
  invalid?: boolean;
  fullWidth?: boolean;
  focusBorderColor?: string;
  'aria-describedby'?: string;
  'aria-label'?: string;
};

type InputContainerProps = React.HtmlHTMLAttributes<HTMLDivElement> & {
  fixedWidth?: number;
};

const InputContainer = styled.div<InputContainerProps>`
  border: 1px solid #d9d9d9;
  border-radius: 2px;
  margin: 0 8px 8px 0;
  padding: 4px 11px;
  font-size: inherit;
  min-height: 19.2px;
  position: relative;
  width: ${props => `${props.fixedWidth}px`};
`;

type OverflowContainerProps = React.HtmlHTMLAttributes<HTMLDivElement> & {
  isOverflow?: boolean;
};

const OverflowContainer = styled.div<OverflowContainerProps>`
  ${props =>
    props.isOverflow &&
    css`
      position: absolute;
      padding: 4px 11px;
      left: 0;
      top: 0;
      height: 19.2px;
      box-shadow: 0 2px 6px 2px rgba(60, 64, 67, 0.15);
      background: #fff;
      z-index: 999;
      .sizer {
        display: contents;
      }
    `}
  display: inline-block;
  input {
    width: 100%;
    font-family: inherit;
    font-size: inherit;
    padding: 0;
    border: none;
    outline: none;
  }
  .sizer {
    height: 0;
    overflow: scroll;
    visibility: hidden;
    white-space: pre;
    position: absolute;
  }
`;

const OverflowInput: React.FC<Props> = props => {
  const { readOnly, required, disabled, invalid, ...rest } = props;

  const inputRef = useRef<HTMLInputElement>(null);
  const parentRef = useRef<HTMLDivElement>(null);
  const sizerRef = useRef<HTMLDivElement>(null);
  const [overflow, setOverflow] = useState(false);

  const sizerValue = [props.defaultValue, props.value, ''].reduce(
    (previousValue, currentValue) => {
      if (previousValue !== null && previousValue !== undefined) {
        return previousValue;
      }
      return currentValue;
    }
  );

  useEffect(() => {
    checkOverflow();
  }, [props.value]);

  const checkOverflow = () => {
    if (overflow) {
      if (
        (inputRef.current?.clientWidth || 0) <=
        (parentRef.current?.clientWidth || 0)
      ) {
        setOverflow(false);
      }
    } else {
      if (
        (inputRef.current?.scrollWidth || 0) >
        (inputRef.current?.clientWidth || 0)
      ) {
        setOverflow(true);
      }
    }
  };

  return (
    <InputContainer ref={parentRef} fixedWidth={50}>
      <OverflowContainer isOverflow={overflow}>
        <input
          ref={inputRef}
          aria-readonly={readOnly}
          aria-required={required}
          aria-disabled={disabled}
          aria-invalid={invalid}
          required={required}
          disabled={disabled}
          readOnly={readOnly}
          {...rest}
          onBlur={() => {
            setOverflow(false);
          }}
          onFocus={() => {
            checkOverflow();
          }}
        />
        <div className="sizer" ref={sizerRef}>
          {sizerValue}
        </div>
      </OverflowContainer>
    </InputContainer>
  );
};

export default OverflowInput;
