using Microsoft.AspNet.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace DynaMarket.Web.Test.Code.SignalR
{
	public class DataHub : Hub
	{
		public static DataHub Current { get => new DataHub(GlobalHost.ConnectionManager.GetHubContext<DataHub>()); }
		private IHubContext _context = null;

		public DataHub(IHubContext context)
		{
			this._context = context;
		}
		
		public void Update(string method, dynamic data)
		{
			var sendinData = new
			{
				method = method,
				data = data
			};

			if (this._context != null)
				this._context.Clients.All.update(sendinData);
			else
				this.Clients.All.update(sendinData);

		}

	}
}