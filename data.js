// Car, bike, store, video and blog data for AutoRaaz.
// The app reads these lists from js/app.js.

/* (All previous functions + Videos + Blog + Dropdown filters are included cleanly) */

const originalCars = [
    {id:1,make:"Toyota",model:"Corolla 1.6 Altis",price:42.5,year:2021,km:"45,000",fuel:"Petrol",city:"Lahore",trans:"Automatic",img:"https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=800&h=500&fit=crop",images:["https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=800&h=500&fit=crop","https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&h=500&fit=crop"],desc:"Excellent condition Toyota Corolla Altis."},
    {id:2,make:"Honda",model:"Civic Oriel 1.5 Turbo",price:58,year:2022,km:"28,000",fuel:"Petrol",city:"Karachi",trans:"Automatic",img:"https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&h=500&fit=crop",images:["https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&h=500&fit=crop"],desc:"Almost new Honda Civic Oriel."},
    {id:3,make:"Suzuki",model:"Cultus VXR",price:27.8,year:2020,km:"52,000",fuel:"Petrol",city:"Islamabad",trans:"Manual",img:"https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&h=500&fit=crop",images:["https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&h=500&fit=crop"],desc:"Well maintained Suzuki Cultus."},
    {id:4,make:"Kia",model:"Sportage AWD",price:85,year:2023,km:"15,000",fuel:"Petrol",city:"Lahore",trans:"Automatic",img:"https://images.unsplash.com/photo-1617531653332-bd46c24f2068?w=800&h=500&fit=crop",images:["https://images.unsplash.com/photo-1617531653332-bd46c24f2068?w=800&h=500&fit=crop"],desc:"Brand new condition Kia Sportage."},
    {id:5,make:"Honda",model:"City 1.5 Aspire",price:38.5,year:2021,km:"41,000",fuel:"Petrol",city:"Rawalpindi",trans:"Automatic",img:"https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=800&h=500&fit=crop",images:["https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=800&h=500&fit=crop"],desc:"Honda City Aspire in pristine condition."},
    {id:6,make:"Toyota",model:"Yaris 1.3 Ativ",price:36.9,year:2022,km:"33,000",fuel:"Petrol",city:"Karachi",trans:"Automatic",img:"https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&h=500&fit=crop",images:["https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&h=500&fit=crop"],desc:"Toyota Yaris Ativ CVT."},
    {id:7,make:"Suzuki",model:"Alto VXR",price:22.5,year:2021,km:"38,000",fuel:"Petrol",city:"Faisalabad",trans:"Manual",img:"https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=800&h=500&fit=crop",images:["https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=800&h=500&fit=crop"],desc:"Suzuki Alto VXR – perfect first car."},
    {id:8,make:"Hyundai",model:"Tucson AWD",price:92,year:2023,km:"12,000",fuel:"Petrol",city:"Islamabad",trans:"Automatic",img:"https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=800&h=500&fit=crop",images:["https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=800&h=500&fit=crop"],desc:"Hyundai Tucson Ultimate AWD."},
    {id:9,make:"Changan",model:"Alsvin 1.5",price:31.5,year:2022,km:"29,000",fuel:"Petrol",city:"Lahore",trans:"Automatic",img:"https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800&h=500&fit=crop",images:["https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800&h=500&fit=crop"],desc:"Changan Alsvin Lumiere."},
    {id:10,make:"MG",model:"HS 1.5 Turbo",price:78,year:2023,km:"18,500",fuel:"Petrol",city:"Karachi",trans:"Automatic",img:"https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800&h=500&fit=crop",images:["https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800&h=500&fit=crop"],desc:"MG HS Trophy."},
    {id:11,make:"Toyota",model:"Fortuner 2.8 Sigma",price:145,year:2022,km:"35,000",fuel:"Diesel",city:"Lahore",trans:"Automatic",img:"https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&h=500&fit=crop",images:["https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&h=500&fit=crop"],desc:"Toyota Fortuner Sigma 4."},
    {id:12,make:"Kia",model:"Picanto 1.0",price:26.8,year:2021,km:"47,000",fuel:"Petrol",city:"Rawalpindi",trans:"Automatic",img:"https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&h=500&fit=crop",images:["https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&h=500&fit=crop"],desc:"Kia Picanto AT."}
];

const newCarsData = [
    {id:101,make:"Toyota",model:"Corolla Cross 2025",price:89.5,year:2025,km:"0",fuel:"Hybrid",city:"Pakistan",trans:"Automatic",img:"https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=800&h=500&fit=crop",desc:"Brand new Toyota Corolla Cross Hybrid."},
    {id:102,make:"Honda",model:"Civic RS 2025",price:95,year:2025,km:"0",fuel:"Petrol",city:"Pakistan",trans:"Automatic",img:"https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&h=500&fit=crop",desc:"Latest Honda Civic RS."},
    {id:103,make:"Suzuki",model:"Swift 2025",price:48,year:2025,km:"0",fuel:"Petrol",city:"Pakistan",trans:"Automatic",img:"https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&h=500&fit=crop",desc:"New Suzuki Swift."},
    {id:104,make:"Kia",model:"Sportage 2025",price:92,year:2025,km:"0",fuel:"Petrol",city:"Pakistan",trans:"Automatic",img:"https://images.unsplash.com/photo-1617531653332-bd46c24f2068?w=800&h=500&fit=crop",desc:"All-new Kia Sportage."},
    {id:105,make:"Hyundai",model:"Tucson 2025",price:98,year:2025,km:"0",fuel:"Petrol",city:"Pakistan",trans:"Automatic",img:"https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=800&h=500&fit=crop",desc:"Hyundai Tucson 2025."},
    {id:106,make:"MG",model:"HS 2025",price:85,year:2025,km:"0",fuel:"Petrol",city:"Pakistan",trans:"Automatic",img:"https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800&h=500&fit=crop",desc:"MG HS 2025."}
];

