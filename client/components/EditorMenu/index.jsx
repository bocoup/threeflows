import React from 'react';
import PropTypes from 'prop-types';
import { Icon, Menu, Popup } from '@components/UI';
import ConfirmableDeleteButton from './ConfirmableDeleteButton';
import './EditorMenu.css';

export default class EditorMenu extends React.Component {
  shouldComponentUpdate(newProps) {
    if (newProps.isDragging) {
      return false;
    }
    return true;
  }

  render() {
    const {
      className,
      draghandle = {},
      type,
      items,
      // DO NOT DELETE THIS
      isDragging,
      ...props
    } = this.props;
    let menuClassName = 'em__height';
    if (className) {
      menuClassName += ` ${className}`;
    }

    // DO NOT DELETE THIS
    void isDragging;

    // DO NOT CHANGE THE ORDER OF PROPS!
    const menuProps = {
      ...props,
      ...draghandle,
      icon: true,
      borderless: true,
      className: menuClassName
    };

    return (
      <Menu {...menuProps}>
        {items.left && (
          <React.Fragment>
            {items.left
              .filter(item => item)
              .map((item, index) => {
                return item.props.name ? (
                  <Popup
                    inverted
                    size="tiny"
                    key={index}
                    content={item.props.name}
                    trigger={item}
                  />
                ) : (
                  item
                );
              })}
          </React.Fragment>
        )}
        {items.save && (
          <Popup
            inverted
            size="tiny"
            content={`Save this ${type}`}
            trigger={
              <Menu.Item.Tabbable
                aria-label={`Save ${type}`}
                disabled={items.save.disabled}
                name={`save-${type}`}
                onClick={items.save.onClick}
              >
                <Icon name="save outline" />
              </Menu.Item.Tabbable>
            }
          />
        )}
        {items.delete && (
          <ConfirmableDeleteButton
            aria-label={`Delete this ${type}`}
            disabled={items.delete.disabled}
            name={`delete-${type}`}
            itemType={type}
            onConfirm={items.delete.onConfirm}
          />
        )}

        {items.right && (
          <React.Fragment>
            {items.right
              .filter(item => item)
              .map((item, index) => {
                return item.props.name ? (
                  <Popup
                    inverted
                    size="tiny"
                    key={index}
                    content={item.props.name}
                    trigger={item}
                  />
                ) : (
                  item
                );
              })}
          </React.Fragment>
        )}
      </Menu>
    );
  }
}

const VALID_PROPS = ['delete', 'editable', 'left', 'right', 'save'];
EditorMenu.propTypes = {
  pointing: PropTypes.bool,
  secondary: PropTypes.bool,
  className: PropTypes.string,
  draghandle: PropTypes.object,
  isDragging: PropTypes.bool,
  index: PropTypes.number,
  items: function(props, propName) {
    const { items } = props;
    if (propName === 'items') {
      if (!Object.keys(items).every(v => VALID_PROPS.includes(v))) {
        return new Error('EditorMenu: Invalid item property');
      }

      if (items.save) {
        if (
          !Object.keys(items.save).every(v =>
            ['disabled', 'onClick'].includes(v)
          )
        ) {
          return new Error('EditorMenu: Invalid items.save property');
        }
      }

      if (items.delete) {
        if (
          !Object.keys(items.delete).every(v =>
            ['disabled', 'onConfirm'].includes(v)
          )
        ) {
          return new Error('EditorMenu: Invalid item.delete property');
        }
      }

      if (items.left && !Array.isArray(items.left)) {
        return new Error('EditorMenu: Invalid items.left property');
      }

      if (items.right && !Array.isArray(items.right)) {
        return new Error('EditorMenu: Invalid items.right property');
      }
    }

    return null;
  },
  type: PropTypes.string
};
