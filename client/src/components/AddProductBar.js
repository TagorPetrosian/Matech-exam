import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { compose } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../actions';

class AddProductBar extends Component {
  onSubmit = formProps => {
    this.props.submitProduct(formProps);
  };

  render() {
    const { handleSubmit } = this.props;

    return (
      <form className='input-product' onSubmit={handleSubmit(this.onSubmit)}>
        <fieldset>
          <Field
            placeholder='Insert ASIN or url'
            name='product'
            type='text'
            component='input'
            autoComplete='none'
          />
        </fieldset>
      </form>
    );
  }
}

export default compose(
  connect(null, actions),
  reduxForm({ form: 'addProduct' })
)(AddProductBar);
