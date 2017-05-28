import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import cx from 'classnames';

export default class LoadingButton extends React.Component {

  static propTypes = {
    inferring: PropTypes.bool.isRequired,
    text: PropTypes.string.isRequired,
    loadingText: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    btnClass: PropTypes.string,
  };

  static defaultProps = {
    btnClass: null,
  }

  render() {
    const isLoading = this.props.inferring;
    return (
      <Button
        bsClass={cx('btn', 'btn-primary', this.props.btnClass)}
        disabled={isLoading}
        onClick={!isLoading ? this.props.onClick : null}
      >
        {isLoading ? this.props.loadingText : this.props.text}
      </Button>
    );
  }
}
