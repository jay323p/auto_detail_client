import leatherDirty from '../assets/leatherDirty.jpg';
import leatherCleaned from '../assets/leatherClean.jpg';
import interiorCleaned from '../assets/interiorCleaned.jpg';
import interiorDirty from '../assets/interiorDirty.jpg';
import exteriorCleaned from '../assets/exteriorCleaned.jpg';
import exteriorDirty from '../assets/exteriorDirty.jpg';
import tireCleaned from '../assets/tireCleaned.jpg';
import tireDirty from '../assets/tireDirty.jpg';
import rimCloseUp from '../assets/rimCloseUp.jpg';
import interiorCloseUp from '../assets/interiorCloseUp.jpg';
import carRestored from '../assets/carRestored.jpg';
import carPolish from '../assets/carPolish.jpeg';
import luxuryInterior from '../assets/luxuryInterior.jpg';
import sedan from '../assets/sedan6.png';
import suv from '../assets/suv.png';
import pickupTruck from '../assets/pickupTruck.png';
import exotic from '../assets/exotic.png';

export const cardMapper = {
  0: {
    heading: 'Exterior Washing',
    serviceTime: '45 Minutes',
    description:
      'Contact-less wash and rinse with the best industry-leading detergents and other agents that will restore your vehicles glamor!',
    checklist: [
      'Contactless Wash',
      'Two-Step Rinsing',
      'Fe Decontamination',
      'Spot-Detailing',
      'Tire/Rim Restoration',
    ],
  },
  1: {
    heading: 'Interior Cleaning',
    serviceTime: '60 Minutes',
    description:
      'Thorough air compressing, vacuuming, and rigorous harm-free chemical cleaning of every interior aspect!',
    checklist: [
      '100% Stains Removed',
      '100% Dust/Allergen Removal',
      'Complete Interior Scrub',
      'Interior Conditioning',
      'Full Leather Restoration',
    ],
  },
  2: {
    heading: 'Ceramic Coating',
    serviceTime: '90 Minutes',
    description:
      "Protect your newly detailed vehicle with a complete ceramic coating package that will preserve your vehicle's freshness and shine for years!",
    checklist: [
      'Clay Decontamination',
      'Fe Chemical Remover',
      '1 Year Coating Option',
      '3 Year Coating Option',
      '5 Year Coating Option',
    ],
  },
  3: {
    heading: 'Clear Coat Polishing',
    serviceTime: '90 Minutes',
    description:
      'Our superior choice of polishing equipment, cutting compounds, and polishing compounds enable us to polish away all clear-coat scratches!',
    checklist: [
      'Panel-Based Polishing',
      'Complete Car Polish',
      'Catered Polishing',
      'Fe Decontamination',
      'Complete Wash & Rinse',
    ],
  },
  4: {
    heading: 'Complete Restoration',
    serviceTime: '5 hours',
    description:
      'Completely restore your vehicle inside-out! Every square-inch of your vehicle will be rigorously cleaned, polished, and restored!',
    checklist: [
      'Exterior / Interior Clean',
      'Complete Decontamination',
      'Full Car Polishing',
      'Engine-Bay Restoration',
      'Tire/Rim Restoration',
      'Ceramic Coating',
    ],
  },
};

