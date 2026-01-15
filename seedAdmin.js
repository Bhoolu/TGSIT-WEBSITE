// // seedAdmin.js
// require("dotenv").config();
// const mongoose = require("mongoose");
// const Admin = require("./models/Admin");

// async function createAdmin() {
//   try {
//     // Connect to MongoDB
//     await mongoose.connect(process.env.MONGO_URI, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });

//     const email = "admin@tgist.com"; // default admin email
//     const password = "admin123"; // default admin password
//     const name = "Super Admin"; // default admin name
//     const role = "superadmin"; // role can be 'admin' or 'superadmin'

//     // Check if admin already exists
//     const existingAdmin = await Admin.findOne({ email });
//     if (existingAdmin) {
//       console.log("⚠️ Admin already exists:", existingAdmin.email);
//       return process.exit();
//     }

//     // Create new admin
//     const admin = new Admin({ email, password, name, role });
//     await admin.save();

//     console.log("✅ Admin user created:", email);
//     process.exit();
//   } catch (err) {
//     console.error("❌ Error creating admin:", err);
//     process.exit(1);
//   }
// }

// createAdmin();
// seedAdmin.js
// seedAdmin.js// seedAdmin.js
require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Admin = require("./models/Admin");

async function createAdmin() {
  try {
    // ✅ Use Atlas URI from .env, no deprecated options
    await mongoose.connect(process.env.MONGO_URI);

    const username = "admin";
    const plainPassword = "securepassword123";

    const passwordHash = await bcrypt.hash(plainPassword, 10);

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ username });
    if (existingAdmin) {
      console.log("⚠️ Admin already exists:", username);
      return mongoose.disconnect();
    }

    const admin = new Admin({ username, passwordHash });
    await admin.save();

    console.log("✅ Admin user created:", username);
    mongoose.disconnect();
  } catch (err) {
    console.error("❌ Error creating admin:", err);
    mongoose.disconnect();
  }
}

createAdmin();
