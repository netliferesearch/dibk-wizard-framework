import { setWith, isObject, find } from 'lodash';

import { NAME } from './index';
import { SET_DATA, RESET_DATA, SHOW_RESET_MODAL } from './actions';
import processComputed from '../utils/process-computed';
import reduceWizard, { buildNodeMap } from '../utils/reduce-wizard';

const initialState = {};

const removeInactiveQuestions = (state, nodes, path = []) =>
  Object.keys(state).reduce((acc, property) => {
    // page and $computed properties we want to keep
    if (property === 'page' || property === '$computed') {
      return { ...acc, [property]: state[property] };
    }

    // build the path to the property, can be a nested property
    const propertyPath = [...path, property];
    const fullPropertyPath = propertyPath.join('.');

    // check if a node with the property we got to exists in the list of nodes
    if (find(nodes, ({ property: nodeProperty }) => nodeProperty === fullPropertyPath)) {
      return { ...acc, [property]: state[property] };
    }

    // recurse if the property is an object
    if (isObject(state[property])) {
      return {
        ...acc,

        // remove inactive properties on the property object
        [property]: removeInactiveQuestions(
          state[property], // pass the object we got to
          nodes,
          [...path, property], // add the property to the path and go on
        ),
      };
    }

    return { ...acc };
  }, {});

// compute the computed props and apply to state
export function applyComputed(wizard, state) {
  return {
    ...state,
    $computed: processComputed(wizard, state),
  };
}

// mutator that sets a value in data and returns the new state
export function setDataUpdate(wizard, state, { payload }) {
  // If payload.key is "question.yes" the . should be considered a path to a new object
  const newState = setWith({ ...state }, payload.key, payload.value, nsValue => nsValue || {});
  const newSchema = reduceWizard(wizard.schema, { [NAME]: newState });
  const visibleNodes = buildNodeMap(newSchema);
  const purgedState = removeInactiveQuestions(newState, visibleNodes);

  return applyComputed(wizard, purgedState);
}

export default wizard => (state = applyComputed(wizard, initialState), action) => {
  const { type } = action;

  switch (type) {
    case SET_DATA:
      return setDataUpdate(wizard, state, action);

    case RESET_DATA:
      return applyComputed(wizard, initialState);

    case SHOW_RESET_MODAL:
      return { ...state, $showResetModal: action.payload.show };

    default:
      return state;
  }
};
