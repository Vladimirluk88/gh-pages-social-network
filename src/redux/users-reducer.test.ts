import { InitialStateType, userReducer, actions } from "./users-reducer";

let state: InitialStateType;

beforeEach(() => {
    state = {
        UsersData: [
            {
                id: 0,
                name: "userName 0",
                status: "status 0",
                photos: { small: null, large: null },
                followed: true,
            },
            {
                id: 1,
                name: "userName 1",
                status: "status 1",
                photos: { small: null, large: null },
                followed: false,
            },
            {
                id: 2,
                name: "userName 2",
                status: "status 2",
                photos: { small: null, large: null },
                followed: true,
            },
            {
                id: 3,
                name: "userName 3",
                status: "status 3",
                photos: { small: null, large: null },
                followed: false,
            },
        ],
        isFetching: true,
        isFollowingInProgress: [],
    };
});

test("follow success", () => {
    const newState = userReducer(state, actions.addToList(1));
    expect(newState.UsersData[1].followed).toBeTruthy();
});

test("unfollow success", () => {
    const newState = userReducer(state, actions.removeFromList(0));
    expect(newState.UsersData[0].followed).toBeFalsy();
});
