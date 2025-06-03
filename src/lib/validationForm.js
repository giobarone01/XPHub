import z from "zod";

const passwordRegex = /(?=.*[A-Z])(?=.*[a-z])(?=.*\d).*$/;
const passwordError =
    "Password must contain at least one uppercase letter, one lowercase letter, and one number.";

export const FormSchema = z.object({
    email: z.string().email(),
    firstName: z.string().min(1),
    lastName: z.string().min(1),
    username: z.string().min(3),
    password: z.string().min(8).regex(passwordRegex, passwordError),
});

export const ConfirmSchema = FormSchema.refine((data) => data);

export const FormSchemaLogin = z.object({
    email: z.string().email(),
    password: z.string().min(8).regex(passwordRegex, passwordError),
});

export const ConfirmSchemaLogin = FormSchemaLogin.refine((data) => data);

export function getFieldError(schema, property, value) {
    const result = schema.safeParse({ [property]: value });
    if (!result.success) {
        const issues = result.error.issues.filter(
            (issue) => issue.path[0] === property
        );
        return issues.map((issue) => issue.message).join(", ");
    }
    return undefined;
}

export const getErrors = (error) =>
    error.issues.reduce((all, issue) => {
        const path = issue.path.join("");
        const message = all[path] ? all[path] + ", " : "";
        all[path] = message + issue.message;
        return all;
    }, {});
