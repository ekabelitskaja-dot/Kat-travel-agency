export type TourCategory =
  | 'half-day'
  | 'full-day'
  | 'adventure'
  | 'history-ruins'
  | 'water-cenotes';

export type Tour = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  duration: string;
  /** Short line on the tour card and info bar, in place of transport. */
  focus?: string;
  groupSize: string;
  price: number;
  /** USD per person for group sizes 1–10. */
  pricePerPerson?: Array<number | null>;
  categories: TourCategory[];
  highlights: string[];
  included: Array<string | {title: string; description: string}>;
  goodToKnow?: {title: string; description: string}[];
  whatToBring?: {title: string; description?: string}[];
  /** Closing line after the itinerary, above Talk to Kat. */
  readyLine?: string;
  itinerary?: {
    title: string;
    note?: string;
    stops: Array<{time: string; place: string; description: string}>;
  };
  image: {
    src: string;
    alt: string;
  };
  /**
   * Optional looping background video for the page hero. `poster` is the frame
   * shown before it plays and the fallback when motion is reduced.
   * `objectPosition` tunes the crop - it matters for portrait footage, where a
   * full-bleed hero can only show a horizontal band of the frame.
   */
  video?: {
    src: string;
    poster: string;
    objectPosition?: string;
  };
  gallery: Array<{
    /** Still image. When `video` is set this doubles as the poster frame. */
    src: string;
    alt: string;
    /**
     * Optional looping clip for this tile. `objectPosition` tunes the crop,
     * which matters for portrait footage in a landscape tile.
     */
    video?: string;
    objectPosition?: string;
  }>;
};

