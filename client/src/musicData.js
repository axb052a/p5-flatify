// musicData.js
const musicList = [
    {
      title: 'About You',
      artist: 'The 1975',
      audioSrc: '/music/about_you.mp3',
      image: 'https://i.scdn.co/image/ab67616d0000b2731f44db452a68e229650a302c',
    },
    {
      title: 'Days',
      artist: 'The Drums',
      audioSrc: '/music/days.mp3',
      image: 'https://i.scdn.co/image/ab67616d0000b2734c27d14a19e67dac23661031',
    },
    {
      title: 'Anti-Hero',
      artist: 'Taylor Swift',
      audioSrc: '/music/antihero.mp3',
      image: 'https://i.scdn.co/image/ab67616d0000b273bb54dde68cd23e2a268ae0f5',
    },
    {
      title: 'Dreaming',
      artist: 'Smallpools',
      audioSrc: '/music/dreaming.mp3',
      image: 'https://i.scdn.co/image/ab67616d0000b27324c80190d731ccaa74415049',
    },
    {
      title: 'Electric Feel',
      artist: 'MGMT',
      audioSrc: '/music/electric_feel.mp3',
      image: 'https://i.scdn.co/image/ab67616d0000b27360c4c3d695931aeb83bce500',
    },
    {
      title: 'Heartbeat',
      artist: 'Childish Gambino',
      audioSrc: '/music/heartbeat.mp3',
      image: 'https://i.scdn.co/image/ab67616d0000b273ddd59d8bd5982e6d250d9a22',
    },
    {
      title: 'Under the Bridge',
      artist: 'Red Hot Chili Peppers',
      audioSrc: '/music/under_the_bridge.mp3',
      image: 'https://i.scdn.co/image/ab67616d0000b273153d79816d853f2694b2cc70',
    },
    {
      title: 'Midnight City',
      artist: 'M83',
      audioSrc: '/music/midnight_city.mp3',
      image: 'https://i.scdn.co/image/ab67616d0000b273fff2cb485c36a6d8f639bdba',
    },
    {
      title: 'Dog Days Are Over',
      artist: 'Florence + The Machine',
      audioSrc: '/music/dog_days.mp3',
      image: 'https://i.scdn.co/image/ab67616d0000b2730672b0f8756ae2af86e8a5ce',
    },
    {
      title: 'Sweater Weather',
      artist: 'The Neighbourhood',
      audioSrc: '/music/sweater_weather.mp3',
      image: 'https://i.scdn.co/image/ab67616d0000b2738265a736a1eb838ad5a0b921',
    },
    {
      title: 'Take a Walk',
      artist: 'Passion Pit',
      audioSrc: '/music/take_a_walk.mp3',
      image: 'https://i.scdn.co/image/ab67616d0000b273f860547bc8ba0c59df4fe2c3',
    },
    {
      title: 'Shut Up and Dance',
      artist: 'WALK THE MOON',
      audioSrc: '/music/shut_up_and_dance.mp3',
      image: 'https://i.scdn.co/image/ab67616d0000b27343294cfa2688055c9d821bf3',
    },
    {
      title: 'Ho Hey',
      artist: 'The Lumineers',
      audioSrc: '/music/ho_hey.mp3',
      image: 'https://i.scdn.co/image/ab67616d0000b273b23ded2daf5be916f9759077',
    },
    {
      title: 'Walking on a Dream',
      artist: 'Empire of the Sun',
      audioSrc: '/music/walking_on_a_dream.mp3',
      image: 'https://i.scdn.co/image/ab67616d0000b273cba2ced72e7bca015df64dcc',
    },
    {
      title: 'I Will Wait',
      artist: 'Mumford & Sons',
      audioSrc: '/music/i_will_wait.mp3',
      image: 'https://i.scdn.co/image/ab67616d0000b27383f859512262378f2aa50a22',
    },
    {
      title: 'Ocean Eyes',
      artist: 'Billie Eilish',
      audioSrc: '/music/ocean_eyes.mp3',
      image: 'https://i.scdn.co/image/ab67616d0000b273a9f6c04ba168640b48aa5795',
    },
    {
      title: 'Some Nights',
      artist: 'fun.',
      audioSrc: '/music/some_nights.mp3',
      image: 'https://i.scdn.co/image/ab67616d0000b273e89e0d90d786d37fb6d5d84f',
    },
    {
      title: 'Stressed Out',
      artist: 'Twenty One Pilots',
      audioSrc: '/music/stressed_out.mp3',
      image: 'https://i.scdn.co/image/ab67616d0000b273de03bfc2991fd5bcfde65ba3',
    },
    {
      title: 'To Me',
      artist: 'Alina Baraz',
      audioSrc: '/music/to_me.mp3',
      image: 'https://i.scdn.co/image/ab67616d0000b273853d572fe2eb13f70bad74dd',
    },
    {
      title: 'Still Dreaming',
      artist: 'Raveena',
      audioSrc: '/music/still_dreaming.mp3',
      image: 'https://i.scdn.co/image/ab67616d0000b273825d2628545eaea03bf9672f',
    },
    {
      title: 'Jupiter',
      artist: 'The Marias',
      audioSrc: '/music/jupiter.mp3',
      image: 'https://i.scdn.co/image/ab67616d0000b273e3e6a00e091d1a83ef701d82',
    },
    {
      title: 'Should Have Known Better',
      artist: 'Sufjan Stevens',
      audioSrc: '/music/should_have_known_better.mp3',
      image: 'https://i.scdn.co/image/ab67616d0000b273bae3f4c197b1aa2fa828402a',
    },
    {
      title: 'MONACO',
      artist: 'Bad Bunny',
      audioSrc: '/music/MONACO.mp3',
      image: 'https://is1-ssl.mzstatic.com/image/thumb/Music116/v4/13/21/22/132122a1-2ef2-381b-94b6-7b9449dcaa4a/197190137897.jpg/1200x1200bf-60.jpg',
    },
    {
      title: 'Radio',
      artist: 'Lana Del Rey',
      audioSrc: '/music/radio.mp3',
      image: 'https://i.scdn.co/image/ab67616d0000b273f894be72a77b1488292672c7',
    },
    {
      title: 'Baby Blue',
      artist: 'King Krule',
      audioSrc: '/music/baby_blue.mp3',
      image: 'https://f4.bcbits.com/img/a2247132523_65',
    },
  ];
  
  export default musicList;
  