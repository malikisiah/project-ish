import { z } from "zod";
import { env } from "~/env";
import resend from "~/utils/resend";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { InquiryFormEmail } from "~/components/InquiryFormEmail";

const inputsSchema = z.object({
  email: z.string().email(),
  about: z.string().min(1, "About section is required"),
  option1: z.boolean(),
  option2: z.boolean(),
  option3: z.boolean(),
});

export type Inputs = z.infer<typeof inputsSchema>;

export const myRouter = createTRPCRouter({
  discordEvent: publicProcedure
    .input(
      z.object({
        message: z.string(),
        channel: z.enum(["orders", "inquiry-forms"]),
      }),
    )
    .mutation(async ({ input }) => {
      const urlMap = {
        orders: env.DISCORD_ORDERS_URL,
        "inquiry-forms": env.DISCORD_INQUIRYFORMS_URL,
      };
      const webhookUrl = urlMap[input.channel];
      const payload = { content: input.message };

      try {
        const response = await fetch(webhookUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });

        if (response.ok) {
          return Response.json({ message: "Webhook Success" });
        } else {
          return Response.json({ message: "Webhook Failed" });
        }
      } catch (error) {
        if (error instanceof Error) {
          return Response.json({
            message: "Error sending webhook",
            error: error.message,
          });
        } else {
          return Response.json({
            message: "An unknown error occurred",
          });
        }
      }
    }),

  inquiryFormEmail: publicProcedure
    .input(z.object({ data: inputsSchema }))
    .mutation(async ({ input }) => {
      const { error } = await resend.emails.send({
        from: "Malik <automation@updates.malikisiah.dev>",
        to: ["malikisiah214@gmail.com"],
        subject: "Inquiry Form",
        react: InquiryFormEmail({ data: input.data }),
      });
      if (error) {
        console.log(error.message);
        return Response.json({ message: error.message }, { status: 500 });
      }

      return Response.json({ message: "Success" }, { status: 200 });
    }),
});
