import dotenv from 'dotenv';

dotenv.config();

export const env = {
	PORT: process.env.PORT || 5000,
	MONGO_URI: process.env.MONGO_URI as string,
	DNS_SERVERS: process.env.DNS_SERVERS?.split(',').map((server) => server.trim()).filter(Boolean) || [],
	NODE_ENV: process.env.NODE_ENV || 'development',
};

if (!env.MONGO_URI) {
	throw new Error('❌ MONGO_URI is not defined in environment variables');
}
