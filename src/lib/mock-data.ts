export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  gender: string;
  images: string[];
  isNew?: boolean;
  colors: string[];
  sizes: string[];
  description: string;
  rating: number;
  reviewCount: number;
  highlights: string[];
  materials: string;
  careInstructions: string;
}

export const mockProducts: Product[] = [
  {
    id: "p_1",
    name: "AETHER BLAZER",
    price: 850,
    category: "Outerwear",
    gender: "Unisex",
    images: [
      "/images/aether_blazer.png",
      "/images/aether_blazer_side_1782034129423.png",
      "/images/aether_blazer_product_1782034173716.png",
      "/images/aether_blazer_detail_1782034190924.png"
    ],
    isNew: true,
    colors: ["#0a0a0a"],
    sizes: ["S", "M", "L", "XL"],
    description: "A sleek, futuristic blazer with subtle cyan detailing. Tailored for an oversized, powerful silhouette.",
    rating: 4.8,
    reviewCount: 124,
    highlights: [
      "Oversized power shoulders",
      "Concealed magnetic front closure",
      "Signature cyan inner lining",
      "Water-resistant cyber-wool blend"
    ],
    materials: "60% Cyber-Wool, 30% Recycled Polyester, 10% Elastane. Lining: 100% Cupro.",
    careInstructions: "Dry clean only. Do not iron directly on cyan detailing. Store in a cool, dry garment bag."
  },
  {
    id: "p_2",
    name: "ONYX DRESS",
    price: 920,
    category: "Dresses",
    gender: "Women",
    images: [
      "/images/onyx_dress.png",
      "/images/onyx_dress_side_1782034203906.png",
      "/images/onyx_dress_product_1782034216269.png",
      "/images/onyx_dress_detail_1782034248486.png"
    ],
    isNew: true,
    colors: ["#0a0a0a"],
    sizes: ["XS", "S", "M", "L"],
    description: "Structured black dress with an elegant side slit. Designed to drape flawlessly and accentuate natural curves.",
    rating: 4.9,
    reviewCount: 89,
    highlights: [
      "Asymmetric daring side slit",
      "Built-in structured corset",
      "Matte obsidian finish",
      "Invisible back zipper"
    ],
    materials: "100% Heavyweight Silk Crepe. Corset: Nylon & Spandex blend.",
    careInstructions: "Professional dry clean only. Handle with care to avoid snagging."
  },
  {
    id: "p_3",
    name: "NEON HEELS",
    price: 670,
    category: "Footwear",
    gender: "Women",
    images: [
      "/images/neon_heels.png",
      "/images/neon_heels_worn_1782034359547.png",
      "/images/neon_heels_side_1782034409399.png",
      "/images/neon_heels_detail_1782034474082.png"
    ],
    isNew: true,
    colors: ["#00f0ff"],
    sizes: ["36", "37", "38", "39", "40"],
    description: "Futuristic strappy heels glowing with neon cyan light. The ultimate statement piece for night-time events.",
    rating: 4.7,
    reviewCount: 215,
    highlights: [
      "105mm stiletto heel",
      "Luminescent cyan straps",
      "Cushioned leather insole",
      "Adjustable ankle tie"
    ],
    materials: "Upper: 100% Vegan Leather with LED luminescent piping. Sole: 100% Calf Leather.",
    careInstructions: "Wipe clean with a damp cloth. Avoid submerging in water due to luminescent piping."
  },
  {
    id: "p_4",
    name: "CYBER BAG",
    price: 1150,
    category: "Accessories",
    gender: "Women",
    images: [
      "/images/cyber_bag.png",
      "/images/cyber_bag_held_1782034549779.png",
      "/images/cyber_bag_open_1782034635543.png"
    ],
    isNew: true,
    colors: ["#0a0a0a"],
    sizes: ["OS"],
    description: "Luxury black leather handbag with a glowing neon cyan buckle. Compact yet spacious enough for daily essentials.",
    rating: 4.9,
    reviewCount: 340,
    highlights: [
      "Signature glowing cyan clasp",
      "Detachable crossbody strap",
      "Three interior compartments",
      "Scratch-resistant finish"
    ],
    materials: "100% Italian Saffiano Leather. Hardware: Cyan-plated stainless steel.",
    careInstructions: "Clean with specialized leather cleaner. Keep out of direct sunlight for prolonged periods."
  },
  {
    id: "p_5",
    name: "SYNTHETIC LEATHER JACKET",
    price: 1400,
    category: "Outerwear",
    gender: "Women",
    images: [
      "/images/synth_jacket_main.png",
      "/images/synth_jacket_detail.png"
    ],
    colors: ["#0a0a0a"],
    sizes: ["S", "M", "L", "XL"],
    description: "Cruelty-free heavy jacket with sharp shoulder lines and an asymmetric zip. Built for the modern urban landscape.",
    rating: 4.6,
    reviewCount: 56,
    highlights: [
      "Asymmetric heavy-duty zipper",
      "Quilted cyber-padded shoulders",
      "Two deep functional pockets",
      "Wind and water resistant"
    ],
    materials: "100% Premium Polyurethane (Vegan Leather). Lining: 100% Polyester.",
    careInstructions: "Wipe clean. Do not machine wash. Do not iron."
  },
  {
    id: "p_6",
    name: "OBSIDIAN BOOTS",
    price: 780,
    category: "Footwear",
    gender: "Unisex",
    images: [
      "/images/obsidian_boots_main.png",
      "/images/obsidian_boots_side.png"
    ],
    colors: ["#0a0a0a"],
    sizes: ["40", "41", "42", "43", "44"],
    description: "Chunky platform boots with a matte finish and industrial hardware. Provides elevation and an imposing silhouette.",
    rating: 4.8,
    reviewCount: 112,
    highlights: [
      "2-inch platform sole",
      "Industrial metallic eyelets",
      "Side-zip for easy access",
      "Ultra-grip rubber outsole"
    ],
    materials: "Upper: 100% Matte Calf Leather. Sole: 100% Rubber.",
    careInstructions: "Use matte leather protector spray. Wipe dirt with a soft brush."
  },
  {
    id: "p_7",
    name: "HOLOGRAPHIC CLUTCH",
    price: 450,
    category: "Accessories",
    gender: "Women",
    images: [
      "/images/holo_clutch_main.png",
      "/images/holo_clutch_open.png"
    ],
    isNew: true,
    colors: ["#00f0ff"],
    sizes: ["OS"],
    description: "Minimalist clutch that reflects a spectrum of colors under direct lighting. Designed to catch every eye in the room.",
    rating: 4.5,
    reviewCount: 43,
    highlights: [
      "Iridescent holographic finish",
      "Magnetic snap closure",
      "Fits standard smartphones",
      "Includes silver chain strap"
    ],
    materials: "100% Holographic PVC. Lining: 100% Cotton.",
    careInstructions: "Wipe with a micro-fiber cloth to avoid micro-scratches."
  },
  {
    id: "p_8",
    name: "CHROMATIC SUNGLASSES",
    price: 350,
    category: "Accessories",
    gender: "Unisex",
    images: [
      "/images/chromatic_sunglasses_main.png",
      "/images/chromatic_sunglasses_side.png"
    ],
    colors: ["#0a0a0a"],
    sizes: ["OS"],
    description: "Wrap-around shield sunglasses with polarized cyan-tinted lenses. 100% UV protection mapped with cyber aesthetics.",
    rating: 4.9,
    reviewCount: 810,
    highlights: [
      "Oversized shield frame",
      "Polarized cyan-tint lenses",
      "100% UVA/UVB protection",
      "Lightweight titanium arms"
    ],
    materials: "Frame: Acetate and Titanium. Lenses: Polycarbonate.",
    careInstructions: "Clean lenses with provided microfiber cloth and lens spray."
  },
  {
    id: "p_9",
    name: "NEO-TRENCH COAT",
    price: 1200,
    category: "Outerwear",
    gender: "Men",
    images: [
      "/images/neo_trench_main.png",
      "/images/neo_trench_detail.png"
    ],
    isNew: true,
    colors: ["#0a0a0a"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    description: "A commanding floor-length trench coat engineered from high-density tactical nylon. Water repellent and sharply tailored for an imposing presence.",
    rating: 4.8,
    reviewCount: 67,
    highlights: [
      "Floor-length dramatic drape",
      "Concealed tactical pockets",
      "Storm flap with cyan accents",
      "Heavy-duty matte hardware"
    ],
    materials: "100% High-Density Nylon. Lining: 100% Recycled Polyester.",
    careInstructions: "Machine wash cold on gentle cycle. Hang dry. Do not iron."
  },
  {
    id: "p_10",
    name: "VOID COMBAT PANTS",
    price: 540,
    category: "Bottoms",
    gender: "Men",
    images: [
      "/images/void_pants_main.png",
      "/images/void_pants_detail.png"
    ],
    isNew: true,
    colors: ["#0a0a0a"],
    sizes: ["30", "32", "34", "36"],
    description: "Utilitarian cargo pants redefined for luxury. Featuring articulated knees, multiple bonded zip pockets, and an adjustable tapered ankle.",
    rating: 4.9,
    reviewCount: 142,
    highlights: [
      "Articulated knee construction",
      "Waterproof bonded zippers",
      "Adjustable velcro cuffs",
      "Slight-stretch durable canvas"
    ],
    materials: "95% Cotton Canvas, 5% Elastane.",
    careInstructions: "Wash inside out. Tumble dry low. Avoid fabric softeners to maintain water repellency."
  }
];
