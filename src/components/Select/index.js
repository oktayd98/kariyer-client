import React, { useEffect, useState } from 'react';
import cn from 'classnames';
import { nanoid } from 'nanoid';
import styles from './select.module.scss';

const Select = ({
  multiple = true,
  search,
  options = [
    { text: 'ali', value: 'test1' },
    { text: 'veli', value: 'test2' },
    { text: 'ahmet', value: 'test3' },
    { text: 'mehmet', value: 'test4' },
    { text: 'ayşe', value: 'test5' },
    { text: 'fatma', value: 'test6' },
    { text: 'oktay', value: 'test7' },
  ],
  defaultValue,
  className,
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
      setMultipleSelectValues([
        ...multipleSelectValues,
        optionsCopy[index],
      ]);
    } else {
      setSingleSelectValue(optionsCopy[index]);
    }
    const temp = [...optionsCopy];
    temp[index].selected = true;
    setOptionsCopy(temp);
    props.onChange(e, [
      ...multipleSelectValues.map((e) => e.value),
      optionsCopy[index].value,
    ]);
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
    props.onChange(e, [...tempSelect.map((e) => e.value)]);
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
        <div className={styles.selectedItems}>
          {multipleSelectValues.map((o, i) => (
            <>
              <div key={nanoid(10)} className={styles.selected}>
                {o.text}
                <span onPointerDown={(e) => handleRemoveSelect(e, o)}>
                  x
                </span>
              </div>
            </>
          ))}
        </div>
        <div className={styles.inputContainer}>
          <input
            onKeyDown={(e) => handleBackspace(e)}
            onFocus={() => setFocus(true)}
            onBlur={() => setFocus(false)}
            onChange={(e) => handleSearch(e, e.target.value)}
            className={styles.input}
            type="text"
          ></input>
        </div>
      </div>
      <div
        className={cn(styles.options, focus && styles.active)}
        onMouseDown={(e) => e.preventDefault()}
      >
        {optionsCopy.map((option, index) => (
          <>
            {option.selected === false && (
              <div
                key={nanoid(10)}
                className={styles.option}
                onMouseDown={(e) => handleSelect(e, index)}
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
    </>
  );
};

export default Select;
