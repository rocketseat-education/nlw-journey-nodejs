import type { FastifyInstance } from "fastify";
import type { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { prisma } from "../lib/prisma";
import { ClientError } from "../errors/client-error";

export async function changeNameParticipant(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().patch(
    "/participants/:participantId",
    {
      schema: {
        params: z.object({
          participantId: z.string().uuid(),
        }),
        body: z.object({
          name: z.string(),
        }),
      },
    },
    async (request) => {
      const { participantId } = request.params;
      const { name } = request.body;

      const participant = await prisma.participant.findUnique({
        where: {
          id: participantId,
        },
      });

      if (!participant) {
        throw new ClientError("Participant not found.");
      }

      await prisma.participant.update({
        where: { id: participantId },
        data: {
          name: name,
        },
      });

      return { participant };
    }
  );
}
