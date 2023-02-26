import { z } from 'zod';

const CandidateSchema = z.object({
	firstName: z.string(),
	lastName: z.string(),
	party: z.string(),
	homeState: z.string()
});

export default CandidateSchema;
