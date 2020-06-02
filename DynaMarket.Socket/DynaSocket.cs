using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Authentication;
using System.Text;
using System.Threading.Tasks;
using WebSocket4Net;

namespace DynaMarket.Socket
{
	public class DynaSocket
	{
		private WebSocket websocket;
		public Action<dynamic> OnMessageReceives = null;

		public DynaSocket()
		{
			websocket = new WebSocket("wss://socket.polygon.io/forex", sslProtocols: SslProtocols.Tls12 | SslProtocols.Tls11 | SslProtocols.Tls);
			websocket.Opened += websocket_Opened;
			websocket.Error += websocket_Error;
			websocket.Closed += websocket_Closed;
			websocket.MessageReceived += websocket_MessageReceived;
		}

		public void Open()
		{
			websocket.Open();
		}

		private void websocket_Opened(object sender, EventArgs e)
		{
			Console.WriteLine("Connected!");
			websocket.Send("{\"action\":\"auth\",\"params\":\"0PSrs3eLxgpTlp4WP_S5_dxUD_Q_gOqDp89le8\"}");
			websocket.Send("{\"action\":\"subscribe\",\"params\":\"CA.*\"}");
		}
		private void websocket_Error(object sender, SuperSocket.ClientEngine.ErrorEventArgs e)
		{
			Console.WriteLine("WebSocket Error");
			Console.WriteLine(e.Exception.Message);
		}
		private void websocket_Closed(object sender, EventArgs e)
		{
			Console.WriteLine("Connection Closed...");
			this.Open();
		}
    private void websocket_MessageReceived(object sender, MessageReceivedEventArgs e)
    {
      try
			{
				dynamic json = JsonConvert.DeserializeObject(e.Message);
				if (json[0].ev.ToString() == "status")
					return;
				
				foreach (var row in json)
				{
					OnMessageReceives?.Invoke(row);
				}
			}
			catch(Exception ex)
			{
				int a = 0;
				OnMessageReceives?.Invoke(new { error = true, message = ex.Message});
			}
      
		}

	}
}