// TODO: Replace with real photos for each tour.
export const tours: Tour[] = [
  {
    slug: 'half-day-snorkeling-adventure',
    name: 'Snorkeling Adventure',
    tagline: 'Two very different worlds.\nOne unforgettable morning.',
    description: 'What if you could swim with **green sea turtles** in the Caribbean and then trade the salty sea for a **crystal-clear cenote** in the Maya jungle, all before lunch?\n\nJoin me for this exciting snorkeling adventure that\'s perfect for **all ages!**\n\nFIRST STOP: TURTLE BAY\n\nWe\'ll start our morning bright and early, aiming to be among the first visitors at Turtle Bay, avoiding the crowds and the midday heat. The sea is usually calmer in the morning, giving us some of the best conditions for swimming and snorkeling.\n\n**First-time snorkeler? No problem!** I\'ll share all the tips and tricks you need to feel comfortable and relaxed in the water and actually **enjoy** this unique experience.\n\nWe\'ll swim out from the beach in search of majestic green sea turtles in their **natural habitat**. You\'ll get to swim alongside one of the most ancient creatures on our planet! And if we\'re lucky, we might even catch them enjoying their breakfast!\n\nI\'ll share all the interesting facts about these magnificent creatures, as well as some of the ways you can actively contribute to the **conservation and protection** of sea turtles.\n\nTHEN, INTO THE MAYA JUNGLE\n\nAfter swimming in the salty waters of the Caribbean Sea, we\'ll head into the Maya jungle, where we\'ll swap the sea for the cool, crystal-clear waters of a cenote. You\'ll have a chance to **swim and snorkel**, enjoy the jungle around you, and, of course, I\'ll tell you stories about why cenotes are so important to the Maya and why they are such a special part of this region.\n\nTwo completely different environments, one morning, and plenty to discover along the way.',
    duration: '5 hours',
    focus: 'Sea Turtles & Jungle Cenotes',
    groupSize: 'Up to 10',
    price: 562,
    pricePerPerson: [350, 205, 155, 140, 130, 115, 105, 100, 95, 90],
    categories: ['half-day', 'water-cenotes'],
    highlights: [
      'Swim alongside wild green sea turtles in their natural habitat',
      'Float through a stunning, crowd-free natural cenote',
      'Small group - just your people, no strangers',
      'All snorkel gear provided, nothing to rent or carry',
      'Hotel pickup and drop-off included'
    ],
    included: [
      {
        title: 'Your private, air-conditioned transportation',
        description: 'Comfortable transportation throughout the day.'
      },
      {
        title: 'Your private guide, of course',
        description: "That would be me. I'll be with you throughout the experience."
      },
      {
        title: 'Water and snacks',
        description: "Because exploring is better when you're properly fueled."
      },
      {
        title: 'All entrance fees',
        description: 'Everything covered, so there are no surprises along the way.'
      },
      {
        title: 'Hand-washed snorkeling equipment',
        description: 'I personally wash and prepare all the snorkeling equipment before your adventure.'
      },
      {
        title: 'Life jackets',
        description: 'For comfort and an extra bit of support in the water.'
      }
    ],
    goodToKnow: [
      {
        title: 'All ages are welcome',
        description:
          "This adventure is suitable for all ages, although I recommend it for children around 4–5 years and up. And if your little ones love the water, even better. They're going to have a blast!"
      },
      {
        title: "You don't have to be a competitive swimmer",
        description:
          "Basic swimming skills will come in handy, but you definitely don't need to be a pro. I'll make sure you're comfortable and know what to do before we head into the water."
      },
      {
        title: 'A little rain? No problem.',
        description:
          "A little rain doesn't stop us. In fact, swimming in the rain can be pretty magical. Lightning, however, means we take a coffee break."
      },
      {
        title: 'Sunblock-free zones',
        description:
          "Akumal Bay and the cenotes are beautiful places, and we'd like to keep them that way. Sunscreen isn't allowed in either. Yes, even reef-friendly ones. Don't worry, I'll help you plan around the sun so you can stay comfortable while keeping the water clean and wildlife-friendly."
      },
      {
        title: 'What to wear instead',
        description:
          'For the best protection from the sun, long-sleeve rash guards, lightweight shirts, and long pants are your best friends.'
      }
    ],
    whatToBring: [
      {
        title: 'Swimsuit and a towel',
        description: 'A pretty good place to start.'
      },
      {
        title: 'Rash guard or light long-sleeve shirt',
        description: 'For the sun in Akumal and the occasional mosquito in the jungle.'
      },
      {
        title: 'Flip-flops or water shoes',
        description: 'For a little walking and exploring.'
      },
      {
        title: 'A set of dry clothes',
        description: 'For a comfortable ride back.'
      },
      {
        title: 'And of course... your adventurous spirit.',
        description: 'For... well, you knew that!'
      }
    ],
    itinerary: {
      title: 'Your day at a glance',
      note: 'Times are approximate and can vary a little depending on your pace, traffic, weather, and conditions.',
      stops: [
        {
          time: '7:00 AM',
          place: 'Hotel pickup',
          description:
            "I'll pick you up at your hotel in a comfortable, air-conditioned vehicle, with chilled water and snacks ready for the road."
        },
        {
          time: '8:00 AM',
          place: 'Akumal Bay',
          description:
            'We start in the Caribbean while the day is still fresh and the crowds are lighter. Time to snorkel and keep an eye out for green sea turtles.'
        },
        {
          time: '10:00 AM',
          place: 'Cenote',
          description:
            'Then we trade the salty sea for the jungle and cool off in a crystal-clear Maya cenote.'
        },
        {
          time: '1:00 PM',
          place: 'Back to your hotel',
          description:
            "After a morning of turtles, jungle and cenote water, we head back. Relax, dry off and let the day's adventures sink in."
        }
      ]
    },
    video: {
      src: '/videos/snorkeling/akumal-sea-turtle.mp4',
      poster: '/photos/snorkeling/green-sea-turtle-akumal.jpg'
    },
    image: {
      src: '/photos/snorkeling/green-sea-turtle-akumal.jpg',
      alt: 'Green sea turtle gliding through clear Caribbean water at Akumal'
    },
    gallery: [
      {
        src: '/photos/snorkeling/family-snorkeling-akumal.jpg',
        alt: 'Family in life jackets snorkelling together in the shallows at Akumal'
      },
      {
        src: '/photos/snorkeling/snorkeling-akumal-mexico.jpg',
        alt: 'Snorkeller floating face-down over the seagrass beds of Akumal bay'
      },
      {
        src: '/photos/snorkeling/akumal-bay-sea-turtle.jpg',
        alt: 'Sea turtle feeding on the seabed in Akumal bay'
      },
      {
        src: '/photos/snorkeling/snorkeling-akumal-mexico-1.jpg',
        alt: 'Snorkellers swimming out from the beach into the open bay'
      },
      {
        src: '/photos/snorkeling/akumal-bay-sea-turtle-1.jpg',
        alt: 'Green sea turtle surfacing for air in Akumal bay'
      },
      {
        src: '/photos/snorkeling/akumal-snorkeling-riviera-maya.jpg',
        alt: 'Guests snorkelling in the turquoise water of the Riviera Maya'
      },
      {
        src: '/photos/snorkeling/jungle-open-air-cenote.jpg',
        alt: 'Open-air cenote ringed by jungle, its water clear and still',
        video: '/videos/snorkeling/jungle-open-air-cenote.mp4'
      },
      {
        src: '/photos/snorkeling/open-cenote-riviera-maya.jpg',
        alt: 'Swimmer floating in the crystal-clear water of an open cenote'
      },
      {
        src: '/photos/snorkeling/underground-cenote-mexico.jpg',
        alt: 'Underground cenote lit from above, stalactites over deep blue water',
        video: '/videos/snorkeling/underground-cenote-mexico.mp4'
      },
      {
        src: '/photos/snorkeling/underground-cenote-riviera-maya.jpg',
        alt: 'Cave cenote in the Riviera Maya with light falling through the opening'
      },
      {
        src: '/photos/snorkeling/green-sea-turtle-akumal.jpg',
        alt: 'Video: cave cenote riviera maya',
        video: '/videos/snorkeling/cave-cenote-riviera-maya.mp4'
      },
      {
        src: '/photos/snorkeling/green-sea-turtle-akumal.jpg',
        alt: 'Video: green turtle snorkeling riviera maya',
        video: '/videos/snorkeling/green-turtle-snorkeling-riviera-maya.mp4'
      },
      {
        src: '/photos/snorkeling/green-sea-turtle-akumal.jpg',
        alt: 'Video: sea turtle snorkeling akumal 1',
        video: '/videos/snorkeling/sea-turtle-snorkeling-akumal-1.mp4'
      },
      {
        src: '/photos/snorkeling/green-sea-turtle-akumal.jpg',
        alt: 'Video: sea turtle snorkeling akumal',
        video: '/videos/snorkeling/sea-turtle-snorkeling-akumal.mp4'
      }
    ]
  },
  {
    slug: 'monkey-sanctuary-coba-ruins',
    name: 'Jungle Expedition',
    tagline: 'Ready to trade the beach for the jungle?',
    readyLine: "If that sounds like your kind of adventure, let's talk.",
    description: 'Come with me into the Maya jungle, where **local communities**, **wildlife**, **ancient traditions**, and a little adventure are waiting.\n\nINTO THE JUNGLE\n\nDuring our expedition, we\'ll visit a nature reserve run by local Maya families, where the experience starts with a **traditional purification ceremony** held by a local shaman. After this, we\'ll venture into the jungle in search of **spider monkeys and howler monkeys** that live freely in this protected area.\n\nAnd yes, finding monkeys in the jungle requires a little patience, a good eye, and a bit of luck. They are **wild animals**, after all, but don\'t worry, the locals know a few ways to say hello.\n\nAfter our serene walk through the jungle, we\'ll pick up the pace with an exciting **zip line ride** before slowing things down again with a relaxing **canoe ride** across the calm waters of the beautiful lagoon. Take in the beauty around you and enjoy the freshness of the water.\n\nNext, we\'ll head underground!\n\nWe\'ll rappel into a magnificent **cave cenote**, where you can cool off in the refreshing water and experience the mystical beauty of the **Maya underworld**. I\'ll share the story behind how these cenotes were formed and why they continue to hold such an important place in Maya culture.\n\nTHEN, TO COBA\n\nWe\'ll also explore the ancient Maya city of Coba, where you can **walk, ride a bicycle, or take a pedicab** through the jungle while discovering the archaeological remains of this once-thriving city.\n\nAs we explore, I\'ll share stories about the Maya civilization, from fascinating facts to the theories and mysteries that still surround this ancient culture. If you\'re a **history enthusiast**, bring your favorite documentary, book, or theory. I\'d love to hear what you think.\n\nMaya history, living traditions, jungle wildlife, adventure, and the magical world beneath the Yucatan Peninsula.',
    duration: '8 hours',
    focus: 'Wild Monkeys & Coba Ruins',
    groupSize: 'Up to 10',
    price: 637,
    pricePerPerson: [390, 230, 175, 165, 150, 135, 125, 120, 115, 110],
    categories: ['full-day', 'adventure', 'history-ruins'],
    highlights: [
      'Hang out with free-roaming spider monkeys at a wildlife sanctuary',
      'Climb the Cobá pyramid - one of the few still open to visitors',
      'Zip line through dense jungle canopy',
      'Cool off with a cenote swim at the end of the day',
      'Everything included - transport, fees, gear'
    ],
    included: [
      {
        title: 'Your private, air-conditioned transportation',
        description: 'Comfortable transportation throughout the day.'
      },
      {
        title: 'Your private guide, of course',
        description: "That would be me. I'll be with you throughout the experience."
      },
      {
        title: 'Water and snacks',
        description: "Because exploring is better when you're properly fueled."
      },
      {
        title: 'All entrance fees',
        description: 'Everything covered, so there are no surprises along the way.'
      },
      {
        title: 'Life jackets',
        description: 'For the rappel into the cenote, and a little extra support in the water.'
      }
    ],
    goodToKnow: [
      {
        title: 'A little jungle walking',
        description:
          "There's some walking on uneven jungle ground, so comfortable shoes and reasonable mobility will make things easier. No extreme hiking required!"
      },
      {
        title: 'Little ones are welcome',
        description:
          "There's no strict age limit, but I generally recommend this adventure for children around 4–5 years and up. You know your little explorer best!"
      },
      {
        title: 'Let the monkeys do their thing',
        description:
          "We're observing wild animals in their natural environment, so please don't bring food for them. Let's keep them wild."
      },
      {
        title: 'A little rain? Bring it on.',
        description:
          'Rain is part of jungle life and can make the experience even more magical. If it gets a little too enthusiastic, there are covered areas where we can take shelter until it passes.'
      }
    ],
    whatToBring: [
      {
        title: 'Comfortable shoes',
        description: 'For hiking jungles and climbing temples.'
      },
      {
        title: 'Lightweight, comfortable clothes',
        description:
          'Something light that covers your arms and legs will help with the occasional jungle mosquito.'
      },
      {
        title: 'Sunglasses and a hat',
        description: 'In case the sun finds its way through the treetops.'
      },
      {
        title: 'Sunblock and mosquito repellent',
        description:
          'I always recommend covering up with clothing first, but if you prefer to use these, feel free to bring them along.'
      },
      {
        title: 'Swimsuit and towel',
        description: 'If you feel adventurous enough for the rappel into the cenote!'
      },
      {
        title: 'Dry clothes',
        description: 'For a comfortable ride back after your jungle adventures.'
      },
      {
        title: 'Your curiosity and spirit for adventure!',
        description: "The rest, I'll take care of."
      }
    ],
    itinerary: {
      title: 'Your day at a glance',
      note: 'Times are approximate and can vary a little depending on your pace, traffic, weather, and conditions.',
      stops: [
        {
          time: '7:00 AM',
          place: 'Hotel pickup',
          description:
            "I'll pick you up at your hotel in a comfortable, air-conditioned vehicle, with chilled water and snacks ready for the road."
        },
        {
          time: '8:30 AM',
          place: 'Jungle reserve',
          description:
            'A welcome from local Maya families, a traditional purification ceremony, then into the trees in search of spider monkeys and howlers.'
        },
        {
          time: '10:30 AM',
          place: 'Zip line & canoe',
          description:
            'A ride through the canopy, then a slower paddle across the lagoon. Two speeds, same jungle.'
        },
        {
          time: '11:30 AM',
          place: 'Cave cenote',
          description:
            'We rappel into the Maya underworld and cool off in the water below. I will tell you how these places were formed, and why they still matter.'
        },
        {
          time: '1:00 PM',
          place: 'Coba',
          description:
            'Walk, bike, or take a pedicab through the ancient city. Bring your theories. I would love to hear them.'
        },
        {
          time: '3:00 PM',
          place: 'Back to your hotel',
          description:
            'An 8-hour day of jungle, water, and ruins. Time to rest and let it all settle.'
        }
      ]
    },
    video: {
      src: '/videos/coba/monkey-watching-riviera-maya.mp4',
      poster: '/photos/coba/monkey-watching-riviera-maya.jpg'
    },
    image: {
      src: '/photos/coba/monkey-watching-riviera-maya.jpg',
      alt: 'Spider monkey moving through the canopy of the Maya jungle'
    },
    gallery: [
      {
        src: '/photos/coba/traditional-maya-ceremony-mexico.jpg',
        alt: 'Local shaman leading a traditional Maya purification ceremony'
      },
      {
        src: '/photos/coba/wildlife-maya-jungle-mexico.jpg',
        alt: 'Wildlife spotted along the jungle trail inside the reserve'
      },
      {
        src: '/photos/coba/zipline-maya-jungle-mexico.jpg',
        alt: 'Zip line ride over the jungle canopy'
      },
      {
        src: '/photos/coba/maya-jungle-riviera-maya.jpg',
        alt: 'Dense Maya jungle inside the protected nature reserve',
        video: '/videos/coba/maya-jungle-riviera-maya.mp4'
      },
      {
        src: '/photos/coba/underground-cenote-riviera-maya.jpg',
        alt: 'Rappelling down into a cave cenote, the Maya underworld'
      },
      {
        src: '/photos/coba/ancient-coba-ruins-maya-mexico.jpg',
        alt: 'Ancient stone structures of the Maya city of Coba'
      },
      {
        src: '/photos/coba/coba-maya-ruins.jpg',
        alt: 'Maya ruins at Coba standing among the jungle trees'
      },
      {
        src: '/photos/coba/coba-ruins-riviera-maya.jpg',
        alt: 'Jungle path leading through the archaeological site of Coba',
        video: '/videos/coba/coba-ruins-riviera-maya.mp4'
      },
      {
        src: '/photos/coba/kat-guiding-coba-ruins.jpg',
        alt: 'Kat guiding guests through the ruins of Coba'
      },
      {
        src: '/photos/coba/kat-guiding-coba-ruins-1.jpg',
        alt: 'Kat explaining Maya history in front of a Coba structure'
      },
      {
        src: '/photos/coba/kat-guiding-coba-ruins-2.jpg',
        alt: 'Kat with guests exploring the ancient city of Coba'
      },
      {
        src: '/photos/coba/monkey-watching-riviera-maya.jpg',
        alt: 'Video: ziplining riviera maya mexico',
        video: '/videos/coba/ziplining-riviera-maya-mexico.mp4'
      }
    ]
  },
  {
    slug: 'tulum-cenote-half-day',
    name: 'Tulum & The Sacred Cenote',
    tagline: 'Where Maya history meets the Caribbean and descends into the mysterious underworld.',
    readyLine: 'Ready to discover Tulum from a different perspective?',
    description: 'We\'ll start our day early, heading to Tulum **before the crowds** and the midday heat arrive. Perched dramatically above the Caribbean, Tulum is one of the most **picturesque Maya archaeological sites** in the region. But there\'s much more to it than a beautiful view. As we wander through the ancient city, I\'ll share the **stories and mysteries** that bring this remarkable place to life.\n\nTHEN, INTO THE MAYA JUNGLE\n\nFrom the ancient city, we\'ll venture into the Maya jungle to discover one of the region\'s beautiful **freshwater cenotes**. For the Maya, these natural pools are much more than places to find fresh water. They are **sacred places**, deeply connected to their beliefs and their relationship with the natural world. Cenotes remain an essential part of the landscape and culture of the Yucatan Peninsula.\n\nNow comes the refreshing part! We\'ll explore the cenote from the inside, **swimming and snorkeling** through its **crystal-clear waters**. I\'ll make sure everyone knows what to do with the snorkeling equipment and feels ready to explore, whether you\'re a pro snorkeler or this is your **first time** exploring beneath the surface.\n\nIt\'s a morning filled with **ancient history**, jungle landscapes, Caribbean views, and underwater exploration. You\'ll be back at your hotel around lunchtime, with the rest of the day completely yours. Perhaps a lazy afternoon on the beach sounds about right?',
    duration: '6 hours',
    focus: 'Before the crowds arrive',
    groupSize: 'Up to 10',
    price: 556,
    pricePerPerson: [320, 180, 135, 130, 120, 110, 100, 95, 90, 85],
    categories: ['half-day', 'history-ruins', 'water-cenotes'],
    highlights: [
      'Tulum cliff-top ruins with views of the Caribbean Sea',
      'Enough time to actually explore - not a rushed walk-through',
      'Swim in a cenote with otherworldly cave lighting',
      'Private transport door-to-door',
      'All entrance fees included'
    ],
    included: [
      {
        title: 'Your private, air-conditioned transportation',
        description: 'Comfortable transportation throughout the day.'
      },
      {
        title: 'Your private guide, of course',
        description: "That would be me. I'll be with you throughout the experience."
      },
      {
        title: 'Water and snacks',
        description: "Because exploring is better when you're properly fueled."
      },
      {
        title: 'All entrance fees',
        description:
          'Tickets to the Jaguar Park and Tulum Ruins, as well as the entrance fee to the cenote.'
      },
      {
        title: 'Hand-washed snorkeling equipment',
        description: 'I personally wash and prepare all the snorkeling equipment before your adventure.'
      },
      {
        title: 'Life jackets',
        description: 'For comfort and an extra bit of support in the water.'
      }
    ],
    goodToKnow: [
      {
        title: 'All ages are welcome',
        description: 'This adventure is suitable for the whole family.'
      },
      {
        title: 'Plastic bottles stay behind',
        description:
          "Single-use plastic isn't allowed inside the Tulum ruins. Bring your reusable water bottle instead!"
      },
      {
        title: 'Sunscreen-free zones',
        description:
          "Sunscreen isn't allowed before swimming in the cenote. Bring long-sleeve rash guards instead."
      },
      {
        title: "Rain won't ruin our plans",
        description: 'A little rain is no problem. This tour is good to go in most weather conditions.'
      }
    ],
    whatToBring: [
      {
        title: 'Comfy shoes and clothes',
        description: 'For effortless exploration.'
      },
      {
        title: 'Hats and sunglasses',
        description: 'For the Caribbean sun.'
      },
      {
        title: 'Reusable water bottle',
        description: 'If this one is travelling with you.'
      },
      {
        title: 'Sunblock',
        description: 'For a little extra protection in Tulum.'
      },
      {
        title: 'Swimsuit and towel',
        description: 'For that refreshing cenote exploration.'
      },
      {
        title: 'A set of dry clothes',
        description: 'For a comfortable ride back.'
      },
      {
        title: 'Your desire for exploration!',
        description: "The rest, I'll take care of."
      }
    ],
    itinerary: {
      title: 'Your day at a glance',
      note: 'Times are approximate and can vary a little depending on your pace, traffic, weather, and conditions.',
      stops: [
        {
          time: '7:00 AM',
          place: 'Hotel pickup',
          description:
            "I'll pick you up at your hotel in a comfortable, air-conditioned vehicle, with chilled water and snacks ready for the road."
        },
        {
          time: '8:00 AM',
          place: 'Tulum ruins',
          description:
            'We arrive before the crowds and the midday heat. Time to walk the cliff-top city while the Caribbean is still quiet.'
        },
        {
          time: '10:00 AM',
          place: 'Cenote',
          description:
            'Then we leave the sea view behind and swim in a freshwater cenote. Snorkel gear is ready, first time or not.'
        },
        {
          time: '1:00 PM',
          place: 'Back to your hotel',
          description:
            'Back around lunchtime, with the rest of the day yours. A lazy afternoon on the beach would not be a bad idea.'
        }
      ]
    },
    video: {
      src: '/videos/tulum/cave-cenote-riviera-maya.mp4',
      poster: '/photos/tulum/tulum-ruins-riviera-maya.jpg'
    },
    image: {
      src: '/photos/tulum/tulum-ruins-riviera-maya.jpg',
      alt: 'The Maya ruins of Tulum perched above the Caribbean Sea'
    },
    gallery: [
      {
        src: '/photos/tulum/tulum-riviera-maya-mexico.jpg',
        alt: 'Tulum archaeological site with the turquoise sea behind it'
      },
      {
        src: '/photos/tulum/tulum-ruins-riviera-maya-1.jpg',
        alt: 'Stone temple at Tulum overlooking the coastline'
      },
      {
        src: '/photos/tulum/tulum-ruins-riviera-maya-2.jpg',
        alt: 'Ancient walls of the walled city of Tulum'
      },
      {
        src: '/photos/tulum/tulum-ruins-riviera-maya-3.jpg',
        alt: 'Maya structures at Tulum under an open blue sky'
      },
      {
        src: '/photos/tulum/tulum-private-tour-riviera-maya.jpg',
        alt: 'Guests on a private tour walking through the Tulum ruins',
        video: '/videos/tulum/tulum-private-tour-riviera-maya.mp4'
      },
      {
        src: '/photos/tulum/private-tour-riviera-maya.jpg',
        alt: 'Kat guiding a small private group through the site'
      },
      {
        src: '/photos/tulum/wildlife-maya-jungle-mexico.jpg',
        alt: 'Iguana resting on the warm stone of the ruins'
      },
      {
        src: '/photos/tulum/private-cenote-tour-riviera-maya.jpg',
        alt: 'Private cenote visit after the ruins, jungle all around'
      },
      {
        src: '/photos/tulum/underground-cenote-mexico.jpg',
        alt: 'Crystal-clear water inside an underground cenote',
        video: '/videos/tulum/underground-cenote-mexico.mp4'
      },
      {
        src: '/photos/tulum/underground-cenote-mexico-1.jpg',
        alt: 'Swimming and snorkelling in the cool water of a cave cenote'
      },
      {
        src: '/photos/tulum/tulum-ruins-riviera-maya.jpg',
        alt: 'Video: jungle open air cenote',
        video: '/videos/tulum/jungle-open-air-cenote.mp4'
      },
      {
        src: '/photos/tulum/tulum-ruins-riviera-maya.jpg',
        alt: 'Video: tulum private tour riviera maya 1',
        video: '/videos/tulum/tulum-private-tour-riviera-maya-1.mp4'
      },
      {
        src: '/photos/tulum/tulum-ruins-riviera-maya.jpg',
        alt: 'Video: tulum ruins riviera maya',
        video: '/videos/tulum/tulum-ruins-riviera-maya.mp4'
      }
    ]
  },
  {
    slug: 'three-cenotes-half-day',
    name: 'Jungle Playground',
    tagline: 'What happens when the jungle becomes your playground?',
    readyLine: "Sounds like your kind of day? Let's talk.",
    description: 'Get ready for a day filled with adventure, **crystal-clear cenotes**, and a glimpse into **modern Maya life**.\n\nADVENTURE FIRST\n\nFollow me on an exhilarating **zip line ride** over the water, then slow things down with a tranquil **canoe journey** through one of the area\'s largest **open-air cenotes**. We\'ll take in the jungle from the water before heading to another breathtaking cenote, where you can swim in its crystal-clear waters and, if you\'re feeling brave, take the plunge with a **cliff jump**!\n\nTHEN, A GLIMPSE INTO MAYA LIFE\n\nThere\'s more to this experience than adventure.\n\nAs we explore the area, I\'ll share stories about modern Maya life, the community, and some of the traditions that are still part of everyday life today. We\'ll see **local homes** and visit a small community shop where **handmade souvenirs** are produced locally.\n\nAfter all that adventure, we\'ll sit down for a **traditional lunch** prepared by the locals, with the kind of homemade food that makes you very happy you worked up an appetite.\n\nIt\'s a morning that brings together adventure, nature, culture, and great local food, with a chance to experience a side of the Riviera Maya that goes beyond the beach and the resorts.',
    duration: '4.5 hours',
    focus: 'Zip Line, Canoes & Cenotes',
    groupSize: 'Up to 10',
    price: 594,
    pricePerPerson: [345, 205, 160, 155, 145, 130, 120, 115, 110, 105],
    categories: ['half-day', 'water-cenotes'],
    highlights: [
      'Three cenotes - open, cave, and semi-open - each completely different',
      'Swimming and snorkeling at each stop',
      'Back at your hotel before midday',
      'All gear provided',
      'Private transport included'
    ],
    included: [
      {
        title: 'Your private, air-conditioned transportation',
        description: 'Comfortable transportation throughout the day.'
      },
      {
        title: 'Your private guide, of course',
        description: "That would be me. I'll be with you throughout the experience."
      },
      {
        title: 'Water and snacks',
        description: "Because exploring is better when you're properly fueled."
      },
      {
        title: 'All entrance fees',
        description: 'Your park admission.',
      },
      {
        title: 'Life jackets',
        description: 'For comfort and an extra bit of support in the water.'
      },
      {
        title: 'Traditional lunch',
        description: 'Delicious lunch prepared by the locals.'
      }
    ],
    goodToKnow: [
      {
        title: 'All ages are welcome',
        description:
          'This adventure is suitable for all ages, and little ones can even zip line together with their parents!'
      },
      {
        title: 'Some walking is involved',
        description:
          'A reasonable level of mobility is needed to enjoy a little walking along the lovely jungle paths.'
      },
      {
        title: 'Sunblock use',
        description:
          "Even though sunblock isn't allowed in the cenote, we can use it for the rest of the adventure."
      },
      {
        title: 'We flow with the weather',
        description:
          "A little rain or a little sunshine won't stop us. We simply go with it!"
      },
      {
        title: 'Any dietary restrictions?',
        description: 'Please let me know in advance.'
      }
    ],
    whatToBring: [
      {
        title: 'Swimsuit and a towel',
        description: "Let's cover the basics."
      },
      {
        title: 'Rash guard or light long-sleeve shirt',
        description: 'For the sun and the occasional mosquito in the jungle.'
      },
      {
        title: 'Sunglasses and a hat',
        description: 'We are on the Caribbean, after all...'
      },
      {
        title: 'Comfy flip-flops or water shoes',
        description: 'For a little walking and exploring.'
      },
      {
        title: 'A set of dry clothes',
        description: 'For a comfortable ride back.'
      },
      {
        title: 'And, as always... your adventurous spirit'
      }
    ],
    itinerary: {
      title: 'Your day at a glance',
      note: 'Times are approximate and can vary a little depending on your pace, traffic, weather, and conditions.',
      stops: [
        {
          time: '8:00 AM',
          place: 'Hotel pickup',
          description:
            "I'll pick you up at your hotel in a comfortable, air-conditioned vehicle, with chilled water and snacks ready for the road."
        },
        {
          time: '9:00 AM',
          place: 'Zip line & canoe',
          description:
            'Over the water first, then into a canoe on one of the largest open-air cenotes. Fast, then quiet.'
        },
        {
          time: '10:00 AM',
          place: 'Cenotes',
          description:
            'Swim, snorkel, and if you are feeling brave, a cliff jump. Open, cave, and in-between, each one a little different.'
        },
        {
          time: '11:30 AM',
          place: 'Maya village & lunch',
          description:
            'A look at local homes and a small community shop, then a traditional lunch cooked by the people who live here.'
        },
        {
          time: '1:00 PM',
          place: 'Back to your hotel',
          description:
            'A short, full morning. Home in time to nap, swim, or do absolutely nothing.'
        }
      ]
    },
    video: {
      src: '/videos/jungle-play/canoe-cenote-riviera-maya-1.mp4',
      poster: '/photos/jungle-play/ziplining-riviera-maya-mexico.jpg'
    },
    image: {
      src: '/photos/jungle-play/ziplining-riviera-maya-mexico.jpg',
      alt: 'Zip line ride out over the water of an open cenote'
    },
    gallery: [
      {
        src: '/photos/jungle-play/kat-guiding-jungle-ziplines.jpg',
        alt: 'Kat getting guests ready for the jungle zip line'
      },
      {
        src: '/photos/jungle-play/canoeing-jungle-cenote.jpg',
        alt: 'Canoe gliding across a large open-air cenote'
      },
      {
        src: '/photos/jungle-play/canoeing-jungle-cenote-1.jpg',
        alt: 'Paddling through the calm water of a jungle cenote'
      },
      {
        src: '/photos/jungle-play/canoeing-jungle-cenote-2.jpg',
        alt: 'Canoe ride surrounded by jungle on all sides'
      },
      {
        src: '/photos/jungle-play/open-cenote-riviera-maya.jpg',
        alt: 'Wide open cenote with clear water and jungle edges'
      },
      {
        src: '/photos/jungle-play/jungle-open-air-cenote.jpg',
        alt: 'Open-air cenote where guests swim and cliff jump'
      },
      {
        src: '/photos/jungle-play/maya-jungle-riviera-maya.jpg',
        alt: 'Jungle surrounding the cenotes of the Riviera Maya'
      },
      {
        src: '/photos/jungle-play/maya-lunch-riviera-maya.jpg',
        alt: 'Traditional Maya lunch prepared by the local community'
      },
      {
        src: '/photos/jungle-play/mexico-with-kat-private-tour.jpg',
        alt: 'Kat with guests on a private jungle day in Mexico'
      },
      {
        src: '/photos/jungle-play/ziplining-riviera-maya-mexico.jpg',
        alt: 'Video: canoe cenote riviera maya 2',
        video: '/videos/jungle-play/canoe-cenote-riviera-maya-2.mp4'
      },
      {
        src: '/photos/jungle-play/ziplining-riviera-maya-mexico.jpg',
        alt: 'Video: canoe cenote riviera maya',
        video: '/videos/jungle-play/canoe-cenote-riviera-maya.mp4'
      }
    ]
  },
  {
    slug: 'coba-and-the-maya-underworld',
    name: 'Coba & The Maya Underworld',
    tagline: 'Step into the mystical world of the ancient Maya, then descend into the underworld.',
    readyLine: 'Ready to discover the Maya world with me?',
    description: 'Our journey takes us to Coba, an **ancient Maya city** hidden deep in the jungle. Here, we\'ll discover the ruins **walking, riding a bicycle, or in a Maya limousine!** You choose how you\'d like to explore, while I share with you the **stories, beliefs, and mysteries** that make this place feel so different from the better-known Maya sites.\n\nTHE MAYA UNDERWORLD\n\nOnce we\'ve explored the ancient city, we\'ll leave it behind and **head underground** to visit a local cenote.\n\nIn the Maya worldview, cenotes are **sacred places** connected to **Xibalba, the underworld**, and they continue to hold deep spiritual and cultural significance for Maya communities today. These extraordinary natural formations, with their **crystal-clear waters** and mysterious underground atmosphere, offer us a chance to experience something truly unique. And if you\'re feeling brave, there\'s even the option for a **cliff jump**!\n\nLOCAL FLAVORS\n\nAnd if all that exploring makes you hungry and you don\'t want to ride back on an empty stomach, I\'ll be happy to recommend my **favorite local restaurants** and the most **traditional dishes** according to your dietary preferences. You pay for what you choose, with no fixed menu or package price. Your vacation, your appetite, your choice.\n\nIt\'s a day of ancient mysteries, jungle exploration, sacred waters, and a little local flavor along the way.',
    duration: '6 hours',
    focus: 'Bike the ruins and swim the cenote',
    groupSize: 'Up to 10',
    price: 567,
    pricePerPerson: [350, 190, 140, 135, 115, 100, 95, 85, 80, 75],
    categories: ['half-day', 'adventure', 'water-cenotes'],
    highlights: [
      'Jungle zip line with views across the canopy',
      'Canoe through untouched jungle - no motors, no noise',
      'Cliff jump into a crystal-clear cenote (optional but worth it)',
      'All equipment and safety gear included',
      'Hotel pickup and drop-off included'
    ],
    included: [
      {
        title: 'Your private, air-conditioned transportation',
        description: 'Comfortable transportation throughout the day.'
      },
      {
        title: 'Your private guide, of course',
        description: "That would be me. I'll be with you throughout the experience."
      },
      {
        title: 'Water and snacks',
        description: "Because exploring is better when you're properly fueled."
      },
      {
        title: 'All entrance fees',
        description: 'Admission to the ruins and the cenote.',
      },
      {
        title: 'Transportation inside Coba',
        description:
          "Whether you choose a bicycle or Maya limousine, I've got you covered."
      }
    ],
    goodToKnow: [
      {
        title: 'All ages are welcome',
        description: 'As always, this adventure is suitable for all ages.'
      },
      {
        title: 'Reasonable mobility is required',
        description: 'To go down a set of steps into the cenote.'
      },
      {
        title: 'No weather-dependent adventure',
        description:
          "A little rain or sunshine won't stop us. We simply go with the flow!"
      },
      {
        title: 'No sunblock in the cenote',
        description:
          "Not to worry about this one. We're completely covered inside the cave."
      }
    ],
    whatToBring: [
      {
        title: 'Comfortable shoes',
        description: 'For jungle exploring.'
      },
      {
        title: 'Light long-sleeve clothes',
        description: 'For the sun and jungle mosquitoes.'
      },
      {
        title: 'Sunglasses and a hat',
        description: 'For those first rays of sun.'
      },
      {
        title: 'Swimsuit and towel',
        description: 'To explore the cenote comfortably.'
      },
      {
        title: 'A set of dry clothes',
        description: 'For that comfy ride back.'
      },
      {
        title: 'The desire to explore!'
      }
    ],
    itinerary: {
      title: 'Your day at a glance',
      note: 'Times are approximate and can vary a little depending on your pace, traffic, weather, and conditions.',
      stops: [
        {
          time: '6:30 AM',
          place: 'Hotel pickup',
          description:
            "I'll pick you up at your hotel in a comfortable, air-conditioned vehicle, with chilled water and snacks ready for the road."
        },
        {
          time: '8:00 AM',
          place: 'Coba',
          description:
            'The jungle city, at your pace: walk, bike, or a Maya limousine. I will share the stories that make this place feel different from the better-known ruins.'
        },
        {
          time: '10:30 AM',
          place: 'Cenote',
          description:
            'Then we head underground. Sacred water, a little cool air, and a cliff jump if you want one.'
        },
        {
          time: '12:00 PM',
          place: 'Lunch',
          description:
            'If you are hungry on the way back, I will point you to my favorite local spots. Your appetite, your choice.'
        },
        {
          time: '2:00 PM',
          place: 'Back to your hotel',
          description:
            'If you are hungry on the way back, I will point you to my favorite local spots. Your appetite, your choice.'
        }
      ]
    },
    video: {
      src: '/videos/underworld/coba-ruins-riviera-maya-2.mp4',
      poster: '/photos/underworld/coba-ruins-riviera-maya-2.jpg'
    },
    image: {
      src: '/photos/underworld/coba-jungle-view-selfie.jpg',
      alt: 'Kat looking out over the Coba jungle from the top of the pyramid'
    },
    gallery: [
      {
        src: '/photos/underworld/coba-jungle-view-selfie.jpg',
        alt: 'Kat looking out over the Coba jungle from the top of the pyramid'
      },
      {
        src: '/photos/underworld/exploring-coba-maya-archaeological-site.jpg',
        alt: 'Walking past a stone temple at the Coba ruins'
      },
      {
        src: '/photos/underworld/kat-guiding-coba-ruins-mexico.jpg',
        alt: 'Kat guiding a guest at the base of a Coba pyramid'
      },
      {
        src: '/photos/underworld/biking-maya-jungle-mexico.jpg',
        alt: 'Riding bikes along the jungle path at Coba',
        video: '/videos/underworld/biking-maya-jungle-mexico.mp4'
      },
      {
        src: '/photos/underworld/kids-atop-coba-maya-temple.jpg',
        alt: 'Two kids sitting on the Coba pyramid, looking out over the jungle'
      },
      {
        src: '/photos/underworld/kat-guiding-coba-ruins.jpg',
        alt: 'Kat showing guests a carved stone at the Coba ruins'
      },
      {
        src: '/photos/underworld/coba-maya-temple-jungle-view.jpg',
        alt: 'The jungle and ball court seen from the top of a Coba pyramid'
      },
      {
        src: '/photos/underworld/coba-ruins-riviera-maya-2.jpg',
        alt: 'The ancient ball court at Coba, seen from above',
        video: '/videos/underworld/coba-ruins-riviera-maya-2.mp4'
      },
      {
        src: '/photos/underworld/coba-maya-ball-court.jpg',
        alt: 'The stone ball court at Coba, looking toward the jungle'
      },
      {
        src: '/photos/underworld/crystal-clear-water-underground-cenote-mexico.jpg',
        alt: 'Swimming in the clear water of an underground cenote'
      },
      {
        src: '/photos/underworld/floating-underground-cenote-mexico.jpg',
        alt: 'Floating in the turquoise water of an underground cenote'
      },
      {
        src: '/photos/underworld/cliff-jumping-into-cenote-coba-mexico.jpg',
        alt: 'Jumping from the rocks into a Coba cenote',
        video: '/videos/underworld/cliff-jumping-into-cenote-coba-mexico.mp4'
      }
    ]
  }
];

export function getTourBySlug(slug: string) {
  return tours.find((t) => t.slug === slug);
}
