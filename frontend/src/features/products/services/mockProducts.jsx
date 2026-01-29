import productImage from "../../../assets/images/images.jpeg";
import sofaimage from "../../../assets/images/sofa.jpeg";
import knob from "../../../assets/images/konb.webp";

const MOCK_PRODUCTS = [
    {
      id: 1,
      name: "Modern Chair",
      category: "Furniture",
      price: 129.99,
      sale:0.2,
      images: [productImage, sofaimage, knob],
      description:
        "A sleek and modern chair designed for comfort and style, perfect for living rooms or office spaces.",
    },
    {
      id: 2,
      name: "Smart Lamp",
      category: "Electronics",
      price: 49.99,
      sale:0.4,
      images: [productImage, knob],
      description:
        "An energy-efficient smart lamp with adjustable brightness and color settings, controllable via smartphone app.",
  
    },
    {
      id: 3,
      name: "Comfy Sofa",
      category: "Furniture",
      price: 299.99,
      sale:0.1,      
      images: [sofaimage, productImage],
      description:
        "A spacious and comfortable sofa with plush cushions and durable fabric, ideal for family rooms and lounges.",
    },
      {
      id: 4,
      name: "Comfy Sofa",
      category: "Furniture",
      price: 299.99,
      images: [sofaimage],
      description:
        "A spacious and comfortable sofa with plush cushions and durable fabric, ideal for family rooms and lounges.",
    },
      {
      id: 5,
      name: "Comfy Sofa",
      category: "Furniture",
      price: 299.99,
      images: [sofaimage, productImage, knob],
      description:
        "A spacious and comfortable sofa with plush cushions and durable fabric, ideal for family rooms and lounges.",
      },
       {
      id: 6,
      name: "Comfy Sofa",
      category: "Furniture",
      price: 299.99,
      images: [knob],
      description:
        "A spacious and comfortable sofa with plush cushions and durable fabric, ideal for family rooms and lounges.",
    },
       {
      id: 7,
      name: "Comfy Sofa",
      category: "Furniture",
      price: 299.99,
      images: [knob],
      description:
        "A spacious and comfortable sofa with plush cushions and durable fabric, ideal for family rooms and lounges.",
    },
       {
      id: 8,
      name: "Comfy Sofa",
      category: "Furniture",
      price: 299.99,
      images: [sofaimage],
      description:
        "A spacious and comfortable sofa with plush cushions and durable fabric, ideal for family rooms and lounges.",
    },
       {
      id: 9,
      name: "Comfy Sofa",
      category: "Furniture",
      price: 299.99,
      images: [sofaimage],
      description:
        "A spacious and comfortable sofa with plush cushions and durable fabric, ideal for family rooms and lounges.",
    },
      {
      id: 10,
      name: "Comfy Sofa",
      category: "Furniture",
      price: 299.99,
      images: [sofaimage],
    },
      {
      id: 11,
      name: "Comfy Sofa",
      category: "Furniture",
      price: 299.99,
      images: [sofaimage],
    },
  ];

  export { MOCK_PRODUCTS };