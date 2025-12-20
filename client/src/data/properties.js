// Dummy data for rapid prototype UI (no backend needed)

export const properties = [
  {
    id: "p-1001",
    title: "Modern Family Home",
    city: "Austin, TX",
    price: 725000,
    beds: 4,
    baths: 3,
    sqft: 2680,
    type: "House",
    status: "For Sale",
    images: [
      "https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?auto=format&fit=crop&w=1400&q=80",
    ],
    description:
      "Bright, open-concept living with a chef's kitchen, spacious backyard, and a short drive to downtown. Perfect for families who want space without losing the city.",
    agentId: "a-1",
    featured: true,
  },
  {
    id: "p-1002",
    title: "Downtown Loft",
    city: "New York, NY",
    price: 1180000,
    beds: 2,
    baths: 2,
    sqft: 1280,
    type: "Condo",
    status: "For Sale",
    images: [
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1400&q=80",
    ],
    description:
      "A sleek, airy loft with floor-to-ceiling windows, skyline views, and walkability to everything. Ideal for city life with style.",
    agentId: "a-2",
    featured: true,
  },
  {
    id: "p-1003",
    title: "Cozy Lakeside Cabin",
    city: "Lake Tahoe, CA",
    price: 540000,
    beds: 3,
    baths: 2,
    sqft: 1560,
    type: "Cabin",
    status: "For Sale",
    images: [
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1460317442991-0ec209397118?auto=format&fit=crop&w=1400&q=80",
    ],
    description:
      "Warm wood interiors, mountain air, and quick access to trails and the lake. A weekend getaway that feels like a permanent exhale.",
    agentId: "a-1",
    featured: false,
  },
  {
    id: "p-1004",
    title: "Suburban Starter",
    city: "Columbus, OH",
    price: 312000,
    beds: 3,
    baths: 2,
    sqft: 1710,
    type: "House",
    status: "For Rent",
    images: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1560185127-6ed189bf02f4?auto=format&fit=crop&w=1400&q=80",
    ],
    description:
      "A clean, comfortable home near schools and parks. Simple, practical, and ready to move in.",
    agentId: "a-3",
    featured: false,
  },
];

export function formatPrice(n) {
  return n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
}
