import z = require("zod");

export const signUpInput = z.object({
  email:z.email(),
  password:z.string().min(6),
  name:z.string().optional()
})

export const signInInput = z.object({
  email:z.email(),
  password:z.string().min(6)
})

export const createBlogInput = z.object({
  title:z.string().max(100),
  content:z.string().max(500)
})

export const updateBlogInput = z.object({
  title:z.string().max(100),
  content:z.string().max(500)
})

export const comentInput = z.object({
  content:z.string().max(250)
})

export type SignUpInput = z.infer<typeof signUpInput>
export type SignInInput = z.infer<typeof signInInput>
export type CreateBlogInput = z.infer<typeof createBlogInput>
export type UpdateBlogInput = z.infer<typeof updateBlogInput>
export type ComentInput = z.infer<typeof comentInput>