export const pricingMapper = {
  sedan: {
    exterior: {
      title: 'Exterior Detail',
      numPrice: 59.99,
      price: '$59.99',
      checklist: [
        { check: true, service: 'Contactless Wash' },
        { check: true, service: 'Tire Restoration' },
        { check: true, service: 'Fe Decontamination' },
        { check: false, service: 'Ceramic Coating' },
      ],
      time: '45 Minutes',
    },
    interior: {
      title: 'Interior Detail',
      numPrice: 79.99,
      price: '$79.99',
      checklist: [
        { check: true, service: '100% Stain Removal' },
        { check: true, service: '100% Dirt/Allergen Removal' },
        { check: true, service: 'Complete Interior Scrub' },
        { check: true, service: 'Full Leather Restoration' },
        { check: true, service: 'Interior Conditioning' },
      ],
      time: '60 Minutes',
    },
    basicCombo: {
      title: 'Basic Combo',
      numPrice: 139.99,
      price: '$139.99',
      checklist: [
        { check: true, service: 'Exterior Detail Package' },
        { check: true, service: 'Interior Detail Package' },
        { check: false, service: 'Clearcoat Polishing' },
        { check: false, service: 'Ceramic Coating' },
      ],
      time: '100 Minutes',
    },
    premiumCombo: {
      title: 'Premium Combo',
      numPrice: 349.99,
      price: '$349.99',
      checklist: [
        { check: true, service: 'Exterior Detail Package' },
        { check: true, service: 'Interior Detail Package' },
        { check: true, service: 'Full Car Polish' },
        { check: true, service: '1/3-Year Ceramic Coating' },
      ],
      time: '3 Hours',
    },
    ultraCombo: {
      title: 'Ultra Combo',
      numPrice: 499.99,
      price: '$499.99',
      checklist: [
        { check: true, service: 'Exterior Detail Package' },
        { check: true, service: 'Interior Detail Package' },
        { check: true, service: 'Full Car Polish' },
        { check: true, service: '5-Year Ceramic Coating' },
      ],
      time: '3.5 Hours',
    },
  },
  suv: {
    exterior: {
      title: 'Exterior Detail',
      numPrice: 69.99,
      price: '$69.99',
      checklist: [
        { check: true, service: 'Contactless Wash' },
        { check: true, service: 'Tire Restoration' },
        { check: true, service: 'Fe Decontamination' },
        { check: false, service: 'Ceramic Coating' },
      ],
      time: '45 Minutes',
    },
    interior: {
      title: 'Interior Detail',
      numPrice: 99.99,
      price: '$99.99',
      checklist: [
        { check: true, service: '100% Stain Removal' },
        { check: true, service: '100% Dirt/Allergen Removal' },
        { check: true, service: 'Complete Interior Scrub' },
        { check: true, service: 'Full Leather Restoration' },
        { check: true, service: 'Interior Conditioning' },
      ],
      time: '60 Minutes',
    },
    basicCombo: {
      title: 'Basic Combo',
      numPrice: 169.99,
      price: '$169.99',
      checklist: [
        { check: true, service: 'Exterior Detail Package' },
        { check: true, service: 'Interior Detail Package' },
        { check: false, service: 'Clearcoat Polishing' },
        { check: false, service: 'Ceramic Coating' },
      ],
      time: '100 Minutes',
    },
    premiumCombo: {
      title: 'Premium Combo',
      numPrice: 399.99,
      price: '$399.99',
      checklist: [
        { check: true, service: 'Exterior Detail Package' },
        { check: true, service: 'Interior Detail Package' },
        { check: true, service: 'Full Car Polish' },
        { check: true, service: '1/3-Year Ceramic Coating' },
      ],
      time: '3 Hours',
    },
    ultraCombo: {
      title: 'Ultra Combo',
      numPrice: 549.99,
      price: '$549.99',
      checklist: [
        { check: true, service: 'Exterior Detail Package' },
        { check: true, service: 'Interior Detail Package' },
        { check: true, service: 'Full Car Polish' },
        { check: true, service: '5-Year Ceramic Coating' },
      ],
      time: '3.5 Hours',
    },
  },
  pickup: {
    exterior: {
      title: 'Exterior Detail',
      numPrice: 99.99,
      price: '$99.99',
      checklist: [
        { check: true, service: 'Contactless Wash' },
        { check: true, service: 'Tire Restoration' },
        { check: true, service: 'Fe Decontamination' },
        { check: true, service: 'Truck Bed Restoration' },
        { check: false, service: 'Ceramic Coating' },
      ],
      time: '60 Minutes',
    },
    interior: {
      title: 'Interior Detail',
      numPrice: 69.99,
      price: '$69.99',
      checklist: [
        { check: true, service: '100% Stain Removal' },
        { check: true, service: '100% Dirt/Allergen Removal' },
        { check: true, service: 'Complete Interior Scrub' },
        { check: true, service: 'Full Leather Restoration' },
        { check: true, service: 'Interior Conditioning' },
      ],
      time: '45 Minutes',
    },
    basicCombo: {
      title: 'Basic Combo',
      numPrice: 169.99,
      price: '$169.99',
      checklist: [
        { check: true, service: 'Exterior Detail Package' },
        { check: true, service: 'Interior Detail Package' },
        { check: false, service: 'Clearcoat Polishing' },
        { check: false, service: 'Ceramic Coating' },
      ],
      time: '100 Minutes',
    },
    premiumCombo: {
      title: 'Premium Combo',
      numPrice: 399.99,
      price: '$399.99',
      checklist: [
        { check: true, service: 'Exterior Detail Package' },
        { check: true, service: 'Interior Detail Package' },
        { check: true, service: 'Full Car Polish' },
        { check: true, service: '1/3-Year Ceramic Coating' },
      ],
      time: '3 Hours',
    },
    ultraCombo: {
      title: 'Ultra Combo',
      numPrice: 549.99,
      price: '$549.99',
      checklist: [
        { check: true, service: 'Exterior Detail Package' },
        { check: true, service: 'Interior Detail Package' },
        { check: true, service: 'Full Car Polish' },
        { check: true, service: '5-Year Ceramic Coating' },
      ],
      time: '3.5 Hours',
    },
  },
  highEnd: {
    exterior: {
      title: 'Exterior Detail',
      numPrice: 149.99,
      price: '$149.99',
      checklist: [
        { check: true, service: 'Contactless Wash' },
        { check: true, service: 'Tire Restoration' },
        { check: true, service: 'Fe Decontamination' },
        { check: false, service: 'Ceramic Coating' },
      ],
      time: '60 Minutes',
    },
    interior: {
      title: 'Interior Detail',
      numPrice: 149.99,
      price: '$149.99',
      checklist: [
        { check: true, service: '100% Stain Removal' },
        { check: true, service: '100% Dirt/Allergen Removal' },
        { check: true, service: 'Complete Interior Scrub' },
        { check: true, service: 'Full Leather Restoration' },
        { check: true, service: 'Interior Conditioning' },
      ],
      time: '60 Minutes',
    },
    basicCombo: {
      title: 'Basic Combo',
      numPrice: 299.99,
      price: '$299.99',
      checklist: [
        { check: true, service: 'Exterior Detail Package' },
        { check: true, service: 'Interior Detail Package' },
        { check: false, service: 'Clearcoat Polishing' },
        { check: false, service: 'Ceramic Coating' },
      ],
      time: '2 Hours',
    },
    premiumCombo: {
      title: 'Premium Combo',
      numPrice: 749.99,
      price: '$749.99',
      checklist: [
        { check: true, service: 'Exterior Detail Package' },
        { check: true, service: 'Interior Detail Package' },
        { check: true, service: 'Full Car Polish' },
        { check: true, service: '1/3-Year Ceramic Coating' },
      ],
      time: '4 Hours',
    },
    ultraCombo: {
      title: 'Ultra Combo',
      numPrice: 999.99,
      price: '$999.99',
      checklist: [
        { check: true, service: 'Exterior Detail Package' },
        { check: true, service: 'Interior Detail Package' },
        { check: true, service: 'Full Car Polish' },
        { check: true, service: '5-Year Ceramic Coating' },
      ],
      time: '4.5 Hours',
    },
  },
};

