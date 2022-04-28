using MQTTnet;
using MQTTnet.Client;
using MQTTnet.Client.Options;
using System;
using System.Threading.Tasks;
using MissionControllAPI.Models;


namespace MissionControllAPI.Services
{
    public class Subscriper
    {
        public Action<MqttApplicationMessageReceivedEventArgs> mqttMessageReceived;
        public string? Response {get; set;}
        public string? Response2 { get; set; }

        public string GiveResponse()
        {
            Console.WriteLine("Skriver ut response:");
            Console.WriteLine(Response);
            return Response;
        }

        public void testUpdate()
        {
            this.Response2 = "Helllohaj";
        }


        public void Update(string message)
        {
            this.Response = message;
        }

        public async Task main()
        {
            var bigM = "kalas";
            this.Response2 = bigM;

            var mqttfactory = new MqttFactory();
            IMqttClient client = mqttfactory.CreateMqttClient();
            var options = new MqttClientOptionsBuilder()
                .WithCredentials("mission-control", "upon map citadel overstep")
                .WithTcpServer("tharsis.oru.se", 8883)
                .WithTls()
                .Build();
            client.UseConnectedHandler(async e =>
            {
                Console.WriteLine("Subscriper started..");
                var topicPosition = new TopicFilterBuilder().WithTopic("simulation/robot/position").Build(); //simulation/robot/position
                var topicPlans = new TopicFilterBuilder().WithTopic("tp/plan").Build();
                var topicSensors = new TopicFilterBuilder().WithTopic("simulation/sensor/status/#").Build();
                var topicStatus = new TopicFilterBuilder().WithTopic("tp/status").Build();
                var topicRoute = new TopicFilterBuilder().WithTopic("simulation/current_path").Build();
                var topicBattery = new TopicFilterBuilder().WithTopic("simulation/robot/battery").Build();
                var topicRotation = new TopicFilterBuilder().WithTopic("simulation/robot/rotation").Build();
                var topicVelocity = new TopicFilterBuilder().WithTopic("simulation/robot/velocity").Build();
                var topicSatellite = new TopicFilterBuilder().WithTopic("simulation/images/satellite").Build();
                var topicLandscape = new TopicFilterBuilder().WithTopic("simulation/images/landscape").Build();

                await client.SubscribeAsync(topicPosition,topicPlans,topicSensors,topicStatus, topicRoute, topicBattery, topicRotation, topicVelocity, topicSatellite, topicLandscape);

            });

            client.UseDisconnectedHandler(e =>
            {
                Console.WriteLine("Didnt connect.. subben.");
                Console.WriteLine(e.ToString);

            });

            client.UseApplicationMessageReceivedHandler(e =>
            {
                StreamReader sr = new StreamReader("data.txt");
                var oldmessage = sr.ReadToEnd();
                sr.Close();
                var message = e.ApplicationMessage.ConvertPayloadToString();
                var topic = e.ApplicationMessage.Topic.ToString();

                if(oldmessage != message)
                {
                    //StreamWriter sw = new StreamWriter("data.txt");
                    //sw.WriteLine(message);
                    ;
                    //sw.Close();
                    if (topic == "mcpos" || topic == "simulation/robot/position")
                    {
                        //Console.WriteLine($"Recived new message: {message}");
                        try { File.WriteAllText("position.txt", message); }
                        catch { };
                    }
                    if (topic.Remove(topic.Length - 1) == "simulation/sensor/status/")
                    {
                        Console.WriteLine($"Recived new message: {message}. From topic {topic}");
                        var id = topic[topic.Length - 1];
                        var fileToOpen = "s" + id + ".txt";
             
                        try { File.WriteAllText(fileToOpen, message); }
                        catch { };



                        try { File.WriteAllText("sensors.txt", message); }
                        catch { };
                        try { File.WriteAllText("consoleMessage.txt", "Sensors updated!"); }
                        catch { };
                    }
                    if (topic == "tp/plan")
                    {
                        Console.WriteLine($"Recived new message: {message}");
                        try { File.WriteAllText("plans.txt", message); }
                        catch { };

                        try { File.WriteAllText("consoleMessage.txt", "New plan!"); }
                        catch { };

                    }
                    if (topic == "tp/status")
                    {
                        Console.WriteLine($"Recived new message: {message}");
                        try { File.WriteAllText("status.txt", message); }
                        catch { };

                        try { File.WriteAllText("consoleMessage.txt", "A task is finished"); }
                        catch { };
                    }

                    if (topic == "simulation/current_path")
                    {
                        Console.WriteLine($"Recived new message: {message}");
                        try { File.WriteAllText("route.txt", message); }
                        catch { };
                    }

                    if (topic == "simulation/robot/battery")
                    {
                        //Console.WriteLine($"Recived new message: {message}");
                        try { File.WriteAllText("battery.txt", message); }
                        catch { };
                    }

                    if (topic == "simulation/robot/rotation")
                    {
                        //Console.WriteLine($"Recived new message: {message}");
                        try { File.WriteAllText("rotation.txt", message); }
                        catch { };
                    }

                    if (topic == "simulation/robot/velocity")
                    {
                        Console.WriteLine($"Recived new message: {message}");
                        try { File.WriteAllText("velocity.txt", message); }
                        catch { };
                    }

                    if (topic == "simulation/images/satellite")
                    {
                        Console.WriteLine($"Recived new message: {message}");
                        try { File.WriteAllText("satellite.txt", message); }
                        catch { };
                    }

                    if (topic == "simulation/images/landscape")
                    {
                        Console.WriteLine($"Recived new message: {message}");
                        try { File.WriteAllText("landscape.txt", message); }
                        catch { };
                    }


                }
                //Console.WriteLine($"Recived message: {message}");
                try { File.WriteAllText("data.txt", message); }
                catch { };

            });
            //client.UseApplicationMessageReceivedHandler(mqttMessageReceived);

             await client.ConnectAsync(options);




        }
        
    }
}
