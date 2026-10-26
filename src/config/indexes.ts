import mongoose from 'mongoose';

/**
 * Applies schema index changes to MongoDB.
 *
 * `autoIndex` only creates indexes that are missing: when one of the same name
 * already exists with different options, MongoDB rejects it with
 * IndexOptionsConflict and mongoose swallows the error on the model's `index`
 * event. `syncIndexes` drops and recreates those, so changes such as adding
 * `sparse` to a unique field actually take effect. It also drops indexes that
 * are no longer declared in the schema. A failure here is logged, not fatal.
 */
export const syncIndexes = async (): Promise<void> => {
	for (const name of mongoose.modelNames()) {
		try {
			const dropped = await mongoose.model(name).syncIndexes();
			if (dropped.length > 0) {
				console.log(`🔄 ${name}: rebuilt index ${dropped.join(', ')}`);
			}
		} catch (error) {
			console.error(`⚠️  ${name}: index sync failed`, error);
		}
	}
};
