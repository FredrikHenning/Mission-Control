using Microsoft.AspNetCore.Mvc;
using MissionControllAPI.Models;
using MQTTnet;
using MissionControllAPI.Services;
using System.Text.Json;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace MissionControllAPI.Controllers
{


    [Route("[controller]")]
    [ApiController]
    public class TodoController : ControllerBase
    {
        private Todoitem data = new Todoitem {
            Name = "Gusten",
            Battery = "80%" 
            
        };

        string message1 = "{'id': 1, 'command': 'goto', 'args': ['10 10'] }";
        
          
       Mqttt Publisher = new Mqttt();
        Subscriper Subscriper = new Subscriper();

        // GET: api/<TodoController>
        [HttpGet]
        public ActionResult<Todoitem> Get()
        {
            //Console.WriteLine("Skriver");
            //Mqttt.main(message1);
            return data;
        }

        // GET api/<TodoController>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<TodoController>
        [HttpPost("{topic}")]
        public void Post(string topic, [FromBody] string value)
        {
            Console.WriteLine("Postar");
            Publisher.main(topic, value);
            Console.WriteLine(value);
        }

        // PUT api/<TodoController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<TodoController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }

        [HttpGet("sub")]
        public ActionResult<string> GetSub()
        {
            Console.WriteLine("Sub kallad då");
            
            Subscriper.main();
            return "Subben är igång";
        }

        [HttpGet("satellite")]
        public ActionResult<string> GetSatellite()
        {

            string mess = "";
            try
            {
                StreamReader sr = new StreamReader("satellite.txt");
                mess = sr.ReadToEnd();
                sr.Close();
            }
            catch { };

            return mess;
        }

        [HttpGet("landscape")]
        public ActionResult<string> GetLandscape()
        {

            string mess = "";
            try
            {
                StreamReader sr = new StreamReader("landscape.txt");
                mess = sr.ReadToEnd();
                sr.Close();
            }
            catch { };

            return mess;
        }

        [HttpGet("Update")]
        public ActionResult<Todoitem> GetUpdate()
        {
            List<string> sensorList = new List<string> { };

            var nr_of_sensors = 3;
            List<string> filesList = new List<string> {"s0.txt", "s1.txt", "s2.txt" , "s3.txt", "s4.txt", "s5.txt"};
            string mess = "";
            for (int i = 0; i < nr_of_sensors; i++)
            {
                try
                {
                    StreamReader sr = new StreamReader(filesList[i]);
                    mess = sr.ReadToEnd();
                    sr.Close();
                }
                catch { };

                mess = mess.Remove(mess.Length - 1);
                mess = mess + ", " + '"' + "id" + '"'+": " + i + "}";

                sensorList.Add(mess);
                
            }

            try { StreamReader sr = new StreamReader("position.txt");
            mess = sr.ReadToEnd();
            sr.Close();
            data.Position = mess;
            }
            catch { };

            try
            {
                StreamReader sr = new StreamReader("sensors.txt");
                mess = sr.ReadToEnd();
                sr.Close();
           
                data.Sensors = sensorList;
            }
            catch { };

            try
            {
                StreamReader sr = new StreamReader("plans.txt");
                mess = sr.ReadToEnd();
                sr.Close();
                data.Plans = mess;
            }
            catch { };

            try
            {
                StreamReader sr = new StreamReader("status.txt");
                mess = sr.ReadToEnd();
                sr.Close();
                data.Status = mess;
            }
            catch { };

            try
            {
                StreamReader sr = new StreamReader("route.txt");
                mess = sr.ReadToEnd();
                sr.Close();
                data.Route = mess;
            }
            catch { };

            try
            {
                StreamReader sr = new StreamReader("battery.txt");
                mess = sr.ReadToEnd();
                sr.Close();
                data.Battery = mess;
            }
            catch { };

            try
            {
                StreamReader sr = new StreamReader("rotation.txt");
                mess = sr.ReadToEnd();
                sr.Close();
                data.Rotation = mess;
            }
            catch { };

            try
            {
                StreamReader sr = new StreamReader("velocity.txt");
                mess = sr.ReadToEnd();
                sr.Close();
                data.Velocity = mess;
            }
            catch { };

            try
            {
                StreamReader sr = new StreamReader("consoleMessage.txt");
                mess = sr.ReadToEnd();
                sr.Close();
                data.message = mess;
            }
            catch { };

            return data;
        }

    }
}
