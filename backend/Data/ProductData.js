const products = [
  {
    name: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
    countInStock: 5,
    price: 15393,
    description:
      "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
    category: "men's clothing",
    image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
    rating: 2.5,
    brand: "ABC Brand",
    comment: "Very Best",
    numReviews: 120,
    reviews: [
      {
        name: "Admin",
        rating: 2.5,
        comment: "Love this product!",
      },
    ],
  },
  {
    name: "Mens Casual Premium Slim Fit T-Shirts",
    countInStock: 10,
    price: 3122,
    description:
      "Slim-fitting style, contrast raglan long sleeve, three-button henley placket, lightweight & soft fabric for breathable and comfortable wearing.",
    category: "men's clothing",
    image:
      "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg",
    rating: 3.5,
    brand: "Premium Brand",
    comment: "Very comfortable.",
    numReviews: 259,
    reviews: [
      {
        name: "Admin",
        rating: 3.5,
        comment: "Great fit and quality.",
      },
    ],
  },
  {
    name: "Mens Cotton Jacket",
    countInStock: 4,
    price: 7838.6,
    description:
      "Great outerwear jackets for Spring/Autumn/Winter, suitable for many occasions.",
    category: "men's clothing",
    image: "https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg",
    rating: 4.5,
    brand: "Cotton Wear",
    comment: "Perfect for cold weather.",
    numReviews: 500,
    reviews: [
      {
        name: "Admin",
        rating: 4.5,
        comment: "Warm and stylish.",
      },
    ],
  },
  {
    name: "Mens Casual Slim Fit",
    countInStock: 8,
    price: 2238.6,
    description:
      "The color could be slightly different between on the screen and in practice.",
    category: "men's clothing",
    image: "https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_.jpg",
    rating: 5,
    brand: "Slim Fit",
    comment: "Good quality for the price.",
    numReviews: 430,
    reviews: [
      {
        name: "Admin",
        rating: 5,
        comment: "Fits perfectly.",
      },
    ],
  },
  {
    name: "John Hardy Women's Legends Naga Gold & Silver Dragon Station Chain Bracelet",
    countInStock: 2,
    price: 97300,
    description:
      "From our Legends Collection, the Naga was inspired by the mythical water dragon that protects the ocean's pearl.",
    category: "jewelery",
    image: "https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_.jpg",
    rating: 4,
    brand: "John Hardy",
    comment: "Beautiful design.",
    numReviews: 400,
    reviews: [
      {
        name: "Admin",
        rating: 4,
        comment: "Exquisite craftsmanship.",
      },
    ],
  },
  {
    name: "Solid Gold Petite Micropave",
    countInStock: 3,
    price: 23520,
    description:
      "Satisfaction Guaranteed. Return or exchange any order within 30 days.",
    category: "jewelery",
    image: "https://fakestoreapi.com/img/61sbMiUnoGL._AC_UL640_QL65_ML3_.jpg",
    rating: 3,
    brand: "Micropave",
    comment: "Decent quality.",
    numReviews: 70,
    reviews: [
      {
        name: "Admin",
        rating: 3,
        comment: "Looks good but not worth the price.",
      },
    ],
  },
  {
    name: "White Gold Plated Princess",
    countInStock: 6,
    price: 1398.6,
    description:
      "Classic Created Wedding Engagement Solitaire Diamond Promise Ring for Her.",
    category: "jewelery",
    image: "https://fakestoreapi.com/img/71YAIFU48IL._AC_UL640_QL65_ML3_.jpg",
    rating: 2,
    brand: "Princess",
    comment: "Not as shiny as expected.",
    numReviews: 400,
    reviews: [
      {
        name: "Admin",
        rating: 2,
        comment: "Disappointing quality.",
      },
    ],
  },
  {
    name: "Pierced Owl Rose Gold Plated Stainless Steel Double",
    countInStock: 12,
    price: 1538.6,
    description: "Rose Gold Plated Double Flared Tunnel Plug Earrings.",
    category: "jewelery",
    image: "https://fakestoreapi.com/img/51UDEzMJVpL._AC_UL640_QL65_ML3_.jpg",
    rating: 2.5,
    brand: "Pierced Owl",
    comment: "Stylish but uncomfortable.",
    numReviews: 100,
    reviews: [
      {
        name: "Admin",
        rating: 2.5,
        comment: "Nice design but not comfortable.",
      },
    ],
  },
  {
    name: "WD 2TB Elements Portable External Hard Drive - USB 3.0",
    countInStock: 20,
    price: 8960,
    description:
      "USB 3.0 and USB 2.0 Compatibility Fast data transfers Improve PC Performance High Capacity.",
    category: "electronics",
    image: "https://fakestoreapi.com/img/61IBBVJvSDL._AC_SY879_.jpg",
    rating: 3.5,
    brand: "Western Digital",
    comment: "Reliable storage solution.",
    numReviews: 203,
    reviews: [
      {
        name: "Admin",
        rating: 3.5,
        comment: "Works well, but a bit slow.",
      },
    ],
  },
  {
    name: "SanDisk SSD PLUS 1TB Internal SSD - SATA III 6 Gb/s",
    countInStock: 15,
    price: 15260,
    description:
      "Easy upgrade for faster boot up, shutdown, application load and response.",
    category: "electronics",
    image: "https://fakestoreapi.com/img/61U7T1koQqL._AC_SX679_.jpg",
    rating: 4.5,
    brand: "SanDisk",
    comment: "Speedy and reliable.",
    numReviews: 470,
    reviews: [
      {
        name: "Admin",
        rating: 4.5,
        comment: "Great SSD for the price.",
      },
    ],
  },
  {
    name: "Silicon Power 256GB SSD 3D NAND A55 SLC Cache Performance Boost SATA III 2.5",
    countInStock: 7,
    price: 15260,
    description:
      "3D NAND flash are applied to deliver high transfer speeds Remarkable transfer speeds that enable faster bootup and improved overall system performance.",
    category: "electronics",
    image: "https://fakestoreapi.com/img/71kWymZ+c+L._AC_SX679_.jpg",
    rating: 5,
    brand: "Silicon Power",
    comment: "Top-notch performance.",
    numReviews: 319,
    reviews: [
      {
        name: "Admin",
        rating: 5,
        comment: "Excellent SSD.",
      },
    ],
  },
  {
    name: "WD 4TB Gaming Drive Works with Playstation 4 Portable External Hard Drive",
    countInStock: 10,
    price: 15960,
    description:
      "Expand your PS4 gaming experience, Play anywhere Fast and easy, setup Sleek design with high capacity.",
    category: "electronics",
    image: "https://fakestoreapi.com/img/61mtL65D4cL._AC_SX679_.jpg",
    rating: 4,
    brand: "Western Digital",
    comment: "Perfect for gamers.",
    numReviews: 400,
    reviews: [
      {
        name: "Admin",
        rating: 4,
        comment: "Great storage for PS4.",
      },
    ],
  },
  {
    name: "Acer SB220Q bi 21.5 inches Full HD (1920 x 1080) IPS Ultra-Thin",
    countInStock: 8,
    price: 83860,
    description:
      "21. 5 inches Full HD (1920 x 1080) widescreen IPS display And Radeon free Sync technology.",
    category: "electronics",
    image: "https://fakestoreapi.com/img/81QpkIctqPL._AC_SX679_.jpg",
    rating: 3,
    brand: "Acer",
    comment: "Good, but could be better.",
    numReviews: 250,
    reviews: [
      {
        name: "Admin",
        rating: 3,
        comment: "Decent monitor for the price.",
      },
    ],
  },
  {
    name: "Samsung 49-Inch CHG90 144Hz Curved Gaming Monitor",
    countInStock: 3,
    price: 139998.6,
    description:
      "49 INCH SUPER ULTRAWIDE 32:9 CURVED GAMING MONITOR with dual 27 inch screen side by side.",
    category: "electronics",
    image: "https://fakestoreapi.com/img/81Zt42ioCgL._AC_SX679_.jpg",
    rating: 2,
    brand: "Samsung",
    comment: "Too expensive for the features.",
    numReviews: 140,
    reviews: [
      {
        name: "Admin",
        rating: 2,
        comment: "Not worth the price.",
      },
    ],
  },
  {
    name: "BIYLACLESEN Women's 3-in-1 Snowboard Jacket Winter Coats",
    countInStock: 6,
    price: 7978.6,
    description:
      "Note:The Jackets is US standard size, Please choose size as your usual wear Material: 100% Polyester.",
    category: "women's clothing",
    image: "https://fakestoreapi.com/img/51Y5NI-I5jL._AC_UX679_.jpg",
    rating: 2.5,
    brand: "BIYLACLESEN",
    comment: "Warm but bulky.",
    numReviews: 235,
    reviews: [
      {
        name: "Admin",
        rating: 2.5,
        comment: "Good but not great.",
      },
    ],
  },
  {
    name: "Lock and Love Women's Removable Hooded Faux Leather Moto Biker Jacket",
    countInStock: 9,
    price: 4193,
    description:
      "100% POLYURETHANE(shell) 100% POLYESTER(lining) 75% POLYESTER 25% COTTON (SWEATER), Faux leather material for style and comfort.",
    category: "women's clothing",
    image: "https://fakestoreapi.com/img/81XH0e8fefL._AC_UY879_.jpg",
    rating: 3.5,
    brand: "Lock and Love",
    comment: "Stylish and affordable.",
    numReviews: 340,
    reviews: [
      {
        name: "Admin",
        rating: 3.5,
        comment: "Looks great but quality is average.",
      },
    ],
  },
  {
    name: "Rain Jacket Women Windbreaker Striped Climbing Raincoats",
    countInStock: 5,
    price: 5598.6,
    description:
      "Lightweight perfet for trip or casual wear---Long sleeve with hooded, adjustable drawstring waist design.",
    category: "women's clothing",
    image: "https://fakestoreapi.com/img/71HblAHs5xL._AC_UY879_-2.jpg",
    rating: 4.5,
    brand: "Windbreaker",
    comment: "Perfect for rainy days.",
    numReviews: 679,
    reviews: [
      {
        name: "Admin",
        rating: 4.5,
        comment: "Great for outdoor activities.",
      },
    ],
  },
  {
    name: "MBJ Women's Solid Short Sleeve Boat Neck V",
    countInStock: 12,
    price: 1379,
    description:
      "95% RAYON 5% SPANDEX, Made in USA or Imported, Do Not Bleach.",
    category: "women's clothing",
    image: "https://fakestoreapi.com/img/71z3kpMAYsL._AC_UY879_.jpg",
    rating: 5,
    brand: "MBJ",
    comment: "Comfortable and stylish.",
    numReviews: 130,
    reviews: [
      {
        name: "Admin",
        rating: 5,
        comment: "Love the material!",
      },
    ],
  },
  {
    name: "Opna Women's Short Sleeve Moisture",
    countInStock: 18,
    price: 1113,
    description:
      "100% Polyester, Machine wash, 100% cationic polyester interlock, Machine Wash & Pre Shrunk for a Great Fit.",
    category: "women's clothing",
    image: "https://fakestoreapi.com/img/51eg55uWmdL._AC_UX679_.jpg",
    rating: 4,
    brand: "Opna",
    comment: "Great for workouts.",
    numReviews: 146,
    reviews: [
      {
        name: "Admin",
        rating: 4,
        comment: "Perfect for gym wear.",
      },
    ],
  },
  {
    name: "DANVOUY Womens T Shirt Casual Cotton Short",
    countInStock: 7,
    price: 1818.6,
    description:
      "95%Cotton,5%Spandex, Features: Casual, Short Sleeve, Letter Print,V-Neck,Fashion Tees.",
    category: "women's clothing",
    image: "https://fakestoreapi.com/img/61pHAEJ4NML._AC_UX679_.jpg",
    rating: 3,
    brand: "DANVOUY",
    comment: "Good value for the price.",
    numReviews: 145,
    reviews: [
      {
        name: "Admin",
        rating: 3,
        comment: "Nice but shrinks after washing.",
      },
    ],
  },
];

export default products;
