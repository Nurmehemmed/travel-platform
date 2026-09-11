const postgres = require("postgres");

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error("DATABASE_URL is not set");
}

const sql = postgres(connectionString);

async function seed() {
  console.log("Seeding initial data into Neon Postgres...");

  // 1. Destinations
  const destData = [
    {
      name: "Baku",
      country: "Azerbaijan",
      slug: "baku",
      heroImageUrl:
        "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
    },
    {
      name: "Absheron",
      country: "Azerbaijan",
      slug: "absheron",
      heroImageUrl:
        "https://images.unsplash.com/photo-1548013146-72479768bada?w=800&q=80",
    },
    {
      name: "Sheki",
      country: "Azerbaijan",
      slug: "sheki",
      heroImageUrl:
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
    },
    {
      name: "Gobustan",
      country: "Azerbaijan",
      slug: "gobustan",
      heroImageUrl:
        "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80",
    },
  ];

  const destMap = {};
  for (const d of destData) {
    const [row] = await sql`
      INSERT INTO destinations (name, country, slug, hero_image_url)
      VALUES (${d.name}, ${d.country}, ${d.slug}, ${d.heroImageUrl})
      ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name
      RETURNING id, slug
    `;
    destMap[row.slug] = row.id;
  }

  // 2. Packages
  const toursData = [
    {
      title: "Baku Old City Walking Tour",
      slug: "baku-old-city-walking-tour",
      destSlug: "baku",
      overview:
        "Wander through the UNESCO-listed Icherisheher (Old City), discover ancient caravanserais and hidden courtyards.",
      coverImageUrl:
        "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
      durationDays: 1,
      durationNights: 0,
      basePrice: "35.00",
      promoPrice: "25.00",
      ratingAvg: "4.90",
      reviewCount: 214,
      isActive: true,
    },
    {
      title: "Absheron Peninsula Day Trip",
      slug: "absheron-peninsula-day-trip",
      destSlug: "absheron",
      overview:
        "Explore the Ateshgah Fire Temple, the otherworldly Yanar Dag, and coastal landscapes unique to Azerbaijan.",
      coverImageUrl:
        "https://images.unsplash.com/photo-1548013146-72479768bada?w=600&q=80",
      durationDays: 1,
      durationNights: 0,
      basePrice: "65.00",
      promoPrice: null,
      ratingAvg: "4.80",
      reviewCount: 142,
      isActive: true,
    },
    {
      title: "Sheki Cultural Journey",
      slug: "sheki-cultural-journey",
      destSlug: "sheki",
      overview:
        "Drive north into the Caucasus foothills to Sheki's 18th-century Khan Palace and medieval caravanserai.",
      coverImageUrl:
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80",
      durationDays: 2,
      durationNights: 1,
      basePrice: "180.00",
      promoPrice: "149.00",
      ratingAvg: "5.00",
      reviewCount: 87,
      isActive: true,
    },
    {
      title: "Modern Baku Architecture Tour",
      slug: "modern-baku-architecture-tour",
      destSlug: "baku",
      overview:
        "From the futuristic curves of Zaha Hadid's Heydar Aliyev Centre to the iconic Flame Towers.",
      coverImageUrl:
        "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&q=80",
      durationDays: 1,
      durationNights: 0,
      basePrice: "40.00",
      promoPrice: null,
      ratingAvg: "4.70",
      reviewCount: 96,
      isActive: true,
    },
    {
      title: "Gobustan Petroglyphs & Mud Volcanoes",
      slug: "gobustan-petroglyphs-mud-volcanoes",
      destSlug: "gobustan",
      overview:
        "40,000-year-old rock art carved into stone plateaus, paired with the bubbling, otherworldly mud volcanoes.",
      coverImageUrl:
        "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=600&q=80",
      durationDays: 1,
      durationNights: 0,
      basePrice: "75.00",
      promoPrice: "55.00",
      ratingAvg: "4.90",
      reviewCount: 178,
      isActive: true,
    },
    {
      title: "Caucasus Mountain Highlands",
      slug: "caucasus-mountain-highlands",
      destSlug: "sheki",
      overview:
        "High mountain passes, remote shepherd villages, and alpine meadows of the Greater Caucasus range.",
      coverImageUrl:
        "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600&q=80",
      durationDays: 3,
      durationNights: 2,
      basePrice: "280.00",
      promoPrice: "239.00",
      ratingAvg: "4.90",
      reviewCount: 63,
      isActive: true,
    },
  ];

  const pkgRows = [];
  for (const t of toursData) {
    const destId = destMap[t.destSlug];
    const [row] = await sql`
      INSERT INTO packages (
        title, slug, destination_id, overview, cover_image_url,
        duration_days, duration_nights, base_price, promo_price,
        rating_avg, review_count, is_active
      )
      VALUES (
        ${t.title}, ${t.slug}, ${destId}, ${t.overview}, ${t.coverImageUrl},
        ${t.durationDays}, ${t.durationNights}, ${t.basePrice}, ${t.promoPrice},
        ${t.ratingAvg}, ${t.reviewCount}, ${t.isActive}
      )
      ON CONFLICT (slug) DO UPDATE SET title = EXCLUDED.title
      RETURNING id, title, base_price
    `;
    pkgRows.push(row);
  }

  // 3. Create slots and tiers for each package
  const slotRows = [];
  for (const pkg of pkgRows) {
    const depDate = new Date();
    depDate.setDate(depDate.getDate() + 7);
    const retDate = new Date(depDate);
    retDate.setDate(retDate.getDate() + 2);
    const [slot] = await sql`
      INSERT INTO availability_slots (package_id, departure_date, return_date, total_seats, available_seats, status)
      VALUES (${pkg.id}, ${depDate.toISOString().split("T")[0]}, ${retDate.toISOString().split("T")[0]}, 12, 10, 'open')
      RETURNING id
    `;
    const [tier] = await sql`
      INSERT INTO pricing_tiers (slot_id, name, price, description)
      VALUES (${slot.id}, 'Standard Experience', ${pkg.base_price}, 'Full guided tour with transport and entries')
      RETURNING id
    `;
    slotRows.push({ slotId: slot.id, tierId: tier.id, price: pkg.base_price });
  }

  // 4. Sample bookings for admin dashboard demonstration
  const usersList = await sql`SELECT id FROM users LIMIT 3`;
  if (usersList.length > 0 && slotRows.length >= 4) {
    const sampleBookings = [
      {
        userId: usersList[0].id,
        slot: slotRows[0],
        count: 2,
        total: "70.00",
        status: "confirmed",
      },
      {
        userId: usersList[1 % usersList.length].id,
        slot: slotRows[1],
        count: 1,
        total: "65.00",
        status: "pending",
      },
      {
        userId: usersList[2 % usersList.length].id,
        slot: slotRows[2],
        count: 2,
        total: "298.00",
        status: "pending",
      },
      {
        userId: usersList[0].id,
        slot: slotRows[4] || slotRows[3],
        count: 4,
        total: "220.00",
        status: "confirmed",
      },
    ];

    for (const b of sampleBookings) {
      await sql`
        INSERT INTO bookings (user_id, slot_id, tier_id, traveler_count, total_price, status)
        VALUES (${b.userId}, ${b.slot.slotId}, ${b.slot.tierId}, ${b.count}, ${b.total}, ${b.status})
      `;
    }
  }

  console.log("Seeding completed successfully!");
  process.exit(0);
}

seed().catch((err) => {
  console.error("Seeding error:", err);
  process.exit(1);
});
