import { describe, it, expect } from 'vitest';
import * as z from 'zod';

const step1Schema = z.object({
  firstName: z.string().min(2).max(50),
  lastName: z.string().min(2).max(50),
  email: z.string().email(),
});

const step2Schema = z.object({
  isEmployed: z.enum(['Yes', 'No']),
  companyName: z.string().optional(),
  jobTitle: z.string().optional(),
}).superRefine((data, ctx) => {
  if (data.isEmployed === 'Yes') {
    if (!data.companyName || data.companyName.length < 2) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'Required', path: ['companyName'] });
    }
  }
});

describe('Form Validation Logic', () => {
  it('should validate Step 1 correctly', () => {
    const validData = { firstName: 'John', lastName: 'Doe', email: 'john@example.com' };
    expect(step1Schema.safeParse(validData).success).toBe(true);

    const invalidData = { firstName: 'J', lastName: 'Doe', email: 'not-an-email' };
    const result = step1Schema.safeParse(invalidData);
    expect(result.success).toBe(false);
  });

  it('should validate Step 2 conditional logic', () => {
    const validEmployed = { isEmployed: 'Yes', companyName: 'Acme', jobTitle: 'Dev' };
    expect(step2Schema.safeParse(validEmployed).success).toBe(true);

    const invalidEmployed = { isEmployed: 'Yes', companyName: '', jobTitle: 'Dev' };
    expect(step2Schema.safeParse(invalidEmployed).success).toBe(false);

    const validUnemployed = { isEmployed: 'No' };
    expect(step2Schema.safeParse(validUnemployed).success).toBe(true);
  });
});
