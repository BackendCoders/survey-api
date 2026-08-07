import mongoose from 'mongoose';
import dns from 'dns';
import { env } from './env';

export const connectDB = async (): Promise<void> => {
	try {
		if (env.DNS_SERVERS.length > 0) {
			dns.setServers(env.DNS_SERVERS);
		}

		await mongoose.connect(env.MONGO_URI);
		console.log('✅ MongoDB connected');
	} catch (error) {
		console.error('❌ MongoDB connection failed', error);
		process.exit(1);
	}
};
