import React from 'react';
import cn from 'classnames';
import styles from './conditions.module.scss';
const Conditions = ({
  conditions = [
    { category: 'Network', limit: 80 },
    { category: 'SQL', limit: 55 },
    { category: 'Reverse', limit: 30 },
  ],
}) => {
  return (
    <div className={styles.conditions}>
      {conditions.map((condition) => (
        <div className={styles.condition}>
          <span className={styles.category}>
            {condition.category}:{' '}
          </span>
          <span
            className={cn(
              styles.limit,
              condition.limit < 40
                ? styles.green
                : condition.limit < 80
                ? styles.orange
                : styles.red,
            )}
          >
            {condition.limit}%
          </span>
        </div>
      ))}
    </div>
  );
};

export default Conditions;
