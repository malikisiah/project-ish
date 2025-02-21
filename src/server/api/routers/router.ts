import { NextResponse } from "next/server";
import { z } from "zod";
import { env } from "~/env";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

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
          return NextResponse.json({ message: "Webhook Success" });
        } else {
          return NextResponse.json({ message: "Webhook Failed" });
        }
      } catch (error) {
        if (error instanceof Error) {
          return NextResponse.json({
            message: "Error sending webhook",
            error: error.message,
          });
        } else {
          return NextResponse.json({
            message: "An unknown error occurred",
          });
        }
      }
    }),
});
