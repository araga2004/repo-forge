import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";
import { z } from "zod";

export const projectRouter = createTRPCRouter({
  createProject: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        githubUrl: z.string(),
        githubToken: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      console.log("Creating project with data:", input);

      console.log(ctx.user.userId);

      const project = await ctx.db.project.create({
        data: {
          name: input.name,
          githubUrl: input.githubUrl,
          githubToken: input.githubToken,
          usertoProjects: {
            create: {
              userId: ctx.user.userId!,
            },
          },
        },
      });
      return project;
    }),
  getProjects: protectedProcedure.query(async ({ ctx }) => {
    return ctx.db.project.findMany({
      where: {
        usertoProjects: {
          some: {
            userId: ctx.user.userId ?? undefined,
          },
        },
      },
    });
  }),
});
