import React, { Component, PropTypes } from 'react';

export default class RadioImg extends Component {
  static propTypes = {
    options: PropTypes.arrayOf(PropTypes.shape({
      img: PropTypes.string.isRequired,
      bsClass: PropTypes.string.isRequired,
      bsSelClass: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    })).isRequired,
    defaultValue: PropTypes.string,
    onChange: PropTypes.func,
  }

  static defaultProps = {
    defaultValue: null,
    onChange: () => {},
  }

  constructor(props) {
    super(props);
    this.state = { value: this.props.defaultValue };
    this.onClick = this.onClick.bind(this);
  }

  onClick(e) {
    e.preventDefault();

    if (this.state.value !== e.target.dataset.val) {
      this.setState({ value: e.target.dataset.val });

      this.props.onChange({
        target: {
          value: e.target.dataset.val,
        },
      });
    }
  }

  buttonCls(item) {
    return (this.state.value === item.value) ? item.bsSelClass : item.bsClass;
  }

  render() {
    return (
      <div className="radio-img">
        {
          this.props.options.map(item => (
            <button
              key={`img-${item.value}`}
              className={this.buttonCls(item)}
              onClick={this.onClick}
            >
              <img src={item.img} alt="" data-val={item.value} />
            </button>
          ))
        }
      </div>
    );
  }
}
