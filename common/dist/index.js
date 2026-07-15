import { createRequire as _createRequire } from "module";
const __require = _createRequire(import.meta.url);
const z = __require("zod");
export const signUpInput = z.object({
    email: z.email(),
    password: z.string().min(6),
    name: z.string().optional()
});
export const signInInput = z.object({
    email: z.email(),
    password: z.string().min(6)
});
export const createBlogInput = z.object({
    title: z.string().max(100),
    content: z.string().max(500)
});
export const updateBlogInput = z.object({
    title: z.string().max(100),
    content: z.string().max(500)
});
export const comentInput = z.object({
    content: z.string().max(250)
});
//# sourceMappingURL=index.js.map