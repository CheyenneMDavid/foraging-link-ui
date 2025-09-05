// The utils.js file holds common helpers for pagination, follow/unfollow
// state updates. It's is based directly on the utils.js from the Code
// Institute “Moments” walkthrough project. I built the entire file early
// when adding infinteScroll to the PostsListPage.js, and commented it
// heavily to aid my own understanding in order to gradually “wire in” the
// functions as they were required.

import { axiosReq } from "../api/axiosDefaults";
import jwtDecode from "jwt-decode";

// Fetches the next page of results and merges them into existing state.
// Prevents duplicates by checking ids before adding new items.
export const fetchMoreData = async (resource, setResource) => {
  try {
    const { data } = await axiosReq.get(resource.next);
    setResource((prevResource) => ({
      ...prevResource,
      next: data.next,
      results: data.results.reduce((acc, cur) => {
        return acc.some((accResult) => accResult.id === cur.id)
          ? acc
          : [...acc, cur];
      }, prevResource.results),
    }));
  } catch (err) {}
};

// Updates profile data after a follow action.
// - For the clicked profile: increments followers_count and sets following_id.
// - For the logged-in user: increments following_count.
// - Otherwise: returns profile unchanged.
export const followHelper = (profile, clickedProfile, following_id) => {
  return profile.id === clickedProfile.id
    ? {
        ...profile,
        followers_count: profile.followers_count + 1,
        following_id,
      }
    : profile.is_owner
    ? {
        ...profile,
        following_count: profile.following_count + 1,
      }
    : profile;
};

// Updates profile data after an unfollow action.
// - For the clicked profile: decrements followers_count and clears
// following_id.
// - For the logged-in user: decrements following_count.
// - Otherwise: returns profile unchanged.
export const unfollowHelper = (profile, clickedProfile) => {
  return profile.id === clickedProfile.id
    ? {
        ...profile,

        followers_count: profile.followers_count - 1,

        following_id: null,
      }
    : profile.is_owner
    ? { ...profile, following_count: profile.following_count - 1 }
    : profile;
};

// Stores the refresh token expiry timestamp in localStorage.
export const setTokenTimestamp = (data) => {
  const refreshTokenTimestamp = jwtDecode(data?.refresh_token).exp;

  localStorage.setItem("refreshTokenTimestamp", refreshTokenTimestamp);
};

// Checks if a refresh token timestamp exists in localStorage.
export const shouldRefreshToken = () => {
  return !!localStorage.getItem("refreshTokenTimestamp");
};

// Removes the refresh token timestamp from localStorage.
export const removeTokenTimestamp = () => {
  localStorage.removeItem("refreshTokenTimestamp");
};
