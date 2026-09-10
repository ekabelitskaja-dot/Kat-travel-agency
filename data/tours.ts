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
  groupSize: string;
  price: number;
  categories: TourCategory[];
  highlights: string[];
  included: Array<string | {title: string; description: string}>;
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
    tagline: 'Two very different worlds. One unforgettable morning.',
    description: 'What if you could swim with **green sea turtles** in the Caribbean and then trade the salty sea for a **crystal-clear cenote** in the Maya jungle, all before lunch?\n\nJoin me for this exciting snorkeling adventure that\'s perfect for **all ages!**\n\nFIRST STOP: TURTLE BAY\n\nWe\'ll start our morning bright and early, aiming to be among the first visitors at Turtle Bay, avoiding the crowds and the midday heat. The sea is usually calmer in the morning, giving us some of the best conditions for swimming and snorkeling.\n\n**First-time snorkeler? No problem!** I\'ll share all the tips and tricks you need to feel comfortable and relaxed in the water and actually **enjoy** this unique experience.\n\nWe\'ll swim out from the beach in search of majestic green sea turtles in their **natural habitat**. You\'ll get to swim alongside one of the most ancient creatures on our planet! And if we\'re lucky, we might even catch them enjoying their breakfast!\n\nI\'ll share all the interesting facts about these magnificent creatures, as well as some of the ways you can actively contribute to the **conservation and protection** of sea turtles.\n\nTHEN, INTO THE MAYA JUNGLE\n\nAfter swimming in the salty waters of the Caribbean Sea, we\'ll head into the Maya jungle, where we\'ll swap the sea for the cool, crystal-clear waters of a cenote. You\'ll have a chance to **swim and snorkel**, enjoy the jungle around you, and, of course, I\'ll tell you stories about why cenotes were so important to the Maya and why they are such a special part of this region.\n\nTwo completely different environments, one morning, and plenty to discover along the way.\n\n**Ready to come explore with me?**',
    duration: '5 hours',
    groupSize: 'Up to 10',
    price: 562,
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
    description: 'Come with me into the Maya jungle, where local communities, wildlife, ancient traditions, and a little adventure are waiting.\n\nDuring our expedition, we\'ll visit a nature reserve run by local Maya families, where the experience starts with a traditional purification ceremony held by a local shaman. After this, we\'ll venture into the jungle in search of spider monkeys and howler monkeys that live freely in this protected area.\n\nAnd yes, finding monkeys in the jungle requires a little patience, a good eye, and a bit of luck. They are wild animals, after all, and they definitely did not check our itinerary before coming to work.\n\nAfter our serene walk through the jungle, we\'ll pick up the pace with an exciting zip line ride before slowing things down again with a relaxing canoe ride across the calm waters of the beautiful lagoon. Take in the beauty around you and enjoy the freshness of the water.\n\nNext, we\'ll head underground!\n\nWe\'ll rappel into a magnificent cave cenote, where you can cool off in the refreshing water and experience the mystical beauty of the Maya underworld. I\'ll share the story behind how these cenotes were formed and why they continue to hold such an important place in Maya culture.\n\nWe\'ll also explore the ancient Maya city of Coba, where you can walk, ride a bicycle, or take a pedicab through the jungle while discovering the archaeological remains of this once-thriving city.\n\nAs we explore, I\'ll share stories about the Maya civilization, from fascinating facts to the theories and mysteries that still surround this ancient culture. If you\'re a history enthusiast, bring your favorite documentary, book, or theory. I\'d love to hear what you think.\n\nMaya history, living traditions, jungle wildlife, adventure, and the magical world beneath the Yucatan Peninsula.\n\nIf that sounds like your kind of adventure, let\'s talk.',
    duration: '8 hours',
    groupSize: 'Up to 10',
    price: 637,
    categories: ['full-day', 'adventure', 'history-ruins'],
    highlights: [
      'Hang out with free-roaming spider monkeys at a wildlife sanctuary',
      'Climb the Cobá pyramid - one of the few still open to visitors',
      'Zip line through dense jungle canopy',
      'Cool off with a cenote swim at the end of the day',
      'Everything included - transport, fees, gear'
    ],
    included: ['Private transport', 'All entrance fees', 'Zip line', 'Guide'],
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
    name: 'Tulum Cenote',
    tagline: 'Tulum is where Maya history meets the Caribbean. Cenotes take us into the Maya underworld, hidden beneath the jungle in a world of crystal-clear water, ancient beliefs, and a little mystery.',
    description: 'We\'ll start our day early, heading to Tulum before the crowds and the midday heat arrive. Perched dramatically above the Caribbean, Tulum is one of the most picturesque Maya archaeological sites in the region. But there\'s much more to it than a beautiful view. As we wander through the ancient city, I\'ll share the stories, mysteries, and fascinating details that bring this remarkable place to life.\n\nFrom the ancient city, we\'ll venture into the Maya jungle to discover one of the region\'s beautiful freshwater cenotes. For the Maya, these natural pools are much more than places to find fresh water. They are sacred places, deeply connected to their beliefs and their relationship with the natural world. Cenotes remain an essential part of the landscape and culture of the Yucatan Peninsula.\n\nNow comes the refreshing part! We\'ll explore the cenote from the inside, swimming and snorkeling through its crystal-clear waters. I\'ll make sure everyone knows what to do with the snorkeling equipment and feels ready to explore, whether you\'re a pro snorkeler or this is your first time exploring beneath the surface.\n\nIt\'s a morning filled with ancient history, jungle landscapes, Caribbean views, and underwater exploration. You\'ll be back at your hotel around lunchtime, with the rest of the day completely yours. Perhaps a lazy afternoon on the beach sounds about right?\n\nReady to discover Tulum from a different perspective?',
    duration: '6 hours',
    groupSize: 'Up to 10',
    price: 556,
    categories: ['half-day', 'history-ruins', 'water-cenotes'],
    highlights: [
      'Tulum cliff-top ruins with views of the Caribbean Sea',
      'Enough time to actually explore - not a rushed walk-through',
      'Swim in a cenote with otherworldly cave lighting',
      'Private transport door-to-door',
      'All entrance fees included'
    ],
    included: ['Private transport', 'Entrance fees', 'Guide', 'All fees'],
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
    name: 'Jungle Play Day',
    tagline: 'What happens when the jungle becomes your playground?',
    description: 'Get ready for a day filled with adventure, crystal-clear cenotes, and a glimpse into modern Maya life.\n\nFollow me on an exhilarating zip line ride over the water, then slow things down with a tranquil canoe journey through one of the area\'s largest open-air cenotes. We\'ll take in the jungle from the water before heading to another breathtaking cenote, where you can swim in its crystal-clear waters and, if you\'re feeling brave, take the plunge with a cliff jump!\n\nBut this experience is about more than adventure.\n\nAs we explore the area, I\'ll share stories about modern Maya life, the community, and some of the traditions that are still part of everyday life today. We\'ll see local homes and visit a small community shop where handmade souvenirs are produced locally.\n\nAfter all that adventure, we\'ll sit down for a traditional lunch prepared by the locals, with the kind of homemade food that makes you very happy you worked up an appetite.\n\nIt\'s a morning that brings together adventure, nature, culture, and great local food, with a chance to experience a side of the Riviera Maya that goes beyond the beach and the resorts.\n\nSounds like your kind of day? Let\'s talk.',
    duration: '4.5 hours',
    groupSize: 'Up to 10',
    price: 594,
    categories: ['half-day', 'water-cenotes'],
    highlights: [
      'Three cenotes - open, cave, and semi-open - each completely different',
      'Swimming and snorkeling at each stop',
      'Back at your hotel before midday',
      'All gear provided',
      'Private transport included'
    ],
    included: ['Private transport', 'Entrance fees', 'Snorkel gear', 'Guide'],
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
    slug: 'half-day-jungle-adventure',
    name: 'Coba & The Maya Underworld',
    tagline: 'Step into the mystical world of the ancient Maya, then descend into the underworld for a very different kind of adventure.',
    description: 'Our journey takes us to Coba, an ancient Maya city hidden deep in the jungle. Here, we\'ll discover the ruins walking, riding a bicycle, or in a Maya limousine! You choose how you\'d like to explore, while I share with you the stories, beliefs, and mysteries that make this place feel so different from the better-known Maya sites.\n\nOnce we\'ve explored the ancient city, we\'ll leave it behind and head underground to visit a local cenote.\n\nIn the Maya worldview, cenotes are sacred places connected to Xibalba, the underworld, and they continue to hold deep spiritual and cultural significance for Maya communities today. These extraordinary natural formations, with their crystal-clear waters and mysterious underground atmosphere, offer us a chance to experience something truly unique. And if you\'re feeling brave, there\'s even the option for a cliff jump!\n\nAnd if all that exploring makes you hungry and you don\'t want to ride back on an empty stomach, I\'ll be happy to recommend my favorite local restaurants and the most traditional dishes according to your dietary preferences. You pay for what you choose, with no fixed menu or package price. Your vacation, your appetite, your choice.\n\nIt\'s a day of ancient mysteries, jungle exploration, sacred waters, and a little local flavor along the way.\n\nReady to discover the Maya world with me?',
    duration: '5 hours',
    groupSize: 'Up to 10',
    price: 567,
    categories: ['half-day', 'adventure', 'water-cenotes'],
    highlights: [
      'Jungle zip line with views across the canopy',
      'Canoe through untouched jungle - no motors, no noise',
      'Cliff jump into a crystal-clear cenote (optional but worth it)',
      'All equipment and safety gear included',
      'Hotel pickup and drop-off included'
    ],
    included: ['Private transport', 'All equipment', 'Safety gear', 'Guide', 'All fees'],
    video: {
      src: '/videos/underworld/gx011005.mp4',
      poster: '/photos/underworld/admiring-the-cave.jpg'
    },
    image: {
      src: '/photos/underworld/admiring-the-cave.jpg',
      alt: 'Guest admiring the vaulted ceiling of a cave cenote'
    },
    gallery: [
      {
        src: '/photos/underworld/beautiful-colors.jpg',
        alt: 'Deep blues and greens of the water inside a cenote'
      },
      {
        src: '/photos/underworld/img_6301.jpg',
        alt: 'Light falling through the opening of an underground cenote'
      },
      {
        src: '/photos/underworld/img_2624.jpg',
        alt: 'Still, mirror-clear water deep inside a cave cenote'
      },
      {
        src: '/photos/underworld/img_3733.jpg',
        alt: 'Stalactites hanging over the water of the Maya underworld'
      },
      {
        src: '/photos/underworld/img_4443.jpg',
        alt: 'Swimming in the cool water beneath the jungle floor'
      },
      {
        src: '/photos/underworld/img_4485.jpg',
        alt: 'Cavern cenote lit by a single shaft of daylight'
      },
      {
        src: '/photos/underworld/admiring-the-cave.jpg',
        alt: 'Video: img_4488',
        video: '/videos/underworld/img_4488.mp4'
      }
    ]
  }
];

export function getTourBySlug(slug: string) {
  return tours.find((t) => t.slug === slug);
}
