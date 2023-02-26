import { z } from 'zod';
import CandidateSchema from './Candidate';

const GameSchema = z.object({
	name: z.string(),
	candidates: CandidateSchema.extend({
		runningMates: CandidateSchema.array()
	}).array()
});

export default GameSchema;
