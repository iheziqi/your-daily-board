interface CheckBoxProps {
  id: string;
  labelText: string;
  children: JSX.Element | undefined;
}

function CheckBox({ id, labelText, children = undefined }: CheckBoxProps) {
  return (
    <div className="">
      <label className="label cursor-pointer font-medium" htmlFor={id}>
        <input
          type="checkbox"
          className="checkbox checkbox-primary mr-2"
          id={id}
        />
        <span className="label-text">
          {labelText} {children}
        </span>
      </label>
    </div>
  );
}

export default CheckBox;
