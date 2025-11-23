
export interface SynergyAnalysis {
    score: number;
    synergyName: string;
    summary: string;
    pros: string[];
    cons: string[];
    scientificConsensus: 'High' | 'Medium' | 'Low';
    mechanism: string;
    riskLevel: 'None' | 'Low' | 'Moderate' | 'High';
    impactDomain: 'Cognitive' | 'Physical' | 'Metabolic' | 'Immune';
    magnitude: number; // 0-100 scale of effect strength
    amplification: string; // e.g., "200%", "2x", "1.5x"
    type: 'Kinetic' | 'Dynamic'; // Kinetic = Absorption, Dynamic = Effect
    // Data for Line Chart: [{name: 'Turmeric', value: 3}, {name: 'Pepper', value: 3}, {name: 'Synergy', value: 10}]
    chartData: { name: string; value: number }[]; 
}

export interface ChatMessage {
    id: string;
    role: 'user' | 'model';
    text: string;
    timestamp: number;
}

export interface FoodItem {
  name: string;
  category: string;
}

export interface SynergyRank {
    rank: number;
    ingredients: string[]; // Changed from pair to generic array
    name: string;
    magnitude: number; // Normalized 0-100 score for sorting
    amplification: string; // The scientific multiplier (e.g. "2000%", "3x")
    evidence: 'Clinical' | 'Emerging' | 'Anecdotal' | 'Culinary' | 'Traditional' | 'Sports';
    domain: 'Cognitive' | 'Physical' | 'Metabolic' | 'Immune';
    type: 'Kinetic' | 'Dynamic'; // Kinetic (Absorption) vs Dynamic (Effect)
    description: string;
    tags: string[]; // NEW: specific goals like 'Memory', 'Sleep'
}

