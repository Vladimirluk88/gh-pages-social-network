import { actions, profileReducer, InitialStateType } from "./profile-reducer";

it("new post should be added", () => {
    let action = actions.addPostActionCreator("Hello from test");
    let state = {
        PostsData: [
            { id: 1, message: "Hello, i'm first post" },
            { id: 2, message: "I'm your 2 post" },
        ],
    };

    let newState = profileReducer(state, action);
    expect(newState.PostsData.length).toBe(3);
});