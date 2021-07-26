import amqp from "amqplib";
const queName = process.argv[2] || "qu1";

import users from "./data2.json";

connect_rabbitmq();

async function connect_rabbitmq() {
  try {
    const connection = await amqp.connect("amqp://localhost:5672");
    const channel = await connection.createChannel();
    const assertion = await channel.assertQueue(queName);

    console.log(`** waiting message from (${queName}) ...`);

    channel.consume(queName, (message) => {
      const userId = parseInt(message.content.toString());
      const user = users.find((user) => user.id === userId);
      if (user) {
        console.log(`userId:: ${userId} data:: ${JSON.stringify(user)}`);
        channel.ack(message);
      }
    });

    //
  } catch (error) {
    console.error(`error--- ${error.message}`);
  }
}
