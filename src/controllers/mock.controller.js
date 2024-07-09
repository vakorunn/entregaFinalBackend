import { generateMockProducts } from '../services/mockService.js';
import { v4 as uuidv4 } from 'uuid';

export const generateMockProducts = (count = 100) => {
    const products = [];
    for (let i = 0; i < count; i++) {
        products.push({
            _id: uuidv4(),
            name: `Product ${i + 1}`,
            price: (Math.random() * 100).toFixed(2),
            description: `Description for product ${i + 1}`,
            category: `Category ${(i % 5) + 1}`,
            stock: Math.floor(Math.random() * 100),
            createdAt: new Date(),
            updatedAt: new Date()
        });
    }
    return products;
}


export const getMockProducts = (req, res) => {
    const products = generateMockProducts();
    res.json(products);
}
