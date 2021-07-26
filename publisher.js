import amqp from "amqplib";
import users from "./data2.json";

const quName = process.argv[2] || "qu1";

const message = {
  description: "test message  ",
};

connect_rabbitmq();

async function connect_rabbitmq() {
  try {
    const connection = await amqp.connect("amqp://localhost:5672");
    const channel = await connection.createChannel();
    const assertion = await channel.assertQueue(quName);

    // setInterval(() => {
    //   message.description = `test message ${parseInt(
    //     Math.random() * 100
    //   )}  to (${quName})`;
    //   channel.sendToQueue(quName, Buffer.from(JSON.stringify(message)));
    //   console.log("sended message--- ", message);
    // }, 10);
    //

    users.forEach((user) => {
      channel.sendToQueue(quName, Buffer.from(JSON.stringify(user.id)));
      console.log(`%% Queue :: (${quName})  userID :: (${user.id})`);
    });

    // ---------------
  } catch (error) {
    console.error("error---", error.message);
  }
}
