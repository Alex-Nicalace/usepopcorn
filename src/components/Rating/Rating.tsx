import { useState } from 'react';
import styled from './Rating.module.css';
import { IconStar } from './IconStar';
import { Input } from './Input';

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
              styled={styledItem}
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

export default Rating;