export const beforeAfterImgsMapper = {
  0: {
    heading1: 'LEATHER RESTORATION',
    heading2: 'Rigorous leather restoration and stain removal',
    dirtyImg: leatherDirty,
    cleanedImg: leatherCleaned,
  },
  1: {
    heading1: 'INTERIOR CLEANING',
    heading2:
      'Compressor, vacuum, steam, and thorough interior rinse and wash ',
    dirtyImg: interiorDirty,
    cleanedImg: interiorCleaned,
  },
  2: {
    heading1: 'TIRE RESTORATION',
    heading2:
      'Deep tire tread rinse and wash followed by rim decontamination and thorough washing',
    dirtyImg: tireDirty,
    cleanedImg: tireCleaned,
  },
  3: {
    heading1: 'EXTERIOR CLEANING',
    heading2:
      'Contactless wash, Fe decontamination, and ceramic coating package',
    dirtyImg: exteriorDirty,
    cleanedImg: exteriorCleaned,
  },
};

// CALENDAR DATA
export const monthMapper = {
  '1/': 'JANUARY',
  '2/': 'FEBRUARY',
  '3/': 'MARCH',
  '4/': 'APRIL',
  '5/': 'MAY',
  '6/': 'JUNE',
  '7/': 'JULY',
  '8/': 'AUGUST',
  '9/': 'SEPTEMBER',
  10: 'OCTOBER',
  11: 'NOVEMBER',
  12: 'DECEMBER',
};

export const weekMapper = {
  0: 'SUNDAY',
  1: 'MONDAY',
  2: 'TUESDAY',
  3: 'WEDNESDAY',
  4: 'THURSDAY',
  5: 'FRIDAY',
  6: 'SATURDAY',
};

export const initialOrderState = {
  vehicle: '',
  package: '',
  addOns: [],
  ttlPrice: 0,
  date: '',
};

