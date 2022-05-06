using MQTTnet;
using MQTTnet.Client;
using MQTTnet.Client.Options;


namespace MissionControllAPI.Services
{

    public class Mqttt
    {
        public async Task main(string topic,string messagePayload)
        {
            var mqttfactory = new MqttFactory();
            IMqttClient client = mqttfactory.CreateMqttClient();
            var options = new MqttClientOptionsBuilder()
                .WithCredentials("mission-control", "upon map citadel overstep")
                .WithTcpServer("tharsis.oru.se", 8883)
                .WithTls()
                .Build();
            client.UseConnectedHandler(e =>
            {
                Console.WriteLine("Connected...");

            });

            client.UseDisconnectedHandler(e =>
            {
                Console.WriteLine("Disconectar publisher");
                

            });

            await client.ConnectAsync(options);

            await PublishMessageAsync(client, messagePayload, topic);

            await client.DisconnectAsync();
            Console.WriteLine("Stänger ner publisher");


        }
        public static async Task PublishMessageAsync(IMqttClient client, string messagePayload, string topic)
        {
            //string messagePayload = "Goto 10 10";
            var message = new MqttApplicationMessageBuilder()
                .WithTopic(topic)
                .WithPayload(messagePayload)
                .WithAtLeastOnceQoS()
                .Build();

            if (client.IsConnected)
            {
                await client.PublishAsync(message);
                Console.WriteLine(messagePayload);
            }
        }

    

    }
}
