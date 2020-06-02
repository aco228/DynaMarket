using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DynaMarket
{
	class Program
	{
		static void Main(string[] args)
		{
			DynaMarket.Socket.DynaForexManager.Start();
			Console.ReadKey();
		}
		

	}
}
