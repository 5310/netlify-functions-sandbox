export default (request, context) => Math.random() > 0.5 ? undefined : context.rewrite("/locked-preview")

export const config = { path: "/locked" }
