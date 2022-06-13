import {
  Publisher,
  Subjects,
  TicketUpdatedEvent,
} from "@baniyatickets/common_lib";

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  readonly subject = Subjects.TicketUpdated;
}
