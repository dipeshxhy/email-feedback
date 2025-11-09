import mongoose from 'mongoose';

// Small helper to avoid accidentally logging credentials
const hasCredentials = uri => {
  try {
    if (!uri) return false;
    // very simple check for user:pass@ in the URI
    return /:\/.+@/.test(uri) || /@/.test(uri.split('://')[1] || '');
  } catch {
    return false;
  }
};

export const connectDB = async () => {
  try {
    const uri = process.env.MONGO_URI;
    if (!uri) {
      console.error(
        'MONGO_URI is not set. Make sure you set the MONGO_URI environment variable in Render.'
      );
      process.exit(1);
    }

    // Avoid printing credentials to logs; just confirm presence and masked length
    if (hasCredentials(uri)) {
      console.log(
        'MONGO_URI detected (credentials present) — connecting to MongoDB...'
      );
    } else {
      console.log('MONGO_URI detected — connecting to MongoDB...');
    }

    // Use default connection options. Mongoose v8 uses sensible defaults but passing
    // an explicit socket timeout and server selection timeout helps surface issues faster.
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 10000, // fail fast when server not reachable
      socketTimeoutMS: 45000,
    });

    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection failed');
    // print a short summary to help debugging without dumping credentials
    if (error?.reason)
      console.error('Reason:', error.reason.type || error.reason);
    console.error(error);
    process.exit(1);
  }
};
