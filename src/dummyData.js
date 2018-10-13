let profile = {
  status: "success",
  profile_data: {
    memory_book_privacy: "public",
    first_name: "mantu",
    creation_time: "2018-10-06T10:13:38.436",
    memory_book_privacry: "public",
    stats: {
      no_of_wins: 0,
      content_shared: 0,
      anonymous_shared: 0,
      no_of_comments: 0,
      no_of_likes: 0
    },
    about: "Success is not final failure is not fatal - Winston Churchill",
    sur_name: "kumar",
    dob: "10-10-2010",
    langs: "Kannada, English, kennedy",
    favorite_art: "Writing, Singing, dancing, running",
    from: "Bangalore, Karnataka, India, Earth"
  },
  memory_book: [
    {
      text: "This is dummy text",
      url:
        "static/unique_user1/memory_book/afc7d04c-07e5-43d6-bb7f-4c301ead37a6.jpg",
      shared_type: "public",
      username: "unique_user1",
      post_type: "memory_book",
      _id: "5bb88b183412654cdd47779c"
    }
  ],
  code: "20",
  msg: "Fetched Data Successfully",
  art_content: [
    {
      text: "This is dummy text",
      url: "static/unique_user1/art/f554b02a-0aca-490a-bead-e977cafc1e1f.jpg",
      shared_type: "public",
      post_type: "art",
      username: "unique_user1",
      art_type: "gazal",
      _id: "5bb88b0c3412654cdd477796"
    },
    {
      text: "This is dummy text",
      url: "static/unique_user1/art/310b1172-6091-4a56-ad1c-2230c9f13e26.jpg",
      shared_type: "public",
      post_type: "art",
      username: "unique_user1",
      art_type: "song",
      _id: "5bb88b053412654cdd477793"
    },
    {
      text: "This is dummy text",
      url: "static/unique_user1/art/973c71f1-71a5-4652-8e89-5307c411d6a8.jpg",
      shared_type: "public",
      post_type: "art",
      username: "unique_user1",
      art_type: "poem",
      _id: "5bb88b003412654cdd477790"
    }
  ]
};

let journal = {
  notes: [
    {
      title: "First Note Taken"
    }
  ],
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
      id: 1,
      title:
        "Donec vehicula, lacus ut efficitur pretium, ligula odio feugiat odio.",
      completed: true,
      isDelete: false,
      created_at: 1
    },
    {
      id: 2,
      title:
        "Donec vehila, lacus ut efficitur pretium, ligula odio feugiat odio.",
      completed: true,
      isDelete: false,
      created_at: 2
    },
    {
      id: 3,
      title:
        "Donec veicula, lacus ut efficitur pretium, ligula odio feugiat odio.",
      completed: true,
      isDelete: false,
      created_at: 3
    },
    {
      id: 4,
      title:
        "Donec vehicula, lacus ut efficitur pretium, ligula odio feugiat odio.",
      completed: true,
      isDelete: false,
      created_at: 4
    },
    {
      id: 5,
      title: "Rutrum tincidunt quam. Vivamus ac lacinia tellus.",
      completed: false,
      isDelete: false,
      created_at: 5
    },
    {
      id: 6,
      title: "Lorem ipsum dolor sit amet.",
      completed: false,
      isDelete: false,
      created_at: 6
    }
  ]
};

export { profile, journal };
