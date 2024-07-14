import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import z from "zod";
import { prisma } from "../lib/prisma";
import { ClientError } from "../errors/client-error";

export async function deleteLink(app:FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().delete(
    "/links/:linkId",
    {
      schema: {
        params: z.object({
          linkId: z.string().uuid(),
        }),
      },
    },
    async (request) => {
      const { linkId } = request.params;

      const link = await prisma.link.findUnique({
        where: { id: linkId },
      });

      if (!link) {
        throw new ClientError("Link not found");
      }

      const deletedLink = await prisma.link.delete({
        where: {
          id: linkId,
        },
      });

      return { deletedLink };
    }
  );
}