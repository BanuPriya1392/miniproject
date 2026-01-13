const mockVideos = [
  {
    id: 1,
    title: "Neural Networks 2026",
    author: "AI Nexus",
    tag: "AI",
    views: "1.2M",
    time: "2h ago",
    url: "https://www.youtube.com/watch?v=Wf_Sh69MLOQ",
    thumbnail:
      "https://i.pinimg.com/736x/a8/ce/24/a8ce243b7fd0532f126e47eab294b120.jpg",
    description:
      "Deep dive into the architecture of next-generation neural interfaces.",
  },
  {
    id: 2,
    title: "Cyberpunk Beats",
    author: "Neon",
    tag: "Music",
    views: "850K",
    time: "5h ago",
    url: "https://www.youtube.com/watch?v=IdoWuiCfZoE",
    thumbnail:
      "https://i.pinimg.com/736x/68/e5/a6/68e5a6717ada7dc5ce11394a5d1f534f.jpg",
    description: "Lo-fi beats for hacking and coding in the neon rain.",
  },
  {
    id: 3,
    title: "Quantum Gaming",
    author: "ProGamer",
    tag: "Gaming",
    views: "3.5M",
    time: "1d ago",
    url: "https://www.youtube.com/watch?v=he7wzNORQLk",
    thumbnail:
      "https://i.pinimg.com/1200x/05/aa/a7/05aaa797c3e6acdc711f28c5cd658865.jpg",
    description: "The first ever 128-bit quantum rendered gameplay.",
  },
  {
    id: 4,
    title: "Mars Landing",
    author: "SpaceX",
    tag: "Live",
    views: "10M",
    time: "Live",
    url: "https://www.youtube.com/watch?v=T4UKr7W-YC8",
    thumbnail:
      "https://i.pinimg.com/1200x/ae/da/08/aeda089a2a1ebbc78c6988922c09a829.jpg",
    description: "Live transmission from the Starship landing site on Mars.",
  },
  {
    id: 5,
    title: "Next Gen JS",
    author: "CodeShip",
    tag: "Tech",
    views: "400K",
    time: "3h ago",
    url: "https://www.youtube.com/watch?v=CSc8QPQdN5I",
    thumbnail:
      "https://i.pinimg.com/1200x/42/0a/d1/420ad1f71ca83753d5d9bb74c43f7989.jpg",
    description: "How ECMAScript 2026 is changing the frontend landscape.",
  },
  {
    id: 6,
    title: "The History of Quantum Computing",
    views: "500K",
    time: "2 days ago",
    url: "https://www.youtube.com/watch?v=iol5936dZho",
    thumbnail:
      "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800",
    author: "Science Insider",
    tag: "Education",
  },
  {
    id: 7,
    title: "Top 10 Sci-Fi Masterpieces of 2026",
    views: "2.1M",
    time: "1 week ago",
    url: "https://www.youtube.com/watch?v=u9kei9Vl8pA",
    thumbnail:
      "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=800",
    author: "Cinema Central",
    tag: "Cinema",
  },
  {
    id: 8,
    title: "Advanced React Patterns",
    views: "150K",
    time: "3 days ago",
    url: "https://www.youtube.com/watch?v=I3AsmAWWGEs",
    thumbnail:
      "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800",
    author: "Code Masters",
    tag: "Education",
  },
  {
    id: 9,
    title: "Interstellar Journey: Original Soundtrack",
    views: "8M",
    time: "5 months ago",
    url: "https://www.youtube.com/watch?v=N0ljzSWajUI",
    thumbnail:
      "https://i.pinimg.com/736x/b1/bc/75/b1bc75cb96db8ab75438592f8776c44c.jpg",
    author: "Music Sphere",
    tag: "Music",
  },
];

// Fetch many videos (with optional filtering by category or search term)
export const fetchVideos = async (category = "All", searchTerm = "") => {
  await new Promise((resolve) => setTimeout(resolve, 400)); // Network simulation

  let filtered = [...mockVideos];

  // Filter by Category
  if (category && category !== "All") {
    filtered = filtered.filter(
      (v) => v.tag.toLowerCase() === category.toLowerCase()
    );
  }

  // Filter by Search Term
  if (searchTerm) {
    filtered = filtered.filter(
      (v) =>
        v.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        v.author.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  return filtered;
};

// Fetch a specific video by ID (For the VideoDetail page)
export const fetchVideoById = async (id) => {
  await new Promise((resolve) => setTimeout(resolve, 300));
  return mockVideos.find((v) => v.id === parseInt(id));
};
