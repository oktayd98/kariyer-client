import React from 'react';
import GroupField from './GroupField';
import Field from './Field';
const Form = ({ children, ...props }) => {
  return <form {...props}>{children}</form>;
};

export { Form, GroupField, Field };
