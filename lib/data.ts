export type Tractor = {
  slug: string; brand: "Powertrac" | "Farmtrac"; name: string; hp: string;
  drive: string; engine: string; lift: string; gearbox: string; image: string;
  images?: string[]; description: string; specs: string[]; featured?: boolean;
};

export type Story = {
  _id?: string; farmer_name: string; caption: string; description: string;
  tractor_model?: string; rating: number; media_url?: string;
  media_type?: "image" | "video"; video_url?: string; featured?: boolean;
};

export const tractors: Tractor[] = [
  { slug: "pt-euro-45-e9", brand: "Powertrac", name: "PT-EURO 45 E9", hp: "45 HP", drive: "2WD", engine: "3-Cylinder, 2761 CC", lift: "2000 kg", gearbox: "8F + 2R", image: "https://assets.tractorjunction.com/tractor-junction/assets/images/upload/powertrac-euro-45-plus-1690880480.webp", description: "Reliable and efficient for medium-sized farms, with excellent fuel economy.", specs: ["3-Cylinder AVL Engine", "Oil Immersed Brakes", "Power Steering", "Diesel Saver Technology"], featured: true },
  { slug: "pt-euro-50-lm", brand: "Powertrac", name: "PT-EURO 50 LM", hp: "50 HP", drive: "2WD", engine: "3-Cylinder, 2761 CC", lift: "2000 kg", gearbox: "8F + 2R", image: "https://assets.tractorjunction.com/tractor-junction/assets/images/tractor-images/tractor-image-0-1740036829.webp", description: "A balanced combination of robust power and daily operating economy.", specs: ["198.5 Nm Max Torque", "42.5 HP PTO", "Diesel Saver Technology", "Power Steering"], featured: true },
  { slug: "pt-euro-50-nxt", brand: "Powertrac", name: "PT-EURO 50 NXT", hp: "50 HP", drive: "2WD", engine: "3-Cylinder, 2932 CC", lift: "2000 kg", gearbox: "12F + 3R", image: "https://assets.tractorjunction.com/tractor-junction/assets/images/tractor-images/tractor-image-0-1740036829.webp", description: "A next-generation powerhouse for demanding agricultural applications.", specs: ["2932 CC Engine", "206 Nm Torque", "Synchromesh Transmission", "Independent PTO"] },
  { slug: "pt-euro-55-e33", brand: "Powertrac", name: "PT-EURO 55 E33", hp: "55 HP", drive: "2WD", engine: "3-Cylinder Heavy Duty", lift: "2000 kg", gearbox: "12F + 3R", image: "https://assets.tractorjunction.com/tractor-junction/assets/images/upload/powertrac-euro-55-next-4wd-1690881017.webp", description: "Heavy-duty performance for large-scale farming operations.", specs: ["220+ Nm Torque", "Heavy Duty Front Axle", "Dual Clutch", "48+ HP PTO"] },
  { slug: "pt-euro-55-4wd", brand: "Powertrac", name: "PT-EURO 55 4WD", hp: "55 HP", drive: "4WD", engine: "3-Cylinder High Torque", lift: "2000 kg", gearbox: "12F + 3R", image: "https://assets.tractorjunction.com/tractor-junction/assets/images/upload/powertrac-euro-55-next-4wd-1690881017.webp", description: "Ultimate traction for demanding terrain and heavy applications.", specs: ["True 4-Wheel Drive", "Premium Suspension Seat", "220+ Nm Torque", "Advanced Hydraulics"], featured: true },
  { slug: "ft-50-ept", brand: "Farmtrac", name: "FT-50 EPT", hp: "50 HP", drive: "2WD", engine: "3-Cylinder AVL Tech", lift: "1800 kg", gearbox: "8F + 2R", image: "https://assets.tractorjunction.com/tractor-junction/assets/images/upload/farmtrac-50-powermaxx-16905409320.webp", description: "European-engineered efficiency with excellent operator comfort.", specs: ["AVL Technology Engine", "198.5 Nm Max Torque", "43.3 HP PTO", "Ergonomic Design"], featured: true },
  { slug: "ft-605-epi-t20", brand: "Farmtrac", name: "FT-605 EPI T20", hp: "60 HP", drive: "2WD", engine: "4-Cylinder Heavy Duty", lift: "1800 kg", gearbox: "8F + 2R Dual Clutch", image: "https://assets.tractorjunction.com/tractor-junction/assets/images/upload/farmtrac-47-promaxx-4wd-1737537226.webp", description: "Premium power and advanced features designed for maximum productivity.", specs: ["Premium 4-Cylinder Engine", "217 Nm Torque", "50+ HP PTO", "Dual Clutch System"], featured: true }
];

export const branches = [
  { name: "Butwal HQ", location: "Kalikanagar-10, Butwal, Rupandehi", phones: ["9802636506", "9802624193"], hours: "Sun–Fri 9AM–6PM, Sat 10AM–4PM" },
  { name: "Bhairahawa", location: "Bhairahawa, Rupandehi", phones: ["9802636505"] },
  { name: "Chandrauta", location: "Chandrauta, Kapilvastu", phones: ["9802636503"] },
  { name: "Parasi", location: "Parasi, Nawalparasi", phones: ["9802636504"] },
  { name: "Kawasoti", location: "Kawasoti, Nawalparasi", phones: ["9802624192"] }
];

export const stories: Story[] = [
  { farmer_name: "Ram Bahadur Thapa", caption: "Increased my yield by 40% this season.", description: "The Powertrac Euro 50 has been a dependable partner for my farm.", tractor_model: "Powertrac Euro 50 LM", rating: 5 },
  { farmer_name: "Sita Chaudhary", caption: "Reliable service and excellent power.", description: "Divya Tara helped us select the right Farmtrac and supported us after purchase.", tractor_model: "Farmtrac 605 EPI", rating: 5 }
];