export const PRESET_RANKINGS: SynergyRank[] = [
    // --- SUPER STACKS (Trios) ---
    { 
        rank: 1, 
        ingredients: ['Turmeric', 'Black Pepper', 'Olive Oil'], 
        name: 'The Golden Trio', 
        magnitude: 99, 
        amplification: 'Maximum', 
        evidence: 'Clinical', 
        domain: 'Physical', 
        type: 'Kinetic', 
        description: 'Pepper blocks liver breakdown, Fat solubilizes curcumin. The absolute maximum absorption possible for Turmeric.',
        tags: ['Repair', 'Joints', 'Immune']
    },
    { 
        rank: 2, 
        ingredients: ['Vitamin D3', 'Vitamin K2', 'Avocado'], 
        name: 'Bone Density Trio', 
        magnitude: 98, 
        amplification: 'Critical', 
        evidence: 'Clinical', 
        domain: 'Physical', 
        type: 'Dynamic', 
        description: 'D3 absorbs calcium, K2 directs it to bones, Fat ensures both vitamins are actually absorbed.',
        tags: ['Bone', 'Heart', 'Safety']
    },
    { 
        rank: 3, 
        ingredients: ['Spinach', 'Lemon', 'Steak'], 
        name: 'Iron Max Stack', 
        magnitude: 97, 
        amplification: '6x', 
        evidence: 'Clinical', 
        domain: 'Physical', 
        type: 'Kinetic', 
        description: 'Heme iron (meat) + Vitamin C (lemon) creates the "Meat Factor" to supercharge plant iron absorption.',
        tags: ['Energy', 'Blood', 'Iron']
    },
    { 
        rank: 4, 
        ingredients: ['Oats', 'Walnuts', 'Blueberries'], 
        name: 'Neuro Breakfast', 
        magnitude: 96, 
        amplification: 'Synergistic', 
        evidence: 'Clinical', 
        domain: 'Cognitive', 
        type: 'Dynamic', 
        description: 'Beta-glucan fiber + Omega-3s + Anthocyanins. The ultimate brain-fueling morning meal.',
        tags: ['Brain', 'Focus', 'Breakfast']
    },
    {
        rank: 5,
        ingredients: ['Runny Egg Yolk', 'Turmeric', 'Black Pepper'],
        name: 'Liquid Gold Egg',
        magnitude: 95,
        amplification: 'High',
        evidence: 'Culinary',
        domain: 'Physical',
        type: 'Kinetic',
        description: 'The perfect fat emulsion in liquid yolk maximizes turmeric absorption while pepper boosts bioavailability.',
        tags: ['Breakfast', 'Anti-Inflammatory', 'Protein']
    },

    // --- Top Tier Pairs ---
    { 
        rank: 6, ingredients: ['Caffeine', 'L-Theanine'], name: 'The Focus Stack', magnitude: 95, amplification: '4x', evidence: 'Clinical', domain: 'Cognitive', type: 'Dynamic', description: 'The best combo for focus. Theanine calms the jittery feeling of coffee for clean energy.', tags: ['Focus', 'Energy', 'Clarity']
    },
    { 
        rank: 7, ingredients: ['Lion\'s Mane', 'Niacin (B3)'], name: 'Brain Repair', magnitude: 94, amplification: 'High', evidence: 'Emerging', domain: 'Cognitive', type: 'Kinetic', description: 'Niacin helps the mushroom\'s brain-repairing compounds reach your neurons.', tags: ['Memory', 'Repair', 'Brain']
    },
    { 
        rank: 8, ingredients: ['Magnesium', 'Glycine'], name: 'Deep Sleep', magnitude: 92, amplification: 'Synergistic', evidence: 'Clinical', domain: 'Cognitive', type: 'Dynamic', description: 'Relaxes both body and mind for high-quality, restorative sleep.', tags: ['Sleep', 'Calm', 'Recovery']
    },
    { 
        rank: 9, ingredients: ['Green Tea', 'Lemon'], name: 'Antioxidant Saver', magnitude: 91, amplification: '5x', evidence: 'Clinical', domain: 'Metabolic', type: 'Kinetic', description: 'Citrus stabilizes the antioxidants in green tea so they survive digestion.', tags: ['Health', 'Metabolism', 'Energy']
    },
    {
        rank: 10, ingredients: ['Tomato', 'Olive Oil'], name: 'Heart Protector', magnitude: 89, amplification: '4x', evidence: 'Clinical', domain: 'Physical', type: 'Kinetic', description: 'Fat makes Lycopene (in tomatoes) absorbable. Great for heart and skin.', tags: ['Heart', 'Skin', 'Health']
    },
    {
        rank: 11, ingredients: ['Yogurt', 'Banana'], name: 'Gut Health Duo', magnitude: 87, amplification: 'Synergistic', evidence: 'Clinical', domain: 'Metabolic', type: 'Dynamic', description: 'Probiotics (yogurt) need Prebiotics (fiber in banana) to survive and thrive.', tags: ['Gut', 'Digestion', 'Immune']
    },
    
    // --- Athletic & Physical ---
    {
        rank: 12, ingredients: ['Rice', 'Beans', 'Salsa'], name: 'Complete Fuel', magnitude: 86, amplification: 'Additive', evidence: 'Clinical', domain: 'Physical', type: 'Dynamic', description: 'Complete protein plus Vitamin C from salsa to absorb iron from the beans.', tags: ['Muscle', 'Vegan', 'Energy']
    },
    {
        rank: 13, ingredients: ['Creatine', 'Carbs'], name: 'Muscle Fuel', magnitude: 84, amplification: 'High', evidence: 'Clinical', domain: 'Physical', type: 'Kinetic', description: 'Insulin from carbs helps push creatine into muscle cells faster.', tags: ['Muscle', 'Workout', 'Strength']
    },
    {
        rank: 14, ingredients: ['Watermelon', 'Lime'], name: 'Blood Flow', magnitude: 82, amplification: '2x', evidence: 'Emerging', domain: 'Physical', type: 'Kinetic', description: 'Citrulline in watermelon boosts nitric oxide; Vitamin C protects it.', tags: ['Energy', 'Pump', 'Circulation']
    },
    {
        rank: 15, ingredients: ['Beetroot', 'Spinach'], name: 'Nitrate Surge', magnitude: 83, amplification: 'Additive', evidence: 'Clinical', domain: 'Physical', type: 'Dynamic', description: 'Double source of nitrates for massive endurance and blood pressure benefits.', tags: ['Endurance', 'Heart', 'Energy']
    },

    // --- Immune & Metabolic ---
    {
        rank: 16, ingredients: ['Garlic', 'Honey', 'Ginger'], name: 'Immune Bomb', magnitude: 88, amplification: 'Synergistic', evidence: 'Traditional', domain: 'Immune', type: 'Dynamic', description: 'Triple threat against viruses and bacteria. Potent natural antibiotic.', tags: ['Immune', 'Sick', 'Cold']
    },
    {
        rank: 17, ingredients: ['Zinc', 'Quercetin'], name: 'Virus Blocker', magnitude: 85, amplification: 'High', evidence: 'Emerging', domain: 'Immune', type: 'Kinetic', description: 'Quercetin opens cell doors so Zinc can enter and fight viruses.', tags: ['Immune', 'Defense']
    },
    {
        rank: 18, ingredients: ['Oatmeal', 'Berries'], name: 'Heart Breakfast', magnitude: 79, amplification: 'Additive', evidence: 'Clinical', domain: 'Metabolic', type: 'Dynamic', description: 'Fiber lowers cholesterol while antioxidants protect blood vessels.', tags: ['Heart', 'Breakfast', 'Health']
    },
    {
        rank: 19, ingredients: ['Broccoli', 'Mustard Seeds'], name: 'Detox Activator', magnitude: 86, amplification: '4x', evidence: 'Clinical', domain: 'Physical', type: 'Kinetic', description: 'Mustard seeds replace enzymes lost in cooked broccoli to restore detox benefits.', tags: ['Detox', 'Liver', 'Health']
    },
    {
        rank: 20, ingredients: ['Apple', 'Dark Chocolate'], name: 'Blood Clot Preventer', magnitude: 78, amplification: 'Synergistic', evidence: 'Emerging', domain: 'Metabolic', type: 'Dynamic', description: 'Quercetin and Catechins work together to improve circulation.', tags: ['Heart', 'Blood', 'Snack']
    },

    // --- Extended Database (21-88) ---
    {
        rank: 21, ingredients: ['Salmon', 'Asparagus', 'Lemon'], name: 'Cell Energy Trio', magnitude: 85, amplification: 'High', evidence: 'Clinical', domain: 'Metabolic', type: 'Dynamic', description: 'B12, Folate and Vitamin C work together for methylation.', tags: ['Energy', 'Detox']
    },
    {
        rank: 22, ingredients: ['Kale', 'Avocado'], name: 'Green Absorption', magnitude: 76, amplification: '3x', evidence: 'Clinical', domain: 'Physical', type: 'Kinetic', description: 'Fat makes Vitamin K in Kale absorbable.', tags: ['Bone', 'Health']
    },
    {
        rank: 23, ingredients: ['Eggs', 'Salad'], name: 'Veggie Booster', magnitude: 75, amplification: '4x', evidence: 'Clinical', domain: 'Physical', type: 'Kinetic', description: 'Egg yolk fat boosts antioxidant absorption from veggies by 400%.', tags: ['Health', 'Salad']
    },
    {
        rank: 24, ingredients: ['Pineapple', 'Protein'], name: 'Digestive Aid', magnitude: 74, amplification: 'High', evidence: 'Clinical', domain: 'Metabolic', type: 'Kinetic', description: 'Bromelain in pineapple helps break down meat proteins.', tags: ['Digestion', 'Gut']
    },
    {
        rank: 25, ingredients: ['Papaya', 'Seeds'], name: 'Gut Cleanse', magnitude: 73, amplification: 'Synergistic', evidence: 'Anecdotal', domain: 'Metabolic', type: 'Dynamic', description: 'Seeds have antiparasitic properties enhanced by papaya enzymes.', tags: ['Gut', 'Detox']
    },
    {
        rank: 26, ingredients: ['Ginger', 'Lemon'], name: 'Nausea Relief', magnitude: 72, amplification: 'Additive', evidence: 'Clinical', domain: 'Physical', type: 'Dynamic', description: 'Classic combo for settling stomachs and boosting immunity.', tags: ['Sick', 'Stomach']
    },
    {
        rank: 27, ingredients: ['Coffee', 'Cocoa'], name: 'Mocha Focus', magnitude: 79, amplification: 'Synergistic', evidence: 'Clinical', domain: 'Cognitive', type: 'Dynamic', description: 'Cocoa boosts blood flow, Coffee boosts alertness.', tags: ['Focus', 'Work']
    },
    {
        rank: 28, ingredients: ['Rosemary', 'Grilled Meat'], name: 'Carcinogen Blocker', magnitude: 78, amplification: 'Protect', evidence: 'Clinical', domain: 'Physical', type: 'Kinetic', description: 'Rosemary antioxidants neutralize toxins formed during grilling.', tags: ['Safety', 'BBQ']
    },
    {
        rank: 29, ingredients: ['Lentils', 'Bell Pepper'], name: 'Iron Salad', magnitude: 77, amplification: '3x', evidence: 'Clinical', domain: 'Metabolic', type: 'Kinetic', description: 'Vitamin C helps absorb the iron in lentils.', tags: ['Iron', 'Energy']
    },
    {
        rank: 30, ingredients: ['Mushrooms', 'Healthy Fats'], name: 'Vitamin D Boost', magnitude: 76, amplification: 'High', evidence: 'Clinical', domain: 'Physical', type: 'Kinetic', description: 'Vitamin D in mushrooms is fat-soluble.', tags: ['Bone', 'Immune']
    },
    {
        rank: 31, ingredients: ['Sourdough', 'Vinegar'], name: 'Blood Sugar Control', magnitude: 75, amplification: 'High', evidence: 'Clinical', domain: 'Metabolic', type: 'Dynamic', description: 'Vinegar lowers the glucose spike from bread.', tags: ['Diet', 'Energy']
    },
    {
        rank: 32, ingredients: ['Potato', 'Olive Oil'], name: 'Cooled Starch', magnitude: 74, amplification: 'Medium', evidence: 'Clinical', domain: 'Metabolic', type: 'Dynamic', description: 'Fat slows down the digestion of potato starch.', tags: ['Diet', 'Satiety']
    },
    {
        rank: 33, ingredients: ['Corn', 'Beans'], name: 'Taco Protein', magnitude: 73, amplification: 'Additive', evidence: 'Clinical', domain: 'Physical', type: 'Dynamic', description: 'Traditional complete protein combination.', tags: ['Muscle', 'Vegan']
    },
    {
        rank: 34, ingredients: ['Chia Seeds', 'Almond Milk'], name: 'Omega Breakfast', magnitude: 72, amplification: 'Additive', evidence: 'Clinical', domain: 'Metabolic', type: 'Dynamic', description: 'High fiber and healthy fats for sustained energy.', tags: ['Breakfast', 'Energy']
    },
    {
        rank: 35, ingredients: ['Blueberries', 'Yogurt'], name: 'Brain Breakfast', magnitude: 75, amplification: 'Additive', evidence: 'Clinical', domain: 'Cognitive', type: 'Dynamic', description: 'Fats help berry absorption, protein fuels neurotransmitters.', tags: ['Brain', 'Morning']
    },
    {
        rank: 36, ingredients: ['Almonds', 'Dried Apricot'], name: 'Trail Mix Synergy', magnitude: 71, amplification: 'High', evidence: 'Anecdotal', domain: 'Metabolic', type: 'Dynamic', description: 'Fat slows down the sugar spike from dried fruit.', tags: ['Snack', 'Energy']
    },
    {
        rank: 37, ingredients: ['Kimchi', 'Fried Rice'], name: 'Probiotic Rescue', magnitude: 70, amplification: 'Medium', evidence: 'Emerging', domain: 'Metabolic', type: 'Dynamic', description: 'Add Kimchi at the end to keep bacteria alive with starch.', tags: ['Gut', 'Taste']
    },
    {
        rank: 38, ingredients: ['Bone Broth', 'Vitamin C'], name: 'Collagen Builder', magnitude: 85, amplification: 'Critical', evidence: 'Clinical', domain: 'Physical', type: 'Kinetic', description: 'You cannot build collagen without Vitamin C.', tags: ['Skin', 'Joints']
    },
    {
        rank: 39, ingredients: ['Spirulina', 'Orange Juice'], name: 'Green Iron', magnitude: 74, amplification: 'High', evidence: 'Clinical', domain: 'Metabolic', type: 'Kinetic', description: 'Masks taste and boosts iron absorption.', tags: ['Health', 'Smoothie']
    },
    {
        rank: 40, ingredients: ['Goji Berries', 'Tea'], name: 'Zen Energy', magnitude: 72, amplification: 'Additive', evidence: 'Anecdotal', domain: 'Cognitive', type: 'Dynamic', description: 'Antioxidants plus mild caffeine.', tags: ['Calm', 'Focus']
    },
    {
        rank: 41, ingredients: ['Acai', 'Greek Yogurt'], name: 'Super Bowl', magnitude: 75, amplification: 'Additive', evidence: 'Clinical', domain: 'Metabolic', type: 'Dynamic', description: 'High protein meets high antioxidants.', tags: ['Muscle', 'Health']
    },
    {
        rank: 42, ingredients: ['Pomegranate', 'Dates'], name: 'Middle East Heart', magnitude: 74, amplification: 'Synergistic', evidence: 'Emerging', domain: 'Metabolic', type: 'Dynamic', description: 'Powerful polyphenols for heart health.', tags: ['Heart', 'Sweet']
    },
    {
        rank: 43, ingredients: ['Fig', 'Walnut'], name: 'Fiber & Fat', magnitude: 73, amplification: 'Additive', evidence: 'Clinical', domain: 'Metabolic', type: 'Dynamic', description: 'Classic pairing that stabilizes blood sugar.', tags: ['Snack', 'Gut']
    },
    {
        rank: 44, ingredients: ['Prunes', 'Yogurt'], name: 'Bone Defense', magnitude: 72, amplification: 'Synergistic', evidence: 'Clinical', domain: 'Physical', type: 'Dynamic', description: 'Both proven to support bone density.', tags: ['Bone', 'Senior']
    },
    {
        rank: 45, ingredients: ['Kiwi', 'Steak'], name: 'Meat Tenderizer', magnitude: 71, amplification: 'High', evidence: 'Culinary', domain: 'Metabolic', type: 'Kinetic', description: 'Kiwi enzymes digest meat before you even eat it.', tags: ['Digestion', 'Food']
    },
    {
        rank: 46, ingredients: ['Mango', 'Coconut Milk'], name: 'Tropical Glow', magnitude: 75, amplification: 'High', evidence: 'Clinical', domain: 'Physical', type: 'Kinetic', description: 'Fat helps absorb the Vitamin A for skin health.', tags: ['Skin', 'Beauty']
    },
    {
        rank: 46, ingredients: ['Melon', 'Prosciutto'], name: 'Sweet & Salty', magnitude: 70, amplification: 'Additive', evidence: 'Culinary', domain: 'Physical', type: 'Dynamic', description: 'Electrolytes from ham, hydration from melon.', tags: ['Hydration', 'Snack']
    },
    {
        rank: 47, ingredients: ['Peach', 'Blackberry'], name: 'Summer Shield', magnitude: 69, amplification: 'Additive', evidence: 'Emerging', domain: 'Metabolic', type: 'Dynamic', description: 'Varied antioxidants cover more cell protection.', tags: ['Health']
    },
    {
        rank: 48, ingredients: ['Grapefruit', 'Avocado'], name: 'Slimming Salad', magnitude: 72, amplification: 'Medium', evidence: 'Anecdotal', domain: 'Metabolic', type: 'Dynamic', description: 'Fiber and healthy fats keep you full for hours.', tags: ['Diet', 'Weight']
    },
    {
        rank: 49, ingredients: ['Cabbage', 'Caraway'], name: 'Gas Relief', magnitude: 68, amplification: 'High', evidence: 'Traditional', domain: 'Metabolic', type: 'Dynamic', description: 'Seeds prevent the gas usually caused by cabbage.', tags: ['Gut', 'Comfort']
    },
    {
        rank: 50, ingredients: ['Quinoa', 'Black Beans'], name: 'Super Grain', magnitude: 74, amplification: 'Additive', evidence: 'Clinical', domain: 'Physical', type: 'Dynamic', description: 'Complete amino acid profile for vegetarians.', tags: ['Muscle', 'Vegan']
    },
    {
        rank: 51, ingredients: ['Tempeh', 'Turmeric'], name: 'Golden Soy', magnitude: 75, amplification: 'Synergistic', evidence: 'Emerging', domain: 'Immune', type: 'Dynamic', description: 'Double anti-inflammatory effect.', tags: ['Immune', 'Gut']
    },
    {
        rank: 52, ingredients: ['Nutritional Yeast', 'Kale'], name: 'Vegan Power', magnitude: 73, amplification: 'Additive', evidence: 'Clinical', domain: 'Metabolic', type: 'Dynamic', description: 'Adds B12 and cheesy flavor to healthy greens.', tags: ['Vegan', 'Energy']
    },
    {
        rank: 53, ingredients: ['Hemp Seeds', 'Salad'], name: 'GLA Boost', magnitude: 72, amplification: 'High', evidence: 'Clinical', domain: 'Physical', type: 'Kinetic', description: 'Adds rare Omega-6 GLA to leafy greens.', tags: ['Skin', 'Hormones']
    },
    {
        rank: 54, ingredients: ['Miso', 'Scallions'], name: 'Soup for Soul', magnitude: 71, amplification: 'Additive', evidence: 'Traditional', domain: 'Immune', type: 'Dynamic', description: 'Prebiotics and probiotics in a warm bowl.', tags: ['Gut', 'Immune']
    },
    {
        rank: 55, ingredients: ['Tofu', 'Chili'], name: 'Metabolic Heat', magnitude: 70, amplification: 'Medium', evidence: 'Emerging', domain: 'Metabolic', type: 'Dynamic', description: 'Capsaicin may increase calorie burn.', tags: ['Diet', 'Heat']
    },
    {
        rank: 56, ingredients: ['Edamame', 'Seaweed'], name: 'Thyroid Support', magnitude: 72, amplification: 'High', evidence: 'Clinical', domain: 'Metabolic', type: 'Dynamic', description: 'Iodine and protein support thyroid function.', tags: ['Hormones']
    },
    {
        rank: 57, ingredients: ['Wheatgrass', 'Orange'], name: 'Green Shot', magnitude: 69, amplification: 'High', evidence: 'Anecdotal', domain: 'Metabolic', type: 'Kinetic', description: 'Vitamin C helps absorb plant-based minerals.', tags: ['Detox', 'Energy']
    },
    {
        rank: 58, ingredients: ['Maca', 'Cacao'], name: 'Inca Energy', magnitude: 73, amplification: 'Synergistic', evidence: 'Traditional', domain: 'Cognitive', type: 'Dynamic', description: 'Ancient combo for stamina and mood.', tags: ['Energy', 'Libido']
    },
    {
        rank: 59, ingredients: ['Chlorella', 'Cilantro'], name: 'Heavy Metal Detox', magnitude: 71, amplification: 'Synergistic', evidence: 'Anecdotal', domain: 'Physical', type: 'Kinetic', description: 'Often used together to bind toxins.', tags: ['Detox']
    },
    {
        rank: 60, ingredients: ['Onion', 'Grapes'], name: 'Allergy Fighter', magnitude: 70, amplification: 'Synergistic', evidence: 'Emerging', domain: 'Immune', type: 'Dynamic', description: 'Quercetin + Resveratrol may lower histamine.', tags: ['Allergy', 'Immune']
    },
    {
        rank: 61, ingredients: ['Celery', 'Peanut Butter'], name: 'Classic Crunch', magnitude: 68, amplification: 'Additive', evidence: 'Culinary', domain: 'Metabolic', type: 'Dynamic', description: 'Fiber + Fat + Protein = Satisfaction.', tags: ['Snack', 'Diet']
    },
    {
        rank: 62, ingredients: ['Cucumber', 'Vinegar'], name: 'Cool Down', magnitude: 67, amplification: 'Medium', evidence: 'Traditional', domain: 'Metabolic', type: 'Dynamic', description: 'Low calorie, hydrating, insulin friendly.', tags: ['Diet', 'Summer']
    },
    {
        rank: 63, ingredients: ['Radish', 'Butter'], name: 'French Snack', magnitude: 66, amplification: 'High', evidence: 'Culinary', domain: 'Metabolic', type: 'Kinetic', description: 'Fat helps absorb the vitamins in radish.', tags: ['Snack']
    },
    {
        rank: 64, ingredients: ['Peas', 'Pasta'], name: 'Green Carb', magnitude: 68, amplification: 'Additive', evidence: 'Culinary', domain: 'Physical', type: 'Dynamic', description: 'Adds protein to a carb-heavy meal.', tags: ['Meal', 'Energy']
    },
    {
        rank: 65, ingredients: ['Asparagus', 'Parmesan'], name: 'Umami Veggie', magnitude: 69, amplification: 'Medium', evidence: 'Culinary', domain: 'Metabolic', type: 'Dynamic', description: 'Fat helps absorb Vitamin E and K.', tags: ['Taste', 'Health']
    },
    {
        rank: 66, ingredients: ['Strawberries', 'Spinach'], name: 'Sweet Salad', magnitude: 72, amplification: 'High', evidence: 'Clinical', domain: 'Metabolic', type: 'Kinetic', description: 'Vitamin C in berries aids Iron absorption.', tags: ['Salad', 'Iron']
    },
    {
        rank: 67, ingredients: ['Bok Choy', 'Garlic'], name: 'Immune Stir-fry', magnitude: 74, amplification: 'Additive', evidence: 'Traditional', domain: 'Immune', type: 'Dynamic', description: 'Sulforaphane plus Allicin.', tags: ['Immune', 'Dinner']
    },
    {
        rank: 68, ingredients: ['Cauliflower', 'Curry'], name: 'Golden Veg', magnitude: 76, amplification: 'Synergistic', evidence: 'Traditional', domain: 'Physical', type: 'Kinetic', description: 'Turmeric binds to the fiber matrix.', tags: ['Health', 'Taste']
    },
    {
        rank: 69, ingredients: ['Eggplant', 'Olive Oil'], name: 'Brain Food', magnitude: 71, amplification: 'High', evidence: 'Clinical', domain: 'Cognitive', type: 'Kinetic', description: 'Nasunin in skin protects brain fats.', tags: ['Brain', 'Antioxidant']
    },
    {
        rank: 70, ingredients: ['Zucchini', 'Tomato'], name: 'Garden Duo', magnitude: 70, amplification: 'Additive', evidence: 'Culinary', domain: 'Metabolic', type: 'Dynamic', description: 'Low calorie volume eating.', tags: ['Diet']
    },
    {
        rank: 71, ingredients: ['Artichoke', 'Lemon'], name: 'Liver Lover', magnitude: 73, amplification: 'Synergistic', evidence: 'Traditional', domain: 'Metabolic', type: 'Dynamic', description: 'Cynarin and Vitamin C support liver.', tags: ['Liver', 'Detox']
    },
    {
        rank: 72, ingredients: ['Beets', 'Goat Cheese'], name: 'Performance Salad', magnitude: 74, amplification: 'Medium', evidence: 'Culinary', domain: 'Physical', type: 'Dynamic', description: 'Nitrates plus medium-chain fats.', tags: ['Energy', 'Taste']
    },
    {
        rank: 73, ingredients: ['Pumpkin', 'Cinnamon'], name: 'Blood Sugar Spice', magnitude: 72, amplification: 'Synergistic', evidence: 'Clinical', domain: 'Metabolic', type: 'Dynamic', description: 'Cinnamon controls the sugar spike.', tags: ['Diet', 'Sweet']
    },
    {
        rank: 74, ingredients: ['Banana', 'Almond Butter'], name: 'Runner Fuel', magnitude: 76, amplification: 'Additive', evidence: 'Sports', domain: 'Physical', type: 'Dynamic', description: 'Potassium plus sustained energy.', tags: ['Workout', 'Energy']
    },
    {
        rank: 75, ingredients: ['Oysters', 'Lemon'], name: 'Zinc Zing', magnitude: 78, amplification: 'Medium', evidence: 'Traditional', domain: 'Immune', type: 'Kinetic', description: 'Acid helps release minerals.', tags: ['Libido', 'Immune']
    },
    {
        rank: 76, ingredients: ['Sardines', 'Tomato Sauce'], name: 'Calcium Bone', magnitude: 79, amplification: 'High', evidence: 'Clinical', domain: 'Physical', type: 'Kinetic', description: 'Acid helps dissolve bones for calcium.', tags: ['Bone', 'Health']
    },
    {
        rank: 77, ingredients: ['Tuna', 'Olive Oil'], name: 'Heart Lunch', magnitude: 75, amplification: 'High', evidence: 'Clinical', domain: 'Metabolic', type: 'Kinetic', description: 'Protects omega-3s from oxidation.', tags: ['Heart', 'Lunch']
    },
    {
        rank: 78, ingredients: ['Cod', 'Red Pepper'], name: 'Light & Bright', magnitude: 72, amplification: 'Medium', evidence: 'Culinary', domain: 'Metabolic', type: 'Dynamic', description: 'Lean protein with Vitamin C.', tags: ['Diet', 'Dinner']
    },
    {
        rank: 79, ingredients: ['Shrimp', 'Garlic'], name: 'Immune Seafood', magnitude: 73, amplification: 'Additive', evidence: 'Traditional', domain: 'Immune', type: 'Dynamic', description: 'Selenium plus Allicin.', tags: ['Immune', 'Taste']
    },
    {
        rank: 80, ingredients: ['Turkey', 'Cranberry'], name: 'Thanksgiving Nap', magnitude: 70, amplification: 'Medium', evidence: 'Traditional', domain: 'Cognitive', type: 'Dynamic', description: 'Carbs help Tryptophan enter brain.', tags: ['Sleep', 'Comfort']
    },
    {
        rank: 81, ingredients: ['Chicken', 'Rice'], name: 'Recovery Meal', magnitude: 75, amplification: 'Additive', evidence: 'Sports', domain: 'Physical', type: 'Dynamic', description: 'Easy to digest protein and carbs.', tags: ['Recovery', 'Gut']
    },
    {
        rank: 82, ingredients: ['Beef', 'Broccoli'], name: 'Iron & C', magnitude: 77, amplification: 'High', evidence: 'Clinical', domain: 'Physical', type: 'Kinetic', description: 'Classic gym meal for iron absorption.', tags: ['Muscle', 'Iron']
    },
    {
        rank: 83, ingredients: ['Lamb', 'Mint'], name: 'Digestion Aid', magnitude: 71, amplification: 'Medium', evidence: 'Traditional', domain: 'Metabolic', type: 'Dynamic', description: 'Mint helps digest fatty meat.', tags: ['Digestion', 'Taste']
    },
    {
        rank: 84, ingredients: ['Pork', 'Apple Sauce'], name: 'Sweet Protein', magnitude: 70, amplification: 'Medium', evidence: 'Traditional', domain: 'Metabolic', type: 'Dynamic', description: 'Fiber helps process the fat.', tags: ['Meal', 'Taste']
    },
    {
        rank: 85, ingredients: ['Duck', 'Orange'], name: 'Fat Cutter', magnitude: 72, amplification: 'Medium', evidence: 'Traditional', domain: 'Metabolic', type: 'Dynamic', description: 'Acid cuts through the heavy fat.', tags: ['Taste', 'Digestion']
    },
    {
        rank: 86, ingredients: ['Venison', 'Berries'], name: 'Forest Feast', magnitude: 74, amplification: 'Medium', evidence: 'Traditional', domain: 'Physical', type: 'Dynamic', description: 'Lean meat with antioxidants.', tags: ['Health', 'Paleo']
    },
    {
        rank: 87, ingredients: ['Bison', 'Sweet Potato'], name: 'Paleo Power', magnitude: 76, amplification: 'Additive', evidence: 'Sports', domain: 'Physical', type: 'Dynamic', description: 'Top tier recovery meal for athletes.', tags: ['Muscle', 'Recovery']
    }
];

export const SAMPLE_FOODS = [
  "Spinach", "Lemon", "Turmeric", "Black Pepper", "Green Tea", "Vitamin C", 
  "Iron", "Calcium", "Yogurt", "Berries", "Oats", "Milk", "Coffee", "Red Meat",
  "L-Theanine", "Vitamin D3", "Vitamin K2", "Zinc", "Quercetin", "Creatine", 
  "Ashwagandha", "Lion's Mane", "Magnesium", "Glycine", "Fish Oil", "Dark Chocolate"
];
