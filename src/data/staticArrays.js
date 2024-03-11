import { BiSolidSprayCan } from 'react-icons/bi';
import { PiEngineFill, PiHeadlightsFill, PiVanFill } from 'react-icons/pi';
import security from '../assets/security.png';
import order from '../assets/order.png';
import archive from '../assets/archive.png';
import gallery from '../assets/gallery.png';
import calendar from '../assets/calendar.png';
import clientContact from '../assets/clientContact.png';

export const hourlyIntervals = [
  '7:00AM',
  '8:00AM',
  '9:00AM',
  '10:00AM',
  '11:00AM',
  '12:00PM',
  '1:00PM',
  '2:00PM',
  '3:00PM',
  '4:00PM',
  '5:00PM',
  '6:00PM',
  '7:00PM',
]; // will come from db/server as array with elems as objects {time: '', reserved: bool, refID: ref}

export const extraPackages = [
  {
    title: 'MOBILE DETAILING',
    titleIcon: PiVanFill,
    description:
      "Don't have the time to come to our detailing center? No problem! We come to you!",
    time: '20-60 MIN',
    price: '$10-$100',
    numPrice: 0,
  },
  {
    title: 'HEADLIGHTS RESTORATION',
    titleIcon: PiHeadlightsFill,
    description:
      'If applicable, restoring dull, cloudy head and taillamps is a necessity for proper detailing.',
    time: '45 MIN',
    price: '$40',
    numPrice: 40,
  },
  {
    title: 'ENGINE BAY CLEANING',
    titleIcon: PiEngineFill,
    description:
      'Rigorous lather, scrub, and rinsing of your engine bay for proper showing off!',
    time: '45 MIN',
    price: '$40',
    numPrice: 40,
  },
  {
    title: 'INTERIOR FRESHEN',
    titleIcon: BiSolidSprayCan,
    description:
      'Our natural and organic chemicals/fragrances keeps your car smelling fresh!',
    time: '10 MIN',
    price: '$15',
    numPrice: 15,
  },
];

export const vehCategories = [
  'All Categories',
  'Sedan',
  'Suv',
  'Pickup Truck',
  'Exotic',
  'Exterior',
  'Interior',
  'Paint Correction',
  'Ceramic Coating',
  'Tires',
  'Engine Bays',
  'Headlights',
  'Before Detail',
  'After Detail',
];

export const vehMakes = [
  'All Vehicles',
  'Acura',
  'Audi',
  'BMW',
  'Buick',
  'Cadillac',
  'Chevrolet',
  'Chrysler',
  'Dodge',
  'Ferrari',
  'Ford',
  'GMC',
  'Honda',
  'Hyundai',
  'Infiniti',
  'Jaguar',
  'Jeep',
  'Kia',
  'Lamborghini',
  'Land Rover',
  'Lexus',
  'Mazda',
  'Mercedes-Benz',
  'Nissan',
  'Porsche',
  'Subaru',
  'Tesla',
  'Toyota',
  'Volkswagen',
  'Volvo',
];

export const adminAccountLinksMapper = [
  {
    id: '1sec',
    img: security,
    title: 'Login & Security',
    description: 'Edit login info, password reset, change contact',
  },
  {
    id: '2man',
    img: order,
    title: 'Manage Orders',
    description: 'View customer orders, edit/cancel/complete orders ...',
  },
  {
    id: '3arc',
    img: archive,
    title: 'Archived Orders',
    description: 'View previously completed customer orders.',
  },
  {
    id: '4gal',
    img: gallery,
    title: 'Manage Gallery',
    description: 'Upload and share photos, remove photos, ...',
  },
  {
    id: '5cal',
    img: calendar,
    title: 'Edit Calendar',
    description: 'Update date, time slots, holidays ...',
  },
  {
    id: '6cli',
    img: clientContact,
    title: 'Client Contacts',
    description: 'View All Client Contact Info',
  },
];

export const accountLinksMapper = [
  {
    id: '1sec',
    img: security,
    title: 'Login & Security',
    description: 'Edit login info, password reset, change contact',
  },
  {
    id: '2man',
    img: order,
    title: 'Manage Orders',
    description: 'View pending orders, edit & cancel orders',
  },
  {
    id: '3arc',
    img: archive,
    title: 'Archived Orders',
    description: 'View previous order info and photos',
  },
  {
    id: '4gal',
    img: gallery,
    title: 'Manage Gallery',
    description: 'Upload and share photos, remove photos, ...',
  },
];
