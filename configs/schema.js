import { json, pgTable, serial, varchar, integer } from "drizzle-orm/pg-core";

export const CarListing=pgTable('carListing', {
    id:serial('id').primaryKey(),
    listingTitle:varchar('listingTitle'),
    tagline:varchar('tagline'),
    originalPrice:varchar('originalPrice'),
    sellingPrice:varchar('sellingPrice').notNull(),
    category:varchar('category').notNull(),
    condition:varchar('condition').notNull(),
    type:varchar('type').notNull(),
    make:varchar('make').notNull(),
    model:varchar('model').notNull(),
    year:varchar('year').notNull(),
    driveType:varchar('driveType').notNull(),
    transmission:varchar('transmission').notNull(),
    fuelType:varchar('fuelType').notNull(),
    mileage:varchar('mileage').notNull(),
    engineSize:varchar('engineSize'),
    cylinder:varchar('cylinder'),
    color:varchar('color').notNull(),
    door:varchar('door').notNull(),
    vin:varchar('vin'),
    offerType:varchar('offerType'),
    listingdescription:varchar('listingdescription').notNull(),
    features:json('features'),
    createdBy:varchar('createdBy').notNull(),
    postedOn:varchar('postedOn')
});


export const BookingListing = pgTable('bookingListing', {
    id: serial('id').primaryKey(),
    fullName: varchar('fullName').notNull(),
    email: varchar('email').notNull(),
    phoneNumber: varchar('phoneNumber').notNull(),
    preferredCar: varchar('preferredCar').notNull(),
    preferredDate: varchar('preferredDate').notNull(),
    message: varchar('message')

});

export const CarImages = pgTable('carImages', {
    id: serial('id').primaryKey(),
    imageUrl: varchar('imageUrl').notNull(),
    carListingId: integer('carListingId').notNull().references(() => CarListing.id)
 
});