export const servicesMapper = {
  exterior: {
    title: 'Exterior Detailing Package',
    imgSrc: rimCloseUp,
    summary:
      'Complete & rigorous detailing of all exterior panels, rims, tires, grilles, headlamps, exhaust, and more.',
    checklist: [
      'Contactless Wash',
      'Two-Step Rinsing',
      'Fe Decontamination',
      'Spot-Detailing',
      'Tire/Rim Restoration',
    ],
    pricing: '$59.99 - $149.99',
    steps: [
      {
        step: 1,
        process:
          'Contact-less wash with heavy-duty solvent cleaner to completely remove tar, grime, and dirt without creating micro-scratches.',
      },
      {
        step: 2,
        process:
          'Thorough microfiber drying with splotch prevention followed by spot-detailing for remaining defects.',
      },
      {
        step: 3,
        process:
          'Complete covering of vehicle in Fe decontamination solvent followed by pressure rinse and microfiber drying.',
      },
      {
        step: 4,
        process:
          'Clay bar contact rub on every panel to smoothen clearcoat and remove embedded contaminants.',
      },
      {
        step: 5,
        process:
          'Final pressure rinse to remove remaining solvents from car outer body leaving vehicle glossy and restored!',
      },
    ],
    disclaimer:
      'Our exterior packages do not come with any paint correction or ceramic coatings. Those processes take much more care and time and are only offered in the combo packages. Consider upgrading to one of those packages if you wish to completely restore and elevate your vehicles appearance.',
  },
  interior: {
    title: 'Interior Detailing Package',
    imgSrc: interiorCloseUp,
    summary:
      'Complete & rigorous detailing of all interior instruments, seats, matts, vents, compartments, touchscreens, and more.',
    checklist: [
      '100% Stains Removed',
      '100% Dust/Allergen Removal',
      'Complete Interior Scrub',
      'Interior Conditioning',
      'Full Leather Restoration',
    ],
    pricing: '$79.99 - $149.99',
    steps: [
      {
        step: 1,
        process:
          'Remove any items/obstructions to enable vacuum and air compressor systems to traverse every square inch of interior.',
      },
      {
        step: 2,
        process:
          'Complete dust and allergen removal from seats, vents, matts, and other interior surfaces.',
      },
      {
        step: 3,
        process:
          'Complete leather/cloth seat stain removal using gentle solvents and wet vacuum over many repitions to ensure stains are removed.',
      },
      {
        step: 4,
        process:
          'Interior solvent spray and scrub to wear away at years of accumulated dust, mold, smoke odor, and other grimes.',
      },
      {
        step: 5,
        process:
          'Final aqueous rinsing of interior and removal of remaining chemical agents followed by vacuum and air compression.',
      },
    ],
    disclaimer:
      'Our interior packages may end up costing more for the customer depending on the condition of the vehicles interior. Upon appointment, a specialist will gauge the work required and will update the price if required. In most cases, the price will not change as we have already factored in most interior conditions into the package.',
  },
  basicCombo: {
    title: 'Basic Combo Detailing Package',
    imgSrc: carRestored,
    summary:
      'Complete & rigorous detailing of all interior & exterior surfaces as done within respective packages.',
    checklist: [
      'Complete Interior Scrub',
      'Complete Stain Removal',
      'Contactless Exterior Wash',
      'Vehicle Decontamination',
      'Tire & Rim Restoration',
    ],
    pricing: '$149.99 - $299.99',
    steps: [
      {
        step: 1,
        process:
          'Remove any items/obstructions to enable vacuum and air compressor systems to traverse every square inch of interior.',
      },
      {
        step: 2,
        process:
          'Complete dust and allergen removal from seats, vents, matts, and other interior surfaces.',
      },
      {
        step: 3,
        process:
          'Complete leather/cloth seat stain removal using gentle solvents and wet vacuum over many repitions to ensure stains are removed.',
      },
      {
        step: 4,
        process:
          'Thorough exterior contact-less wash and rinse of all panels and tires followed by microfiber dry.',
      },
      {
        step: 5,
        process:
          'Final solvent based decontamination as well as physical claying to remove all impurities embedded in clearcoat followed by final rinse and dry.',
      },
    ],
    disclaimer:
      'Our basic combo packages do not offer and paint correction or ceramic coatings. The basic combo package is simply a combination of the exterior and interior detailing packages. Prices subject to change depending on interior condition of vehicle only! Most interior vehicle conditions are already priced in the package so in most cases the price will not change.',
  },
  premiumCombo: {
    title: 'Premium Combo Detailing Package',
    imgSrc: carPolish,
    summary:
      'Complete & rigorous detailing of all interior & exterior surfaces as done within respective packages plus 1-step paint correction and ceramic coating.',
    checklist: [
      'Exterior Package',
      'Interior Package',
      'Full Paint Correction',
      '1/3 Year Ceramic Coating',
    ],
    pricing: '$349.99 - $749.99',
    steps: [
      {
        step: 1,
        process:
          'Complete interior clean as summarized in the respective interior detail package.',
      },
      {
        step: 2,
        process:
          'Complete exterior clean as summarized in the respective exterior detail package.',
      },
      {
        step: 3,
        process:
          'Analysis of clearcoat scratches and imperfections in order to finalize cutting and polishing compound requirements.',
      },
      {
        step: 4,
        process:
          'One-step paint correction using respective cutting and polishing compounds throughout entire vehicle.',
      },
      {
        step: 5,
        process:
          'Contact-less rinse and wash followed by full vehicle application of ceramic coating',
      },
    ],
    disclaimer:
      'Our premium combo packages offer either a one year or three year ceramic coating option. By default, prices are reflective of 1-year ceramic coatings. To receive the 3-year ceramic coating instead, please let your specialist know on the day of the appointment. Up charge of $100 will be shown on the bill to reflect the 3-year ceramic coating option.',
  },
  ultraCombo: {
    title: 'Ultra Combo Detailing Package',
    imgSrc: luxuryInterior,
    summary:
      'Complete & rigorous detailing of all interior & exterior surfaces as done within respective packages plus 2-step paint correction and ceramic coating.',
    checklist: [
      'Exterior Package',
      'Interior Package',
      'Full Paint Correction',
      '5 Year Ceramic Coating',
    ],
    pricing: '$499.99 - $999.99',
    steps: [
      {
        step: 1,
        process:
          'Complete interior clean as summarized in the respective interior detail package.',
      },
      {
        step: 2,
        process:
          'Complete exterior clean as summarized in the respective exterior detail package.',
      },
      {
        step: 3,
        process:
          'Analysis of clearcoat scratches and imperfections in order to finalize cutting and polishing compound requirements.',
      },
      {
        step: 4,
        process:
          'Two-step paint correction using respective cutting and polishing compounds throughout entire vehicle.',
      },
      {
        step: 5,
        process:
          'Contact-less rinse and wash followed by full vehicle application of a 5-year ceramic coating',
      },
    ],
    disclaimer:
      'Our 2-step paint correction process and compounds are able to diminish away 99.9% of clearcoat scratches. Our 2-step paint correction, however, is unable to fix deeper scratches. If the scratch surpasses the clearcoat level, it has scratched the paint and polishing is of no use when the paint itself is scratched. In this case, a re-paint is required in which we do not currently offer such service.',
  },
};

export const initialVehCategoriesCheck = {
  Sedan: false,
  Suv: false,
  'Pickup Truck': false,
  Exotic: false,
  Exterior: false,
  Interior: false,
  'Paint Correction': false,
  'Ceramic Coating': false,
  Tires: false,
  'Engine Bays': false,
  Headlights: false,
  'Before Detail': false,
  'After Detail': false,
};

export const initialVehMakesCheck = {
  Acura: false,
  Audi: false,
  BMW: false,
  Buick: false,
  Cadillac: false,
  Chevrolet: false,
  Chrysler: false,
  Dodge: false,
  Ferrari: false,
  Ford: false,
  GMC: false,
  Honda: false,
  Hyundai: false,
  Infiniti: false,
  Jaguar: false,
  Jeep: false,
  Kia: false,
  Lamborghini: false,
  'Land Rover': false,
  Lexus: false,
  Mazda: false,
  'Mercedes-Benz': false,
  Nissan: false,
  Porsche: false,
  Subaru: false,
  Tesla: false,
  Toyota: false,
  Volkswagen: false,
  Volvo: false,
};

export const countiesMapper = {
  10: 'Fort Bend County-- $10',
  30: 'Harris County-- $30',
  50: 'Waller County-- $50',
  70: 'Wharton County-- $70',
  100: 'Montgomery County-- $100',
};

export const pricingMapperShort = {
  0: { imgSource: sedan, vehicle: 'SEDAN' },
  1: { imgSource: suv, vehicle: 'SUV' },
  2: { imgSource: pickupTruck, vehicle: 'PICKUP' },
  3: { imgSource: exotic, vehicle: 'HIGH-END' },
};

export const packageMapper = {
  0: 'interior',
  1: 'exterior',
  2: 'basicCombo',
  3: 'premiumCombo',
  4: 'ultraCombo',
};

export const intialChosenPackages = {
  0: false,
  1: false,
  2: false,
  3: false,
};
