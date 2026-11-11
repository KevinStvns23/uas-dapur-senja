import "dotenv/config";
import { prisma } from "../src/lib/prisma";

async function main() {
  await prisma.menu.deleteMany();

  await prisma.menu.createMany({
    data: [
      { name: "Nasi Goreng Spesial", category: "main-course", price: 45000, rating: 4.8, image: "images/nasigoreng.jpg", desc: "Nasi goreng spesial dengan bumbu rempah rahasia, disajikan dengan telur mata sapi dan kerupuk udang.", ingredients: "Nasi Putih, Telur, Ayam Suwir, Bawang Merah, Bawang Putih, Kecap Manis" },
      { name: "Ayam Bakar Madu", category: "main-course", price: 55000, rating: 4.9, image: "images/ayambakar.jpg", desc: "Ayam bakar empuk dengan olesan madu murni dan bumbu rempah pilihan.", ingredients: "Daging Ayam, Madu, Bawang Merah, Bawang Putih, Ketumbar, Kecap Manis" },
      { name: "Garlic Bread", category: "appetizer", price: 25000, rating: 4.5, image: "images/bread.jpg", desc: "Roti panggang renyah dengan olesan mentega bawang putih dan peterseli segar.", ingredients: "Roti Baguette, Mentega, Bawang Putih, Peterseli, Garam" },
      { name: "Lemon Iced Tea", category: "drinks", price: 15000, rating: 4.6, image: "images/lemontea.jpg", desc: "Es teh hitam segar dengan perasan jeruk lemon asli dan daun mint segar.", ingredients: "Teh Hitam, Lemon, Gula, Daun Mint, Es Batu" },
      { name: "Chocolate Lava Cake", category: "dessert", price: 35000, rating: 4.7, image: "images/cake.jpg", desc: "Kue cokelat hangat dengan lelehan cokelat pekat di dalamnya, disajikan bersama es krim vanilla.", ingredients: "Cokelat Hitam, Mentega, Telur, Gula, Tepung Terigu, Es Krim Vanilla" },
      { name: "Spaghetti Bolognese", category: "main-course", price: 60000, rating: 4.8, image: "images/spageti.jpg", desc: "Pasta al dente dengan saus daging sapi cincang tomat yang kaya rasa.", ingredients: "Spaghetti, Daging Sapi, Saus Tomat, Bawang Bombay, Keju Parmesan" },
      { name: "Matcha Latte", category: "drinks", price: 28000, rating: 4.9, image: "images/matcha.jpg", desc: "Perpaduan bubuk matcha premium Jepang dengan susu segar pilihan.", ingredients: "Bubuk Matcha, Susu Segar, Gula Cair, Es Batu" },
      { name: "Tiramisu", category: "dessert", price: 42000, rating: 4.8, image: "images/tiramisu.jpg", desc: "Dessert klasik Italia dengan lapisan biskuit kopi dan krim mascarpone lembut.", ingredients: "Biskuit Ladyfinger, Kopi Espresso, Keju Mascarpone, Bubuk Kakao" },
      { name: "Kentang Goreng Crispy", category: "appetizer", price: 20000, rating: 4.6, image: "images/frenchfries.jpg", desc: "Kentang goreng renyah dengan taburan bumbu rahasia dan parsley, disajikan dengan saus sambal.", ingredients: "Kentang, Garam, Minyak Nabati, Peterseli, Saus Sambal" },
      { name: "Tempe Mendoan", category: "appetizer", price: 15000, rating: 4.7, image: "images/mendoan.jpg", desc: "Tempe goreng setengah matang khas Banyumas yang dibalut adonan tepung gurih bertabur irisan daun bawang, disajikan hangat dengan sambal kecap.", ingredients: "Tempe, Tepung Terigu, Daun Bawang, Ketumbar, Bawang Putih, Kecap Manis" },
      { name: "Lumpia Sayur", category: "appetizer", price: 18000, rating: 4.5, image: "images/lumpia.jpg", desc: "Lumpia goreng berisi campuran sayuran segar dengan saus asam manis.", ingredients: "Kulit Lumpia, Wortel, Kubis, Taoge, Bawang Putih" },
      { name: "Mie Goreng Jawa", category: "main-course", price: 35000, rating: 4.8, image: "images/miegoreng.jpg", desc: "Mie goreng tradisional dengan bumbu kemiri dan ebi, disajikan dengan suwiran ayam kampung, telur orak-arik, dan taburan bawang goreng.", ingredients: "Mie Telur, Daging Ayam, Telur, Kemiri, Kecap Manis, Sayur Sawi" },
      { name: "Sate Ayam Madura", category: "main-course", price: 30000, rating: 4.8, image: "images/sate.jpg", desc: "Sate ayam pilihan yang dibakar dengan bumbu kacang khas Madura, disajikan dengan irisan bawang merah.", ingredients: "Daging Ayam, Kacang Tanah, Kecap Manis, Bawang Merah, Cabai" },
      { name: "Rendang Daging", category: "main-course", price: 40000, rating: 5.0, image: "images/rendang.jpg", desc: "Daging sapi yang dimasak perlahan dengan santan dan rempah-rempah khas Minang hingga empuk.", ingredients: "Daging Sapi, Santan, Cabai, Bawang Merah, Bawang Putih, Rempah Rendang" },
      { name: "Ayam Geprek Sambal Bawang", category: "main-course", price: 28000, rating: 4.9, image: "images/ayamgeprek.jpg", desc: "Ayam goreng tepung renyah yang digeprek hancur bersama ulekan sambal bawang segar yang pedas gurih.", ingredients: "Daging Ayam, Tepung Bumbu, Cabai Rawit, Bawang Putih, Garam, Minyak Panas" },
      { name: "Es Campur Spesial", category: "dessert", price: 22000, rating: 4.6, image: "images/escampur.jpg", desc: "Hidangan penutup segar dengan campuran alpukat, cincau, kelapa muda, dan nangka bersiram susu kental manis.", ingredients: "Alpukat, Cincau Hitam, Kelapa Muda, Nangka, Susu Kental Manis, Es Serut" },
      { name: "Pisang Bakar Coklat Keju", category: "dessert", price: 20000, rating: 4.8, image: "images/pisangbakar.jpg", desc: "Pisang kepok panggang manis yang disajikan dengan taburan keju parut melimpah dan siraman susu kental manis cokelat.", ingredients: "Pisang Kepok, Keju Cheddar, Susu Kental Manis Cokelat, Mentega" },
      { name: "Jus Alpukat", category: "drinks", price: 20000, rating: 4.7, image: "images/alpukat.jpg", desc: "Jus alpukat segar dan kental dengan tambahan susu kental manis cokelat di pinggiran gelas.", ingredients: "Alpukat Segar, Gula, Susu Kental Manis Cokelat, Air, Es Batu" },
      { name: "Iced Americano", category: "drinks", price: 25000, rating: 4.6, image: "images/americano.jpg", desc: "Kopi espresso dengan paduan air dingin dan es batu yang menyegarkan untuk pecinta kopi hitam.", ingredients: "Kopi Espresso, Air, Es Batu" },
      { name: "Strawberry Smoothies", category: "drinks", price: 28000, rating: 4.8, image: "images/stroberi.jpg", desc: "Minuman blended stroberi segar dengan yogurt dan susu yang lembut, menyehatkan, dan manis.", ingredients: "Stroberi Segar, Yogurt Plain, Susu Cair, Madu, Es Batu" }
    ],
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });