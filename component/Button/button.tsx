"use strict";
import { Button } from 'flowbite-react';
import Image from 'next/image';
import React from 'react';

enum ButtonTypes {
  button = 'button',
  submit = 'submit',
  reset = 'reset',
}

enum ButtonStyles {
  primary = 'btn-primary',
  secondary = 'btn-secondary',
  danger = 'btn-danger',
  warning = 'btn-warning',
  info = 'btn-info',
  light = 'btn-light',
  dark = 'btn-dark',
}

interface ButtonProps {
  color?: string;
  textBtn: string;
  type?: ButtonTypes;
  textSize?: string;
  widthClass?: string;
  heightClass?: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  isDisabled?: boolean;
  otherCss?: string;
  icon?: string;
}

export default function ButtonWD({
  color = 'blue',
  textBtn,
  textSize = 'text-[14px]',
  widthClass = 'w-[167px]',
  heightClass = 'h-[43px]',
  isDisabled = false,
  onClick,
  type = ButtonTypes.button,
  otherCss = '',
  icon = '',
}: ButtonProps) {
  return (
    <Button
      color={color}
      className={`${otherCss} ${heightClass} ${widthClass}`}
      type={type}
      onClick={onClick}
      disabled={isDisabled}
    >
      <div className={`flex flex-row justify-center items-center gap-3 ${textSize}`}>
        {icon && <Image src={icon} width={20} height={20} alt="Button Icon" />}
        {textBtn}
      </div>
    </Button>
  );
}
