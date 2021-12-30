const CONFIRMED_STATE = {
	BEFORE: 0,
	PENDING: 1,
	SUCCESS: 2,
	FAILURE: 3,
};

Object.freeze(CONFIRMED_STATE);

const live = window.location.hostname !== "localhost";

export {CONFIRMED_STATE, live }
