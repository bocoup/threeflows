import {
  fetchImplementation,
  mounter,
  reduxer,
  snapshot,
  state
} from '../bootstrap';
import { unmountComponentAtNode } from 'react-dom';
import { cleanup, fireEvent, render } from '@testing-library/react';
import Slides from '../../components/Editor/Slides.jsx';

import { GET_SLIDES_SUCCESS } from '../../actions/types';
import { getSlides } from '../../actions/scenario';
jest.mock('../../actions/scenario');

beforeAll(() => {
  (window || global).fetch = jest.fn();
});

let container = null;
beforeEach(() => {
  container = document.createElement('div');
  container.setAttribute('id', 'root');
  document.body.appendChild(container);

  fetchImplementation(fetch);

  getSlides.mockImplementation(() => async dispatch => {
    const slides = [
      {
        id: 1,
        title: '',
        components: [
          {
            html: '<h2>Bye!</h2>',
            type: 'Text'
          }
        ],
        is_finish: true
      },
      {
        id: 2,
        title: '',
        components: [
          {
            id: 'b7e7a3f1-eb4e-4afa-8569-eb6677358c9e',
            html: '<p>Hi!</p>',
            type: 'Text'
          }
        ]
      }
    ];
    dispatch({
      type: GET_SLIDES_SUCCESS,
      slides
    });
    return slides;
  });
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

const sharedProps = {
  history: {
    push() {}
  }
};

test('Slides', () => {
  expect(Slides).toBeDefined();
});

test('Snapshot 1', () => {
  const props = {
    ...sharedProps,
    scenario: {
      author: {
        id: 2,
        username: 'owner',
        personalname: 'Owner Account',
        email: 'owner@email.com',
        is_anonymous: false,
        roles: ['participant', 'super_admin', 'facilitator', 'researcher'],
        is_super: true
      },
      categories: [],
      consent: {
        id: 57,
        prose: ''
      },
      description: 'A Multiplayer Scenario',
      finish: {
        id: 1,
        title: '',
        components: [
          {
            html: '<h2>Thanks for participating!</h2>',
            type: 'Text'
          }
        ],
        is_finish: true
      },
      lock: {
        scenario_id: 42,
        user_id: 2,
        created_at: '2020-10-10T23:54:19.934Z',
        ended_at: null
      },
      slides: [
        {
          id: 1,
          title: '',
          components: [
            {
              html: '<h2>Thanks for participating!</h2>',
              type: 'Text'
            }
          ],
          is_finish: true
        },
        {
          id: 2,
          title: '',
          components: [
            {
              id: 'b7e7a3f1-eb4e-4afa-8569-eb6677358c9e',
              html: '<p>paragraph</p>',
              type: 'Text'
            },
            {
              id: 'aede9380-c7a3-4ef7-add7-838fd5ec854f',
              type: 'TextResponse',
              header: 'TextResponse-1',
              prompt: ',timeout: 0,recallId: ',
              required: true,
              responseId: 'be99fe9b-fa0d-4ab7-8541-1bfd1ef0bf11',
              placeholder: 'Your response'
            },
            {
              id: 'f96ac6de-ac6b-4e06-bd97-d97e12fe72c1',
              html: '<p>?</p>',
              type: 'Text'
            }
          ],
          is_finish: false
        }
      ],
      status: 1,
      title: 'Multiplayer Scenario',
      users: [
        {
          id: 2,
          email: 'owner@email.com',
          username: 'owner',
          personalname: 'Owner Account',
          roles: ['owner'],
          is_owner: true,
          is_author: true,
          is_reviewer: false
        }
      ],
      id: 42,
      created_at: '2020-08-31T17:50:28.089Z',
      updated_at: null,
      deleted_at: null
    }
  };
  const mounted = mounter(reduxer(Slides, props, state))();
  expect(snapshot(mounted)).toMatchSnapshot();
});

/*{INJECTION}*/