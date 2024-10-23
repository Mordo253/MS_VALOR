import { config } from "dotenv";
config();

export const PORT = process.env.PORT;
export const MONGODB_URI =process.env.MONGODB_URI;
export const TOKEN_SECRET = process.env.TOKEN_SECRET;

export const FRONTEND_URL = process.env.FRONTEND_URL;

// export const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
// export const ADMIN_USERNAME = process.env.ADMIN_USERNAME;
// export const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

export const CLOUDINARY_CLOUD_NAME = process.env['CLOUDINARY_CLOUD_NAME']
export const CLOUDINARY_API_SECRET = process.env['CLOUDINARY_API_SECRET']
export const CLOUDINARY_API_KEY = process.env['CLOUDINARY_API_KEY']
