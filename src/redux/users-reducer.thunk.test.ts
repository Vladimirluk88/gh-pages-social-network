import { ResultCodesEnum } from "./../api/auth-api";
import { ResponseType } from "./../api/api";
import { usersAPI } from "./../api/users-api";
import { follow, actions, unfollow } from "./users-reducer";

jest.mock("./../api/users-api");
const usersAPIMock = usersAPI as jest.Mocked<typeof usersAPI>;

const dispatchMock = jest.fn();
const getStateMock = jest.fn();

beforeEach(() => {
    dispatchMock.mockClear();
    getStateMock.mockClear();
    usersAPIMock.followUser.mockClear();
    usersAPIMock.unfollowUser.mockClear();
});

const result: ResponseType = {
    resultCode: ResultCodesEnum.Success,
    messages: [],
    data: {},
};

test("success follow thunk", async () => {
    usersAPIMock.followUser.mockReturnValue(Promise.resolve(result));
    const thunk = follow(1);

    await thunk(dispatchMock, getStateMock, {});

    expect(dispatchMock).toBeCalledTimes(3);
    expect(dispatchMock).toHaveBeenNthCalledWith(
        1,
        actions.toggleFollowing(1, true)
    );
    expect(dispatchMock).toHaveBeenNthCalledWith(2, actions.addToList(1));
    expect(dispatchMock).toHaveBeenNthCalledWith(
        3,
        actions.toggleFollowing(1, false)
    );
});

test("success unfollow thunk", async () => {
    usersAPIMock.unfollowUser.mockReturnValue(Promise.resolve(result));
    const thunk = unfollow(1);

    await thunk(dispatchMock, getStateMock, {});

    expect(dispatchMock).toBeCalledTimes(3);
    expect(dispatchMock).toHaveBeenNthCalledWith(
        1,
        actions.toggleFollowing(1, true)
    );
    expect(dispatchMock).toHaveBeenNthCalledWith(2, actions.removeFromList(1));
    expect(dispatchMock).toHaveBeenNthCalledWith(
        3,
        actions.toggleFollowing(1, false)
    );
});
