import type { FastifyInstance } from "fastify";
import type { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { prisma } from "../lib/prisma";
import { ClientError } from "../errors/client-error";
import { createInvite } from "./create-invite";

export async function createInvites(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    "/trips/:tripId/invites",
    {
      schema: {
        params: z.object({
          tripId: z.string().uuid(),
        }),
        body: z.object({
          emails_to_invite: z.array(z.string().email()),
        }),
      },
    },
    async (request) => {
      const { tripId } = request.params;
      const { emails_to_invite } = request.body;

      const trip = await prisma.trip.findUnique({
        where: { id: tripId },
      });

      if (!trip) {
        throw new ClientError("Trip not found");
      }

      const invites = await Promise.all(
        emails_to_invite.map(async (email) => await createInvite(tripId, email))
      );

      return { invitedParticipants: invites };
    }
  );
}
