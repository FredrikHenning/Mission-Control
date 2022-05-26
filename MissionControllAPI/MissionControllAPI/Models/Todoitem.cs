namespace MissionControllAPI.Models
{
   
    public class Todoitem
    {
        
        public string? Name { get; set; }
        public string? Battery { get; set; }
        public string? message { get; set; }
        public string? id { get; set; }
        public List<string>? Sensors { get; set; }
        public string? Plans { get; set; }
        public string? Status { get; set; }

        public string? Route { get; set; }
        public string? Rotation { get; set; }
        public string? Velocity { get; set; }
        public string? Position { get; set; }
        public string? Lidar { get; set; }




    }
}
