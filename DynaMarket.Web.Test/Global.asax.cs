using DynaMarket.Socket;
using DynaMarket.Web.Test.Code.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Web;
using System.Web.Mvc;
using System.Web.Optimization;
using System.Web.Routing;

namespace DynaMarket.Web.Test
{
	public class DynaApplication : System.Web.HttpApplication
	{
		public static DynaSocket Socket = null;

		protected void Application_Start()
		{
			AreaRegistration.RegisterAllAreas();
			FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
			RouteConfig.RegisterRoutes(RouteTable.Routes);
			BundleConfig.RegisterBundles(BundleTable.Bundles);

			DynaMarket.Socket.DynaForexManager.Start();
			new Thread(() =>
			{
				for(; ; )
				{
					List<DynaMarket.Socket.Models.DynaForexChanges> result = new List<DynaMarket.Socket.Models.DynaForexChanges>();
					foreach (var f in DynaForexManager.Currency)
					Thread.Sleep(1000 * 60);
					{
						var change = f.Value.Changes.LastOrDefault();
						if (change.IsUsed)
							continue;
						change.IsUsed = true;
						result.Add(change);
					}
					DataHub.Current.Update("dataUpdate", result);
				}
			}).Start();
		}
		

		public static DateTime UnixTimeStampToDateTime(long unixTimeStamp)
		{
			// Unix timestamp is seconds past epoch
			System.DateTime dtDateTime = new DateTime(1970, 1, 1, 0, 0, 0, 0, System.DateTimeKind.Utc);
			dtDateTime = dtDateTime.AddSeconds(unixTimeStamp).ToLocalTime();
			return dtDateTime;
		}

	}
}
