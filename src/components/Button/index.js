import React from 'react';
import cn from 'classnames';
import { Link } from 'react-router-dom';
import styles from './button.module.scss';

const Button = ({
  onClick = () => {},
  href,
  inverted,
  secondary,
  w100,
  classNames,
  children,
}) => {
  return (
    <>
      {href ? (
        <Link
          to={href}
          className={cn(
            styles.button,
            secondary && styles.secondary,
            w100 && styles.w100,
            classNames,
          )}
        >
          {children}
        </Link>
      ) : (
        <div
          onClick={onClick}
          to={href}
          className={cn(
            styles.button,
            secondary && styles.secondary,
            w100 && styles.w100,
            classNames,
          )}
        >
          {children}
        </div>
      )}
    </>
  );
};

export default Button;
