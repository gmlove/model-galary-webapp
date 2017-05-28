import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';

export default class LoadingButton extends React.Component {

  static propTypes = {
    inferring: PropTypes.bool.isRequired,
    text: PropTypes.string.isRequired,
    loadingText: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
  };

  render() {
    const isLoading = this.props.inferring;
    return (
      <Button
        bsStyle="primary"
        disabled={isLoading}
        onClick={!isLoading ? this.props.onClick : null}
      >
        {isLoading ? this.props.loadingText : this.props.text}
      </Button>
    );
  }
}
