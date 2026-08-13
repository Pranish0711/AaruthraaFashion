import "dotenv/config";
import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const PLACEHOLDER = (name: string, color: string) =>
  `/images/placeholders/${name}.svg`;

async function main() {
  const adminEmail = process.env.ADMIN_EMAIL ?? "admin@aaruthraafashion.in";
  const adminPassword = process.env.ADMIN_PASSWORD ?? "admin@aaruthraafashion";
  const passwordHash = await bcrypt.hash(adminPassword, 12);

  await prisma.user.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      email: adminEmail,
      passwordHash,
      name: "Admin",
      role: "ADMIN",
    },
  });

  await prisma.siteSettings.upsert({
    where: { id: "default" },
    update: {},
    create: {
      id: "default",
      businessName: "AaruthraaFashion",
      businessEmail: "info@aaruthraafashion.in",
      whatsappNumber: process.env.WHATSAPP_NUMBER ?? "919876543210",
      contactNumber: "+91 98765 43210",
      address: "Chennai, Tamil Nadu, India",
      businessHours: "Mon–Sat, 9:00 AM – 6:00 PM IST",
      announcementText: "WHOLESALE & BULK ORDERS | CUSTOM APPAREL | MOQ FROM 100 PCS",
    },
  });

  const categories = [
    { name: "Track Pants", slug: "track-pants", description: "Sportswear and custom track pants for teams and organizations", displayOrder: 1, imageUrl: PLACEHOLDER("track-pants", "1a1a1a") },
    { name: "Shorts", slug: "shorts", description: "Wholesale sports and cotton shorts", displayOrder: 2, imageUrl: PLACEHOLDER("shorts", "2a2a2a") },
    { name: "T-Shirts", slug: "t-shirts", description: "Custom and corporate t-shirts from MOQ 100", displayOrder: 3, imageUrl: PLACEHOLDER("t-shirts", "3a3a3a") },
    { name: "Sportswear", slug: "sportswear", description: "Performance apparel for teams", displayOrder: 4, imageUrl: PLACEHOLDER("sportswear", "4a4a4a") },
    { name: "Corporate Apparel", slug: "corporate-apparel", description: "Branded uniforms and corporate wear", displayOrder: 5, imageUrl: PLACEHOLDER("corporate", "5a5a5a") },
    { name: "College & Event Apparel", slug: "college-event-apparel", description: "College events, culturals and group orders", displayOrder: 6, imageUrl: PLACEHOLDER("college", "6a6a6a") },
  ];

  const categoryMap: Record<string, string> = {};

  for (const cat of categories) {
    const created = await prisma.category.upsert({
      where: { slug: cat.slug },
      update: cat,
      create: cat,
    });
    categoryMap[cat.slug] = created.id;
  }

  const subcategories = [
    { parent: "track-pants", name: "Sportswear Track Pants", slug: "sportswear-track-pants" },
    { parent: "track-pants", name: "Cotton Homewear Track Pants", slug: "cotton-homewear-track-pants" },
    { parent: "track-pants", name: "Custom Track Pants", slug: "custom-track-pants" },
    { parent: "track-pants", name: "Team Track Pants", slug: "team-track-pants" },
    { parent: "shorts", name: "Sports Shorts", slug: "sports-shorts" },
    { parent: "shorts", name: "Cotton Homewear Shorts", slug: "cotton-homewear-shorts" },
    { parent: "shorts", name: "Team Shorts", slug: "team-shorts" },
    { parent: "shorts", name: "Custom Shorts", slug: "custom-shorts" },
    { parent: "t-shirts", name: "Round Neck T-Shirts", slug: "round-neck-t-shirts" },
    { parent: "t-shirts", name: "Polo T-Shirts", slug: "polo-t-shirts" },
    { parent: "t-shirts", name: "Sports T-Shirts", slug: "sports-t-shirts" },
    { parent: "t-shirts", name: "Corporate T-Shirts", slug: "corporate-t-shirts" },
  ];

  for (const sub of subcategories) {
    await prisma.category.upsert({
      where: { slug: sub.slug },
      update: { name: sub.name, parentId: categoryMap[sub.parent] },
      create: {
        name: sub.name,
        slug: sub.slug,
        parentId: categoryMap[sub.parent],
        displayOrder: 0,
      },
    });
  }

  const products = [
    {
      name: "Performance Sports Track Pant",
      slug: "performance-sports-track-pant",
      shortDescription: "Lightweight performance track pant built for training and team sports.",
      fullDescription: "Engineered for movement with moisture-wicking polyester blend fabric. Ideal for sports teams, academies and corporate sports events. Fully customizable with logo, stripes and team branding.",
      categorySlug: "track-pants",
      subcategory: "Sportswear Track Pants",
      productType: "Track Pant",
      startingPrice: 299,
      moq: 100,
      fabrics: ["Polyester Blend", "Interlock", "Microfiber"],
      gsmOptions: ["180 GSM", "220 GSM", "250 GSM"],
      colors: ["Black", "Navy", "Grey", "Maroon", "White"],
      sizes: ["S", "M", "L", "XL", "XXL", "3XL"],
      customizationOptions: ["Color", "Fabric", "Logo", "Printing", "Side stripes"],
      featured: true,
    },
    {
      name: "Classic Cotton Track Pant",
      slug: "classic-cotton-track-pant",
      shortDescription: "Premium cotton track pant for homewear and institutional bulk orders.",
      fullDescription: "Soft cotton fleece track pant suitable for schools, colleges and corporate casual wear programs. Customizable colors and branding available.",
      categorySlug: "track-pants",
      subcategory: "Cotton Homewear Track Pants",
      productType: "Track Pant",
      startingPrice: 249,
      moq: 100,
      fabrics: ["Cotton Fleece", "Cotton Blend"],
      gsmOptions: ["280 GSM", "320 GSM"],
      colors: ["Black", "Navy", "Grey", "Olive"],
      sizes: ["S", "M", "L", "XL", "XXL"],
      customizationOptions: ["Color", "Fabric", "Logo", "Embroidery"],
      featured: false,
    },
    {
      name: "Team Training Track Pant",
      slug: "team-training-track-pant",
      shortDescription: "Durable team training track pant with customizable side stripes.",
      fullDescription: "Built for daily team training sessions. Features reinforced stitching, elastic waistband and optional contrast stripes for team identity.",
      categorySlug: "track-pants",
      subcategory: "Team Track Pants",
      productType: "Track Pant",
      startingPrice: 279,
      moq: 100,
      fabrics: ["Polyester", "Tricot"],
      gsmOptions: ["200 GSM", "240 GSM"],
      colors: ["Black", "Royal Blue", "Red", "Green"],
      sizes: ["S", "M", "L", "XL", "XXL", "3XL"],
      customizationOptions: ["Color", "Side stripes", "Logo", "Player number"],
      featured: true,
    },
    {
      name: "Custom Side Stripe Track Pant",
      slug: "custom-side-stripe-track-pant",
      shortDescription: "Fully custom track pant with branded side stripe design.",
      fullDescription: "Create a unique team look with custom side stripe colors, logo placement and fabric selection. Perfect for sports clubs and corporate teams.",
      categorySlug: "track-pants",
      subcategory: "Custom Track Pants",
      productType: "Track Pant",
      startingPrice: 319,
      moq: 100,
      fabrics: ["Polyester Blend", "Interlock"],
      gsmOptions: ["220 GSM", "260 GSM"],
      colors: ["Custom"],
      sizes: ["XS", "S", "M", "L", "XL", "XXL", "3XL", "4XL"],
      customizationOptions: ["Color", "Fabric", "Logo", "Side stripes", "Embroidery"],
      featured: false,
    },
    {
      name: "Performance Sports Shorts",
      slug: "performance-sports-shorts",
      shortDescription: "Lightweight sports shorts for teams and athletic events.",
      fullDescription: "Breathable sports shorts with elastic waistband and optional inner lining. Ideal for cricket, football, marathon and training kits.",
      categorySlug: "shorts",
      subcategory: "Sports Shorts",
      productType: "Shorts",
      startingPrice: 149,
      moq: 100,
      fabrics: ["Polyester", "Micro Mesh"],
      gsmOptions: ["140 GSM", "160 GSM"],
      colors: ["Black", "Navy", "White", "Red"],
      sizes: ["S", "M", "L", "XL", "XXL"],
      customizationOptions: ["Fabric", "Color", "Logo", "Side design"],
      featured: true,
    },
    {
      name: "Cotton Comfort Shorts",
      slug: "cotton-comfort-shorts",
      shortDescription: "Soft cotton shorts for homewear and casual bulk orders.",
      fullDescription: "Comfortable cotton shorts suitable for schools, hostels and promotional events. Available in multiple colors with logo printing.",
      categorySlug: "shorts",
      subcategory: "Cotton Homewear Shorts",
      productType: "Shorts",
      startingPrice: 129,
      moq: 100,
      fabrics: ["Cotton", "Cotton Blend"],
      gsmOptions: ["180 GSM", "200 GSM"],
      colors: ["Black", "Grey", "Navy", "Olive"],
      sizes: ["S", "M", "L", "XL", "XXL"],
      customizationOptions: ["Fabric", "Color", "Logo"],
      featured: false,
    },
    {
      name: "Team Training Shorts",
      slug: "team-training-shorts",
      shortDescription: "Team shorts with custom branding and length options.",
      fullDescription: "Designed for sports teams with options for logo, player name and number printing. Multiple length options available.",
      categorySlug: "shorts",
      subcategory: "Team Shorts",
      productType: "Shorts",
      startingPrice: 159,
      moq: 100,
      fabrics: ["Polyester", "Interlock"],
      gsmOptions: ["150 GSM", "170 GSM"],
      colors: ["Black", "Royal Blue", "Maroon", "Green"],
      sizes: ["S", "M", "L", "XL", "XXL", "3XL"],
      customizationOptions: ["Color", "Logo", "Length", "Player name"],
      featured: false,
    },
    {
      name: "Custom Athletic Shorts",
      slug: "custom-athletic-shorts",
      shortDescription: "Fully customizable athletic shorts for events and teams.",
      fullDescription: "Build your perfect athletic short with custom fabric, color, logo and side panel design. MOQ from 100 pieces.",
      categorySlug: "shorts",
      subcategory: "Custom Shorts",
      productType: "Shorts",
      startingPrice: 169,
      moq: 100,
      fabrics: ["Polyester", "Microfiber"],
      gsmOptions: ["140 GSM", "160 GSM", "180 GSM"],
      colors: ["Custom"],
      sizes: ["S", "M", "L", "XL", "XXL"],
      customizationOptions: ["Fabric", "Color", "Logo", "Printing", "Length"],
      featured: false,
    },
    {
      name: "Classic Round Neck T-Shirt",
      slug: "classic-round-neck-t-shirt",
      shortDescription: "Premium round neck t-shirt for bulk corporate and event orders.",
      fullDescription: "Versatile round neck t-shirt available in multiple fabrics and GSM options. Perfect for promotions, events and team merchandise.",
      categorySlug: "t-shirts",
      subcategory: "Round Neck T-Shirts",
      productType: "T-Shirt",
      startingPrice: 99,
      moq: 100,
      fabrics: ["Cotton", "Poly Cotton", "Dry Fit"],
      gsmOptions: ["160 GSM", "180 GSM", "200 GSM"],
      colors: ["White", "Black", "Navy", "Red", "Yellow", "Royal Blue"],
      sizes: ["XS", "S", "M", "L", "XL", "XXL", "3XL", "4XL"],
      customizationOptions: ["Fabric", "GSM", "Color", "Front print", "Back print", "Logo"],
      featured: true,
    },
    {
      name: "Premium Polo T-Shirt",
      slug: "premium-polo-t-shirt",
      shortDescription: "Corporate polo t-shirt with embroidery and print options.",
      fullDescription: "Professional polo t-shirt for corporate uniforms, retail staff and branded merchandise. Collar and sleeve customization available.",
      categorySlug: "t-shirts",
      subcategory: "Polo T-Shirts",
      productType: "T-Shirt",
      startingPrice: 199,
      moq: 100,
      fabrics: ["Pique Cotton", "Poly Cotton"],
      gsmOptions: ["200 GSM", "220 GSM"],
      colors: ["White", "Black", "Navy", "Grey", "Maroon"],
      sizes: ["S", "M", "L", "XL", "XXL", "3XL"],
      customizationOptions: ["Fabric", "Color", "Collar", "Logo", "Embroidery"],
      featured: true,
    },
    {
      name: "Performance Sports T-Shirt",
      slug: "performance-sports-t-shirt",
      shortDescription: "Dry-fit sports t-shirt for teams and athletic events.",
      fullDescription: "Moisture-wicking sports t-shirt with options for player name, number and team logo. Ideal for sports day and tournament kits.",
      categorySlug: "t-shirts",
      subcategory: "Sports T-Shirts",
      productType: "T-Shirt",
      startingPrice: 149,
      moq: 100,
      fabrics: ["Dry Fit", "Polyester Interlock"],
      gsmOptions: ["140 GSM", "160 GSM"],
      colors: ["Black", "White", "Navy", "Red", "Green"],
      sizes: ["S", "M", "L", "XL", "XXL", "3XL"],
      customizationOptions: ["Fabric", "Color", "Logo", "Player name", "Player number", "DTF printing"],
      featured: false,
    },
    {
      name: "Custom Corporate Event T-Shirt",
      slug: "custom-corporate-event-t-shirt",
      shortDescription: "Fully custom event t-shirt starting from ₹99 per piece.",
      fullDescription: "Design your event or corporate t-shirt with full front/back printing, custom colors and branding. MOQ 100 pieces. Final pricing depends on quantity, fabric, GSM and printing.",
      categorySlug: "t-shirts",
      subcategory: "Corporate T-Shirts",
      productType: "T-Shirt",
      startingPrice: 99,
      moq: 100,
      fabrics: ["Cotton", "Poly Cotton", "Dry Fit"],
      gsmOptions: ["160 GSM", "180 GSM", "200 GSM", "220 GSM"],
      colors: ["Custom"],
      sizes: ["XS", "S", "M", "L", "XL", "XXL", "3XL", "4XL", "5XL"],
      customizationOptions: ["Fabric", "GSM", "Color", "Front print", "Back print", "Screen printing", "DTF printing", "Embroidery", "Company branding"],
      featured: true,
    },
  ];

  for (const product of products) {
    const { categorySlug, ...data } = product;
    const categoryId = categoryMap[categorySlug];

    const created = await prisma.product.upsert({
      where: { slug: data.slug },
      update: {
        ...data,
        categoryId,
        fabrics: data.fabrics,
        gsmOptions: data.gsmOptions,
        colors: data.colors,
        sizes: data.sizes,
        customizationOptions: data.customizationOptions,
        customizationAvailable: true,
        active: true,
      },
      create: {
        ...data,
        categoryId,
        fabrics: data.fabrics,
        gsmOptions: data.gsmOptions,
        colors: data.colors,
        sizes: data.sizes,
        customizationOptions: data.customizationOptions,
        customizationAvailable: true,
        active: true,
      },
    });

    const existingImages = await prisma.productImage.count({ where: { productId: created.id } });
    if (existingImages === 0) {
      await prisma.productImage.create({
        data: {
          productId: created.id,
          url: PLACEHOLDER(data.slug, "000"),
          displayOrder: 0,
          isPrimary: true,
        },
      });
    }
  }

  console.log("Seed completed successfully");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
