import { z } from "zod";

export const ADMIN_CODE = "528491";

const adminFields = {
  isAdmin: z.boolean(),
  adminCode: z.string().optional(),
};

function validateAdminCode(
  data: { isAdmin: boolean; adminCode?: string },
  ctx: z.RefinementCtx,
) {
  if (data.isAdmin && data.adminCode?.trim() !== ADMIN_CODE) {
    ctx.addIssue({
      code: "custom",
      message: "Invalid admin code.",
      path: ["adminCode"],
    });
  }
}

export const createAccountSchema = z
  .object({
    name: z.string().trim().min(2, "Name must be at least 2 characters."),
    email: z.string().trim().email("Enter a valid email address."),
    ...adminFields,
  })
  .superRefine(validateAdminCode);

export const signInSchema = z
  .object({
    name: z.string().trim().min(2, "Name must be at least 2 characters."),
    gamePin: z.string().trim().regex(/^\d{6}$/, "Game PIN must be 6 digits."),
    ...adminFields,
  })
  .superRefine(validateAdminCode);

export type CreateAccountInput = z.infer<typeof createAccountSchema>;
export type SignInInput = z.infer<typeof signInSchema>;
