import React, { useEffect, useLayoutEffect, useState } from 'react';
import cn from 'classnames';
import { nanoid } from 'nanoid';
import styles from './select.module.scss';

const Dropdown = ({
  multiple,
  search,
  options = [],
  defaultValue,
  className,
  onChange = () => {},
  ...props
}) => {
  const [constantOptions, setConstantOptions] = useState([]);
  const [optionsCopy, setOptionsCopy] = useState([]);
  const [focus, setFocus] = useState(false);
  const [multipleSelectValues, setMultipleSelectValues] = useState(
    [],
  );
  const [singleSelectValue, setSingleSelectValue] = useState('');
  const handleSelect = (e, index) => {
    if (multiple) {
      const temp = [...optionsCopy];
      temp[index].selected = true;
      onChange(e, [
        ...multipleSelectValues.map((e) => e.value),
        optionsCopy[index].value,
      ]);
      setMultipleSelectValues([
        ...multipleSelectValues,
        optionsCopy[index],
      ]);
      setOptionsCopy(temp);
    } else {
      setSingleSelectValue(optionsCopy[index]);
      setFocus(false);
      onChange(e, options[index].value);
    }
  };

  const handleRemoveSelect = (e, o) => {
    const temp = [...optionsCopy];
    const tempSelect = [...multipleSelectValues];
    const index = temp.findIndex(
      (option, index) => option.value === o.value,
    );
    const indexSelect = tempSelect.findIndex(
      (option, index) => option.value === o.value,
    );
    if (index !== -1 && indexSelect !== -1) {
      temp[index].selected = false;
    }
    tempSelect.splice(indexSelect, 1);
    setOptionsCopy(temp);
    setMultipleSelectValues(tempSelect);
    onChange(e, [...tempSelect.map((e) => e.value)]);
  };

  const handleSearch = (e, value) => {
    const filtered = constantOptions.filter((e) =>
      e.text.toLowerCase().includes(value.toLowerCase()),
    );
    setOptionsCopy(filtered);
  };

  const handleBackspace = (e) => {
    if (e.keyCode === 8) {
      if (
        e.target.value.length === 0 &&
        multipleSelectValues.length > 0
      ) {
        handleRemoveSelect(e, multipleSelectValues.slice(-1)[0]);
      }
    }
  };

  useEffect(() => {
    const newOptions = [];
    options.map((o) =>
      newOptions.push({ ...o, status: 'active', selected: false }),
    );
    setOptionsCopy(newOptions);
    setConstantOptions(newOptions);
  }, []);

  return (
    <>
      <div className={styles.inputArea}>
        {multiple && (
          <div className={styles.selectedItems}>
            {multipleSelectValues.map((o, i) => (
              <>
                <div key={nanoid(10)} className={styles.selected}>
                  {o.text}
                  <span
                    onPointerDown={(e) => handleRemoveSelect(e, o)}
                  >
                    x
                  </span>
                </div>
              </>
            ))}
          </div>
        )}
        <div
          onPointerDown={() => setFocus(!focus)}
          className={styles.inputContainer}
        >
          {multiple ? (
            <input
              onFocus={() => setFocus(true)}
              onBlur={() => setFocus(false)}
              onKeyDown={(e) => handleBackspace(e)}
              onChange={(e) => handleSearch(e, e.target.value)}
              className={styles.input}
              type="text"
            ></input>
          ) : (
            <label>{singleSelectValue.text}</label>
          )}
        </div>

        <div
          className={cn(styles.options, focus && styles.active)}
          onPointerDown={(e) => e.preventDefault()}
        >
          {optionsCopy.map((option, index) => (
            <>
              {option.selected === false && (
                <div
                  key={nanoid(10)}
                  className={styles.option}
                  onPointerDown={(e) => handleSelect(e, index)}
                >
                  {option.text}
                </div>
              )}
            </>
          ))}
          {optionsCopy.findIndex(
            (option, index) => option.selected === false,
          ) === -1 && (
            <div className={cn(styles.option, styles.noData)}>
              No items found
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Dropdown;
