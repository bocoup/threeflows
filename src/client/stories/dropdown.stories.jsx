import React from 'react';
import { storiesOf } from '@storybook/react';
import { Dropdown } from '../components/dropdown';

const dropDownValues = ['Context', 'Anticipate', 'Enact', 'Reflect'];

storiesOf('Dropdown', module)
    .add('dropdown no title', () => 
        <Dropdown values={dropDownValues} />
    )
    .add('dropdown with title', () => 
        <Dropdown title="+ Add" values={dropDownValues} />
    );