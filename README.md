# lamport

This project covers the concepts found in the paper "Time, Clocks, and the Ordering of Events in a Distributed System".

A distributed system is a system which exists across multiple computers connected via a network. Events that run over a distributed system require in many cases when one event is intended to run before the other.

When ordering events, we have to consider events that are run simultaneously, in which case we have to order tasks by the time we request instructions, and queue all requests. We also have to consider that timestamps between server and client devices will not be synced, thus we can use a timestamp request from the server when sending a request. We will also contain an order list, to ensure we aren't running tasks or processes before their pre-requisites.

This project emulates logical clocks and server side event ordering.