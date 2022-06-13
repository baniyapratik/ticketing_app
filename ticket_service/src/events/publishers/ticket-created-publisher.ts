import {
  Publisher,
  Subjects,
  TicketCreatedEvent,
} from "@baniyatickets/common_lib";

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  readonly subject = Subjects.TicketCreated;
}
