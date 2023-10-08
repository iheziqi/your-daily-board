import { ChangeEventHandler } from 'react';

interface CheckBoxProps {
  id: string;
  labelText: string;
  isChecked: boolean;
  onChange: ChangeEventHandler<HTMLInputElement>;
  children: JSX.Element | undefined;
}

function CheckBox({
  id,
  labelText,
  isChecked,
  onChange,
  children = undefined,
}: CheckBoxProps) {
  return (
    <div>
      <label className="label cursor-pointer font-medium" htmlFor={id}>
        <input
          type="checkbox"
          className="checkbox checkbox-primary mr-2"
          id={id}
          name={id}
          checked={isChecked}
          onChange={onChange}
          value={id}
        />
        <span className="label-text">
          {labelText} {children}
        </span>
      </label>
    </div>
  );
}

export default CheckBox;
