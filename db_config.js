// Initial set up

"use campus_parking";

// Collections configuration, starting with users collection

db.createCollection(" users ", {
    validator:{
        $jsonSchema: {
            bsonType: "object",
            required: [
                "_id",
                
            ],
        }
    }
})