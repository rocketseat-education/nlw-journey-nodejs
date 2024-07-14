import fastify from "fastify";
import cors from "@fastify/cors";
import { createTrip } from "./routes/create-trip";
import {
  serializerCompiler,
  validatorCompiler,
} from "fastify-type-provider-zod";
import { confirmTrip } from "./routes/confirm-trip";
import { confirmParticipants } from "./routes/confirm-participant";
import { createActivity } from "./routes/create-activity";
import { getActivities } from "./routes/get-activities";
import { createLink } from "./routes/create-link";
import { getLinks } from "./routes/get-links";
import { getParticipants } from "./routes/get-participants";
import { createInvite } from "./routes/create-invite";
import { updateTrip } from "./routes/update-trip";
import { getTripDetails } from "./routes/get-trip-details";
import { getParticipant } from "./routes/get-participant";
import { errorHandler } from "./error-handler";
import { env } from "./env";
import { changeNameParticipant } from "./routes/change-name-participant";
import { createInvites } from "./routes/create-invites";
import { deleteLink } from "./routes/delete-link";
import { deleteActivity } from "./routes/delete-activity";
import { deleteParticipant } from "./routes/delete-participant";

const app = fastify();

app.register(cors, {
  origin: "*",
});

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.setErrorHandler(errorHandler);

app.register(createTrip);
app.register(confirmTrip);
app.register(confirmParticipants);
app.register(createActivity);
app.register(deleteActivity);
app.register(getActivities);
app.register(createLink);
app.register(deleteLink);
app.register(getLinks);
app.register(getParticipants);
app.register(createInvites);
app.register(updateTrip);
app.register(getTripDetails);
app.register(getParticipant);
app.register(deleteParticipant);
app.register(changeNameParticipant);

app.listen({ port: env.PORT }).then(() => {
  console.log("Server running!");
});
