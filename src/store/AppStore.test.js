import { configureStore } from "./AppStore";
import {
  loadDirectoriesAsync,
  processLoginAsync,
  logoutAsync
} from "./actions/Auth";
import { data as directories } from "../api/mocks/responses/directories";
import { data as login } from "../api/mocks/responses/login";
import { data as profile } from "../api/mocks/responses/profile";
import { data as accesskeys } from "../api/mocks/responses/accessKeys";
import { loadProfileAsync } from "./actions/User";
import {
  loadAccessKeysAsync,
  addAccessKeysAsync,
  updateAccessKeysAsync
} from "./actions/AccessKeys";
jest.mock("../api/TurbotApi.js");
jest.mock("../api/AccessKeysApi.js");

// Mock localStorage
window.localStorage = {
  setItem: () => {}
};

xdescribe("Main store", async () => {
  let store;
  let dispatch;
  beforeEach(async () => {
    store = configureStore();
    dispatch = store.dispatch;
  });

  it("should load directories", async () => {
    const asyncAction = loadDirectoriesAsync();
    await asyncAction(dispatch);
    const state = store.getState();
    expect(JSON.stringify(state.auth.directories)).toBe(
      JSON.stringify(directories.items)
    );
  });

  it("should process login", async () => {
    const asyncAction = processLoginAsync("test", "test", "test");
    await asyncAction(dispatch);
    const state = store.getState();
    expect(JSON.stringify(state.user.profile)).toBe(
      JSON.stringify(login.profile)
    );
  });

  it("should load profile", async () => {
    const asyncAction = loadProfileAsync();
    await asyncAction(dispatch);
    const state = store.getState();
    expect(JSON.stringify(state.user.profile)).toBe(JSON.stringify(profile));
  });

  it("should load access keys", async () => {
    const asyncAction = loadAccessKeysAsync();
    await asyncAction(dispatch, store.getState);
    const state = store.getState();
    expect(JSON.stringify(state.profile.accessKeys.list)).toBe(
      JSON.stringify(accesskeys.items)
    );
  });

  // TODO: add missing tests
  // it('should add access key', async () => {

  // });

  // it('should update access key', async () => {

  // });

  // it('should delete access key', async () => {

  // });

  it("should logout user", async () => {
    const asyncAction = logoutAsync();
    await asyncAction(dispatch);
    const state = store.getState();
    expect(state.user.profile).toBe(null);
  });
});
