import { useState } from 'react';
import styled from './Rating.module.css';

interface IRatingProps {
  maxRating?: number;
  defaultRating?: number;
  size?: string;
  color?: string;
  iconItemUnactive?: JSX.Element;
  iconItemActive?: JSX.Element;
  className?: string;
  messages?: string[];
  onSetRating?: (value: number) => void;
}
function Rating({
  maxRating = 5,
  defaultRating = 0,
  size,
  color,
  className = '',
  messages = [],
  iconItemUnactive = <IconStar fill="transparent" stroke={color || '#000'} />,
  iconItemActive = <IconStar fill={color || '#000'} stroke={color || '#000'} />,
  onSetRating,
}: IRatingProps): JSX.Element {
  const [rating, setRating] = useState(defaultRating);
  const [tempRating, setTempRating] = useState(0);

  const showRating = tempRating || rating;
  const filled = (showRating / maxRating) * 100;
  const styledText: React.CSSProperties = {};
  const styledItem: React.CSSProperties = {};

  if (size) {
    styledItem.width = size;
    styledItem.height = size;
    styledItem.flex = `0 0 ${size}`;
    styledText.fontSize = `${parseInt(size) / 1.5}px`;
  }

  if (color) {
    styledText.color = color;
  }

  function handleChangeRating(value: number): void {
    setRating(value);
    if (onSetRating) onSetRating(value);
  }

  return (
    <div className={`rating ${styled.rating} ${className}`}>
      <div className={`rating__body ${styled.rating__body}`}>
        <div
          className={`rating__items rating__items_free ${styled.rating__items} ${styled.rating__items_free}`}
        >
          {Array.from({ length: maxRating }, (_, i) => (
            <span
              style={styledItem}
              className={`rating__item ${styled.rating__item}`}
              key={i}
            >
              {iconItemUnactive}
            </span>
          ))}
        </div>
        <div
          style={{ width: `${filled}%` }}
          className={`rating__items rating__items_fill ${styled.rating__items} ${styled.rating__items_fill}`}
        >
          {Array.from({ length: maxRating }, (_, i) => (
            <span
              style={styledItem}
              className={`rating__item ${styled.rating__item}`}
              key={i}
            >
              {iconItemActive}
            </span>
          ))}
        </div>
        <div
          className={`rating__items rating__items_opacity ${styled.rating__items} ${styled.rating__items_opacity}`}
        >
          {Array.from({ length: maxRating }, (_, i) => (
            <Input
              key={i}
              value={i + 1}
              checked={rating === i + 1}
              onChangeRating={() => handleChangeRating(i + 1)}
              onHoverIn={() => setTempRating(i + 1)}
              onHoverOut={() => setTempRating(0)}
              style={styledItem}
            />
          ))}
        </div>
      </div>
      <div
        style={styledText}
        className={`rating__value ${styled.rating__value}`}
      >
        {messages.length === maxRating
          ? messages[showRating - 1]
          : showRating || ''}
      </div>
    </div>
  );
}

interface IIconStar {
  fill?: string;
  stroke?: string;
}
function IconStar({ fill = '#000', stroke = '#000' }: IIconStar) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill={fill}
      stroke={stroke}
    >
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  );
}

interface IInputProps {
  value: number;
  checked?: boolean;
  onChangeRating: () => void;
  onHoverIn: () => void;
  onHoverOut: () => void;
  style: React.CSSProperties;
}
export function Input({
  value,
  checked = false,
  onChangeRating,
  onHoverIn,
  onHoverOut,
  style,
}: IInputProps): JSX.Element {
  return (
    <input
      style={style}
      type="radio"
      name="rating"
      className={`rating__item ${styled.rating__item}`}
      value={value}
      checked={checked}
      onChange={onChangeRating}
      onMouseEnter={onHoverIn}
      onMouseLeave={onHoverOut}
    />
  );
}

export default Rating;
