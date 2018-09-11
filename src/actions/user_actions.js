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
  },
  journal: {
    quotes: [
      {
        author: "Oscar Wilde",
        quote: "Be yourself; everyone else is already taken."
      },
      {
        author: "Oscar Wilde",
        quote: "Be yourself; everyone else is already taken."
      },
      {
        author: "Mahatma Gandhi",
        quote: "Be the change that you wish to see in the world."
      },
      {
        author: "Eleanor Roosevelt",
        quote: "No one can make you feel inferior without your consent."
      },
      {
        author: "Friedrich Nietzsche",
        quote: "Without music, life would be a mistake."
      }
    ],
    goals: [
      {
        title:
          "Curabitur urna nisi, imperdiet eget libero aliquet, feugiat dapibus metus.",
        completed: false
      },
      {
        title:
          "Curabitur urna nisi, imperdiet eget libero aliquet, feugiat dapibus metus.",
        completed: false
      },
      {
        title:
          "Curabitur urna nisi, imperdiet eget libero aliquet, feugiat dapibus metus.",
        completed: false
      },
      {
        title: "Sed porta efficitur est ut scelerisque.",
        completed: false
      },
      {
        title: "Donec tincidunt nulla in feugiat interdum.",
        completed: false
      }
    ],
    todos: [
      {
        title:
          "Donec vehicula, lacus ut efficitur pretium, ligula odio feugiat odio.",
        completed: true,
        created_at: 1
      },
      {
        title:
          "Donec vehila, lacus ut efficitur pretium, ligula odio feugiat odio.",
        completed: true,
        created_at: 2
      },
      {
        title:
          "Donec veicula, lacus ut efficitur pretium, ligula odio feugiat odio.",
        completed: true,
        created_at: 3
      },
      {
        title:
          "Donec vehicula, lacus ut efficitur pretium, ligula odio feugiat odio.",
        completed: true,
        created_at: 4
      },
      {
        title: "Rutrum tincidunt quam. Vivamus ac lacinia tellus.",
        completed: false,
        created_at: 5
      },
      {
        title: "Lorem ipsum dolor sit amet.",
        completed: false,
        created_at: 6
      }
    ]
  }
};

export function fetchUserDetails() {
  return function(dispatch) {
    dispatch({ type: "FETCH_USER_DETAILS", payload: dummyData });
  };
}
