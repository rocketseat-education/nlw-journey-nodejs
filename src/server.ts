import cors from "@fastify/cors";
import fastify from "fastify";
import {
  serializerCompiler,
  validatorCompiler,
} from "fastify-type-provider-zod";
import { env } from "./env";
import { errorHandler } from "./error-handler";
import { changeNameParticipant } from "./routes/change-name-participant";
import { confirmParticipants } from "./routes/confirm-participant";
import { confirmTrip } from "./routes/confirm-trip";
import { createActivity } from "./routes/create-activity";
import { createInvites } from "./routes/create-invites";
import { createLink } from "./routes/create-link";
import { createTrip } from "./routes/create-trip";
import { deleteActivity } from "./routes/delete-activity";
import { deleteLink } from "./routes/delete-link";
import { deleteParticipant } from "./routes/delete-participant";
import { getActivities } from "./routes/get-activities";
import { getLinks } from "./routes/get-links";
import { getParticipant } from "./routes/get-participant";
import { getParticipants } from "./routes/get-participants";
import { getTripDetails } from "./routes/get-trip-details";
import { updateTrip } from "./routes/update-trip";

const app = fastify();

app.register(cors, {
  origin: env.WEB_BASE_URL,
});

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.setErrorHandler(errorHandler);

app.register(createTrip);
app.register(confirmTrip);
app.register(confirmParticipants);
app.register(createActivity);
// app.register(deleteActivity);
app.register(getActivities);
app.register(createLink);
// app.register(deleteLink);
app.register(getLinks);
app.register(getParticipants);
app.register(createInvites);
app.register(updateTrip);
app.register(getTripDetails);
app.register(getParticipant);
// app.register(deleteParticipant);
// app.register(changeNameParticipant);

app.listen({ port: env.PORT }).then(() => {
  console.log("Server running!");
});
