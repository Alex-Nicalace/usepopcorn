import style from './Rating.module.css';

interface IInputProps {
  value: number;
  checked?: boolean;
  onChangeRating: () => void;
  onHoverIn: () => void;
  onHoverOut: () => void;
  styled: React.CSSProperties;
}
export function Input({
  value,
  checked = false,
  onChangeRating,
  onHoverIn,
  onHoverOut,
  styled,
}: IInputProps): JSX.Element {
  return (
    <input
      style={styled}
      type="radio"
      name="rating"
      className={`rating__item ${style.rating__item}`}
      value={value}
      checked={checked}
      onChange={onChangeRating}
      onMouseEnter={onHoverIn}
      onMouseLeave={onHoverOut}
    />
  );
}
