using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DynaMarket.Socket.Models
{
	public class DynaForex
	{
		public string Name { get; set; } = "";
		public List<DynaForexChanges> Changes = new List<DynaForexChanges>();
	}
}
