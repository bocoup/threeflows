import { type } from './type';
import React from 'react';
import PropTypes from 'prop-types';
import { Button, List, Message } from 'semantic-ui-react';

class Display extends React.Component {
    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
    }

    onClick(event, { name, value }) {
        this.props.onResponseChange(event, { name, value, type });
    }

    render() {
        const { buttons, prompt, responseId } = this.props;
        const { onClick } = this;

        return (
            <Message
                header={prompt}
                content={
                    <List>
                        {buttons &&
                            buttons.map(({ display, value }, index) => (
                                <List.Item key={`list.item-${index}`}>
                                    <Button
                                        fluid
                                        key={`button-${index}`}
                                        content={display}
                                        name={responseId}
                                        value={value}
                                        onClick={onClick}
                                    />
                                </List.Item>
                            ))}
                    </List>
                }
            />
        );
    }
}

Display.propTypes = {
    buttons: PropTypes.array,
    prompt: PropTypes.string,
    responseId: PropTypes.string,
    onResponseChange: PropTypes.func,
    type: PropTypes.oneOf([type]).isRequired
};

export default React.memo(Display);