export default (request, context) => context.rewrite("/locked")

export const config = { path: "/locked" }