const bikesData = [
    {id:201,make:"Honda",model:"CG 125 2024",price:2.15,year:2024,km:"0",fuel:"Petrol",city:"Pakistan",trans:"Manual",img:"https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=800&h=500&fit=crop",desc:"Honda CG 125."},
    {id:202,make:"Yamaha",model:"YBR 125",price:2.45,year:2024,km:"0",fuel:"Petrol",city:"Pakistan",trans:"Manual",img:"https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=800&h=500&fit=crop",desc:"Yamaha YBR 125."},
    {id:203,make:"Suzuki",model:"GD 110S",price:1.95,year:2024,km:"0",fuel:"Petrol",city:"Pakistan",trans:"Manual",img:"https://images.unsplash.com/photo-1609630875171-b1321377ee65?w=800&h=500&fit=crop",desc:"Suzuki GD 110S."},
    {id:204,make:"Honda",model:"CD 70",price:1.35,year:2024,km:"0",fuel:"Petrol",city:"Pakistan",trans:"Manual",img:"https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=800&h=500&fit=crop",desc:"Honda CD 70."},
    {id:205,make:"Yamaha",model:"YFZ R15",price:7.5,year:2024,km:"0",fuel:"Petrol",city:"Pakistan",trans:"Manual",img:"https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=800&h=500&fit=crop",desc:"Yamaha R15."},
    {id:206,make:"Unique",model:"UD 70",price:1.1,year:2024,km:"0",fuel:"Petrol",city:"Pakistan",trans:"Manual",img:"https://images.unsplash.com/photo-1609630875171-b1321377ee65?w=800&h=500&fit=crop",desc:"Unique UD 70."}
];

const autoStoreData = [
    {id:301,make:"Tyres",model:"Michelin 195/65 R15",price:0.28,year:2024,km:"New",fuel:"-",city:"Pakistan",trans:"-",img:"https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=800&h=500&fit=crop",desc:"Premium Michelin tyres."},
    {id:302,make:"Battery",model:"Osaka 12V 60Ah",price:0.18,year:2024,km:"New",fuel:"-",city:"Pakistan",trans:"-",img:"https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=500&fit=crop",desc:"Osaka car battery."},
    {id:303,make:"Oil",model:"Shell Helix 5W-30",price:0.08,year:2024,km:"New",fuel:"-",city:"Pakistan",trans:"-",img:"https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=800&h=500&fit=crop",desc:"Shell Helix Ultra 4L."},
    {id:304,make:"Accessories",model:"LED Headlights",price:0.12,year:2024,km:"New",fuel:"-",city:"Pakistan",trans:"-",img:"https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800&h=500&fit=crop",desc:"LED headlight kit."},
    {id:305,make:"Audio",model:"Pioneer Android Player",price:0.35,year:2024,km:"New",fuel:"-",city:"Pakistan",trans:"-",img:"https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&h=500&fit=crop",desc:"Pioneer 9-inch stereo."},
    {id:306,make:"Care",model:"Car Cover Waterproof",price:0.05,year:2024,km:"New",fuel:"-",city:"Pakistan",trans:"-",img:"https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=500&fit=crop",desc:"Waterproof car cover."}
];

const videosData = [
    { title: "2025 Toyota Corolla Cross Review", desc: "Full detailed review of the new Corolla Cross Hybrid.", img: "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=600&h=340&fit=crop", date: "Aug 2025" },
    { title: "Honda Civic vs Toyota Corolla", desc: "Which one should you buy in 2025? Full comparison.", img: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=600&h=340&fit=crop", date: "Jul 2025" },
    { title: "Best Used Cars Under 30 Lakh", desc: "Top recommendations for budget buyers.", img: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=600&h=340&fit=crop", date: "Jun 2025" },
    { title: "How to Check Auction Sheet", desc: "Complete guide to reading Japanese auction sheets.", img: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=600&h=340&fit=crop", date: "May 2025" }
];

const blogData = [
    { title: "Complete Guide to Buying Used Cars in Pakistan", desc: "Everything you need to know before purchasing a used car.", img: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=600&h=340&fit=crop", date: "20 Aug 2025" },
    { title: "Top 5 Fuel Efficient Cars 2025", desc: "Save money on fuel with these best options.", img: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=600&h=340&fit=crop", date: "12 Aug 2025" },
    { title: "Car Maintenance Tips for Summers", desc: "How to keep your car healthy in extreme heat.", img: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=600&h=340&fit=crop", date: "5 Aug 2025" },
    { title: "New Car Prices Update - August 2025", desc: "Latest official prices of all new cars in Pakistan.", img: "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=600&h=340&fit=crop", date: "1 Aug 2025" }
];
