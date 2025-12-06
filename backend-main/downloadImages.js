const axios = require('axios');
const fs = require('fs');
const path = require('path');

// Create directories if they don't exist
const categoryDir = path.join(__dirname, 'public', 'images', 'category');
const productDir = path.join(__dirname, 'public', 'images', 'product');

if (!fs.existsSync(categoryDir)) {
    fs.mkdirSync(categoryDir, { recursive: true });
}
if (!fs.existsSync(productDir)) {
    fs.mkdirSync(productDir, { recursive: true });
}

// Function to download image
async function downloadImage(url, filepath) {
    try {
        const response = await axios({
            url,
            method: 'GET',
            responseType: 'stream'
        });

        const writer = fs.createWriteStream(filepath);
        response.data.pipe(writer);

        return new Promise((resolve, reject) => {
            writer.on('finish', resolve);
            writer.on('error', reject);
        });
    } catch (error) {
        console.error(`Error downloading ${url}:`, error.message);
    }
}

// Image URLs mapping
const images = {
    // Categories
    categories: [
        { url: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?auto=format&fit=crop&w=800&q=80', name: 'electronics.jpg' },
        { url: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&w=800&q=80', name: 'clothing.jpg' },
        { url: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80', name: 'grocery.jpg' },
        { url: 'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?auto=format&fit=crop&w=800&q=80', name: 'shoes.jpg' },
        { url: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=800&q=80', name: 'home-kitchen.jpg' },
        { url: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=800&q=80', name: 'beauty.jpg' }
    ],
    // Products
    products: [
        // Electronics
        { url: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=800&q=80', name: 'iphone-15-pro-1.jpg' },
        { url: 'https://images.unsplash.com/photo-1678685888221-cda773a3dcdb?auto=format&fit=crop&w=800&q=80', name: 'iphone-15-pro-2.jpg' },
        { url: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?auto=format&fit=crop&w=800&q=80', name: 'samsung-s24.jpg' },
        { url: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80', name: 'macbook-pro.jpg' },
        { url: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?auto=format&fit=crop&w=800&q=80', name: 'sony-headphones.jpg' },
        { url: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=800&q=80', name: 'ipad-air.jpg' },
        
        // Clothing
        { url: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=800&q=80', name: 'denim-jacket.jpg' },
        { url: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=800&q=80', name: 'summer-dress.jpg' },
        { url: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800&q=80', name: 'tshirt.jpg' },
        { url: 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?auto=format&fit=crop&w=800&q=80', name: 'wool-coat.jpg' },
        { url: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=800&q=80', name: 'hoodie.jpg' },
        
        // Grocery
        { url: 'https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?auto=format&fit=crop&w=800&q=80', name: 'apples.jpg' },
        { url: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80', name: 'bread.jpg' },
        { url: 'https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?auto=format&fit=crop&w=800&q=80', name: 'eggs.jpg' },
        { url: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&w=800&q=80', name: 'coffee.jpg' },
        { url: 'https://images.unsplash.com/photo-1599599810769-bcde5a160d32?auto=format&fit=crop&w=800&q=80', name: 'nuts.jpg' },
        
        // Shoes
        { url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80', name: 'running-shoes.jpg' },
        { url: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=800&q=80', name: 'sneakers.jpg' },
        { url: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=800&q=80', name: 'heels.jpg' },
        { url: 'https://images.unsplash.com/photo-1520639888713-7851133b1ed0?auto=format&fit=crop&w=800&q=80', name: 'hiking-boots.jpg' },
        { url: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=800&q=80', name: 'canvas-shoes.jpg' },
        
        // Home & Kitchen
        { url: 'https://images.unsplash.com/photo-1584990347449-39b5e5b58f5d?auto=format&fit=crop&w=800&q=80', name: 'cookware.jpg' },
        { url: 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?auto=format&fit=crop&w=800&q=80', name: 'coffee-maker.jpg' },
        { url: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=800&q=80', name: 'bedsheets.jpg' },
        { url: 'https://images.unsplash.com/photo-1585515320310-259814833e62?auto=format&fit=crop&w=800&q=80', name: 'blender.jpg' },
        { url: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80', name: 'pillows.jpg' },
        
        // Beauty
        { url: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?auto=format&fit=crop&w=800&q=80', name: 'skincare.jpg' },
        { url: 'https://images.unsplash.com/photo-1522337660859-02fbefca4702?auto=format&fit=crop&w=800&q=80', name: 'hair-dryer.jpg' },
        { url: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=800&q=80', name: 'makeup-brushes.jpg' },
        { url: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80', name: 'serum.jpg' },
        { url: 'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=800&q=80', name: 'perfume.jpg' }
    ]
};

async function downloadAllImages() {
    console.log('Starting image download...\n');
    
    // Download category images
    console.log('Downloading category images...');
    for (const img of images.categories) {
        const filepath = path.join(categoryDir, img.name);
        await downloadImage(img.url, filepath);
        console.log(`✓ Downloaded: ${img.name}`);
    }
    
    // Download product images
    console.log('\nDownloading product images...');
    for (const img of images.products) {
        const filepath = path.join(productDir, img.name);
        await downloadImage(img.url, filepath);
        console.log(`✓ Downloaded: ${img.name}`);
    }
    
    console.log('\n=================================');
    console.log('All images downloaded successfully!');
    console.log(`Category images: ${images.categories.length}`);
    console.log(`Product images: ${images.products.length}`);
    console.log('=================================');
}

downloadAllImages().catch(console.error);
