const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const Category = require('./models/category');
const Product = require('./models/product');
const User = require('./models/user');

dotenv.config();

const seedData = async () => {
    try {
        // Connect to Database
        await mongoose.connect(process.env.DATABASE_URL);
        console.log('Connected to Database');

        // Clear existing data
        await Category.deleteMany({});
        await Product.deleteMany({});
        await User.deleteMany({});
        console.log('Cleared existing data');

        // Create Users
        const hashedPassword = await bcrypt.hash('123456', 10);
        
        const adminUser = await User.create({
            name: 'Admin User',
            email: 'admin@example.com',
            password: hashedPassword,
            isAdmin: true
        });

        const normalUser = await User.create({
            name: 'John Doe',
            email: 'user@example.com',
            password: hashedPassword,
            isAdmin: false
        });

        console.log('Users created');

        // Create Categories
        const categoriesData = [
            {
                name: 'Electronics',
                slug: 'electronics',
                image: 'images/category/electronics.jpg'
            },
            {
                name: 'Clothing',
                slug: 'clothing',
                image: 'images/category/clothing.jpg'
            },
            {
                name: 'Grocery',
                slug: 'grocery',
                image: 'images/category/grocery.jpg'
            },
            {
                name: 'Shoes',
                slug: 'shoes',
                image: 'images/category/shoes.jpg'
            },
            {
                name: 'Home & Kitchen',
                slug: 'home-kitchen',
                image: 'images/category/home-kitchen.jpg'
            },
            {
                name: 'Beauty',
                slug: 'beauty',
                image: 'images/category/beauty.jpg'
            }
        ];

        const createdCategories = await Category.insertMany(categoriesData);
        console.log('Categories created');

        // Create Products
        const productsData = [
            // Electronics
            {
                name: 'iPhone 15 Pro Max',
                slug: 'iphone-15-pro-max',
                images: [
                    { url: 'images/product/iphone-15-pro-1.jpg' },
                    { url: 'images/product/iphone-15-pro-2.jpg' }
                ],
                brand: 'Apple',
                category: 'electronics',
                description: 'Latest iPhone with A17 Pro chip, titanium design, and advanced camera system. Features include 6.7-inch Super Retina XDR display, 48MP main camera, and all-day battery life.',
                price: 1299,
                countInStock: 25,
                rating: 4.8,
                numReviews: 45,
                featuredProduct: true
            },
            {
                name: 'Samsung Galaxy S24 Ultra',
                slug: 'samsung-galaxy-s24-ultra',
                images: [
                    { url: 'images/product/samsung-s24.jpg' }
                ],
                brand: 'Samsung',
                category: 'electronics',
                description: 'Premium Android smartphone with S Pen, 200MP camera, and AI features. Includes 6.8-inch Dynamic AMOLED display and 5000mAh battery.',
                price: 1199,
                countInStock: 30,
                rating: 4.7,
                numReviews: 38,
                featuredProduct: true
            },
            {
                name: 'MacBook Pro 16"',
                slug: 'macbook-pro-16',
                images: [
                    { url: 'images/product/macbook-pro.jpg' }
                ],
                brand: 'Apple',
                category: 'electronics',
                description: 'Powerful laptop with M3 Pro chip, stunning Liquid Retina XDR display. Perfect for professionals with up to 22 hours battery life.',
                price: 2499,
                countInStock: 15,
                rating: 4.9,
                numReviews: 67,
                featuredProduct: true
            },
            {
                name: 'Sony WH-1000XM5 Headphones',
                slug: 'sony-wh-1000xm5',
                images: [
                    { url: 'images/product/sony-headphones.jpg' }
                ],
                brand: 'Sony',
                category: 'electronics',
                description: 'Industry-leading noise canceling wireless headphones with exceptional sound quality and 30-hour battery life.',
                price: 399,
                countInStock: 40,
                rating: 4.6,
                numReviews: 89,
                featuredProduct: false
            },
            {
                name: 'iPad Air 5th Gen',
                slug: 'ipad-air-5th-gen',
                images: [
                    { url: 'images/product/ipad-air.jpg' }
                ],
                brand: 'Apple',
                category: 'electronics',
                description: 'Powerful and versatile tablet with M1 chip and stunning 10.9-inch Liquid Retina display. Works with Apple Pencil and Magic Keyboard.',
                price: 599,
                countInStock: 35,
                rating: 4.5,
                numReviews: 52,
                featuredProduct: false
            },

            // Clothing
            {
                name: 'Men\'s Classic Denim Jacket',
                slug: 'mens-classic-denim-jacket',
                images: [
                    { url: 'images/product/denim-jacket.jpg' }
                ],
                brand: 'Levi\'s',
                category: 'clothing',
                description: 'Timeless denim jacket crafted from premium cotton. Features button closure, chest pockets, and adjustable waist tabs. Perfect for casual wear.',
                price: 89,
                countInStock: 60,
                rating: 4.4,
                numReviews: 34,
                featuredProduct: false
            },
            {
                name: 'Women\'s Summer Dress',
                slug: 'womens-summer-dress',
                images: [
                    { url: 'images/product/summer-dress.jpg' }
                ],
                brand: 'Zara',
                category: 'clothing',
                description: 'Elegant floral print dress perfect for summer occasions. Lightweight fabric with comfortable fit and feminine silhouette.',
                price: 79,
                countInStock: 45,
                rating: 4.6,
                numReviews: 28,
                featuredProduct: true
            },
            {
                name: 'Men\'s Cotton T-Shirt Pack (3)',
                slug: 'mens-cotton-tshirt-pack',
                images: [
                    { url: 'images/product/tshirt.jpg' }
                ],
                brand: 'Nike',
                category: 'clothing',
                description: 'Premium cotton t-shirts in black, white, and grey. Breathable fabric with comfortable fit, perfect for everyday wear.',
                price: 45,
                countInStock: 100,
                rating: 4.3,
                numReviews: 156,
                featuredProduct: false
            },
            {
                name: 'Winter Wool Coat',
                slug: 'winter-wool-coat',
                images: [
                    { url: 'images/product/wool-coat.jpg' }
                ],
                brand: 'H&M',
                category: 'clothing',
                description: 'Elegant wool blend coat for cold weather. Features button closure, side pockets, and inner lining for extra warmth.',
                price: 149,
                countInStock: 30,
                rating: 4.7,
                numReviews: 42,
                featuredProduct: true
            },
            {
                name: 'Athletic Performance Hoodie',
                slug: 'athletic-performance-hoodie',
                images: [
                    { url: 'images/product/hoodie.jpg' }
                ],
                brand: 'Adidas',
                category: 'clothing',
                description: 'Moisture-wicking athletic hoodie with stretchy fabric. Perfect for workouts or casual wear with adjustable hood and kangaroo pocket.',
                price: 65,
                countInStock: 70,
                rating: 4.5,
                numReviews: 91,
                featuredProduct: false
            },

            // Grocery
            {
                name: 'Organic Fresh Apples (2kg)',
                slug: 'organic-fresh-apples',
                images: [
                    { url: 'images/product/apples.jpg' }
                ],
                brand: 'Nature\'s Best',
                category: 'grocery',
                description: 'Crisp and sweet organic apples, hand-picked from local orchards. Rich in vitamins and perfect for healthy snacking.',
                price: 8,
                countInStock: 200,
                rating: 4.8,
                numReviews: 124,
                featuredProduct: false
            },
            {
                name: 'Whole Grain Bread',
                slug: 'whole-grain-bread',
                images: [
                    { url: 'images/product/bread.jpg' }
                ],
                brand: 'Fresh Bakery',
                category: 'grocery',
                description: 'Freshly baked whole grain bread packed with fiber and nutrients. No artificial preservatives, baked daily.',
                price: 4,
                countInStock: 150,
                rating: 4.5,
                numReviews: 78,
                featuredProduct: false
            },
            {
                name: 'Organic Eggs (12 pack)',
                slug: 'organic-eggs-12-pack',
                images: [
                    { url: 'images/product/eggs.jpg' }
                ],
                brand: 'Farm Fresh',
                category: 'grocery',
                description: 'Free-range organic eggs from happy hens. High in protein and omega-3 fatty acids.',
                price: 7,
                countInStock: 180,
                rating: 4.7,
                numReviews: 95,
                featuredProduct: true
            },
            {
                name: 'Premium Coffee Beans (500g)',
                slug: 'premium-coffee-beans',
                images: [
                    { url: 'images/product/coffee.jpg' }
                ],
                brand: 'Coffee Master',
                category: 'grocery',
                description: 'Single-origin arabica coffee beans with rich aroma and smooth taste. Perfect for espresso or drip coffee.',
                price: 15,
                countInStock: 90,
                rating: 4.9,
                numReviews: 167,
                featuredProduct: true
            },
            {
                name: 'Mixed Nuts Pack (1kg)',
                slug: 'mixed-nuts-pack',
                images: [
                    { url: 'images/product/nuts.jpg' }
                ],
                brand: 'Nature\'s Harvest',
                category: 'grocery',
                description: 'Premium mix of almonds, cashews, walnuts, and pecans. Roasted and lightly salted for perfect snacking.',
                price: 22,
                countInStock: 75,
                rating: 4.6,
                numReviews: 83,
                featuredProduct: false
            },

            // Shoes
            {
                name: 'Running Shoes Pro',
                slug: 'running-shoes-pro',
                images: [
                    { url: 'images/product/running-shoes.jpg' }
                ],
                brand: 'Nike',
                category: 'shoes',
                description: 'High-performance running shoes with responsive cushioning and breathable mesh upper. Designed for serious runners.',
                price: 129,
                countInStock: 50,
                rating: 4.7,
                numReviews: 112,
                featuredProduct: true
            },
            {
                name: 'Classic Leather Sneakers',
                slug: 'classic-leather-sneakers',
                images: [
                    { url: 'images/product/sneakers.jpg' }
                ],
                brand: 'Adidas',
                category: 'shoes',
                description: 'Timeless white leather sneakers that go with everything. Comfortable cushioned sole and durable construction.',
                price: 85,
                countInStock: 80,
                rating: 4.5,
                numReviews: 189,
                featuredProduct: true
            },
            {
                name: 'Women\'s High Heels',
                slug: 'womens-high-heels',
                images: [
                    { url: 'images/product/heels.jpg' }
                ],
                brand: 'Zara',
                category: 'shoes',
                description: 'Elegant high heels perfect for formal occasions. Features comfortable padded insole and stable heel design.',
                price: 95,
                countInStock: 40,
                rating: 4.3,
                numReviews: 56,
                featuredProduct: false
            },
            {
                name: 'Hiking Boots',
                slug: 'hiking-boots',
                images: [
                    { url: 'images/product/hiking-boots.jpg' }
                ],
                brand: 'Timberland',
                category: 'shoes',
                description: 'Durable waterproof hiking boots with excellent grip and ankle support. Perfect for outdoor adventures.',
                price: 159,
                countInStock: 35,
                rating: 4.8,
                numReviews: 73,
                featuredProduct: false
            },
            {
                name: 'Casual Canvas Shoes',
                slug: 'casual-canvas-shoes',
                images: [
                    { url: 'images/product/canvas-shoes.jpg' }
                ],
                brand: 'Converse',
                category: 'shoes',
                description: 'Classic canvas shoes with rubber sole. Lightweight and comfortable for everyday casual wear.',
                price: 55,
                countInStock: 100,
                rating: 4.4,
                numReviews: 145,
                featuredProduct: false
            },

            // Home & Kitchen
            {
                name: 'Stainless Steel Cookware Set',
                slug: 'stainless-steel-cookware-set',
                images: [
                    { url: 'images/product/cookware.jpg' }
                ],
                brand: 'KitchenPro',
                category: 'home-kitchen',
                description: '10-piece professional cookware set including pots, pans, and lids. Durable stainless steel construction with aluminum core.',
                price: 199,
                countInStock: 30,
                rating: 4.7,
                numReviews: 87,
                featuredProduct: true
            },
            {
                name: 'Electric Coffee Maker',
                slug: 'electric-coffee-maker',
                images: [
                    { url: 'images/product/coffee-maker.jpg' }
                ],
                brand: 'Breville',
                category: 'home-kitchen',
                description: 'Programmable coffee maker with 12-cup capacity. Features auto-brew timer and keep-warm function.',
                price: 89,
                countInStock: 45,
                rating: 4.5,
                numReviews: 134,
                featuredProduct: false
            },
            {
                name: 'Luxury Bed Sheet Set',
                slug: 'luxury-bed-sheet-set',
                images: [
                    { url: 'images/product/bedsheets.jpg' }
                ],
                brand: 'HomeComfort',
                category: 'home-kitchen',
                description: 'Egyptian cotton bed sheet set with 600 thread count. Includes fitted sheet, flat sheet, and pillowcases.',
                price: 129,
                countInStock: 55,
                rating: 4.8,
                numReviews: 201,
                featuredProduct: true
            },
            {
                name: 'Blender Pro 3000',
                slug: 'blender-pro-3000',
                images: [
                    { url: 'images/product/blender.jpg' }
                ],
                brand: 'KitchenAid',
                category: 'home-kitchen',
                description: 'Powerful 1200W blender with multiple speed settings. Perfect for smoothies, soups, and crushing ice.',
                price: 149,
                countInStock: 40,
                rating: 4.6,
                numReviews: 98,
                featuredProduct: false
            },
            {
                name: 'Decorative Throw Pillows (Set of 4)',
                slug: 'decorative-throw-pillows',
                images: [
                    { url: 'images/product/pillows.jpg' }
                ],
                brand: 'HomeDecor',
                category: 'home-kitchen',
                description: 'Soft and stylish throw pillows in complementary colors. Premium fabric with hidden zipper closure.',
                price: 49,
                countInStock: 90,
                rating: 4.4,
                numReviews: 67,
                featuredProduct: false
            },

            // Beauty
            {
                name: 'Luxury Skincare Set',
                slug: 'luxury-skincare-set',
                images: [
                    { url: 'images/product/skincare.jpg' }
                ],
                brand: 'La Mer',
                category: 'beauty',
                description: 'Complete skincare routine with cleanser, toner, serum, and moisturizer. Formulated with natural ingredients.',
                price: 189,
                countInStock: 35,
                rating: 4.9,
                numReviews: 156,
                featuredProduct: true
            },
            {
                name: 'Professional Hair Dryer',
                slug: 'professional-hair-dryer',
                images: [
                    { url: 'images/product/hair-dryer.jpg' }
                ],
                brand: 'Dyson',
                category: 'beauty',
                description: 'Advanced hair dryer with intelligent heat control. Fast drying with minimal heat damage.',
                price: 399,
                countInStock: 25,
                rating: 4.8,
                numReviews: 89,
                featuredProduct: true
            },
            {
                name: 'Makeup Brush Set',
                slug: 'makeup-brush-set',
                images: [
                    { url: 'images/product/makeup-brushes.jpg' }
                ],
                brand: 'Morphe',
                category: 'beauty',
                description: 'Professional 15-piece makeup brush set with synthetic bristles. Includes face and eye brushes with storage case.',
                price: 79,
                countInStock: 60,
                rating: 4.6,
                numReviews: 234,
                featuredProduct: false
            },
            {
                name: 'Organic Face Serum',
                slug: 'organic-face-serum',
                images: [
                    { url: 'images/product/serum.jpg' }
                ],
                brand: 'The Ordinary',
                category: 'beauty',
                description: 'Vitamin C serum with hyaluronic acid. Brightens skin and reduces fine lines naturally.',
                price: 45,
                countInStock: 80,
                rating: 4.7,
                numReviews: 312,
                featuredProduct: true
            },
            {
                name: 'Luxury Perfume Set',
                slug: 'luxury-perfume-set',
                images: [
                    { url: 'images/product/perfume.jpg' }
                ],
                brand: 'Chanel',
                category: 'beauty',
                description: 'Elegant fragrance collection with floral and woody notes. Long-lasting formula in premium glass bottles.',
                price: 159,
                countInStock: 40,
                rating: 4.8,
                numReviews: 178,
                featuredProduct: false
            }
        ];

        const createdProducts = await Product.insertMany(productsData);
        console.log(`${createdProducts.length} Products created`);

        // Update Categories with Product IDs
        for (const product of createdProducts) {
            await Category.findOneAndUpdate(
                { slug: product.category },
                { $push: { products: product._id } }
            );
        }
        console.log('Categories updated with products');

        console.log('\n=================================');
        console.log('Seeding completed successfully!');
        console.log(`Total Users: 2`);
        console.log(`Total Categories: ${createdCategories.length}`);
        console.log(`Total Products: ${createdProducts.length}`);
        console.log('=================================\n');
        
        process.exit(0);
    } catch (error) {
        console.error('Error seeding data:', error);
        process.exit(1);
    }
};

seedData();
