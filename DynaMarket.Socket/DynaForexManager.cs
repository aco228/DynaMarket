using DynaMarket.Socket.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DynaMarket.Socket
{
	public static class DynaForexManager
	{
		public static DynaSocket Socket = null;
		public static Dictionary<string, DynaForex> Currency = new Dictionary<string, DynaForex>();

		public static void Start()
		{
			Socket = new DynaSocket();
			Socket.OnMessageReceives = OnSocketUpdate;
			Socket.Open();
		}

		public static void OnSocketUpdate(dynamic data)
		{
			try
			{
				var a = data.pair;
			}
			catch(Exception e)
			{
				return;
			}

			Console.WriteLine(data.ToString());

			if (!Currency.ContainsKey(data.pair.ToString()))
				Currency.Add(data.pair.ToString(), new DynaForex() { Name = data.pair.ToString() });

			Currency[data.pair.ToString()].Changes.Add(new DynaForexChanges()
			{
				Name = data.pair.ToString(),
				Open = data.o,
				Close = data.c,
				Low = data.l,
				High = data.h,
				Volume = data.v,
				Timestamp = data.s
			});
		}

	}
}
