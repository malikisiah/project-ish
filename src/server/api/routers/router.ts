import type { ReactElement } from "react";
import { z } from "zod";
import { EmailTemplate } from "~/components/EmailTemplate";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import resend from "~/utils/resend";

export const myRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  sendEmail: publicProcedure
    .input(z.object({ to: z.string() }))
    .mutation(async ({ input }) => {
      await resend.emails.send({
        from: "Malik <automation@malikisiah.dev",
        to: [input.to],
        subject: "Hello World",
        react: EmailTemplate({ firstName: "Kyle" }) as ReactElement,
      });
    }),
});
