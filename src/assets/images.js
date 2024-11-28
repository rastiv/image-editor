export const IMAGES = [
  {
    id: "20",
    author: "Aleks Dorohovich",
    width: 3670,
    height: 2462,
  },
  {
    id: "27",
    author: "Yoni Kaplan-Nadel",
    width: 3264,
    height: 1836,
  },
  {
    id: "35",
    author: "Shane Colella",
    width: 2758,
    height: 3622,
  },
  {
    id: "42",
    author: "Luke Chesser",
    width: 3456,
    height: 2304,
  },
  {
    id: "43",
    author: "Oleg Chursin",
    width: 1280,
    height: 831,
  },
  {
    id: "57",
    author: "Nicholas Swanson",
    width: 2448,
    height: 3264,
  },
  {
    id: "75",
    author: "Jessy Onyae",
    width: 1999,
    height: 2998,
  },
  {
    id: "78",
    author: "Paul Evens",
    width: 1584,
    height: 2376,
  },
  {
    id: "90",
    author: "Rula Sibai",
    width: 3000,
    height: 1992,
  },
  {
    id: "106",
    author: "Arvee Marie",
    width: 2592,
    height: 1728,
  },
  {
    id: "110",
    author: "Kenneth Thewissen",
    width: 5000,
    height: 3333,
  },
  {
    id: "163",
    author: "Lyhn Nguyen",
    width: 2000,
    height: 1333,
  },
].map((image) => ({
  ...image,
  thumbnail: `https://picsum.photos/id/${image.id}/200/200`,
  original: `https://picsum.photos/id/${image.id}/${image.width}/${image.height}`,
}));
