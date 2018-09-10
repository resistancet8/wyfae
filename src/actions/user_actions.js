let dummyData = {
  name: "Naveen",
  from: "Bangalore, Karnataka, India, Earth",
  about: "Success is not final failure is not fatal - Winston Churchill",
  dob: "10-10-2010",
  langs: "Kannada, English",
  contact: "9945126164",
  email: "resistancet8@gmail.com",
  favorite_art: "Writing, Singing, Dancing",
  avatar:
    "https://pbs.twimg.com/profile_images/496824857368072193/flaqCCcX_400x400.png",
  stats: {
    content_shared: {
      total: 2000,
      percent: "80%"
    },
    no_of_likes: {
      total: 100,
      percent: "10%"
    },
    no_of_wins: {
      total: 600,
      percent: "60%"
    },
    no_of_comments: {
      total: 233,
      percent: "50%"
    },
    anonymous_shared: {
      total: 225,
      percent: "30%"
    }
  }
};

export function fetchUserDetails() {
  return function(dispatch) {
    dispatch({ type: "FETCH_USER_DETAILS", payload: dummyData });
  };
}
