import express from "express";
import { createServer as createViteServer } from "vite";
import Database from "better-sqlite3";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const db = new Database("rideflow.db");

// Initialize Database
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    role TEXT CHECK(role IN ('passenger', 'driver')) NOT NULL
  );

  CREATE TABLE IF NOT EXISTS drivers (
    id INTEGER PRIMARY KEY,
    user_id INTEGER,
    vehicle_model TEXT,
    vehicle_number TEXT,
    status TEXT DEFAULT 'offline',
    lat REAL,
    lng REAL,
    FOREIGN KEY(user_id) REFERENCES users(id)
  );

  CREATE TABLE IF NOT EXISTS rides (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    passenger_id INTEGER,
    driver_id INTEGER,
    pickup_location TEXT,
    dropoff_location TEXT,
    status TEXT DEFAULT 'pending',
    fare REAL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(passenger_id) REFERENCES users(id),
    FOREIGN KEY(driver_id) REFERENCES users(id)
  );
`);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // --- API ROUTES ---

  // Auth
  app.post("/api/auth/register", (req, res) => {
    const { name, email, password, role } = req.body;
    try {
      const stmt = db.prepare("INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)");
      const info = stmt.run(name, email, password, role);
      
      if (role === 'driver') {
        db.prepare("INSERT INTO drivers (user_id) VALUES (?)").run(info.lastInsertRowid);
      }
      
      res.json({ id: info.lastInsertRowid, name, email, role });
    } catch (err: any) {
      res.status(400).json({ error: "Email already exists" });
    }
  });

  app.post("/api/auth/login", (req, res) => {
    const { email, password } = req.body;
    const user = db.prepare("SELECT * FROM users WHERE email = ? AND password = ?").get(email, password) as any;
    if (user) {
      res.json(user);
    } else {
      res.status(401).json({ error: "Invalid credentials" });
    }
  });

  // Rides
  app.post("/api/rides/book", (req, res) => {
    const { passenger_id, pickup, dropoff, fare } = req.body;
    const stmt = db.prepare("INSERT INTO rides (passenger_id, pickup_location, dropoff_location, fare) VALUES (?, ?, ?, ?)");
    const info = stmt.run(passenger_id, pickup, dropoff, fare);
    res.json({ id: info.lastInsertRowid, status: 'pending' });
  });

  app.get("/api/rides/pending", (req, res) => {
    const rides = db.prepare("SELECT * FROM rides WHERE status = 'pending'").all();
    res.json(rides);
  });

  app.post("/api/rides/accept", (req, res) => {
    const { ride_id, driver_id } = req.body;
    db.prepare("UPDATE rides SET driver_id = ?, status = 'accepted' WHERE id = ?").run(driver_id, ride_id);
    res.json({ success: true });
  });

  app.get("/api/rides/user/:id", (req, res) => {
    const rides = db.prepare(`
      SELECT r.*, u.name as driver_name 
      FROM rides r 
      LEFT JOIN users u ON r.driver_id = u.id 
      WHERE r.passenger_id = ? OR r.driver_id = ?
      ORDER BY created_at DESC
    `).all(req.params.id, req.params.id);
    res.json(rides);
  });

  // Drivers
  app.post("/api/drivers/location", (req, res) => {
    const { user_id, lat, lng } = req.body;
    db.prepare("UPDATE drivers SET lat = ?, lng = ?, status = 'online' WHERE user_id = ?").run(lat, lng, user_id);
    res.json({ success: true });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "dist", "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`RideFlow Server running on http://localhost:${PORT}`);
  });
}

startServer();
