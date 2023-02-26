import { z } from 'zod';

const PartySchema = z.object({
	name: z.string(),
	color: z.string()
});

export default PartySchema;
