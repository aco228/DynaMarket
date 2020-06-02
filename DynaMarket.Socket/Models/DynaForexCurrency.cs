using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DynaMarket.Socket.Models
{
	public class DynaForexChanges
	{
		public string Name { get; set; } = "";
		public double Open = 0.0;
		public double Close = 0.0;
		public double High = 0.0;
		public double Low = 0.0;
		public double Volume = 0.0;
		public bool IsUsed = false;
		public long Timestamp = 0;
	}
}
