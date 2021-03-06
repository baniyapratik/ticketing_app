Schema
User
email: string
password: string

Ticket
title: string
price: number
userId: Ref to User
orderId: Ref to Order

Order
userId: Ref to User
status: created| cancelled| Awaiting Payment| Completed
ticketId: Ref to Ticket
expiredAt: Date

Charge:
orderId: Ref to Order
status: created| failed| completed
amount: number
stripeId: string
stripeRefundId: string

Services:
Auth:

- Signup/Signin/signout
- everything related to the user
  tickets:
- ticket creation/editing.
- know whether a ticket can be updated
  orders:
- order creation/editing
  expiration:
- watches for orders to be created, cancels them after 15 minutes
  payments:
- handles credit card payment
- cancels orders if payment fails
- completes if payment succeeds

Events:

- UserCreated
- UserUpdated
- UserBanned
- OrderCreated
- OrderCancelled
- OrderExpired
- TicketCreated
- TicketUpdated
- ChargeCreated

Shared Library:

- Custom Error System
- Auth Middleware
- Request Validation Middleware
  options:
  - git submodule
  - publish to npm registry
    - NPM public registry with Organization

Events concurrency issues:

1. One listener might run more quickly than other
2. Listener can fail to process the event
3. NAT might think a client is still alive when it is dead
4. We might receive the same event twice (While one has received the event but after 30 seconds the event goes to the other listener to process).

