import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { compose } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class AddProductBar extends Component {
  // onSubmit = formProps => {
  //   this.props.signin(formProps, () => {
  //     this.props.history.push('/main');
  //   });
  // };

  render() {
    const { handleSubmit } = this.props;

    return (
      <form className='sign' onSubmit={handleSubmit(this.onSubmit)}>
        <fieldset>
          <Field
            name='product'
            type='text'
            component='input'
            autoComplete='none'
          />
        </fieldset>

        <div>{this.props.errorMessage}</div>
        <button>Sign In!</button>
      </form>
    );
  }
}

function mapStateToProps(state) {
  return { errorMessage: state.auth.errorMessage };
}

export default compose(
  connect(mapStateToProps, actions),
  reduxForm({ form: 'addProduct' })
)(AddProductBar);
