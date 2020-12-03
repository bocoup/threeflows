import { combineReducers } from 'redux';

import {
  COPY_SCENARIO_ERROR,
  CREATE_COHORT_ERROR,
  DELETE_SCENARIO_ERROR,
  GET_COHORT_ERROR,
  GET_COHORT_PARTICIPANTS_ERROR,
  GET_COHORT_RUN_DATA_ERROR,
  GET_LOGS_ERROR,
  GET_PERMISSIONS_ERROR,
  GET_PERSONA_ERROR,
  GET_PERSONAS_ERROR,
  GET_RESPONSE_ERROR,
  GET_RESPONSES_ERROR,
  GET_RUN_DATA_ERROR,
  GET_RUN_ERROR,
  GET_RUN_HISTORY_ERROR,
  GET_RUNS_ERROR,
  GET_SESSION_ERROR,
  GET_SCENARIO_ERROR,
  GET_SCENARIOS_ERROR,
  GET_SLIDES_ERROR,
  GET_TRANSCRIPTION_OUTCOME_ERROR,
  GET_COHORTS_ERROR,
  GET_USER_ERROR,
  GET_USERS_ERROR,
  GET_USERS_BY_PERMISSION_ERROR,
  LINK_RUN_TO_COHORT_ERROR,
  SAVE_RUN_EVENT_ERROR,
  SET_COHORT_ERROR,
  SET_COHORT_SCENARIOS_ERROR,
  SET_COHORT_USER_ROLE_ERROR,
  SET_RESPONSE_ERROR,
  SET_RESPONSES_ERROR,
  SET_RUN_ERROR,
  SET_SCENARIO_ERROR,
  SET_SCENARIOS_ERROR,
  SET_USER_ERROR,
  SET_USER_ROLE_ERROR,
  UNLOCK_SCENARIO_ERROR
} from '@actions/types';

const errorActionsMap = {
  cohort: [
    CREATE_COHORT_ERROR,
    GET_COHORT_PARTICIPANTS_ERROR,
    GET_COHORT_ERROR,
    SET_COHORT_ERROR,
    SET_COHORT_SCENARIOS_ERROR
  ],
  cohorts: [GET_COHORTS_ERROR],
  event: [SAVE_RUN_EVENT_ERROR],
  history: [GET_RUN_HISTORY_ERROR],
  logs: [GET_LOGS_ERROR],
  cohortdata: [GET_COHORT_RUN_DATA_ERROR],
  cohortlink: [LINK_RUN_TO_COHORT_ERROR],
  cohortscenario: [SET_COHORT_SCENARIOS_ERROR],
  cohortuser: [SET_COHORT_USER_ROLE_ERROR],
  permission: [GET_PERMISSIONS_ERROR],
  persona: [GET_PERSONA_ERROR],
  personas: [GET_PERSONAS_ERROR],
  response: [SET_RESPONSE_ERROR, GET_RESPONSE_ERROR],
  responses: [SET_RESPONSES_ERROR, GET_RESPONSES_ERROR],
  role: [SET_USER_ROLE_ERROR],
  run: [SET_RUN_ERROR, GET_RUN_ERROR],
  rundata: [GET_RUN_DATA_ERROR],
  runs: [GET_RUNS_ERROR],
  scenario: [
    COPY_SCENARIO_ERROR,
    DELETE_SCENARIO_ERROR,
    UNLOCK_SCENARIO_ERROR,
    GET_SCENARIO_ERROR,
    SET_SCENARIO_ERROR
  ],
  scenarios: [GET_SCENARIOS_ERROR, SET_SCENARIOS_ERROR],
  session: [GET_SESSION_ERROR],
  slides: [GET_SLIDES_ERROR],
  transcript: [GET_TRANSCRIPTION_OUTCOME_ERROR],
  user: [GET_USER_ERROR, SET_USER_ERROR],
  users: [GET_USERS_ERROR, GET_USERS_BY_PERMISSION_ERROR]
};

export default combineReducers(
  Object.entries(errorActionsMap).reduce((accum, [key, actions]) => {
    accum[key] = (_, action) => {
      const { error = {}, type } = action;
      if (actions && actions.includes(type)) {
        return {
          ...error
        };
      }
      return null;
    };
    return accum;
  }, {})
);
