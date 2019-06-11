export function createAction(type, payload = {}) {
  return {
    type,
    ...payload
  };
}

export const REQUEST = "REQUEST";
export const SUCCESS = "SUCCESS";
export const FAILURE = "FAILURE";

export function createRequestTypes(base) {
  if (!base) {
    throw new Error("cannot create request type with base = '' or base = null");
  }
  return [REQUEST, SUCCESS, FAILURE].reduce((acc, type) => {
    acc[type] = `${base}_${type}`;
    return acc;
  }, {});
}

//RETURN A OBJECT WITH THREE FIELDS
// {
//   REQUEST: 'MOST_POPULAR_REQUEST',
//   SUCCESS: 'MOST_POPULAR_SUCCESS',
//   FAILURE: 'MOST_POPULAR_FAILURE'
// }
